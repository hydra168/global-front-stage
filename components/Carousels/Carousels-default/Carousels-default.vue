<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, i) in spotlights" :key="i">
      <img :width="width" :height="height" :style="`object-fit: ${objectfit}`" :src="item.picture" alt="" @click="routerPush(item.link)" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { mapGetters } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { DEVICE_TYPE } from '../../../consts';

export default {
  name: 'Carousels-default',
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      // type: [String, Number],
      // default: DEVICE_TYPE === 'mobile' ? '120px' : '550px',
      type: String,
      default: '100%',
    },
    objectfit: {
      type: String,
      default: DEVICE_TYPE === 'mobile' ? 'fill' : 'cover',
    },
  },
  computed: {
    ...mapGetters(['spotlights']),
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
        },
      },
    };
  },
  methods: {
    routerPush(link) {
      if (this.isMobile) return;
      if (link === '/#') return;
      if (link.match(/\/#\//)) {
        const path = link.split('/#/')[1];
        if (path) {
          this.$router.push(`/${path}`);
        }
        return;
      }
      if (link.match(/https?:\/\//)) {
        window.open(link, '_blank');
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  img {
    width: 100%;
  }
}
.swiper-slide {
  font-size: 0;
}
</style>
