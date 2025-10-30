import { CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_CONFIG } from "./config.js";

// Класс ракетки
class Paddle {
  constructor() {
    this.width = PADDLE_CONFIG.width;
    this.height = PADDLE_CONFIG.height;
    this.x = CANVAS_WIDTH / 2 - this.width / 2;
    this.y = CANVAS_HEIGHT - 30;
    this.color = PADDLE_CONFIG.color;
  }

  update(mouseX) {
    // Центрируем ракетку на курсоре
    this.x = mouseX - this.width / 2;

    // Ограничиваем ракетку в пределах canvas
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > CANVAS_WIDTH) {
      this.x = CANVAS_WIDTH - this.width;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, 5);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    // Блик для эффектности
    ctx.beginPath();
    ctx.roundRect(this.x + 5, this.y + 3, this.width - 10, 4, 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
