import { BRICK_CONFIG } from "./config.js";

// Класс для управления кирпичами
class BrickManager {
  constructor() {
    this.bricks = [];
    this.config = BRICK_CONFIG;
    this.init();
  }

  // Инициализация сетки кирпичей
  init() {
    this.bricks = [];
    for (let col = 0; col < this.config.columnCount; col++) {
      this.bricks[col] = [];
      for (let row = 0; row < this.config.rowCount; row++) {
        this.bricks[col][row] = this.createBrick(col, row);
      }
    }
  }

  // Создание нового кирпича
  createBrick(col, row) {
    return {
      x: col * (this.config.width + this.config.padding) + this.config.offsetLeft,
      y: row * (this.config.height + this.config.padding) + this.config.offsetTop,
      color: this.getBrickColor(row),
      status: 1, // 1 = активен, 0 = разбит
    };
  }

  // Сброс всех кирпичей
  reset() {
    this.init();
  }

  // Отрисовка всех кирпичей
  draw(ctx) {
    for (let col = 0; col < this.config.columnCount; col++) {
      for (let row = 0; row < this.config.rowCount; row++) {
        const brick = this.bricks[col][row];
        if (brick.status === 1) {
          this.drawBrick(ctx, brick);
        }
      }
    }
  }

  // Получение цвета кирпича по ряду
  getBrickColor(row) {
    return this.config.colors[row % this.config.colors.length];
  }

  // Отрисовка одного кирпича с эффектами
  drawBrick(ctx, brick) {
    const { x, y, color } = brick;
    const { width, height } = this.config;

    // Основной кирпич
    this.drawRoundRect(ctx, x, y, width, height, 4, color);

    // Блик
    this.drawRoundRect(
      ctx,
      x + 5,
      y + 5,
      width - 10,
      6,
      2,
      "rgba(255, 255, 255, 0.3)"
    );
  }

  // Вспомогательный метод для рисования скругленного прямоугольника
  drawRoundRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  // Проверка столкновений мяча с кирпичами
  checkCollision(ball) {
    const collisions = [];

    for (let col = 0; col < this.config.columnCount; col++) {
      for (let row = 0; row < this.config.rowCount; row++) {
        const brick = this.bricks[col][row];

        if (brick.status === 1 && this.isBallCollidingWithBrick(ball, brick)) {
          brick.status = 0;
          collisions.push(this.createCollisionData(brick));
        }
      }
    }

    return collisions;
  }

  // Проверка столкновения мяча с конкретным кирпичом
  isBallCollidingWithBrick(ball, brick) {
    return (
      ball.x + ball.radius > brick.x &&
      ball.x - ball.radius < brick.x + this.config.width &&
      ball.y + ball.radius > brick.y &&
      ball.y - ball.radius < brick.y + this.config.height
    );
  }

  // Создание данных о столкновении для эффектов
  createCollisionData(brick) {
    return {
      x: brick.x + this.config.width / 2,
      y: brick.y + this.config.height / 2,
      color: brick.color,
    };
  }

  // Проверка, все ли кирпичи разбиты
  allDestroyed() {
    return this.bricks.every((col) => col.every((brick) => brick.status === 0));
  }
}

export default BrickManager;
