<template>
  <div>
    <transition name="slide-face1">
      <div class="bg-box" v-show="shows" @click.stop="close()">
        <transition name="slide-face2">
          <slot class="slot" v-if="shows" />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["shows"],
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.bg-box {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  display: flex;
  z-index: 999;
  .slot {
    margin: auto;
  }
}
.slide-face1-enter-active,
.slide-face1-leave-active {
  will-change: transform;
  transition: all 500ms;
  backface-visibility: hidden;
  // transform: scale(1);
}
.slide-face1-enter {
  opacity: 1;
  // transform: translate3d(100%, 0, 0);
  // transform: scale(.5);
}
.slide-face1-leave-active {
  opacity: 0;
  // transform: scale(.5);
}

.slide-face2-enter-active,
.slide-face2-leave-active {
  will-change: transform;
  transition: all 500ms;
  backface-visibility: hidden;
  transform: scale(1);
}
.slide-face2-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
  transform: scale(0.5);
}
.slide-face2-leave-active {
  opacity: 0;
  transform: scale(0.5);
}
</style>