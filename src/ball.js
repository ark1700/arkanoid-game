import { CANVAS_WIDTH, CANVAS_HEIGHT, BALL_CONFIG } from "./config.js";

// Класс мяча
class Ball {
  constructor() {
    this.radius = BALL_CONFIG.radius;
    this.color = BALL_CONFIG.color;
    this.reset();
  }

  reset() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.dx = BALL_CONFIG.speed * (Math.random() > 0.5 ? 1 : -1);
    this.dy = -BALL_CONFIG.speed;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  bounceX() {
    this.dx = -this.dx;
  }

  bounceY() {
    this.dy = -this.dy;
  }

  isOutOfBounds() {
    return this.y + this.radius > CANVAS_HEIGHT;
  }

  isHittingWall() {
    return this.x + this.radius > CANVAS_WIDTH || this.x - this.radius < 0;
  }

  isHittingCeiling() {
    return this.y - this.radius < 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  adjustAngle(hitPosition) {
    // hitPosition: 0..1 (позиция попадания на ракетке)
    const angle = (hitPosition - 0.5) * 2; // -1..1
    this.dx = angle * 5;

    // Гарантируем минимальную вертикальную скорость
    if (Math.abs(this.dy) < 2) {
      this.dy = this.dy > 0 ? 2 : -2;
    }
  }
}

export default Ball;
