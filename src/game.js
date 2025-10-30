import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  INITIAL_LIVES,
  BRICK_SCORE,
} from "./config.js";
import Ball from "./ball.js";
import Paddle from "./paddle.js";
import BrickManager from "./bricks.js";
import ParticleSystem from "./particles.js";
import UI from "./ui.js";
import { sounds } from "./audio.js";
import { preventTouchDefaults } from "./utils.js";

// Основной класс игры
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // Игровые объекты
    this.ball = new Ball();
    this.paddle = new Paddle();
    this.brickManager = new BrickManager();
    this.particles = new ParticleSystem();
    this.ui = new UI();

    // Игровое состояние
    this.score = 0;
    this.lives = INITIAL_LIVES;
    this.state = "start"; // 'start', 'playing', 'paused', 'gameover', 'won'

    // Контроль FPS
    this.fps = 60;
    this.frameInterval = 1000 / this.fps; // ~16.67ms для 60 FPS
    this.lastFrameTime = 0;

    // Настройка touch устройства
    preventTouchDefaults(this.canvas);

    // Привязка обработчиков событий
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Управление мышью
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.paddle.update(mouseX);
    });

    // Touch события для мобильных устройств
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault(); // Предотвращаем скролл страницы
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchX = touch.clientX - rect.left;
      this.paddle.update(touchX);
    });

    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchX = touch.clientX - rect.left;
      this.paddle.update(touchX);
    });

    // Клик для старта/рестарта
    this.canvas.addEventListener("click", () => {
      if (this.state === "start") {
        this.state = "playing";
      } else if (this.state === "gameover" || this.state === "won") {
        this.restart();
      }
    });

    // Touch для старта/рестарта на мобильных
    this.canvas.addEventListener("touchend", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      if (this.state === "start") {
        this.state = "playing";
      } else if (this.state === "gameover" || this.state === "won") {
        this.restart();
      }
    });

    // Пауза на пробел
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (this.state === "playing") {
          this.state = "paused";
        } else if (this.state === "paused") {
          this.state = "playing";
        }
      }
    });
  }

  update() {
    if (this.state !== "playing") {
      return;
    }

    // Обновляем мяч
    this.ball.update();

    // Проверяем столкновения со стенами
    if (this.ball.isHittingWall()) {
      this.ball.bounceX();
      sounds.wall();
    }

    if (this.ball.isHittingCeiling()) {
      this.ball.bounceY();
      sounds.wall();
    }

    // Проверяем падение мяча
    if (this.ball.isOutOfBounds()) {
      this.lives--;
      sounds.loseLife();

      if (this.lives <= 0) {
        this.state = "gameover";
      } else {
        this.ball.reset();
      }
    }

    // Проверяем столкновение с ракеткой
    this.checkPaddleCollision();

    // Проверяем столкновения с кирпичами
    this.checkBrickCollisions();

    // Проверяем победу
    if (this.brickManager.allDestroyed()) {
      this.state = "won";
    }
  }

  checkPaddleCollision() {
    if (
      this.ball.y + this.ball.radius >= this.paddle.y &&
      this.ball.y - this.ball.radius <= this.paddle.y + this.paddle.height &&
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width
    ) {
      this.ball.bounceY();
      sounds.paddle();

      // Изменяем угол отскока в зависимости от места попадания
      const hitPosition = (this.ball.x - this.paddle.x) / this.paddle.width;
      this.ball.adjustAngle(hitPosition);
    }
  }

  checkBrickCollisions() {
    const collisions = this.brickManager.checkCollision(this.ball);

    if (collisions.length > 0) {
      this.ball.bounceY();

      collisions.forEach((collision) => {
        this.score += BRICK_SCORE;
        sounds.brick();
        this.particles.create(collision.x, collision.y, collision.color);
      });
    }
  }

  draw() {
    // Очищаем canvas
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Рисуем игровые объекты
    this.brickManager.draw(this.ctx);
    this.particles.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.paddle.draw(this.ctx);
    this.ui.drawScore(this.ctx, this.score, this.lives);

    // Рисуем экраны состояний
    if (this.state === "start") {
      this.ui.drawStartScreen(this.ctx);
    } else if (this.state === "paused") {
      this.ui.drawPauseScreen(this.ctx);
    } else if (this.state === "gameover") {
      this.ui.drawGameOver(this.ctx, this.score);
    } else if (this.state === "won") {
      this.ui.drawWin(this.ctx, this.score);
    }
  }

  gameLoop(currentTime = 0) {
    requestAnimationFrame((time) => this.gameLoop(time));

    // Вычисляем время, прошедшее с последнего кадра
    const deltaTime = currentTime - this.lastFrameTime;

    // Пропускаем кадр, если прошло недостаточно времени
    if (deltaTime < this.frameInterval) {
      return;
    }

    // Сохраняем время последнего отрисованного кадра
    // Корректируем остаток времени для точности
    this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);

    // Обновляем и рисуем игру
    this.update();
    this.particles.update();
    this.draw();
  }

  restart() {
    this.score = 0;
    this.lives = INITIAL_LIVES;
    this.state = "playing";
    this.ball.reset();
    this.brickManager.reset();
  }

  start() {
    this.gameLoop();
  }
}

export default Game;
