<template>
  <div class="cards">
    <Card
      v-for="i in 52"
      :key="i"
      :style="{
        marginTop: `${i}px`,
        marginLeft: `${i}px`,
      }"
      name="Back"
      class="cards__item  card"
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