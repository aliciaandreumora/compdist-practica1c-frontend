import axios from "axios"
import { useAuthStore } from "@/stores/store.js";

const api = axios.create({
  baseURL: "https://compdist-practica1c-backend-1.onrender.com",
  withCredentials: true, // allow sending/receiving cookies
})

export async function login(username, password) {
  console.log("Login", username, password);
  const res = await api.post("/login", { username, password })
  useAuthStore().login_user(username)
  return res.data
}

export async function logout() {
  const res = await api.post("/logout")
  useAuthStore().logout_user()
  return res.data
}

export async function register(username, password) {
  const res = await api.post("/register", { username, password })
  useAuthStore().login_user(username)
  return res.data
}

export async function getCurrentUser() {
  try {
    const res = await api.get("/me")
    return res.data.user
  } catch {
    return null
  }
}

export default api
