<template>
  <div :style="getStyle">
    <Flipper :opened="card.opened">
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
  </div>
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
        position: {
          top: 0,
          left: 0,
        },
        transition: 0,
      }
    },
    computed: {
      canShowScores(){
        return this.card.scores.length > 1 && this.card.opened
      },

      getStyle(){
        return {
          "transition": `${ this.transition }s`,
          "transform": `translate(${ this.position.left }px, ${ this.position.top }px)`,
        }
      },
    },

    mounted(){
      if (this.card.position) {
        this.setPosition()
      }
    },

    methods: {
      setPosition() {
        const to = this.$el.getBoundingClientRect()
        const top = this.card.position.y - to.y
        const left = this.card.position.x - to.x
        
        this.position.top = top
        this.position.left = left

        this.$nextTick(() => {
          setTimeout(() => {
            this.transition = .5
            this.position.top = 0
            this.position.left = 0
          }, 100);
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

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

  @media screen and (max-width: 900px) {
    .scores {
      left: 0;

      &__item {
        margin-bottom: 5px;
      }
    }
  }

</style>