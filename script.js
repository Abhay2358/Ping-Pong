const canvas = document.getElementById("pingPongCanvas");
const context = canvas.getContext("2d");

// Score variables
let currentScore = 0;
let highestScore = 0;

// Update score elements in HTML
const currentScoreElement = document.getElementById("currentScore");
const highestScoreElement = document.getElementById("highestScore");

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerX = 0;
let playerY = canvas.height / 2 - paddleHeight / 2;

let aiX = canvas.width - paddleWidth;
let aiY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(event) {
    const rect = canvas.getBoundingClientRect();
    playerY = event.clientY - rect.top - paddleHeight / 2;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#fff";
    context.fillRect(playerX, playerY, paddleWidth, paddleHeight);

    context.fillStyle = "#fff";
    context.fillRect(aiX, aiY, paddleWidth, paddleHeight);

    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#fff";
    context.fill();
    context.closePath();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        currentScore++;
        updateScore();
    }

    if (ballX + ballRadius > aiX && ballY > aiY && ballY < aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        //currentScore++;
       // updateScore();
    }

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        resetBall();
    }

    if (aiY + paddleHeight / 2 < ballY) {
        aiY += 5;
    } else {
        aiY -= 5;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;

    // Check if the current score is the highest
    if (currentScore > highestScore) {
        highestScore = currentScore;
        highestScoreElement.textContent = highestScore;
    }

    // Reset current score
    currentScore = 0;
    currentScoreElement.textContent = currentScore;
}

function updateScore() {
    currentScoreElement.textContent = currentScore;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
