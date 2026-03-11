import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
})

// --- Listings API ---

export const getListings = (params) => api.get('/listings', { params })

export const getListingById = (id) => api.get(`/listings/${id}`)

export const createListing = (data) => api.post('/listings', data)

export const updateListing = (id, data) => api.put(`/listings/${id}`, data)

export const deleteListing = (id) => api.delete(`/listings/${id}`)

export const toggleLikeListing = (id) => api.put(`/listings/${id}/like`)

export const toggleSaveListing = (id) => api.put(`/listings/${id}/save`)

export const getSavedListings = (params) => api.get('/listings/saved', { params })

export const getLikedListings = (params) => api.get('/listings/liked', { params })

export const getListingLikes = (id) => api.get(`/listings/${id}/likes`)

// --- Auth API ---

export const loginUser = (credentials) => api.post('/auth/login', credentials)

export const registerUser = (userData) => api.post('/auth/register', userData)

export const logoutUser = () => api.post('/auth/logout')

export const getMe = () => api.get('/auth/me')

export default api