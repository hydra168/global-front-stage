<template>
  <div class="NavBar-002" :class="wrapClass">
    <v-container class="d-flex justify-space-between pr-0" :style="{ maxWidth: maxWidth }">
      <div class="nav-wapper">
        <img v-if="isShowLogo" :src="logoUrlHandler" :width="logoWidth" alt="logo" style="cursor: pointer" @click="ROUTER_PUSH('/')" />
        <ul>
          <template v-for="(item, i) in youshi">
            <li
              :key="i"
              @mouseover="currentHover = i"
              @mouseleave="currentHover = null"
              @click="item.func"
              :style="currentHover === i ? styleObject : ''"
              :class="itemClass"
            >
              <span>{{ $t(item.title) }}</span>
            </li>
          </template>
        </ul>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'NavBar-002',
  props: {
    wrapClass: {
      type: String,
      default: 'black',
    },
    maxWidth: {
      type: String,
      default: '1500px',
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
    hoverLink: {
      type: String,
      default: require(`./assets/hover-style.png`),
    },
    hoverColor: {
      type: String,
      default: '#e3b547',
    },
    itemClass: {
      type: String,
      default: 'px-4',
    },
    menuDataOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      Cpath: '/',
      currentHover: null,
      menuData: [
        { sort: 1, show: true, lang: 'menu_home', code: 'home', title: 'g_common_link_home', func: () => this.ROUTER_PUSH('/') },
        { sort: 2, show: true, lang: 'menu_lottery', code: 'ultimate', title: 'g_common_link_lottery', func: () => this.ROUTER_PUSH('/ultimate') },
        {
          sort: 3,
          show: true,
          lang: 'menu_popularColors',
          code: 'popularLottery',
          title: 'g_common_link_lotteryPopular',
          func: () => this.ROUTER_PUSH('/play/7043222726362'),
        },
        {
          sort: 4,
          show: true,
          lang: 'menu_promotions',
          code: 'promotion',
          title: 'g_common_link_promotions',
          func: () => this.ROUTER_PUSH('/promotion'),
        },
        { sort: 5, show: true, lang: 'menu_user', code: 'userCentre', title: 'g_common_link_user', func: () => this.ROUTER_PUSH('/userCentre') },
        { sort: 6, show: true, lang: 'menu_app', code: 'appdownload', title: 'g_common_link_app', func: () => this.ROUTER_PUSH('/appdownload') },
        {
          sort: 7,
          show: true,
          lang: 'menu_pc',
          code: 'installdownload',
          title: 'g_common_link_pc',
          func: () => this.ROUTER_PUSH('/installdownload'),
        },
        { sort: 8, show: true, lang: 'menu_help', code: 'helpCentre', title: 'g_common_link_help', func: () => this.ROUTER_PUSH('/helpCentre') },
        { sort: 9, show: true, lang: 'menu_channel', code: 'liveChat', title: 'g_common_link_feedback', func: () => this.SHOW_LIVE_CHAT(0) },
      ],
    };
  },
  computed: {
    ...mapGetters(['config']),
    youshi() {
      return mergeArrayObjectsCode(this.menuDataOptions, this.menuData);
    },
    styleObject() {
      return {
        backgroundImage: `url(${this.hoverLink})`,
        color: this.hoverColor,
      };
    },
    textFilter(text) {
      return textFilter(text, 'com_navbar_002_');
    },
    logoUrlHandler() {
      return this.config.logo_image_pc || this.logoUrl;
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss">
.NavBar-002 {
  .nav-wapper {
    width: 100%;
    display: flex;
    justify-content: space-around;
    ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0px;
      li {
        color: #ffffff;
        list-style: none;
        cursor: pointer;
        font-size: 18px;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        text-align: center;
        background-size: 100% 100%;
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }
  }
}
</style>
