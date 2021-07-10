<template>
  <div :class="['card', { opened: !opened }]">
    <div class="content">
      <div class="front">
        <slot name="front" />
      </div>
      <div class="back">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Flipper",
    props: {
      opened: { type: Boolean, default: false },
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
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;

    transition: transform 1s;
    transform-style: preserve-3d;
  }

  .card.opened .content {
    transform: rotateY(180deg);
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
    transform: rotateY(180deg);
  }

</style>