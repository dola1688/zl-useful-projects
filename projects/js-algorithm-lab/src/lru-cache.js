export class LruCache {
  #limit;
  #items = new Map();

  constructor(limit = 5) {
    this.#limit = Math.max(1, limit);
  }

  get(key) {
    if (!this.#items.has(key)) return undefined;
    const value = this.#items.get(key);
    this.#items.delete(key);
    this.#items.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.#items.has(key)) this.#items.delete(key);
    this.#items.set(key, value);
    if (this.#items.size > this.#limit) {
      const oldestKey = this.#items.keys().next().value;
      this.#items.delete(oldestKey);
    }
  }

  keys() {
    return [...this.#items.keys()];
  }
}
