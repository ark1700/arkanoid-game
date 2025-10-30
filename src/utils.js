// Утилиты для работы с touch устройствами

/**
 * Определяет, является ли устройство touch-устройством
 */
export function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Получает координаты из события (мышь или touch)
 * @param {Event} event - событие мыши или touch
 * @param {HTMLElement} element - элемент для расчета относительных координат
 * @returns {{x: number, y: number}} координаты
 */
export function getEventCoordinates(event, element) {
  const rect = element.getBoundingClientRect();

  // Если это touch событие
  if (event.touches && event.touches.length > 0) {
    const touch = event.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }

  // Если это событие мыши
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

/**
 * Предотвращает стандартное поведение touch событий
 * @param {HTMLElement} element - элемент для блокировки
 */
export function preventTouchDefaults(element) {
  // Предотвращаем зум при двойном тапе
  element.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // Предотвращаем контекстное меню на долгом нажатии
  element.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Предотвращаем выделение текста
  element.style.userSelect = "none";
  element.style.webkitUserSelect = "none";
  element.style.mozUserSelect = "none";
  element.style.msUserSelect = "none";
}

/**
 * Информация о типе устройства
 */
export const deviceInfo = {
  isMobile:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
  isTablet:
    /iPad|Android/i.test(navigator.userAgent) &&
    !/Mobile/i.test(navigator.userAgent),
  isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
  isAndroid: /Android/i.test(navigator.userAgent),
  supportsTouch: isTouchDevice(),
};
