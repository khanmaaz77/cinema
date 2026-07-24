const API_URL = 'http://localhost:3000'
const USER_KEY = 'cinemax_user'

export async function registerUser(userData) {
  const checkRes = await fetch(`${API_URL}/users?email=${userData.email}`)
  const existing = await checkRes.json()
  if (existing.length > 0) throw new Error('Email is already registered.')

  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  const user = await res.json()
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`)
  const users = await res.json()
  if (users.length === 0) throw new Error('Invalid email or password.')

  const user = users[0]
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function logoutUser() {
  localStorage.removeItem(USER_KEY)
}
