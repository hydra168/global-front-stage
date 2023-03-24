<template>
  <div class="Footer-002">
    <v-container>
      <v-row>
        <v-col cols="3" class="text-center">
          <h3 class="title mb-3">{{ textFilter('title_safe') }}</h3>
          <img style="max-width: 100%" height="100px" :src="require('./assets/pay01.png')" />
        </v-col>
        <v-col class="text-center">
          <h3 class="title mb-3">{{ textFilter('title_supervision') }}</h3>
          <p class="text-center">
            {{ textFilter(supervision_content_key, { webTitle }) }}
            <!-- {{ textFilter('supervision_content_1', { webTitle }) }}<br />
            {{ textFilter('supervision_content_2') }}<br />
            {{ textFilter('supervision_content_3') }}<br />
            {{ textFilter('supervision_content_4') }} -->
          </p>
        </v-col>
        <v-col cols="3" class="text-center">
          <h3 class="title mb-3">{{ textFilter('title_partners') }}</h3>
          <img height="60px" :src="require('./assets/partner_icon@2x.png')" />
        </v-col>
      </v-row>

      <v-row class="justify-center ma-5" v-if="playinfoIconsShow">
        <v-col cols="4" v-for="(item, i) in playinfoIcons" :key="i">
          <v-img width="400px" :src="item" class="mx-auto"></v-img>
        </v-col>
      </v-row>

      <v-row class="justify-center ma-5" v-if="safetyIconsShow">
        <v-col cols="2" v-for="(item, i) in safetyIcons" :key="i">
          <v-img width="150px" :src="item" class="mx-auto"></v-img>
        </v-col>
      </v-row>

      <!-- <v-row class="justify-center ma-5" v-if="logoIconsShow">
        <v-col cols="2" v-for="(item, i) in logoIcons" :key="i" class="d-flex align-center justify-center">
          <img width="30" height="30" :src="item.img" />
          <p class="caption mb-0 ml-2">{{ $t(item.label) }}</p>
        </v-col>
      </v-row> -->

      <v-container class="text-center">
        <p class="text-button font-weight-black">{{ textFilter('copyright_1', { webTitle }) }}</p>
        <v-layout class="d-inline-flex align-center" row wrap>
          <template v-for="(item, k) in footerData">
            <v-flex shrink :key="`foote_${k}`">
              <div class="pointer" @click="routerPush(item)">{{ textFilter(item.title) }}</div>
            </v-flex>
            <v-divider :key="k" v-if="k !== Object.keys(footerData).length - 1" class="mx-4" vertical></v-divider>
          </template>
        </v-layout>
      </v-container>
    </v-container>
    <div class="black py-3 text-center">
      <span class="subtitle-2 white--text">{{ textFilter('copyright_2', { year, webTitle }) }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer-002',
  props: {
    logoIconsShow: {
      type: Boolean,
      default: true,
    },
    safetyIconsShow: {
      type: Boolean,
      default: true,
    },
    playinfoIconsShow: {
      type: Boolean,
      default: false,
    },
    supervision_content_key: {
      type: String,
      default: 'supervision_content',
    },
  },
  data() {
    return {
      footerData: [
        { title: 'link_problem', name: 'problem', url: '/helpCentre/problem' },
        { title: 'link_about', name: 'about', url: '/helpCentre/about' },
        { title: 'link_terms', name: 'terms', url: '/helpCentre/terms' },
        { title: 'link_features', name: 'features', url: '/helpCentre/features' },
      ],
      playinfoIcons: [require('./assets/playinfo-icons/icon1.png'), require('./assets/playinfo-icons/icon2.png')],
      safetyIcons: [
        require('./assets/safety-icons/icon1.png'),
        require('./assets/safety-icons/icon2.png'),
        require('./assets/safety-icons/icon3.png'),
        require('./assets/safety-icons/icon4.png'),
        require('./assets/safety-icons/icon5.png'),
      ],
      logoIcons: [
        { img: require('./assets/welfare.png'), label: 'g_common_logoIcon_welfare_lottery' },
        { img: require('./assets/sport.png'), label: 'g_common_logoIcon_sports_lottery' },
      ],
    };
  },
  computed: {
    ...mapGetters(['config', 'webTitle']),
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  methods: {
    routerPush(item) {
      this.$router.push({ path: item.url });
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_002_', slot) : textFilter(text, 'com_footer_002_');
    },
  },
};
</script>

<style lang="scss" scoped>
.Footer-002 {
  background: #fff;
  .pointer {
    cursor: pointer;

    // hover 效果
    &:hover {
      color: var(--v-primary-base);
      font-size: 18px;
      transition: all 0.5s;
    }
  }
}
</style>
