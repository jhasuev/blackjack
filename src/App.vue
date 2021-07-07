<template>
  <div class="app">
    <div class="game">
      
      <Player class="player" />
      <Player class="player" />

    </div>

    <div class="sidebar">
      <Cards />

      <div class="actions">
        <div class="actions__item">
          <button class="btn" @click="turn">Hit</button>
        </div>
        <div class="actions__item">
          <button class="btn">Stand</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import Cards from "./components/Cards"
  import Player from "./components/Player"
  export default {
    name: 'App',
    components: {
      Cards,
      Player,
    },
    data(){
      return {
        enemy: [
          {
            card: "Pikes_7",
          }
        ],
      }
    },

    methods: {
      turn(){
        if (this.enemy[0].card == "Back") {
          this.enemy[0].card = "Pikes_7"
        } else {
          this.enemy[0].card = "Back"
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .app {
    min-height: 100vh;
    background: url("assets/img/bg.jpg");
    color: #fff;
    padding: 15px;

    display: flex;
  }

  .game {
    min-width: 555px;
    margin-right: 50px;
  }

  .actions {
    padding-top: 115px;

    &__item {
      & + & {
        margin-top: 10px;
      }
    }
  }

</style>
