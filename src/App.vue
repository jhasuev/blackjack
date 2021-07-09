<template>
  <div class="app">
    <div class="game">
      
      <Player class="player" title="Dealer hand" :cards="enemy" />
      <Player class="player" title="Player hand" :cards="player" />

    </div>

    <div class="sidebar">
      <Cards :cards="cards" />

      <div class="actions">
        <div class="actions__item">
          <button class="btn" @click="hit">Hit</button>
        </div>
        <div class="actions__item">
          <button class="btn">Stand</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { getCardScore } from "./helpers"
  import { mapGetters } from "vuex"
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
        cards: [],
        enemy: [],
        player: [],
      }
    },

    computed: {
      ...mapGetters([
        'getCards',
      ]),
    },

    mounted(){
      this.cards = this.getGenerateCards()
      // console.log(this.cards)
    },

    methods: {
      hit(){
        this.giveCardTo("enemy")
        this.giveCardTo("player")
      },

      giveCardTo(player){
        if (this.cards.length) {
          const card = this.cards[this.cards.length - 1]
          card.position = this.getCardPosition(card)
          this[player].push(card)
          --this.cards.length

          setTimeout(() => {
            card.opened = true
          }, 500);
        }
      },

      getCardPosition(card){
        return document.querySelector(`.js-card-${card.id}`).getBoundingClientRect()
      },

      getGenerateCards(){
        const cards = JSON.parse(JSON.stringify(this.getCards))
        cards.forEach((card, idx) => {
          card.score = getCardScore(this.getCards, card.name)
          card.id = idx
          card.opened = false
        })
        return cards.sort(() => Math.random() - .5)
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
