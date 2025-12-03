<script setup>
import {ref} from "vue";
import { register } from '@/api/auth.js';
import {router} from "@/router.js";
import {RouterLink} from "vue-router";
import useAuthStore from "@/stores/store.js";

const username = ref('')
const password = ref('')
const message = ref('')

async function onRegister() {
  try {
    const data = await register(username.value, password.value)
    message.value = data.msg || 'Registered!'
    await router.push('/')
  } catch (err) {
    message.value = err.response?.data?.msg || 'Registering failed'
  }
}

</script>

<template>

  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="onRegister">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>

    <div v-if="message">
      <p>{{ message }}</p>
    </div>

    <div>
      <p><span>Or </span>
        <RouterLink to="/login">Login user</RouterLink>
      </p>
    </div>
  </div>

</template>

<style scoped>

.register {
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