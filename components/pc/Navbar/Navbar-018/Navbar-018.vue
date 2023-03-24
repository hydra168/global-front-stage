<template>
  <div class="nav">
    <v-container class="nav-box">
      <ul class="d-flex">
        <div v-if="isShowLogo" class="navbar__logo" @click="ROUTER_PUSH('/')">
          <img :src="logoUrlHandler" :width="logoWidth" v-bind="logoImgBind" />
        </div>
        <!-- <v-spacer /> -->
        <template v-for="item in navbarList">
          <li :key="item.link">
            <div class="nav__list" v-bind="bindNavList" @click="handleMenuClick(item)">
              <div class="nav__icon pa-0 ma-0">
                <!-- <v-icon v-bind="bindNavIcon">{{ item.icon }}</v-icon> -->
                <img :src="item.src" alt="" />
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
        { sort: 1, code: 'home', show: true, name: '首页', link: '/', src: require('./assets/header_1.png') },
        { sort: 2, code: 'sport', show: true, name: '竞猜型体育', link: '/play/30n4hvJ4MGjhfY', src: require('./assets/header_2.png') },
        { sort: 3, code: 'lottery', show: true, name: '即开型彩票', link: '/ultimate', src: require('./assets/header_3.png') },
        { sort: 4, code: 'sportInfo', show: true, name: '体育资讯', link: 'showWindowsSportInfo', src: require('./assets/header_4.png') },
        { sort: 5, code: 'userCentre', show: true, name: '个人中心', link: '/userCentre', src: require('./assets/header_5.png') },
        { sort: 6, code: 'pcDownload', show: true, name: '电脑 APP', link: '/installdownload', src: require('./assets/header_6.png') },
        { sort: 7, code: 'appDownload', show: true, name: '手机 APP', link: '/appdownload', src: require('./assets/header_7.png') },
        { sort: 8, code: 'helpCenter', show: true, name: '帮助中心', link: '/helpCentre/problem', src: require('./assets/header_9.png') },
        { sort: 9, code: 'liveChat', show: true, name: '投诉邮箱', link: 'liveChat', src: require('./assets/header_8.png') },
      ],
    };
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    handleMenuClick(item) {
      if (item.link == 'liveChat') {
        this.SHOW_LIVE_CHAT(0);
      } else if (item.link === 'liveChatTawk') {
        this.SHOW_LIVE_CHAT(1);
      } else if (item.link === 'showWindowsSportInfo') {
        window.open('https://tyzb360.com/');
      } else {
        this.$router.push({ path: item.link });
        this.Cpath = item.link;
      }
    },
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
      list-style: none;
      li {
        text-align: center;
        position: relative;
        cursor: pointer;
        width: 100px;
        @media screen and (max-width: 1904px) {
          width: 110px;
        }
        /* .router-link-active {
          width: 35px;
          height: 9px;
          margin-top: 15px;
          background-color: map-get(map-get($colors, primary), base);
        } */
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
            height: 28px;
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
