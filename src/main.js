import Game from "./game.js";

// Точка входа в приложение
const canvas = document.getElementById("gameCanvas");
const game = new Game(canvas);
game.start();
