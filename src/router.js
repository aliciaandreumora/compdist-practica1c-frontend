import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from "@/stores/store.js"

import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import HomeView from './views/HomeView.vue'
import GameEditView from './views/GameEditView.vue'
import NoGameView from './views/NoGameView.vue'
import TresEnRaya from './views/TresEnRaya.vue'

const routes = [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/', name: 'home', component: HomeView },
    { path: '/GameEdit', name: 'game_edit', component: GameEditView },
    { path: '/NoGame', name: 'no_game', component: NoGameView },
    { path: '/TresEnRaya', name: 'tres_en_raya', component: TresEnRaya },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    if (auth.loading) await auth.checkAuth()

    const isLoggedIn = !!auth.user

    if (!isLoggedIn && to.name !== "login" && to.name !== "register") {
        next({ name: "login" })
    } else if (isLoggedIn && to.name === "login") {
        next({ name: "home" })
    } else {
        next()
    }
})
