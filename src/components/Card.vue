<template>
  <img v-if="name != 'Back'" :src="require(`@/assets/img/${name}_black.png`)" class="card">
  <img v-else :src="require(`@/assets/img/Back_black.png`)" class="card">
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: "Back",
      }
    },
    name: "Card",
  }
</script>

<style lang="scss">
  .card {
    width: 120px;
    height: 170.38px;
  }
</style>