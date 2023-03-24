<template>
  <Carousel3d
    :controls-visible="true"
    :autoplay="true"
    :autoplayTimeout="3000"
    :display="5"
    :animationSpeed="1000"
    :inverseScaling="inverseScaling"
    :width="width"
    :height="height"
    :controlsWidth="controlsWidth"
    :controlsHeight="controlsHeight"
  >
    <Slide v-for="(item, index) in slides" :index="index" :key="index">
      <img :src="item.picture" @click="item.func" />
    </Slide>
  </Carousel3d>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default {
  name: 'Carousels-3d',
  components: {
    Carousel3d,
    Slide,
  },
  props: {
    slides: {
      type: Array,
      default: () => {
        return [
          { picture: require('./assets/img/picture01.png'), func: () => this.ROUTER_PUSH('/') },
          { picture: require('./assets/img/picture02.png'), func: () => this.ROUTER_PUSH('/') },
          { picture: require('./assets/img/picture03.png'), func: () => this.ROUTER_PUSH('/') },
        ];
      },
    },
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 313,
    },
    controlsWidth: {
      type: Number,
      default: 50,
    },
    controlsHeight: {
      type: Number,
      default: 50,
    },
    inverseScaling: {
      type: Number,
      default: 300,
    },
  },
};
</script>

<style lang="scss">
.prev {
  left: 50px !important;
  text-align: left;
}
.next {
  right: 50px !important;
  text-align: right;
}
</style>
