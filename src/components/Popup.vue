<template>
  <transition name="fade" mode="out-in">
    <div class="popup" v-if="modelValue">
      <i class="popup__bg" />
      <div class="popup__content">
        <h2 v-if="title" class="popup__title">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: "" },
  },
}
</script>

<style scoped lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgba(0,0,0,.8);
  }
  
  &__content {
    width: 100%;
    max-width: 320px;
    background-color: #fff;
    color: #000;
    border-radius: 10px;
    padding: 15px;
  }
  
  &__title {
    text-align: center;
    margin-bottom: 1em;
    font-size: 27px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
