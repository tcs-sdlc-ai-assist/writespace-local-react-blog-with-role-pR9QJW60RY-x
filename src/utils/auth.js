import {
  setItem,
  getItem,
  removeItem
} from './storage'

const USER_KEY = 'writespace_user'
const TOKEN_KEY = 'writespace_token'

/**
 * Simulate login by saving user and token to storage.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} user object if successful
 */
export async function login(email, password) {
  try {
    // Simulate API call
    // In real app, replace with actual API request
    if (!email || !password) {
      throw new Error('Email and password required')
    }
    // Fake user data
    const user = {
      id: '1',
      email,
      name: 'Demo User',
      role: email === 'admin@writespace.com' ? 'admin' : 'user'
    }
    const token = 'demo-token-' + Date.now()
    setItem(USER_KEY, user)
    setItem(TOKEN_KEY, token)
    return user
  } catch (error) {
    throw new Error(error.message || 'Login failed')
  }
}

/**
 * Simulate registration by saving user and token to storage.
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @returns {Promise<object>} user object if successful
 */
export async function register(email, password, name) {
  try {
    if (!email || !password || !name) {
      throw new Error('All fields required')
    }
    // Fake user data
    const user = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user'
    }
    const token = 'demo-token-' + Date.now()
    setItem(USER_KEY, user)
    setItem(TOKEN_KEY, token)
    return user
  } catch (error) {
    throw new Error(error.message || 'Registration failed')
  }
}

/**
 * Logout user by removing user and token from storage.
 */
export function logout() {
  removeItem(USER_KEY)
  removeItem(TOKEN_KEY)
}

/**
 * Get the current user from storage.
 * @returns {object|null}
 */
export function getCurrentUser() {
  return getItem(USER_KEY)
}

/**
 * Check if the current user is authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getItem(TOKEN_KEY)
}

/**
 * Check if the current user is an admin.
 * @returns {boolean}
 */
export function isAdmin() {
  const user = getItem(USER_KEY)
  return user && user.role === 'admin'
}