<template>
  <div class="card" :class="{opened: !card.opened}" :style="getStyles" ref="card">
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
    <div class="content">
      <div class="front">
        <img :src="require(`@/assets/img/${card.name}_black.png`)" class="img">
      </div>
      <div class="back">
        <img src="@/assets/img/Back_black.png" class="img">
      </div>
    </div>
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
        const to = this.$refs.card.getBoundingClientRect()

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
    perspective: 500px;

    position: relative;
    width: 120px;
    height: 170.38px;
    font-size: 0;
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

  .content {
    position: absolute;
    width: 100%;
    height: 100%;

    transition: transform 1s;
    transform-style: preserve-3d;
  }

  .card.opened .content {
    transform: rotateY( 180deg ) ;
    transition: transform 0.5s;
  }

  .front,
  .back {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    backface-visibility: hidden;
  }

  .back {
    transform: rotateY( 180deg );
  }

  .img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

</style>