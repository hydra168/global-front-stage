<template>
  <div class="nav" :class="navClass">
    <div class="nav-box">
      <ul class="">
        <div v-if="isShowLogo" class="nav-box">
          <img :src="logoUrlHandler" :width="logoWidth" alt="logo" style="cursor: pointer" @click="ROUTER_PUSH('/')" />
        </div>
        <template v-for="item in navbarList">
          <li :key="item.link" :class="[navTextClass, item.liClass]">
            <div class="d-flex justify-center align-center flex-row nav__list" @click="ROUTER_PUSH(item.link)">
              <div class="img">
                <img :src="item.src" />
              </div>
              <span :style="`color: ${item.color}`" :class="nav__text">{{ $t(item.name) }}</span>
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
        { sort: 1, code: 'home', show: true, name: 'g_common_link_home', link: '/', icon: 'home', src: require('./assets/001.png'), color: 'white' },
        {
          sort: 2,
          code: 'cssports',
          show: true,
          name: 'CS体育',
          link: '/play/30n4hvJ4MGjhfY',
          icon: 'sports_soccer',
          src: require('./assets/002.png'),
          color: 'white',
        },
        {
          sort: 3,
          code: 'lottor',
          show: true,
          name: '彩票旗舰站',
          link: '/ultimate',
          icon: 'gamepad',
          src: require('./assets/003.png'),
          color: 'white',
        },
        {
          sort: 4,
          code: 'userCentre',
          show: true,
          name: '个人中心',
          link: '/userCentre',
          icon: 'person',
          src: require('./assets/004.png'),
          color: 'white',
        },
        {
          sort: 5,
          code: 'promotion',
          show: true,
          name: '优惠活动',
          link: '/promotion',
          icon: 'card_giftcard',
          src: require('./assets/005.png'),
          color: 'white',
        },
        {
          sort: 6,
          code: 'appdownload',
          show: true,
          name: 'APP下载',
          link: '/appdownload',
          icon: 'smartphone',
          src: require('./assets/006.png'),
          color: 'white',
        },
        {
          sort: 7,
          code: 'pcdownload',
          show: false,
          name: 'g_com_navBar_005_menu_pc',
          link: '/installdownload',
          icon: 'desktop_windows',
          src: require('./assets/006.png'),
          color: 'white',
        },
        {
          sort: 8,
          code: 'liveChat',
          show: true,
          name: '投诉邮箱',
          link: 'liveChat',
          icon: 'email',
          src: require('./assets/007.png'),
          color: 'white',
        },
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
    handleMenuClick(item) {
      if (item.link == 'live') {
        this.SHOW_LIVE_CHAT(0);
      } else {
        this.$router.push({ path: item.link });
        this.Cpath = item.link;
      }
    },
    handleBack() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  .nav-box {
    width: 1200px;
    height: 102px;
    padding: 0 20%;
    display: flex;
    justify-content: space-around;
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
}

.nav__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-top: 10px;
  img {
    width: 26px;
    height: 28px;
    object-fit: contain;
  }
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
  margin: 0px 150px 0px 0px;
  padding: 0px;
  cursor: pointer;
}
//hover
li:hover {
  transform: scale(1.1);
}
.img {
  margin-right: 10px;
}
</style>
