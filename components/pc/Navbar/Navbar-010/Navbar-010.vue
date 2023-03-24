<template>
  <div class="nav">
    <v-container class="nav-box">
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
      <ul class="d-flex">
        <template v-for="item in navbarList">
          <li :key="item.link" @mouseover="mousemoveList(item.code)">
            <div class="nav__list" v-bind="bindNavList" @click="item.code === 'home' ? handleMenuClick(item) : () => {}">
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
    <div class="wrap__mousemove" @mouseleave="mouseleaveList" v-if="focusDisplay">
      <div class="limit__width d-flex justify-center align-center">
        <div class="d-flex justify-start align-center flex-wrap">
          <div class="box__width" v-for="item in focusHover" :key="item.id">
            <div>
              <div
                :style="item.focus ? `background-color:${hoverColor}` : ''"
                class="box__img"
                @click="handleMenuClick(item)"
                @mouseover="mouseoverBtn(item)"
                @mouseleave="mouseleaveBtn(item)"
              >
                <img :src="item.img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'Navbar',
  props: {
    hoverColor: {
      type: String,
      default: '#ffb300',
    },
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
    sportHoverData: {
      type: Array,
      default: () => [{ img: require('./assets/mousemove01.png'), link: '/play/30n4hvJ4MGjhfY', focus: false }],
    },
    chessHoverData: {
      type: Array,
      default: () => [{ img: require('./assets/mousemove04.png'), link: 'https://playsw.ky013.com/', focus: false }],
    },
    liveHoverData: {
      type: Array,
      default: () => [
        // { img: require('./assets/mousemove07.png'), link: '/liveLobby', focus: false },
        // { img: require('./assets/mousemove02.png'), link: '/liveLobby', focus: false },
        {
          img: require('./assets/mousemove03.png'),
          link: 'https://bg789.com/demo.html#/',
          focus: false,
        },
        { img: require('./assets/mousemove05.png'), link: 'https://www.sexy-gaming.com/?readyGetKey=1&readyLanguage=cn', focus: false },
      ],
    },
    lotteryHoverData: {
      type: Array,
      default: () => [],
    },
    slotHoverData: {
      type: Array,
      default: () => [
        { img: require('./assets/mousemove06.png'), link: 'https://demo.iconic-gaming.com/', focus: false },
        // { img: require('./assets/mousemove02.png'), link: '/slotLobby', focus: false },
      ],
    },
    fishHoverData: {
      type: Array,
      default: () => [
        { img: require('./assets/mousemove06.png'), link: 'https://demo.iconic-gaming.com/', focus: false },
        {
          img: require('./assets/mousemove03.png'),
          link: 'https://bg789.com/demo.html#/',
          focus: false,
        },
      ],
    },
  },
  data() {
    return {
      Cpath: '/',
      focusHover: [],
      focusDisplay: false,
    };
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    handleMenuClick(item) {
      if (/^http(s)*:\/\//.test(item.link)) {
        window.open(item.link);
        return;
      }
      if (item.link == 'liveChat') {
        this.SHOW_LIVE_CHAT(0);
      } else {
        this.$router.push(item.link);
        this.Cpath = item.link;
      }
    },
    mousemoveList(code) {
      if (code == 'cssports') {
        this.focusHover = this.sportHoverData;
      } else if (code == 'chess') {
        this.focusHover = this.chessHoverData;
      } else if (code == 'live') {
        this.focusHover = this.liveHoverData;
      } else if (code == 'lottery') {
        this.focusHover = this.lotteryHoverData;
      } else if (code == 'slot') {
        this.focusHover = this.slotHoverData;
      } else if (code == 'fish') {
        this.focusHover = this.fishHoverData;
      } else {
        this.focusHover = [];
      }
      if (this.focusHover.length == 0) {
        this.focusDisplay = false;
      } else {
        this.focusDisplay = true;
      }
    },
    mouseleaveList() {
      this.focusDisplay = false;
    },
    mouseoverBtn(item) {
      item.focus = true;
    },
    mouseleaveBtn(item) {
      item.focus = false;
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
    defaultList() {
      const home = [];
      if (this.showHome) {
        home.push({ code: 'home', show: true, name: 'g_common_link_home', link: '/', icon: 'home' });
      }
      return [
        ...home,
        { sort: 1, code: 'cssports', show: true, name: 'g_common_navbar_menu_sports', link: '/play/30n4hvJ4MGjhfY', icon: 'sports_soccer' },
        { sort: 2, code: 'chess', show: true, name: 'g_common_game_chesscard_showdown', link: '/chessLobby', icon: 'casino' },
        { sort: 3, code: 'live', show: true, name: 'g_common_game_live', link: '/liveLobby', icon: 'face' },
        { sort: 4, code: 'lottery', show: true, name: 'g_common_game_lottery_bet', link: '/ultimate', icon: 'games' },
        { sort: 5, code: 'slot', show: true, name: 'g_common_game_slot_game', link: '/slotLobby', icon: 'sports_esports' },
        { sort: 6, code: 'fish', show: true, name: 'g_common_game_fish_game', link: '/fishLobby', icon: 'gps_fixed' },
        { sort: 7, code: 'liveChat', show: true, name: 'g_com_navBar_005_menu_customerService', link: 'liveChat', icon: 'email' },
      ];
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.limit__width {
  max-width: 1200px;
  margin: 0 auto;
}
.nav {
  position: relative;
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
          padding-left: 1em;
        }
      }
    }
  }
  .wrap__mousemove {
    transition: 0.3s;
    z-index: 100;
    position: absolute;
    top: 100%;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    .box__width {
      width: 400px;
      .box__img {
        width: auto;
        margin: auto;
        height: 70px;
        margin-left: 50px;
        margin-right: 50px;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 6px;
        padding-bottom: 6px;
        cursor: pointer;
        border-radius: 5px;
        transition: 0.3s;
        img {
          // width: 100%;
          height: 100%;
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
  margin: 0px;
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
