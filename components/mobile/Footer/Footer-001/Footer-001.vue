<template>
  <div class="Footer-001 mt-3">
    <v-row dense class="justify-center" v-if="safetyIconsShow">
      <v-col cols="4" v-for="(item, i) in safetyIcons" :key="i">
        <img style="width: 100%" :src="item" class="mx-auto" />
      </v-col>
    </v-row>
    <!-- <v-row class="justify-center" v-if="logoIconsShow">
      <v-col cols="5" v-for="(item, i) in logoIcons" :key="i" class="d-flex align-center">
        <img width="30" height="30" :src="item.img" />
        <p class="caption mb-0 ml-2">{{ $t(item.label) }}</p>
      </v-col>
    </v-row> -->
    <div class="text-center">
      <h6 class="text-caption font-weight-black">{{ $t('g_com_footer_001_copyright', { year, webTitle }) }}</h6>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Footer-001',
  props: {
    logoIconsShow: {
      type: Boolean,
      default: true,
    },
    safetyIconsShow: {
      type: Boolean,
      default: true,
    },
    logoIconFuliTitle: {
      type: String,
      default: 'g_com_footer_001_fuliTitle',
    },
    logoIconTiYuTitle: {
      type: String,
      default: 'g_com_footer_001_tiYuTitle',
    },
  },
  data() {
    return {
      safetyIcons: [
        require('./assets/safety-icons/icon1.png'),
        require('./assets/safety-icons/icon2.png'),
        require('./assets/safety-icons/icon3.png'),
        require('./assets/safety-icons/icon4.png'),
        require('./assets/safety-icons/icon5.png'),
      ],
      logoIcons: [
        { img: require('./assets/welfare.png'), label: this.logoIconFuliTitle },
        { img: require('./assets/sport.png'), label: this.logoIconTiYuTitle },
      ],
    };
  },
  computed: {
    ...mapGetters(['config', 'webTitle']),
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
};
</script>
