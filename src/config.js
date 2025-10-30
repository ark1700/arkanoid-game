// Константы игры
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Настройки ракетки
export const PADDLE_CONFIG = {
  width: 100,
  height: 15,
  color: "#00ff88",
};

// Настройки мяча
export const BALL_CONFIG = {
  radius: 8,
  speed: 4,
  color: "#fff",
};

// Настройки кирпичей
export const BRICK_CONFIG = {
  rowCount: 5,
  columnCount: 8,
  width: 85,
  height: 25,
  padding: 10,
  offsetTop: 50,
  offsetLeft: 35,
  colors: ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#ff9ff3"],
};

// Начальное количество жизней
export const INITIAL_LIVES = 3;

// Очки за кирпич
export const BRICK_SCORE = 10;
