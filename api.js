const API_URL = 'http://localhost:3000'

async function handleResponse(res) {
  if (!res.ok) throw new Error(await res.text() || 'API Request Failed')
  return res.json()
}

export async function fetchMovies() {
  const res = await fetch(`${API_URL}/movies`)
  return handleResponse(res)
}

export async function fetchMovieById(id) {
  const res = await fetch(`${API_URL}/movies/${id}`)
  return handleResponse(res)
}

export async function fetchCinemas() {
  const res = await fetch(`${API_URL}/cinemas`)
  return handleResponse(res)
}

export async function fetchFoods() {
  const res = await fetch(`${API_URL}/foods`)
  return handleResponse(res)
}

export async function fetchBookingsByUserId(userId) {
  const res = await fetch(`${API_URL}/bookings?userId=${userId}`)
  return handleResponse(res)
}

export async function saveBooking(bookingData) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  })
  return handleResponse(res)
}
