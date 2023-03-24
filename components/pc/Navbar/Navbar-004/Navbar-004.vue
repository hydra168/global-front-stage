<template>
  <div class="nav" :style="backgroundColor">
    <div class="nav-box">
      <ul>
        <template v-for="item in menuLeftData">
          <li :key="item.link">
            <div class="nav__list" @click="ROUTER_PUSH(item.link)" v-if="isShowLeftMenu">
              <div class="nav__icon swing-hover pa-0 ma-0">
                <v-icon v-bind="bindNavIcon">{{ item.icon }}</v-icon>
              </div>
              <span :class="`nav__text ${textColor}--text`">{{ $t(item.name) }}</span>
            </div>
          </li>
        </template>
        <img
          class="navbarLogo"
          v-if="isShowLogo"
          :src="logoUrlHandler"
          :width="logoWidth"
          alt="logo"
          style="cursor: pointer"
          @click="ROUTER_PUSH('/')"
        />
        <template v-for="item in menuRightData">
          <li :key="item.link">
            <div class="nav__list" @click="ROUTER_PUSH(item.link)" v-if="isShowRightMenu">
              <div class="nav__icon swing-hover pa-0 ma-0">
                <v-icon v-bind="bindNavIcon">{{ item.icon }}</v-icon>
              </div>
              <span :class="`nav__text ${textColor}--text`">{{ $t(item.name) }}</span>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Navbar',
  props: {
    // icon參數
    navIconBind: {
      type: Object,
      default: () => {},
    },
    navIconColor: {
      type: String,
      default: 'primary',
    },
    isShowLogo: {
      type: Boolean,
      default: true,
    },
    isShowLeftMenu: {
      type: Boolean,
      default: true,
    },
    isShowRightMenu: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    logoWidth: {
      type: String,
      default: '250px',
    },
    bgColor: {
      type: String,
      default: '#59d3ab',
    },
    textColor: {
      type: String,
      default: 'white',
    },
    menuLeftData: {
      type: Array,
      default: () => [
        { icon: 'sports_soccer', name: 'g_common_navbar_menu_sports', link: '/play/30n4hvJ4MGjhfY', src: require('./assets/cs.png') },
        { icon: 'casino', name: 'g_common_game_kaiyuan', link: '/play/BgFcIROExgMd', src: require('./assets/ky.png') },
        { icon: 'face', name: 'g_common_game_live', link: '/play/AGwftrtxRP9syJ', src: require('./assets/live.png') },
        { icon: 'games', name: 'g_common_game_lottery_bet', link: '/ultimate', src: require('./assets/lottery.png') },
        { icon: 'sports_esports', name: 'g_common_game_slot_game', link: '/play/slot', src: require('./assets/mg.png') },
      ],
    },
    menuRightData: {
      type: Array,
      default: () => [
        { icon: 'gps_fixed', name: 'g_common_game_ag_fish', link: '/play/AGSvcZAA53g2Ly', src: require('./assets/ag.png') },
        { icon: 'card_giftcard', name: 'g_common_link_promotions', link: '/promotion', src: require('./assets/promotion.png') },
        { icon: 'smartphone', name: 'g_common_link_app', link: '/appdownload', src: require('./assets/app.png') },
        { icon: 'desktop_windows', name: 'g_common_navbar_menu_pcDownload', link: '/installdownload', src: require('./assets/app.png') },
        { icon: 'person', name: 'g_common_link_user', link: '/userCentre', src: require('./assets/userCentre.png') },
      ],
    },
  },
  computed: {
    ...mapGetters(['config']),
    bindNavIcon() {
      return Object.assign({ xLarge: true, color: 'primary' }, this.navIconBind);
    },
    backgroundColor() {
      return {
        background: `${this.bgColor}`,
      };
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT', 'ROUTER_PUSH']),
    textFilter(text) {
      return textFilter(text, 'com_navbar_004_');
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  .nav-box {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      display: flex;
      justify-content: space-around;
      list-style: none;
      li {
        text-align: center;
        position: relative;
        cursor: pointer;
        width: 100px;
      }
    }
  }
}

.nav__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
  span {
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
  }
}
</style>
