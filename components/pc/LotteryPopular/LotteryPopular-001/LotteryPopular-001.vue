<template>
  <div class="LotteryPopular-001">
    <div class="banner__wrap py-10" :class="wrapClass" :style="{ backgroundImage: `url(${wrapBgImg})` }">
      <div class="d-flex justify-center align-center">
        <div v-for="(item, i) in lotteryList" :key="i" class="item__wrap" :class="[itemHoverClass, itemClass]" @click="ROUTER_PUSH(item.link)">
          <img :src="item.img" width="100%" />
          <h3 class="item__title" v-bind="{ class: titleClass, style: item.titlePosition }">{{ $t(item.title) }}</h3>
          <span class="item__btnTxt" v-bind="{ class: btnTxtClass, style: item.btnTxtPosition }">{{ $t(item.btnTxt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-001',
  props: {
    wrapClass: {
      type: String,
      default: 'px-10',
    },
    wrapBgImg: {
      type: String,
      default: require('./assets/img/lotteryPopular-001-bg.png'),
    },
    //hover效果
    itemHoverClass: {
      type: String,
      default: 'zoom-in-11-hover fade-in-hover',
    },
    itemClass: {
      type: String,
      default: 'mx-5',
    },
    titleClass: {
      type: String,
      default: 'text-h5 font-weight-bold grey--text text--darken-4',
    },
    btnTxtClass: {
      type: String,
      default: 'text-h5 font-weight-bold white--text',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'jssc',
          title: 'g_common_gameList_jscar',
          btnTxt: 'g_common_gameList_bet',
          img: require('./assets/img/lotteryPopular-001-01.png'),
          link: 'play/2147212049129',
          titlePosition: { top: '30px', right: '0', left: '0' },
          btnTxtPosition: { bottom: '30px', right: '0', left: '0' },
        },
        {
          sort: 2,
          show: true,
          code: 'jsft',
          title: 'g_common_gameList_jsft',
          btnTxt: 'g_common_gameList_bet',
          img: require('./assets/img/lotteryPopular-001-02.png'),
          link: 'play/7043222726362',
          titlePosition: { top: '30px', right: '0', left: '0' },
          btnTxtPosition: { bottom: '30px', right: '0', left: '0' },
        },
        {
          sort: 3,
          show: true,
          code: 'jssf',
          title: 'g_common_gameList_or_js3',
          btnTxt: 'g_common_gameList_bet',
          img: require('./assets/img/lotteryPopular-001-03.png'),
          link: 'play/960669940301',
          titlePosition: { top: '30px', right: '0', left: '0' },
          btnTxtPosition: { bottom: '30px', right: '0', left: '0' },
        },
        {
          sort: 4,
          show: true,
          code: 'jsff',
          title: 'g_common_gameList_jsffc',
          btnTxt: 'g_common_gameList_bet',
          img: require('./assets/img/lotteryPopular-001-04.png'),
          link: 'play/6681474621111',
          titlePosition: { top: '30px', right: '0', left: '0' },
          btnTxtPosition: { bottom: '30px', right: '0', left: '0' },
        },
        {
          sort: 5,
          show: true,
          code: 'jsPk10',
          title: 'g_common_gameList_jsPk10',
          btnTxt: 'g_common_gameList_bet',
          img: require('./assets/img/lotteryPopular-001-05.png'),
          link: 'play/BxkZVPiJb63a',
          titlePosition: { top: '30px', right: '0', left: '0' },
          btnTxtPosition: { bottom: '30px', right: '0', left: '0' },
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    titleBind() {
      return { class: this.titleClass };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scope>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-001 {
  .banner__wrap {
    background-repeat: no-repeat;
    background-size: cover;
  }
  .item__wrap {
    position: relative;
    cursor: pointer;
    .item__title {
      position: absolute;
      text-align: center;
    }
    .item__btnTxt {
      position: absolute;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
