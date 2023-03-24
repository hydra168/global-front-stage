<template>
  <transition :name="aniType">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: 'MyTransition',
  props: {
    aniType: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
// 向右進入畫面
.slide-right-custom-enter-active {
  animation: slide-right 0.3s;
}
.slide-right-custom-leave-active {
  animation: slide-right 0.3s reverse;
}
@keyframes slide-right {
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(0%);
  }
}
// 向左進入畫面
.slide-left-custom-enter-active {
  animation: slide-left 0.3s;
}
.slide-left-custom-leave-active {
  animation: slide-left 0.3s reverse;
}
@keyframes slide-left {
  0% {
    transform: translate(100%);
  }
  100% {
    transform: translate(0%);
  }
}

.slide-up-custom-enter-active {
  animation: slide-up 0.3s;
}
.slide-up-custom-leave-active {
  animation: slide-up 0.3s reverse;
}
@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}

.slide-down-custom-enter-active {
  animation: slide-down 0.3s reverse;
}
.slide-down-custom-leave-active {
  animation: slide-down 0.3s;
}
@keyframes slide-down {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}
.slide-down-custom2-enter-active {
  animation: slide-down2 0.3s reverse;
}
.slide-down-custom2-leave-active {
  animation: slide-down2 0.3s;
}
@keyframes slide-down2 {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-110%);
  }
}
</style>
