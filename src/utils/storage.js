/**
 * Utility functions for localStorage access for users, posts, and session.
 * All operations are wrapped in try/catch for safety.
 */

/**
 * @returns {Array} users array from localStorage, or [] if not found/error
 */
export function getUsers() {
  try {
    const data = localStorage.getItem('users');
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

/**
 * @param {Array} users - array of user objects to save
 */
export function saveUsers(users) {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (e) {
    // fail silently
  }
}

/**
 * @returns {Array} posts array from localStorage, or [] if not found/error
 */
export function getPosts() {
  try {
    const data = localStorage.getItem('posts');
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

/**
 * @param {Array} posts - array of post objects to save
 */
export function savePosts(posts) {
  try {
    localStorage.setItem('posts', JSON.stringify(posts));
  } catch (e) {
    // fail silently
  }
}

/**
 * @returns {Object|null} session object from localStorage, or null if not found/error
 */
export function getSession() {
  try {
    const data = localStorage.getItem('session');
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

/**
 * @param {Object} session - session object to save
 */
export function saveSession(session) {
  try {
    localStorage.setItem('session', JSON.stringify(session));
  } catch (e) {
    // fail silently
  }
}

/**
 * Removes session from localStorage
 */
export function clearSession() {
  try {
    localStorage.removeItem('session');
  } catch (e) {
    // fail silently
  }
}