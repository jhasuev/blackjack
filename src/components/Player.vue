<template>
  <div class="player">
    <div class="player__cards">
      <Card v-for="(card, i) in cards" :key="i" :name="card.card" class="player__cards-item" />
    </div>
    <div class="player__info">
      Dealer hand: 5
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
    data() {
      return {
        cards: [
          {
            card: "Pikes_7",
          },
          {
            card: "Pikes_5",
          },
        ],
      }
    },
  }
</script>

<style scoped lang="scss">

  .player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    & + & {
      margin-top: 150px;
    }

    &__cards {
      font-size: 0;

      &-item {
        filter: drop-shadow(0 0 3px rgba(255,255,255,.3));

        & + & {
          margin-left: -80px;
        }
      }
    }

    &__info {
      font-size: 27px;
    }
  }

</style>