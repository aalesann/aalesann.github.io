const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let snake = [];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let gameInterval;
let isGameRunning = false;

function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    score = 0;
    dx = 1;
    dy = 0;
    scoreElement.innerText = `SCORE: ${score.toString().padStart(3, '0')}`;
    createFood();
}

function createFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    // Check if food spawns on snake
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) createFood();
    });
}

function drawGame() {
    if (!isGameRunning) return;

    moveSnake();
    
    if (checkCollision()) {
        gameOver();
        return;
    }

    clearCanvas();
    drawFood();
    drawSnake();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = `SCORE: ${score.toString().padStart(3, '0')}`;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#ff00ff' : '#00f3ff'; // Pink head, Cyan body
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        ctx.shadowBlur = 0;
    });
}

function drawFood() {
    ctx.fillStyle = '#ffff00'; // Yellow food
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ffff00';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    ctx.shadowBlur = 0;
}

function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function checkCollision() {
    const head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameOver() {
    isGameRunning = false;
    clearInterval(gameInterval);
    alert(`GAME OVER\nFINAL SCORE: ${score}`);
    startBtn.innerText = 'RESTART_SYSTEM';
}

function startGame() {
    if (isGameRunning) return;
    initGame();
    isGameRunning = true;
    startBtn.innerText = 'SYSTEM_RUNNING...';
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(drawGame, 100);
}

document.addEventListener('keydown', (e) => {
    if (!isGameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

startBtn.addEventListener('click', startGame);

// Initial draw
clearCanvas();
ctx.fillStyle = '#00f3ff';
ctx.font = '20px Orbitron';
ctx.fillText('PRESS START', 130, 200);
