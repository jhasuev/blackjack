<template>
  <div class="player">
    <div class="player__cards">
      <Card
        v-for="(card, i) in cards"
        :key="i"
        :card="card"
        @setScore="$emit('setScore', {card, score: $event})"
        class="player__cards-item"
      />
    </div>
    <div class="player__info">
      {{ title }}: {{ getCardsSum }}
    </div>
  </div>
</template>

<script>
  import Card from "./Card"
  export default {
    name: 'Player',
    components: {
      Card,
    },
    props: {
      title: { type: String, default: "" },
      cards: { type: Array, default: () => [] },
    },
    computed: {
      getCardsSum(){
        return this.cards.reduce((acc, card) => acc + card.score, 0)
      }
    },
  }
</script>

<style scoped lang="scss">

  .player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 170.38px;
    
    & + & {
      margin-top: 150px;
    }

    &__cards {
      position: relative;
      z-index: 1;
      display: flex;
      padding-left: 93px;

      &-item {
        filter: drop-shadow(0 0 3px rgba(255,255,255,.3));
        margin-left: -93px;
      }
    }

    &__info {
      padding-left: 30px;
      font-size: 27px;
    }
  }

  @media screen and (max-width: 900px) {
    .player {
      flex-direction: column;
      align-items: flex-start;
      
      & + & {
        margin-top: 50px;
      }

      &__info {
        padding-left: 0;
        padding-top: 5px;
        font-size: 20px;
      }
      &__cards {
        position: relative;
        z-index: 1;
        display: flex;
        padding-left: 63px;

        &-item {
          margin-left: -63px;
        }
      }
    }
  }

</style>