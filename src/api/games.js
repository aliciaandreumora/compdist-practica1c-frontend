import api from "./auth.js"

export async function fetchGames() {
    const res = await api.get("/api/juegos")
    return res.data   // expect array
}

export async function fetchGame(id) {
    const res = await api.get(`/api/juegos/${id}`)
    return res.data
}

export async function createGame(game) {
    const res = await api.post("/api/juegos", game)
    return res.data
}

export async function updateGame(id, game) {
    const res = await api.put(`/api/juegos/${id}`, game)
    return res.data
}

export async function deleteGame(id) {
    const res = await api.delete(`/api/juegos/${id}`)
    return res.data
}
