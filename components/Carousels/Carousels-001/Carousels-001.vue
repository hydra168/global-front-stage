<template>
  <v-carousel v-bind="{ ...vCarouseldefault, ...vCarouselProps }" :height="height">
    <v-carousel-item
      v-for="(item, i) in spotlights"
      :key="i"
      :src="item.picture"
      :style="`object-fit: ${objectfit}`"
      @click="routerPush(item.link)"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
import { mapGetters } from 'vuex';
import { DEVICE_TYPE } from '../../../consts';

export default {
  name: 'Carousels-001',
  props: {
    height: {
      type: [String, Number],
      default: DEVICE_TYPE === 'mobile' ? '120px' : '550px',
    },
    objectfit: {
      type: String,
      default: DEVICE_TYPE === 'mobile' ? 'fill' : 'cover',
    },
    vCarouselProps: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(['spotlights']),
  },
  data() {
    return {
      vCarouseldefault: {
        'show-arrows': false,
        cycle: true,
        'hide-delimiter-background': true,
        'delimiter-icon': 'minimize',
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

<style lang="scss"></style>
