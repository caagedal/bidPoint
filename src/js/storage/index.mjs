/**
 * Saves a value to localStorage under the specified key.
 *
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to store (will be JSON-stringified).
 */
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
   * Loads and parses a value from localStorage by key.
   *
   * @param {string} key - The key to retrieve the value from.
   * @returns {any|null} The parsed value, or null if parsing fails or value doesn't exist.
   */
  export function load(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Removes a value from localStorage by key.
   *
   * @param {string} key - The key of the item to remove.
   */
  export function remove(key) {
    localStorage.removeItem(key);
  }
  