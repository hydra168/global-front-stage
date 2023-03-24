<template>
  <div class="nav">
    <v-container class="nav-box">
      <ul class="d-flex">
        <div class="navbar__logo" @click="ROUTER_PUSH('/')">
          <img
            v-if="isShowLogo"
            :src="logoUrlHandler"
            :width="logoWidth"
            alt="logo"
            style="cursor: pointer"
            @click="ROUTER_PUSH('/')"
            v-bind="logoImgBind"
          />
        </div>
        <v-spacer />
        <template v-for="item in navbarList">
          <li :key="item.link">
            <div class="nav__list" v-bind="bindNavList" @click="item.func">
              <div class="nav__icon pa-0 ma-0">
                <v-icon v-bind="bindNavIcon">{{ item.icon }}</v-icon>
              </div>
              <span class="nav__text" :class="navTextClass" v-bind="navTextBind">{{ $t(item.name) }}</span>
              <span v-if="showRouterLinkActive" :class="{ 'router-link-active': Cpath == item.link }"></span>
            </div>
          </li>
        </template>
      </ul>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'Navbar',
  props: {
    list: {
      type: Array,
      default: () => [],
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
    navTextClass: {
      type: String,
      default: 'black--text',
    },
    // v-bind提供擴充彈性
    logoImgBind: {
      type: Object,
      required: false,
    },
    navListBind: {
      type: Object,
      required: false,
    },
    navIconBind: {
      type: Object,
      required: false,
    },
    navTextBind: {
      type: Object,
      required: false,
    },
    isNvListBorder: {
      type: Boolean,
      default: false,
    },
    showRouterLinkActive: {
      type: Boolean,
      default: true,
    },
    showHome: {
      type: Boolean,
      default: true,
    },
    replaceKeys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      Cpath: '/',
      defaultList: [
        { sort: 1, code: 'home', show: true, name: 'g_common_link_home', icon: 'home', func: () => this.ROUTER_PUSH('/') },
        {
          sort: 2,
          code: 'cssports',
          show: true,
          name: 'g_com_navBar_005_menu_sports',
          icon: 'sports_soccer',
          func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
        },
        {
          sort: 3,
          code: 'lottor',
          show: true,
          name: 'g_com_navBar_005_menu_lotto',
          icon: 'gamepad',
          func: () => this.ROUTER_PUSH('/ultimate'),
        },
        {
          sort: 4,
          code: 'userCentre',
          show: true,
          name: 'g_com_navBar_005_menu_userCentre',
          icon: 'person',
          func: () => this.ROUTER_PUSH('/userCentre'),
        },
        {
          sort: 5,
          code: 'promotion',
          show: true,
          name: 'g_com_navBar_005_menu_promotion',
          icon: 'card_giftcard',
          func: () => this.ROUTER_PUSH('/promotion'),
        },
        {
          sort: 6,
          code: 'appdownload',
          show: true,
          name: 'g_com_navBar_005_menu_mobile',
          icon: 'smartphone',
          func: () => this.ROUTER_PUSH('/appdownload'),
        },
        {
          sort: 7,
          code: 'pcdownload',
          show: true,
          name: 'g_com_navBar_005_menu_pc',
          icon: 'desktop_windows',
          func: () => this.ROUTER_PUSH('/installdownload'),
        },
        {
          sort: 8,
          code: 'liveChat',
          show: true,
          name: 'g_common_link_feedback',
          link: 'liveChat',
          icon: 'email',
          func: () => this.SHOW_LIVE_CHAT(0),
        },
      ],
    };
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  computed: {
    ...mapGetters(['config']),
    navbarList() {
      return mergeArrayObjectsCode(this.list, this.defaultList);
    },
    bindNavList() {
      return Object.assign({ class: { border: this.isNvListBorder } }, this.navListBind);
    },
    bindNavIcon() {
      return Object.assign({ xLarge: true, color: 'primary' }, this.navIconBind);
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  .nav-box {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      li {
        text-align: center;
        position: relative;
        cursor: pointer;
        width: 100px;
        @media screen and (max-width: 1904px) {
          width: 100px;
        }
        .router-link-active {
          width: 35px;
          height: 9px;
          margin-top: 15px;
          background-color: map-get(map-get($colors, primary), base);
        }
        .nav__list {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 90px;
          width: 100px;
          cursor: pointer;
          &.border {
            border: solid 1px;
            padding: 10px;
            border-color: #d8d8d8;
          }
          .nav__icon {
            transition: all 1s;
          }
          .nav__text {
            font-family: PingFangTC, arial;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0px;
            text-align: center;
            margin-top: 10px;
          }
        }
        & + li {
          margin-left: 1em;
        }
      }
    }
  }
}
.navbar__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  margin: 0px 30px 0px 0px;
  padding: 0px;
  cursor: pointer;
}
// hover
.nav__icon:hover {
  i {
    transform: rotateY(180deg);
  }
}
.nav__text:hover {
  transform: scale(1.1);
}
</style>
