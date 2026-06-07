export class EventEmitter {
  #events = new Map();

  on(eventName, listener) {
    const listeners = this.#events.get(eventName) ?? new Set();
    listeners.add(listener);
    this.#events.set(eventName, listeners);
    return () => this.off(eventName, listener);
  }

  off(eventName, listener) {
    this.#events.get(eventName)?.delete(listener);
  }

  emit(eventName, payload) {
    for (const listener of this.#events.get(eventName) ?? []) {
      listener(payload);
    }
  }
}
