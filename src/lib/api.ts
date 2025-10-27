import axios from 'axios'

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

const api = axios.create({
  baseURL: BACKEND_API_URL
})

const errorHandler = (error: any) => {
  return Promise.reject(error)
}

api.interceptors.request.use((config: any) => {
  return { ...config }
}, errorHandler)

api.interceptors.response.use(async response => {
  // if (import.meta.env.NODE_ENV !== 'production') {
  //   await new Promise((res) => setTimeout(res, 300))
  // }
  return response
}, errorHandler)

export default api
