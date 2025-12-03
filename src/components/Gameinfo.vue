<script setup>
import {router} from "@/router.js";

const jugar = (play) => {
  console.log("Jugando " + play);
  router.push(play)
}

defineProps({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  play: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="card">
    <img :src="img" :alt="name" class="game-img" />

    <div class="info">
      <h3>{{ name }} ({{ year }})</h3>
      <p>{{ desc }}</p>
      <a :href="url" target="_blank">Ver en Wikipedia</a>
    </div>

    <div class="actions">
      <button @click="jugar(play)">Jugar ▶</button>
    </div>
  </div>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 1400px; /* límite para que no se vea demasiado estirado */
  margin: 2rem auto;
  padding: 0 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: #444444;
  transition: transform 0.2s ease;
  height: 100%; /* todas las tarjetas ocupan la misma altura */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.game-img {
  width: 180px;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 6px;
}

.info {
  flex: 1;
  margin-bottom: 1rem;
  background-color: #444444;
}

.actions {
  margin-top: auto;
  background-color: #444444;
}

h3 {
  justify-self: start;
  text-align: center;
  margin: 0em auto 0em auto;
  color: lightgray;
}

p {
  justify-self: start;
  text-align: center;
  margin: 0em auto 0em auto;
  color: lightgray;
}
</style>