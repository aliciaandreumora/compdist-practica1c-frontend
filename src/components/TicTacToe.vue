<script setup>
import { ref, computed } from 'vue'

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

const board = ref(Array(9).fill(null))
const currentPlayer = ref('X')
const winner = ref(null)
const winningCells = ref([])
const history = ref([])
const score = ref({ X: 0, O: 0, draws: 0 })

const isDraw = computed(() => !winner.value && board.value.every(c => c))

function ariaLabel(idx){
  const r = Math.floor(idx/3)+1, c = (idx%3)+1
  const cell = board.value[idx]
  return `Row ${r}, Column ${c}${cell ? `, ${cell}` : ''}`
}

function checkWinner(){
  for(const [a,b,c] of winningLines){
    const vA = board.value[a]
    if(vA && vA === board.value[b] && vA === board.value[c]){
      winner.value = vA
      winningCells.value = [a,b,c]
      score.value[vA]++
      return vA
    }
  }
  if(board.value.every(Boolean)){
    score.value.draws++
  }
  return null
}

function onCellClick(idx){
  if(board.value[idx] || winner.value) return
  board.value[idx] = currentPlayer.value
  history.value.push({ index: idx, player: currentPlayer.value })
  if(!checkWinner()){
    if(board.value.every(Boolean) && !winner.value){
    }
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

function reset(){
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  winner.value = null
  winningCells.value = []
  history.value = []
}

function undo(){
  if(history.value.length === 0 || winner.value) return
  const last = history.value.pop()
  board.value[last.index] = null
  currentPlayer.value = last.player
  winningCells.value = []
}
</script>

<template>
  <div class="middleView">
    <div class="wrap" role="application" aria-label="Tic Tac Toe">
      <header>
        <h2>Tres en Raya</h2>
        <div class="turn" aria-live="polite">
          <span v-if="!winner && !isDraw">Torno: <strong>{{ currentPlayer }}</strong></span>
          <span v-else-if="winner">Ganador: <strong>{{ winner }}</strong></span>
          <span v-else>Terminó en empate</span>
        </div>
      </header>

      <div class="grid" role="grid">
        <button
            v-for="(cell, idx) in board"
            :key="idx"
            class="cell"
            :class="{ win: winningCells.includes(idx) }"
            role="gridcell"
            :aria-label="ariaLabel(idx)"
            :disabled="!!cell || !!winner"
            @click="onCellClick(idx)"
            @keydown.enter.prevent="onCellClick(idx)"
            @keydown.space.prevent="onCellClick(idx)"
        >
          {{ cell || '' }}
        </button>
      </div>

      <footer>
        <div class="score">
          <span class="tag">Ganancias de X: {{ score.X }}</span>
          <span class="tag">Ganancias de O: {{ score.O }}</span>
          <span class="tag">Empates: {{ score.draws }}</span>
        </div>
        <div class="buttons">
          <button class="btn secondary" @click=undo :disabled="history.length===0">Deshacer</button>
          <button class="btn" @click=reset>Restablecer</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
:host {
  --board-bg: antiquewhite;
  --cell-bg: grey;
  --line: darkgreen;
  --text: black;
  --accent: white;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  display: block;
}

.middleView {
  position: relative;
  margin: auto 1em auto 1em;
  width: 100vw;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  justify-self: center;
}

.wrap {
  max-width: 600px;
  margin: 1em;
  background: antiquewhite;
  padding: 18px;
  border-radius: 20px;
  box-shadow: var(--shadow);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

h1 {
  margin: 0em;
  text-align: center;
}

h2 {
  font-size: 18px;
  margin: 0;
  color: black;
  font-weight: 700;
  opacity: 0.8;
}

.turn {
  font-size: 14px;
  color: black;
  font-weight: 800;
  opacity: 0.8;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.cell {
  aspect-ratio: 1 / 1;
  background: darkgreen;
  border: 1px solid antiquewhite;
  border-radius: 16px;
  min-width: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  font-weight: 800;
  font-size: 60px;
  color: black;

  transition: transform 0.06s ease, box-shadow 0.12s ease;
}

.cell:focus-visible {
  outline: 3px solid darkgreen;
}

.cell:hover {
  transform: translateY(-1px);
}

.cell[disabled] {
  cursor: not-allowed;
  opacity: 0.8;
}

.cell.win {
  background: darkgreen;
  border-color: antiquewhite;
}

footer {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.btn {
  border: none;
  background: darkgreen;
  color: antiquewhite;

  padding: 10px 14px;
  border-radius: 14px;

  cursor: pointer;
  font-weight: 700;
}

.btn.secondary {
  background: darkgreen;
  color: antiquewhite;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  white-space: nowrap;
  border: 0;
}

.score {
  display: flex;
  flex-direction: column;
  gap: 0px;
  font-size: 14px;
  font-weight: 800;
  color: black;
  opacity: 0.8;
}

.buttons {
  display:flex;
  flex-direction: column;
  gap:2px;
}

.tag {
  padding: 4px 8px;
  border-radius: 999px;
  background: antiquewhite;
}
</style>

