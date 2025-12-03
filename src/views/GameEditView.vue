<script setup>

import { ref, onMounted } from "vue"
import {fetchGames, createGame, updateGame, deleteGame, } from "@/api/games"

const games = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref("")
const success = ref("")

// form state
const currentId = ref(null) // null → create, id → update
const form = ref({
  name: "",
  year: "",
  desc: "",
  img: "",
  url: "",
  play: "",
})

function resetForm() {
  currentId.value = null
  form.value = {
    name: "",
    year: "",
    desc: "",
    img: "",
    url: "",
    play: "",
  }
  error.value = ""
  success.value = ""
}

async function loadGames() {
  loading.value = true
  error.value = ""
  try {
    games.value = await fetchGames()
  } catch (err) {
    error.value = err.response?.data?.msg || "Failed to load games"
  } finally {
    loading.value = false
  }
}

function editGame(game) {
  currentId.value = game.id
  form.value = {
    name: game.name ?? "",
    year: game.year ?? "",
    desc: game.desc ?? "",
    img: game.img ?? "",
    url: game.url ?? "",
    play: game.play ?? "",
  }
  success.value = ""
  error.value = ""
}

async function submitForm() {
  saving.value = true
  error.value = ""
  success.value = ""
  const payload = { ...form.value }

  try {
    if (currentId.value) {
      // update
      await updateGame(currentId.value, payload)
      success.value = "Game updated"
    } else {
      // create
      await createGame(payload)
      success.value = "Game created"
    }
    await loadGames()
    // optional: reset form after create
    // resetForm()
  } catch (err) {
    error.value =
        err.response?.data?.msg || "Could not save game. Check your data."
  } finally {
    saving.value = false
  }
}

async function removeGame(id) {
  if (!confirm("Delete this game?")) return
  try {
    await deleteGame(id)
    await loadGames()
  } catch (err) {
    error.value = err.response?.data?.msg || "Could not delete game."
  }
}

onMounted(() => {
  loadGames()
})

</script>

<template>

  <div class="middleView">
    <h1>Games</h1>
    <div class="gameEdit">

      <!-- games list -->
      <div class="gameList">
        <div>
          <h2>Game list</h2>
          <button @click="resetForm">
            + New game
          </button>
        </div>

        <div v-if="loading">Loading games…</div>
        <div v-else-if="games.length === 0">No games yet.</div>
        <ul v-else class="list">
          <li
              v-for="game in games"
              :key="game.id"
          >
            <div class="list-item">
              <p class="text">{{ game.name }} ({{ game.year }})</p>
              <button class="button" @click="editGame(game)">
                Edit
              </button>
              <button class="button" @click="removeGame(game.id)">
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- form -->
      <div class="gameForm">
        <h2>{{ currentId ? "Edit game" : "Create game" }}</h2>

        <form @submit.prevent="submitForm">
          <div>
            <label>Name</label>
            <input
                v-model="form.name"
                type="text"
                required
            />
          </div>

          <div>
            <label>Year</label>
            <input
                v-model.number="form.year"
                type="number"
                min="1900"
                max="2100"
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
                v-model="form.desc"
                rows="3"
            ></textarea>
          </div>

          <div>
            <label>Image</label>
            <input
                v-model="form.img"
                type="text"
                placeholder="image"
            />
          </div>

          <div>
            <label>URL</label>
            <input
                v-model="form.url"
                type="url"
                placeholder="https://..."
            />
          </div>

          <div>
            <label for="play">Play</label>
            <input
                v-model="form.play"
                type="text"
                placeholder="/NoGame"
            />
          </div>

          <div class="flex gap-1">
            <button
                type="submit"
                :disabled="saving"
            >
              {{ saving ? "Saving..." : currentId ? "Update" : "Create" }}
            </button>

            <button
                type="button"
                @click="resetForm"
            >
              Clear
            </button>
          </div>

          <p v-if="error">{{ error }}</p>
          <p v-if="success">{{ success }}</p>
        </form>
      </div>
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

.gameEdit {
  position: relative;
  margin: auto;
  padding-bottom: 2em;
  width: 50vw;
  display: flex;
  flex-direction: row;
}

.gameForm {
  position: relative;
  margin: auto;
  padding-bottom: 2em;
  width: 10em;
  display: flex;
  flex-direction: column;
}

.gameList {
  position: relative;
  margin: auto;
  padding-bottom: 2em;
  width: 10em;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: start;
  justify-items: start;
  justify-self: start;
}

.list-item {
  position: relative;
  margin: auto;
  display: flex;
  width: 400px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: start;
  justify-items: start;
}

.list {
  position: relative;
  list-style: none;
  padding: 1em;
  width: 6em;
}

.button {
  position: relative;
  justify-self: flex-end;
}

.text {
  justify-self: flex-start;
  margin-right: 2em;
}

</style>
