<template>
  <div class="nav" :class="navClass">
    <div class="nav-box">
      <ul class="">
        <img v-if="isShowLogo" :src="logoUrlHandler" :width="logoWidth" alt="logo" style="cursor: pointer" @click="ROUTER_PUSH('/')" />
        <template v-for="item in navbarList">
          <li :key="item.link" :class="[navTextClass, item.liClass]">
            <div class="d-flex justify-center align-center flex-row nav__list" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
              <v-icon>{{ item.icon }}</v-icon>
              <p :class="nav__text">{{ $t(item.name) }}</p>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'Navbar',
  props: {
    navClass: {
      type: String,
      default: 'default',
    },
    list: {
      type: Array,
      default: () => [],
    },
    navTextClass: {
      type: String,
      default: '',
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
  },
  data() {
    return {
      Cpath: '/',
      defaultList: [
        { sort: 1, code: 'home', show: true, name: 'g_common_link_home', link: '/', icon: 'home' },
        {
          sort: 2,
          code: 'cssports',
          show: true,
          name: 'g_com_navBar_005_menu_sports',
          link: '/play/30n4hvJ4MGjhfY',
          icon: 'sports_soccer',
        },
        { sort: 3, code: 'lottor', show: true, name: 'g_com_navBar_005_menu_lotto', link: '/ultimate', icon: 'gamepad' },
        { sort: 4, code: 'userCentre', show: true, name: 'g_com_navBar_005_menu_userCentre', link: '/userCentre', icon: 'person' },
        {
          sort: 5,
          code: 'promotion',
          show: true,
          name: 'g_com_navBar_005_menu_promotion',
          link: '/promotion',
          icon: 'card_giftcard',
        },
        {
          sort: 6,
          code: 'appdownload',
          show: true,
          name: 'g_com_navBar_005_menu_mobile',
          link: '/appdownload',
          icon: 'smartphone',
        },
        {
          sort: 7,
          code: 'pcdownload',
          show: true,
          name: 'g_com_navBar_005_menu_pc',
          link: '/installdownload',
          icon: 'desktop_windows',
        },
        { sort: 8, code: 'liveChat', show: true, name: 'g_common_link_feedback', link: 'liveChat', icon: 'email' },
      ],
    };
  },
  computed: {
    ...mapGetters(['config']),
    nav__text() {
      let nvaClass = {};
      switch (this.$i18n.locale) {
        case 'zh-CN':
          nvaClass.nav__text = true;
          break;
        case 'en':
        default:
          nvaClass.nav__text_en = true;
          break;
      }
      return nvaClass;
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
    navbarList() {
      return mergeArrayObjectsCode(this.list, this.defaultList);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  .nav-box {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      flex: 1;
      display: flex;
      justify-content: space-between;
      list-style: none;
      li {
        text-align: left;
        position: relative;
        cursor: pointer;
        min-width: 120px;
      }
    }
  }
  &.default {
    background: url('./assets/background1.png');
  }
}

.nav__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-top: 15px;
  p {
    margin: 0 0 0 10px;
    letter-spacing: 0px;
    &.nav__text {
      font-size: 16px;
    }
    &.nav__text_en {
      font-size: 12px;
    }
  }
}

.navbar__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  padding: 0px;
  cursor: pointer;
}

//hover
li:hover {
  transform: scale(1.1);
}
</style>
