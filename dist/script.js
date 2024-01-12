const BOARD_SIZE = 300;
const SNAKE_SIZE = 20;
const MOVE_INTERVAL = 200;

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');
    const gameOverScreen = document.getElementById('game-over-screen');
    const scoreDisplay = document.getElementById('score-display');
    
    let snakeX = 0;
    let snakeY = 0;
    let foodX = 0;
    let foodY = 0;
    let score = 0;
    let direction = 'right';
    let gamePaused = false;

    function getRandomPosition() {
        return Math.floor(Math.random() * (BOARD_SIZE / SNAKE_SIZE)) * SNAKE_SIZE;
    }

    function placeFood() {
        foodX = getRandomPosition();
        foodY = getRandomPosition();
        food.style.left = foodX + 'px';
        food.style.top = foodY + 'px';
    }

    function updateScore() {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }

    function moveSnake() {
        if (direction === 'right') {
            snakeX += SNAKE_SIZE;
        } else if (direction === 'left') {
            snakeX -= SNAKE_SIZE;
        } else if (direction === 'up') {
            snakeY -= SNAKE_SIZE;
        } else if (direction === 'down') {
            snakeY += SNAKE_SIZE;
        }

        snake.style.left = snakeX + 'px';
        snake.style.top = snakeY + 'px';

        // Check for collision with food
        if (snakeX === foodX && snakeY === foodY) {
            updateScore();
            placeFood();
        }
    }

    function checkCollision() {
        if (snakeX < 0 || snakeX >= BOARD_SIZE || snakeY < 0 || snakeY >= BOARD_SIZE) {
            // Game over
            gameOver();
        }
    }

    function gameOver() {
        gamePaused = true;
        gameOverScreen.style.display = 'block';
        scoreDisplay.textContent = 'Your score: ' + score;
    }

    window.resetGame = function () {
        snakeX = 0;
        snakeY = 0;
        score = 0;
        direction = 'right';
        snake.style.left = '0px';
        snake.style.top = '0px';
        placeFood();
        gameOverScreen.style.display = 'none';
        gamePaused = false;
    };

    function handleKeyPress(event) {
        if (!gamePaused) {
            if (event.key === 'ArrowRight' && direction !== 'left') {
                direction = 'right';
            } else if (event.key === 'ArrowLeft' && direction !== 'right') {
                direction = 'left';
            } else if (event.key === 'ArrowUp' && direction !== 'down') {
                direction = 'up';
            } else if (event.key === 'ArrowDown' && direction !== 'up') {
                direction = 'down';
            }
        }
    }

    // Initialize the game
    placeFood();
    setInterval(() => {
        if (!gamePaused) {
            moveSnake();
            checkCollision();
        }
    }, MOVE_INTERVAL);

    // Listen for arrow key presses
    document.addEventListener('keydown', handleKeyPress);
});
