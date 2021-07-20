<template>
  <div class="app">
    <div class="game">
      <player class="player" title="Карты дилера" :cards="enemy" />
      <player class="player" title="Ваши карты" :cards="player" @setScore="setScore" />

    </div>

    <div class="sidebar">
      <cards :cards="cards" />

      <div class="actions">
        <div class="actions__item">
          <button :class="['btn', { disabled: !isGaming }]" @click="hit">Еще</button>
        </div>
        <div class="actions__item">
          <button :class="['btn', { disabled: !isGaming }]" @click="stand">Стоп</button>
        </div>
      </div>
    </div>

    <popup class="popup" v-model="startPlayPopup" title="Blackjack">
      <button class="btn" @click="onPlayClick()">Начать</button>
    </popup>

    <popup class="popup" v-model="winnerPopup" :title="winnerPopupTitle">
      <button class="btn" @click="onContinueClick()">Продолжить</button>
    </popup>
    
  </div>
</template>

<script>
  import { getCardScore, getRandomNum, delay } from "./helpers"
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
        isGaming: false,
        startPlayPopup: true,
        winnerPopup: false,
        winnerPopupTitle: "",
      }
    },

    computed: {
      ...mapGetters([
        'getCards',
      ]),

      getEnemyScores() {
        return this.enemy.reduce((acc, card) => acc + card.score, 0)
      },

      getPlayerScores() {
        return this.player.reduce((acc, card) => acc + card.score, 0)
      },
    },

    methods: {
      closePopups(){
        this.startPlayPopup = false
        this.winnerPopup = false
      },

      onPlayClick(){
        this.closePopups()
        this.startGame()
      },

      onContinueClick(){
        this.closePopups()
        this.startGame()
      },

      async startGame(){
        this.isGaming = false
        this.clearCards()
        if(this.cards.length < 4) {
          this.generateCards()
        }

        await delay(1000)
        this.giveStartingCardsToPlayers().then(() => {
          this.isGaming = true
        })
      },

      clearCards(){
        this.enemy = []
        this.player = []
      },

      hit(){
        if(!this.isGaming) return null
        if(!this.cards.length) return null
        
        this.giveCardTo("player")
        if(this.getMinScores("player") > this.maxScore) {
          this.finish("enemy")
        }
      },

      async finish(winner = "enemy") {
        this.isGaming = false
        await delay(1000)
        const msgs = {
          "enemy": "Дилер выиграл :(",
          "player": "Ура!!! Ты выиграл!",
          "nobody": "Ничья -_-",
        }

        this.winnerPopup = true
        this.winnerPopupTitle = msgs[winner]
      },

      getMinScores(playerType) {
        return this[playerType].reduce((acc, card) => Math.min(...card.scores) + acc, 0)
      },

      getMaxScores(playerType) {
        return this[playerType].reduce((acc, card) => Math.max(...card.scores) + acc, 0)
      },

      stand(){
        if(!this.isGaming) return null
        
        while(this.getMinScores("enemy") + getRandomNum(2, 11) < this.maxScore){
          if(!this.cards.length) break;
          this.giveCardTo("enemy")
        }

        this.checkWinner()
      },

      setEnemyMinScores() {
        this.enemy.forEach(card => {
          card.score = Math.min(...card.scores)
        })
      },

      setEnemyMaxScores() {
        this.enemy.forEach(card => {
          card.score = Math.max(...card.scores)
        })
      },

      checkWinner(){
        if (this.getMaxScores("enemy") <= this.maxScore && this.getMaxScores("enemy") > this.getEnemyScores) {
          this.setEnemyMaxScores()
        } else if (this.getEnemyScores >= this.maxScore && this.getEnemyScores != this.getMinScores("enemy")) {
          this.setEnemyMinScores()
        }

        let winner = ''
        if(this.getEnemyScores === this.getPlayerScores) {
          winner = "nobody"
        } else if (this.getEnemyScores > this.maxScore) {
          winner = 'player'
        } else {
          winner = this.getEnemyScores > this.getPlayerScores ? 'enemy' : 'player'
        }

        this.finish(winner)
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

      giveStartingCardsToPlayers() {
        return new Promise( resolve => {
          (async () => {
            if(this.cards.length) {
              this.giveCardTo("enemy")
            }

            if(this.cards.length) {
              await delay(200)
              this.giveCardTo("player")
            }

            if(this.cards.length) {
              await delay(200)
              this.giveCardTo("enemy")
            }

            if(this.cards.length) {
              await delay(200)
              this.giveCardTo("player")
            }

            resolve()
          })()
        })
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
    justify-content: center;
  }

  .game {
    min-width: 555px;
    margin-right: 50px;

    @media screen and (max-width: 900px) {
      min-width: 0;
    }
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
