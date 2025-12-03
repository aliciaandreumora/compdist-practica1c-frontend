<script setup>
import TicTacToe from "@/components/TicTacToe.vue";
</script>

<template>
  <div class="board1">
    <h1>El Juego</h1>
    <TicTacToe class="tictactoe"/>
  </div>
</template>

<style scoped>

main {
  position: relative;
  margin: 50px auto 50px auto;
  z-index: 1;
  width: 100%;
  align-self: center;
  justify-self: center;
  align-content: center;
  justify-content: space-around;
  margin: auto;
}

.board1 {
  position: relative;
  margin: auto;
  width: 100%;
  min-height: 90vh;
  align-self: center;
  justify-self: center;
  align-content: center;
  justify-content: center;
}

h1 {
  text-align: center;
  margin: auto 1em auto 1em;
  color: lightgray;
}

p {
  text-align: center;
  margin: auto;
}

</style>