<template>
  <div class="nav">
    <div class="nav-box">
      <ul>
        <template v-for="item in menuLeftData">
          <li :key="item.link">
            <div class="nav__wrap" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
              <div class="nav__box" :style="menuImg(item)">
                <span :class="`${textColor}--text`">{{ $t(item.name) }}</span>
              </div>
            </div>
          </li>
        </template>
        <div class="navbar__logo">
          <img v-if="isShowLogo" :src="logoUrlHandler" :width="logoWidth" alt="logo" style="cursor: pointer" @click="ROUTER_PUSH('/')" />
        </div>
        <template v-for="item in menuRightData">
          <li :key="item.link">
            <div class="nav__wrap" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
              <div class="nav__box" :style="menuImg(item)">
                <span :class="`${textColor}--text`">{{ $t(item.name) }}</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
export default {
  name: 'Navbar',

  props: {
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
    bgColor: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: 'white',
    },
    menuLeftData: {
      type: Array,
      default: () => [
        { name: 'g_common_game_cs_sports', link: '/play/30n4hvJ4MGjhfY', src: require('./assets/1.png') },
        { name: 'g_common_game_kaiyuan', link: '/play/BgFcIROExgMd', src: require('./assets/2.png') },
        { name: 'g_common_game_live', link: '/play/AGwftrtxRP9syJ', src: require('./assets/3.png') },
        { name: 'g_common_game_lottery_bet', link: '/ultimate', src: require('./assets/4.png') },
      ],
    },
    menuRightData: {
      type: Array,
      default: () => [
        { name: 'g_common_game_mg_slot', link: '/play/slot', src: require('./assets/5.png') },
        { name: 'g_common_game_ag_fish', link: '/play/AGSvcZAA53g2Ly', src: require('./assets/6.png') },
        { name: 'g_common_link_promotions', link: '/promotion', src: require('./assets/7.png') },
        { name: 'g_common_link_app', link: '/appdownload', src: require('./assets/8.png') },
      ],
    },
  },

  computed: {
    ...mapGetters(['config']),
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    menuImg(item) {
      return {
        background: `url(${item.src}) no-repeat`,
        backgroundSize: '100% 100%',
        width: item.width,
        height: item.height,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  .nav-box {
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      display: flex;
      justify-content: space-between;
      list-style: none;
      li {
        text-align: center;
        color: #fff;
        position: relative;
        cursor: pointer;
        width: 120px;
      }
    }
  }
}
.nav__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  cursor: pointer;
  .nav__box {
    display: flex;
    justify-content: center;
    span {
      font-size: 16px;
      padding-bottom: 40px;
    }
  }
}
.navbar__logo {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  margin: auto;
}
// hover
li:hover {
  transform: scale(1.1);
}
</style>
