<template>
  <div class="card" :style="getStyles" ref="card">
    <img v-if="card.name != 'Back'" :src="require(`@/assets/img/${card.name}_black.png`)" class="img">
    <img v-else :src="require(`@/assets/img/Back_black.png`)" class="img">
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      card: { type: Object, default: () => ({}) },
    },
    data(){
      return {
        position: null,
      }
    },
    computed: {
      getStyles(){
        if(this.position) {
          return {
            "top": `${this.position.top}px`,
            "left": `${this.position.left}px`,
          }
        }
        return null
      },
    },
    mounted(){
      if (this.card.position) {
        const to = this.$refs.card.getBoundingClientRect()

        this.position = {
          top: this.card.position.y - to.y,
          left: this.card.position.x - to.x,
        }

        setTimeout(() => {
          this.position.top = 0
          this.position.left = 0
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    width: 120px;
    height: 170.38px;
    font-size: 0;

    transition: .5s;
  }

  .img {
    width: 100%;
    height: 100%;
  }
</style>