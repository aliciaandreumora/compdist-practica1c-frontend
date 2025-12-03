import { defineStore } from "pinia"
import { getCurrentUser } from "@/api/auth"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
    }),
    actions: {
        async checkAuth() {
            this.user = await getCurrentUser()
        },
        login_user(username) {
            this.user = username
        },
        logout_user() {
            this.user = null
        }
    },
})

export default useAuthStore