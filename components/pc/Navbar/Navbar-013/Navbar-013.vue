<template>
  <div class="nav">
    <div class="nav-box">
      <ul>
        <template v-for="item in navbarList">
          <li :key="item.link" :style="navBgColor" :class="{ nav__list__fixed: fixedNavStyle === true }">
            <div class="nav__list" @click="item.func">
              <div class="nav__icon">
                <v-icon large :color="navIconColor" v-bind="navIconBind">{{ item.icon }}</v-icon>
              </div>
              <span class="nav__text" :style="navTextColor">{{ $t(item.title) }}</span>
              <span v-if="showRouterLinkActive" :class="{ 'router-link-active': Cpath == item.link }"></span>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
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
    list: {
      type: Array,
      default: () => [],
    },
    navBg: {
      type: String,
      default: '#859ed2',
    },
    navText: {
      type: Object,
      default: () => {
        return {
          color: '#fff',
          fontSize: '24px',
        };
      },
    },
    fixedNavStyle: {
      type: Boolean,
      default: false,
    },
    showRouterLinkActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      Cpath: '/',
      defaultList: [
        { sort: 1, show: true, code: 'home', icon: 'home', title: 'g_common_link_home', func: () => this.ROUTER_PUSH('/') },
        {
          sort: 2,
          show: true,
          code: 'cssports',
          icon: 'sports_soccer',
          title: 'g_common_navbar_menu_sports',
          func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
        },
        {
          sort: 3,
          show: true,
          code: 'chess',
          icon: 'casino',
          title: 'g_common_game_chesscard_showdown',
          func: () => this.ROUTER_PUSH('/play/BgFcIROExgMd'),
        },
        { sort: 4, show: true, code: 'live', icon: 'face', title: 'g_common_game_live', func: () => this.ROUTER_PUSH('/play/AGwftrtxRP9syJ') },
        { sort: 5, show: true, code: 'lottery', icon: 'games', title: 'g_common_game_lottery_bet', func: () => this.ROUTER_PUSH('/ultimate') },
        { sort: 6, show: true, code: 'slot', icon: 'sports_esports', title: 'g_common_game_slot_game', func: () => this.ROUTER_PUSH('/play/slot') },
        {
          sort: 7,
          show: true,
          code: 'fish',
          icon: 'gps_fixed',
          title: 'g_common_game_fish_game',
          func: () => this.ROUTER_PUSH('/play/AGSvcZAA53g2Ly'),
        },
        {
          sort: 8,
          show: true,
          code: 'promotion',
          icon: 'card_giftcard',
          title: 'g_common_link_promotions',
          func: () => this.ROUTER_PUSH('/promotion'),
        },
        { sort: 9, show: true, code: 'userCentre', icon: 'perm_identity', title: 'g_common_link_user', func: () => this.ROUTER_PUSH('/userCentre') },
        { sort: 10, show: true, code: 'appdownload', icon: 'smartphone', title: 'g_common_link_app', func: () => this.ROUTER_PUSH('/appdownload') },
        { sort: 11, show: true, code: 'helpCentre', icon: 'help_outline', title: 'g_common_link_help', func: () => this.ROUTER_PUSH('/helpCentre') },
        { sort: 13, show: true, code: 'liveChat', icon: 'support_agent', title: 'g_common_link_feedback', func: () => this.SHOW_LIVE_CHAT(0) },
      ],
    };
  },
  computed: {
    navbarList() {
      return mergeArrayObjectsCode(this.list, this.defaultList);
    },
    navBgColor() {
      return {
        backgroundColor: this.navBg,
      };
    },
    navTextColor() {
      return {
        fontSize: this.navText.fontSize,
        color: this.navText.color,
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
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
      width: 100%;
      display: flex;
      justify-content: center;
      list-style: none;
      li {
        margin: 0px;
        padding: 10px 0px;
        text-align: center;
        color: #9f9f9f;
        position: relative;
        cursor: pointer;
        width: 20%;
        &:nth-child(1) {
          background-color: #fff;
          span {
            color: #000;
          }
        }
      }
    }
  }
}
.nav__list {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    padding-left: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0px;
    text-align: center;
  }
}
.nav__icon {
  transition: all 0.5s;
  &:hover {
    transform: rotateY(180deg);
  }
}
</style>
