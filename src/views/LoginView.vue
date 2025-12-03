<script setup>
import {ref} from "vue";
import { login } from '@/api/auth.js';
import {router} from "@/router.js";
import {RouterLink} from "vue-router";

const username = ref('')
const password = ref('')
const message = ref('')

async function onLogin() {
  try {
    const data = await login(username.value, password.value)
    await router.push('/')
    message.value = data.msg || 'Logged in!'
  } catch (err) {
    message.value = err.response?.data?.msg || 'Login failed'
  }
}

</script>

<template>

  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="onLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>

    <div>
      <p><span>Or </span>
        <RouterLink to="/register">Register a new user</RouterLink>
      </p>
    </div>
  </div>

</template>

<style scoped>

.login {
  position: relative;
  margin: auto;
  padding-bottom: 2em;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  justify-self: start;
}

</style>