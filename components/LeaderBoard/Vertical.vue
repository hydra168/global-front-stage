<template>
  <div class="marquee--vertical" :style="componentStyle">
    <div class="announce-scroll">
      <slot name="dataList"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['height'],
  data() {
    return {};
  },
  computed: {
    componentStyle() {
      return {
        '--component-height': `${this.height}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.marquee {
  &--vertical {
    width: 100%;
    height: var(--component-height);
    overflow: hidden;
    position: relative;
    line-height: 20px;
    font-size: 12px;
    .announce-scroll {
      height: 100px;
      position: relative;
      animation: anis 20s * 5 linear infinite;
    }
    @keyframes anis {
      100% {
        transform: translateY(calc(var(--component-height) * -5));
      }
    }
    .announce-scroll:hover {
      animation-play-state: paused;
      cursor: pointer;
    }
  }
}
</style>
