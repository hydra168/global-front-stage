<template>
  <div class="nav">
    <div class="nav-box">
      <ul>
        <template v-for="item in navbarList">
          <li :key="item.link" :style="navBgColor" :class="{ nav__list__fixed: fixedNavStyle === true }">
            <div class="nav__list" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
              <div class="nav__icon">
                <v-icon x-large :color="navIconColor" v-bind="navIconBind">{{ item.icon }}</v-icon>
              </div>
              <span class="nav__text" :style="navTextColor">{{ $t(item.name) }}</span>
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
        { sort: 1, code: 'home', show: true, icon: 'home', name: 'g_common_link_home', link: '/' },
        { sort: 2, code: 'cssports', show: true, icon: 'sports_soccer', name: 'g_common_navbar_menu_sports', link: '/play/30n4hvJ4MGjhfY' },
        { sort: 3, code: 'chess', show: true, icon: 'casino', name: 'g_common_game_chesscard_showdown', link: '/play/BgFcIROExgMd' },
        { sort: 4, code: 'live', show: true, icon: 'face', name: 'g_common_game_live', link: '/live' },
        { sort: 5, code: 'lottery', show: true, icon: 'games', name: 'g_common_game_lottery_bet', link: '/ultimate' },
        { sort: 6, code: 'slot', show: true, icon: 'sports_esports', name: 'g_common_game_slot_game', link: '/slot' },
        { sort: 7, code: 'fish', show: true, icon: 'gps_fixed', name: 'g_common_game_fish_game', link: '/play/AGSvcZAA53g2Ly' },
        { sort: 8, code: 'promotion', show: true, icon: 'card_giftcard', name: 'g_common_link_promotions', link: '/promotion' },
        { sort: 9, code: 'userCentre', show: true, icon: 'perm_identity', name: 'g_common_link_user', link: '/userCentre' },
        { sort: 10, code: 'appdownload', show: true, icon: 'smartphone', name: 'g_common_link_app', link: '/appdownload' },
        { sort: 11, code: 'installdownload', show: true, icon: 'desktop_windows', name: 'g_common_link_pc', link: '/installdownload' },
        { sort: 12, code: 'helpCentre', show: true, icon: 'help_outline', name: 'g_common_link_help', link: '/helpCentre' },
        { sort: 13, code: 'liveChat', show: true, icon: 'support_agent', name: 'g_common_link_feedback', link: 'liveChat' },
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
    handleMenuClick(item) {
      this.Cpath = item.link;
      if (item.link == 'live') {
        this.SHOW_LIVE_CHAT(0);
      } else {
        this.$router.push({ path: item.link });
      }
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
