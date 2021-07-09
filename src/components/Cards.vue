<template>
  <div class="cards">
    <Card
      v-for="(card, i) in cards"
      :key="i"
      :style="{
        marginTop: `${i}px`,
        marginLeft: `${i}px`,
      }"
      :card="card"
      :class="`cards__item  js-card-${card.id}`"
    />
  </div>
</template>

<script>
  import Card from "./Card"
  export default {
    name: 'Cards',
    components: {
      Card,
    },
    props: {
      cards: { type: Array, default: () => [] },
    },
  }
</script>

<style scoped lang="scss">
  
  .cards {
    position: relative;
    min-width: 172px;
    min-height: 222px;

    &__item {
      &+& {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

</style>