// Звуковые эффекты (используем Web Audio API для генерации звуков)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Функция создания звука удара
function playHitSound(frequency = 400, duration = 0.1) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "square";

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// Экспортируемые звуковые эффекты
export const sounds = {
  brick: () => playHitSound(800, 0.15),
  paddle: () => playHitSound(300, 0.1),
  wall: () => playHitSound(500, 0.08),
  loseLife: () => playHitSound(150, 0.3),
};
