<script setup>
import {ref, watch} from "vue";
import {RouterLink} from "vue-router";

const keywords = ref(() => [""])
const emit = defineEmits(['update:keywords'])

watch(keywords, (newVal) => {
  emit('update:keywords', newVal)
})
</script>

<template>
  <div class="middleView">
    <h1>El Juego</h1>
    <p>No tienes edad ni dinero para jugar.<RouterLink to="/">Ir a casa.</RouterLink></p>
  </div>
</template>

<style scoped>

main {
  position: relative;
  margin: 50px auto 50px auto;
  background-color: #444;
  z-index: 1;
  width: 100%;
  align-self: center;
  justify-self: center;
  align-content: center;
  justify-content: space-around;
}

h1 {
  position: relative;
  margin: 1em;
  text-align: center;
  width: 100%;
  color: lightgray;
}

p {
  position: relative;
  margin: 0em;
  text-align: center;
  color: lightgray;
}

.middleView {
  position: relative;
  margin: auto;
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  justify-self: center;
}

</style>