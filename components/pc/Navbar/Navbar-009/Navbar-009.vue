<template>
  <section class="NavBar-009" :style="bgImg">
    <img v-if="isShowLogo" :src="logoUrlHandler" :width="logoWidth" alt="logo" style="cursor: pointer" @click="ROUTER_PUSH('/')" />
    <ul>
      <li v-for="(node, index) in list" :key="index" @click="ROUTER_PUSH(node.link)">
        <v-icon x-large color="primary" v-bind="navIconBind">{{ node.icon }}</v-icon>
        <span class="list__text">{{ $t(node.name) }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Navbar009',
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
    list: {
      type: Array,
      default: () => [
        { icon: 'sports_soccer', name: 'g_common_game_cs_sports', link: '/play/30n4hvJ4MGjhfY' },
        { icon: 'casino', name: 'g_common_game_kaiyuan', link: '/play/BgFcIROExgMd' },
        { icon: 'face', name: 'g_common_game_live', link: '/livelobby' },
        { icon: 'games', name: 'g_common_game_lottery_bet', link: '/ultimate' },
        { icon: 'sports_esports', name: 'g_common_game_mg_slot', link: '/slotlobby' },
        { icon: 'gps_fixed', name: 'g_common_game_ag_fish', link: '/play/AGSvcZAA53g2Ly' },
        { icon: 'card_giftcard', name: 'g_common_link_user', link: '/userCentre' },
        { icon: 'smartphone', name: 'g_common_navbar_menu_appdownload', link: '/appdownload' },
      ],
    },
  },

  computed: {
    ...mapGetters(['config']),
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
    handleHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss" scoped>
.NavBar-009 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 102px;
  ul {
    display: flex;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 18px;
    cursor: pointer;
  }
}
.list__text {
  color: #fff;
  margin-left: 8px;
}
// hover
li:hover {
  transform: scale(1.1);
}
</style>
