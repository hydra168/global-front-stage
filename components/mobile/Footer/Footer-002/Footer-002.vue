<template>
  <div class="Footer-002-wrap">
    <v-row class="d-flex text-center about-list">
      <v-col class="text-no-wrap"
        ><a href="/#/helpCentre/">{{ $t('g_com_footer_002_link1') }}</a></v-col
      >
      <v-col class="text-no-wrap"
        ><a href="/#/helpCentre/">{{ $t('g_com_footer_002_link2') }}</a></v-col
      >
      <v-col class="text-no-wrap"
        ><a href="/#/helpCentre/">{{ $t('g_com_footer_002_link3') }}</a></v-col
      >
      <v-col class="text-no-wrap"
        ><a href="/#/helpCentre/">{{ $t('g_com_footer_002_link4') }}</a></v-col
      >
    </v-row>
    <v-row class="d-flex text-center help-list">
      <v-col class="text-no-wrap"
        ><a href="/#/helpCentre/">{{ $t('g_com_footer_002_link5') }}</a></v-col
      >
      <v-col class="text-no-wrap"
        ><a href="/#/helpCentre/">{{ $t('g_com_footer_002_link6') }}</a></v-col
      >
      <v-col class="text-no-wrap"
        ><a href="/#/helpCentre/">{{ $t('g_com_footer_002_link7') }}</a></v-col
      >
    </v-row>
    <hr />
    <v-expansion-panels>
      <v-expansion-panel class="expansion-panel">
        <v-expansion-panel-header class="panel-header">
          <div class="privacy-image mr-2"><img :src="PrivacyImg.src" alt="" :height="PrivacyImg.height" /></div>
          {{ $t('g_com_footer_002_link8') }}
          <template v-slot:actions>
            <v-icon color="#fdf8ee"> mdi-menu-down </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="license__text">
            <span>{{ $t('g_com_footer_002_content1') }}</span>
            <span>{{ $t('g_com_footer_002_content2') }}</span>
            <span>{{ $t('g_com_footer_002_content3') }}</span>
            <span>{{ $t('g_com_footer_002_content4') }}</span>
            <span>{{ $t('g_com_footer_002_content5') }}</span>
            <span>{{ $t('g_com_footer_002_content6') }}</span>
          </div>
          <div class="imglist my-10">
            <a class="mx-2 mb-4" v-for="item in imgList" :key="item.code" @click="window.open(item.url)">
              <img :src="item.src" alt="" />
            </a>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'Footer-002',
  props: {
    optionsImgList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultImgList: [
        { sort: 1, show: true, code: 'footer-kg', src: require('./assets/footer-kg.png'), url: 'https://www.kgvip518.com' },
        {
          sort: 2,
          show: true,
          code: 'footer-iom-gov',
          src: require('./assets/footer-iom-gov.png'),
          url: 'https://www.gov.im/about-the-government/statutory-boards/gambling-supervision-commission/',
        },
        {
          sort: 3,
          show: true,
          code: 'footer-addiction-friend',
          src: require('./assets/footer-addiction-friend.png'),
          url: 'https://addictionfriend.com/',
        },
        { sort: 4, show: true, code: 'footer-npcg', src: require('./assets/footer-npcg.png'), url: 'https://www.ncpg.org.sg/en/Pages/Home.aspx' },
        {
          sort: 5,
          show: true,
          code: 'footer-gamcare',
          src: require('./assets/footer-gamcare.png'),
          url: 'http://www.motiv8.im/gamcare-isle-of-man/',
        },
        {
          sort: 6,
          show: true,
          code: 'footer-begambleawareorg',
          src: require('./assets/footer-begambleawareorg.png'),
          url: 'https://www.begambleaware.org/',
        },
        { sort: 7, show: true, code: 'footer-age18plus', src: require('./assets/footer-age18plus.png'), url: '' },
        { sort: 8, show: true, code: 'footer-microgaming', src: require('./assets/footer-microgaming.png'), url: 'https://www.microgaming.co.uk/' },
        { sort: 9, show: true, code: 'footer-gbg', src: require('./assets/footer-gbg.png'), url: '' },
      ],
      PrivacyImg: {
        src: require('./assets/footer-iom-gsc.svg'),
        height: 28,
      },
    };
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  computed: {
    ...mapGetters(['config', 'webTitle']),
    imgList() {
      return mergeArrayObjectsCode(this.optionsImgList, this.defaultImgList);
    },
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.Footer-002-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #22252c;
  .license__text {
    font-size: 90%;
    line-height: 2;
    color: #b2a68f;
  }
  span {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .imglist {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    flex-wrap: wrap;
    margin-bottom: 10px;
    img {
      height: 30px;
    }
  }
  .about-list {
    padding-top: 20px;
    a {
      padding: 2px 6px;
      color: #fdf8ee !important;
      border-width: 2px;
      border: 1px solid #d4ccbb;
      height: 1.5em;
      line-height: 1.5;
      font-size: 12px;
      text-decoration: none;
      display: inline-block;
      vertical-align: middle;

      font-weight: 500;
      box-sizing: content-box;
    }
    .col {
      padding: 0 2px;
    }
  }
  .help-list {
    margin-top: 5px;
    a {
      font-size: 12px;
      line-height: 1.5;

      text-decoration: underline;
      text-transform: none;
      text-shadow: none;
      padding-top: 0;
      padding-bottom: 0;
      font-weight: 500;
      color: #d4ccbb !important;
    }
  }
  hr {
    width: 90%;
    border: 0;
    border-top: 1px solid rgba(212, 204, 187, 0.2);
    margin: 8px auto;
  }
}
.panel-header {
  margin: 0 auto;
  width: 60%;
  min-height: 48px !important;
}
.expansion-panel {
  background-color: #22252c !important;
  color: #fdf8ee !important;
}

.privacy-image {
  flex: 0 0 auto !important;
  border-radius: 5px;
  background-color: white;
}
</style>
