import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./config.js";

// Класс для отрисовки UI элементов
class UI {
  constructor() {
    this.canvas = { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
  }

  drawScore(ctx, score, lives) {
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#fff";

    // Счет слева
    ctx.textAlign = "left";
    ctx.fillText("Счет: " + score, 20, 30);

    // Жизни справа
    ctx.textAlign = "right";
    ctx.fillText("Жизни: " + lives, this.canvas.width - 20, 30);
  }

  drawStartScreen(ctx) {
    this._drawOverlay(ctx);

    ctx.font = "bold 70px Arial";
    ctx.fillStyle = "#48dbfb";
    ctx.textAlign = "center";
    ctx.fillText(
      "АРКАНОИД",
      this.canvas.width / 2,
      this.canvas.height / 2 - 80
    );

    ctx.font = "20px Arial";
    ctx.fillStyle = "#aaa";

    // Определяем, touch устройство или нет
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      ctx.fillText(
        "Управление: касание экрана",
        this.canvas.width / 2,
        this.canvas.height / 2 + 30
      );
    } else {
      ctx.fillText(
        "Управление: мышь",
        this.canvas.width / 2,
        this.canvas.height / 2 + 30
      );
      ctx.fillText(
        "Пауза: пробел",
        this.canvas.width / 2,
        this.canvas.height / 2 + 60
      );
    }

    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "#1dd1a1";
    ctx.fillText(
      isTouchDevice ? "КОСНИТЕСЬ ДЛЯ СТАРТА" : "НАЖМИТЕ ДЛЯ СТАРТА",
      this.canvas.width / 2,
      this.canvas.height / 2 + (isTouchDevice ? 90 : 120)
    );
  }

  drawPauseScreen(ctx) {
    this._drawOverlay(ctx, 0.5);

    ctx.font = "bold 60px Arial";
    ctx.fillStyle = "#feca57";
    ctx.textAlign = "center";
    ctx.fillText("ПАУЗА", this.canvas.width / 2, this.canvas.height / 2);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#aaa";
    ctx.fillText(
      "Нажмите пробел для продолжения",
      this.canvas.width / 2,
      this.canvas.height / 2 + 50
    );
  }

  drawGameOver(ctx, score) {
    this._drawOverlay(ctx);

    ctx.font = "bold 60px Arial";
    ctx.fillStyle = "#ff6b6b";
    ctx.textAlign = "center";
    ctx.fillText(
      "GAME OVER",
      this.canvas.width / 2,
      this.canvas.height / 2 - 40
    );

    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(
      "Ваш счет: " + score,
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );

    ctx.font = "20px Arial";
    ctx.fillStyle = "#aaa";
    ctx.fillText(
      "Нажмите для новой игры",
      this.canvas.width / 2,
      this.canvas.height / 2 + 70
    );
  }

  drawWin(ctx, score) {
    this._drawOverlay(ctx);

    ctx.font = "bold 60px Arial";
    ctx.fillStyle = "#1dd1a1";
    ctx.textAlign = "center";
    ctx.fillText("ПОБЕДА!", this.canvas.width / 2, this.canvas.height / 2 - 40);

    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(
      "Ваш счет: " + score,
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );

    ctx.font = "20px Arial";
    ctx.fillStyle = "#aaa";
    ctx.fillText(
      "Нажмите для новой игры",
      this.canvas.width / 2,
      this.canvas.height / 2 + 70
    );
  }

  _drawOverlay(ctx, alpha = 0.7) {
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default UI;
