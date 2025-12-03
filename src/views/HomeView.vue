<script setup>
import Gameinfo from "@/components/Gameinfo.vue";
import { computed, ref, watch, onMounted } from "vue";
import { fetchGames } from "@/api/games"; 

const games = ref([])

const filtro = ref("")
const orden = ref("asc")

const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    games.value = await fetchGames()
  } catch (err) {
    console.error("Error al cargar juegos:", err)
    error.value = "No se pudieron cargar los juegos."
  } finally {
    loading.value = false
  }
})

const juegosFiltrados = computed(() => {
  let texto = filtro.value.trim().toLowerCase()

  let lista = games.value.filter(g =>
    g.name.toLowerCase().includes(texto) ||
    g.desc.toLowerCase().includes(texto)
  )

  lista.sort((a, b) =>
    orden.value === "asc" ? a.year - b.year : b.year - a.year
  )

  return lista
})

const keywords = computed(() => {
  const juegos = juegosFiltrados.value
  if (juegos.length === 0) return []

  const descripciones = juegos.map(j =>
    j.desc
      .toLowerCase()
      .replace(/[.,;:()¿?¡!]/g, "")
      .split(" ")
  )
  const stopwords = ["de", "en", "y", "a", "la", "el", "los", "las", "para", "con", "un", "una", "del", "por"]

  return descripciones.reduce((comunes, palabras) =>
    comunes.filter(
      p => palabras.includes(p) && !stopwords.includes(p)
    )
  )
})

const emit = defineEmits(['update:keywords'])
watch(keywords, (newVal) => {
  emit('update:keywords', newVal)
})
</script>


<template>
  <div class="middleView">
    <h1>Lista de juegos</h1>
    <div class="controls">
      <input
          type="text"
          v-model="filtro"
          placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="orden">
        <option value="asc">Ordenar por año ↑</option>
        <option value="desc">Ordenar por año ↓</option>
      </select>
    </div>

    <div class="grid">
      <Gameinfo v-for="game in juegosFiltrados" :name="game.name" :year="game.year"
                :desc="game.desc" :img="game.img" :url="game.url" :play="game.play"/>
    </div>
  </div>

</template>

<style scoped>

h1 {
  justify-self: start;
  text-align: center;
  margin: 0em auto 0em auto;
  color: lightgray;
}

.grid {
  display: grid;
  margin: auto;
  position: relative;
  width: 80%;
  align-self: center;
  justify-self: center;
  align-content: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(3, auto);
  gap: 2rem;
}

.middleView {
  position: relative;
  margin: auto;
  padding-bottom: 2em;
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  justify-items: start;
  justify-self: start;
}

.controls {
  position: relative;
  margin: 2em auto 2em auto;
  display: flex;
  justify-self: start;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 1rem;
}

input {
  width: 20em;
  height: 3em;
  border-radius: 0.5em;
  border: 1px solid var(--color-border);
  padding: 0.5em;
  font-size: 1em;
}

select {
  width: 15em;
  height: 3em;
  border-radius: 0.5em;
  border: 1px solid var(--color-border);
  padding: 0.5em;
  font-size: 1em;
}
</style>