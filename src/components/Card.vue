<template>
  <Flipper :opened="card.opened" ref="card" :style="getStyles">
    <template v-slot:front>
      <div class="scores" v-if="canShowScores">
        <button
          v-for="(score, i) in card.scores"
          :key="i"
          :class="['scores__item', {
            'scores__item--active': score == card.score
          }]"
          @click="$emit('setScore', score)"
        >{{ score }}</button>
      </div>

      <img :src="require(`@/assets/img/${card.name}_black.png`)" class="img">
    </template>
    <template v-slot:back>
      <img src="@/assets/img/Back_black.png" class="img">
    </template>
  </Flipper>
</template>

<script>
  import Flipper from "./Flipper"
  export default {
    name: "Card",
    components: {
      Flipper,
    },
    props: {
      card: { type: Object, default: () => ({}) },
    },
    data(){
      return {
        position: null,
      }
    },
    computed: {
      canShowScores(){
        return this.card.scores.length > 1 && this.card.opened
      },

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
        const to = this.$refs.card.$el.getBoundingClientRect()

        this.position = {
          top: this.card.position.y - to.y,
          left: this.card.position.x - to.x,
        }

        requestAnimationFrame(() => {
          this.position.top = 0
          this.position.left = 0
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    transition: .5s;
  }

  .scores {
    position: absolute;
    z-index: 9;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    &__item {
      display: block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 50%;
      font-size: 10px;
      background-color: #333;
      
      margin-bottom: 10px;
      opacity: .5;
      cursor: pointer;

      &--active {
        opacity: 1;
        cursor: default;
      }
    }
  }

  .img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

</style>