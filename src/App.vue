<template>
  <div class="app">
    <div class="game">
      
      <Player class="player" title="Dealer hand" :cards="enemy" />
      <Player class="player" title="Player hand" :cards="player" @setScore="setScore" />

    </div>

    <div class="sidebar">
      <Cards :cards="cards" />

      <div class="actions">
        <div class="actions__item">
          <button class="btn" @click="hit">Hit</button>
        </div>
        <div class="actions__item">
          <button class="btn" @click="stand">Stand</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { getCardScore, getRandomNum } from "./helpers"
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
        maxScore: 21,
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
      this.startGame()
    },

    methods: {
      startGame(){
        this.generateCards()
        this.clearCards()
      },

      clearCards(){
        this.enemy = []
        this.player = []
      },

      hit(){
        this.giveCardTo("player")
      },

      stand(){
        const max = getRandomNum(2, 4)
        for(let i = 0; i < max; i++){
          setTimeout(() => {
            this.giveCardTo("enemy")

            if (i + 1 == max) {
              setTimeout(() => {
                this.enemyChoosed()
              }, 1500);
            }
          }, 100 * i);
        }
      },

      enemyChoosed(){
        const enemyScores = this.enemy.reduce((acc, card) => acc + card.score, 0)
        const playerScores = this.player.reduce((acc, card) => acc + card.score, 0)

        let winner = ''

        // я особо логики не знаю, в этой игре, но, надеюсь, не прогадаю...
        if (enemyScores != playerScores) {
          if (enemyScores > this.maxScore && playerScores > this.maxScore) {
            // если у обоих очки больше 21, то проигрывает тот, у кого больше же?
            winner = enemyScores > playerScores ? 'player' : 'enemy'

          } else if (enemyScores > this.maxScore || playerScores > this.maxScore) {
            // хотя бы у одного игрока больше 21 очков
            winner = enemyScores > this.maxScore ? 'player' : 'enemy'

          } else {
            // у обоих не более 21 очков
            winner = enemyScores > playerScores ? 'enemy' : 'player'
          }
        }

        if (winner) {
          if (winner == 'player') {
            alert("Вы выграли!")
          } else {
            alert("Вы проиграли!")
          }
        } else {
          alert("Ничья!")
        }

        this.clearCards()
        this.checkCards()
      },

      checkCards(){
        if (!this.cards.length) {
          this.generateCards()
        }
      },

      giveCardTo(playerType){
        if (this.cards.length) {
          const card = this.cards[this.cards.length - 1]
          card.position = this.getCardPosition(card)
          this[playerType].push(card)
          --this.cards.length

          setTimeout(() => {
            card.opened = true
          }, 500);
        }
      },

      getCardPosition(card){
        return document.querySelector(`.js-card-${card.id}`).getBoundingClientRect()
      },

      generateCards(){
        const cards = JSON.parse(JSON.stringify(this.getCards))
        cards.forEach((card, idx) => {
          card.score = getCardScore(this.getCards, card.name)
          card.id = idx
          card.opened = false
        })
        this.cards = cards.sort(() => Math.random() - .5)
      },
      
      setScore({card, score}){
        card.score = score
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
