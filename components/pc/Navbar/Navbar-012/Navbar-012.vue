<template>
  <aside class="Navbar-012" :style="stylesWrap">
    <v-container pa-0 class="d-flex align-center" :class="[showLogo ? 'justify-space-between' : 'justify-space-around']">
      <img v-if="isShowLogo" :src="logoUrlHandler" :width="logoWidth" alt="logo" style="cursor: pointer" @click="ROUTER_PUSH('/')" />
      <div class="d-flex justify-space-around" :class="{ 'full-width': !showLogo }">
        <div v-for="(item, i) in youshi" :key="i" @click="item.func" class="text-center" :class="[itemClass, hoverColor ? 'isHover' : '']">
          <v-btn dark text>
            <v-icon v-if="item.icon" :color="iconColor">{{ item.icon }} </v-icon>
            <span :class="itemTitleClass">{{ $t(item.title) }}</span>
          </v-btn>
        </div>
      </div>
    </v-container>
  </aside>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'Navbar-012',
  props: {
    dark: {
      type: Boolean,
      default: true,
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    isShowLogo: {
      type: Boolean,
      default: false,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    logoWidth: {
      type: String,
      default: '250px',
    },
    stylesWrap: {
      type: String,
      default: 'background-color: #171d3e;',
    },
    itemClass: {
      type: String,
      default: 'py-3 px-1',
    },
    itemTitleClass: {
      type: String,
      default: 'font-weight-black text-subtitle-1',
    },
    color: {
      type: String,
      default: 'primary',
    },
    hoverColor: {
      type: Boolean,
      default: false,
    },
    menuDataOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      menuData: [
        { sort: 1, show: true, lang: 'menu_home', code: 'home', title: 'g_common_link_home', func: () => this.ROUTER_PUSH('/') },
        { sort: 2, show: true, lang: 'menu_lottery', code: 'ultimate', title: 'g_common_link_lottery', func: () => this.ROUTER_PUSH('/ultimate') },
        {
          sort: 3,
          show: true,
          lang: 'menu_popularColors',
          code: 'popularLottery',
          title: 'g_common_link_lotteryPopular',
          func: () => this.ROUTER_PUSH('/play/7043222726362'),
        },
        {
          sort: 4,
          show: true,
          lang: 'menu_promotions',
          code: 'promotion',
          title: 'g_common_link_promotions',
          func: () => this.ROUTER_PUSH('/promotion'),
        },
        { sort: 5, show: true, lang: 'menu_user', code: 'userCentre', title: 'g_common_link_user', func: () => this.ROUTER_PUSH('/userCentre') },
        { sort: 6, show: true, lang: 'menu_app', code: 'appdownload', title: 'g_common_link_app', func: () => this.ROUTER_PUSH('/appdownload') },
        {
          sort: 7,
          show: true,
          lang: 'menu_pc',
          code: 'installdownload',
          title: 'g_common_link_pc',
          func: () => this.ROUTER_PUSH('/installdownload'),
        },
        { sort: 8, show: true, lang: 'menu_help', code: 'helpCentre', title: 'g_common_link_help', func: () => this.ROUTER_PUSH('/helpCentre') },
        { sort: 9, show: true, lang: 'menu_channel', code: 'liveChat', title: 'g_common_link_feedback', func: () => this.SHOW_LIVE_CHAT(0) },
      ],
    };
  },
  computed: {
    ...mapGetters(['config']),
    youshi() {
      return mergeArrayObjectsCode(this.menuDataOptions, this.menuData);
    },
    bgImg() {
      return {
        background: `url(${this.bg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
.Navbar-012 {
  .full-width {
    width: 100%;
  }
  .isHover {
    .theme--dark.v-btn {
      &:hover {
        color: #ffd012;
      }
    }
  }
}

//hover
.theme--dark.v-btn:hover::before {
  opacity: 0.35 !important;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
}
</style>
