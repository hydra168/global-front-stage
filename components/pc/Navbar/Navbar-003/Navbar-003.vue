<template>
  <aside class="Navbar-003">
    <div class="d-flex justify-center align-center" :class="wrapClass">
      <div
        class="menu-list d-flex align-center justify-space-around"
        :class="[node.className ? node.className : '']"
        v-for="(node, index) in menuData"
        :key="index"
        @click="handleMenuClick(node.link, node.outterUrl)"
      >
        <img v-if="isShowLogo && node.img" :src="logoUrlHandler" :width="logoWidth" alt="logo" style="cursor: pointer" @click="ROUTER_PUSH('/')" />
        <span :class="titleClass" v-else>{{ isTextFormat(node) ? $t(node.name) : $t(node.name) }}</span>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Navbar-003',
  props: {
    wrapClass: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: 'mx-2',
    },
    color: {
      type: String,
      default: 'primary',
    },
    recommend: {
      type: Boolean,
    },
    showImg: {
      type: Boolean,
      default: true,
    },
    isShowLogo: {
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
    menuData: {
      type: Array,
      default: () => [
        { link: '/', name: 'g_com_navbar_003_menu_home' },
        { link: '', name: '/' },
        { link: '/ultimate', name: 'g_com_navbar_003_menu_lottery' },
        { link: '', name: '/' },
        { link: '/play/BxkZVPiJb63a', name: 'g_com_navbar_003_menu_popularColors' },
        { link: '', name: '/' },
        { link: '/promotion', name: 'g_com_navbar_003_menu_promotions' },
        { link: '/', name: '/', img: 'img' },
        { link: '/userCentre', name: 'g_com_navbar_003_menu_user' },
        { link: '', name: '/' },
        { link: '/appdownload', name: 'g_com_navbar_003_menu_app' },
        { link: '', name: '/' },
        { link: '/helpCentre', name: 'g_com_navbar_003_menu_help' },
        { link: '', name: '/' },
        { link: 'liveChat', name: 'g_common_link_feedback' },
      ],
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT', 'ROUTER_PUSH']),
    handleMenuClick(link, outterUrl) {
      this.ROUTER_PUSH(link);
    },
    isTextFormat(node) {
      return node.name && node.name !== '/';
    },
  },
  computed: {
    ...mapGetters(['config']),
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-list {
  cursor: pointer;
  color: #525252;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1.3em;
  white-space: nowrap;
}
</style>
