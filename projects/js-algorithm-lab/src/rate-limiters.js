export function debounce(callback, delayMs = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delayMs);
  };
}

export function throttle(callback, delayMs = 250) {
  let waiting = false;
  return (...args) => {
    if (waiting) return;
    waiting = true;
    callback(...args);
    setTimeout(() => {
      waiting = false;
    }, delayMs);
  };
}
