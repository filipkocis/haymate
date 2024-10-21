export default class Store<K, V> {
  #data: Map<K, V> = new Map<K, V>();

  constructor() {}

  get(key: K): V | undefined {
    return this.#data.get(key);
  }

  set(key: K, value: V) {
    this.#data.set(key, value);
  }

  delete(key: K) {
    this.#data.delete(key);
  }

  clear() {
    this.#data.clear();
  }

  keys(): MapIterator<K> {
    return this.#data.keys();
  }

  values(): MapIterator<V> {
    return this.#data.values();
  }

  entries(): MapIterator<[K, V]> {
    return this.#data.entries();
  }
}
