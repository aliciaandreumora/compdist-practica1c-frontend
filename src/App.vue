<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

import { useAuthStore } from "@/stores/store.js"
import {logout, getCurrentUser} from "@/api/auth.js";
import {router} from "@/router.js";

const auth = useAuthStore()
const keywords = ref([])
const message = ref('')

const route = useRoute()

async function logoutUser() {
  await logout()
  await router.push('/login')
}

</script>

<template>

  <div v-if="auth.loading" class="loading">Loading...</div>

  <div v-else>
    <header v-if="!['login', 'register'].includes(route.name)">
      <h1>Portal de Juegos</h1>
      <nav>
        <RouterLink to="/">Ir a casa</RouterLink>
        <RouterLink to="/GameEdit">Editar los juegos</RouterLink>
        <p>Usuario actual: {{ auth.user }}</p>
        <button @click="logoutUser">Logout</button>
        <div v-if="message">
          <p>{{ message }}</p>
        </div>
      </nav>
    </header>

    <main>
      <RouterView @update:keywords="keywords = $event"/>
    </main>

    <footer v-if="!['login', 'register'].includes(route.name)">
      <div class="footer-content">
        <p>Palabras comunes:</p>
        <div v-if="keywords.length === 0">No hay palabras comunes</div>
        <ul v-else>
          <li v-for="(palabra, i) in keywords" :key="i">{{ palabra }}</li>
        </ul>
      </div>
      <small>© Alicia y Markku — 2025</small>
    </footer>
  </div>


</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #333;
  z-index: 10;
  align-self: center;
  justify-self: center;
  align-content: center;
  justify-content: space-around;
}

footer {
  position: fixed;
  margin: auto;
  height: 50px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  z-index: 10;
}

main {
  margin: 50px auto 50px auto;
  background-color: #444;
  z-index: 1;
  width: 100%;
  align-self: center;
  justify-self: center;
  align-content: center;
}

nav {
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
}

h1 {
  margin: auto;
  text-align: center;
  color: lightgray;
}

p {
  margin: auto 1em auto 1em;
  text-align: center;
  color: lightgray;
}

small {
  align-self: center;
  justify-self: center;
  text-align: center;
  margin: auto;
  color: lightgray;
}

ul {
  flex-direction: row;
  list-style-type: none;
  padding: 0;
  color: lightgray;
}

ul > li {
  display: inline-block;
  margin-right: 10px;
}

.footer-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  color: lightgray;
}
</style>



