<template>
  <div class="LotteryPopular text-center" :class="LotteryPopularClass" :style="LotteryPopularStyle">
    <h3 :class="[titleClass]" v-html="$t(titleText)"></h3>
    <div class="lottery-list d-flex justify-center">
      <div
        v-for="(item, index) in lotteryList"
        :key="index"
        @click="ROUTER_PUSH(item.link)"
        @mouseover="lotteryItemHovering = true"
        @mouseout="lotteryItemHovering = false"
        class="d-flex justify-start flex-column align-center pointer lottery-item"
      >
        <div class="img">
          <img :src="item.src" alt="" />
        </div>
        <div class="item-space justify-center pointer"></div>
        <h4 :class="itemTitleClass">{{ $t(item.title) }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @param titleText: 標題按鈕
 * @param titleClass: 標題樣式
 * @param lotteryList: 顯示彩票
 * @param itemTitleClass: 標題按鈕
 */
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular',
  props: {
    titleText: {
      type: String,
      default: 'g_com_lotteryPopular_014_popularTitleText',
    },
    LotteryPopularClass: {
      type: String,
      default: 'white--text',
    },
    LotteryPopularStyle: {
      type: Object,
      default: () => {
        return {
          'background-image': `url(${require('./assets/img/bg.png')})`,
        };
      },
    },
    titleClass: {
      type: String,
      default: '',
    },
    itemTitleClass: {
      type: String,
      default: '',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultLotteryList: [
        { sort: 1, show: true, code: 'jsPk10', title: '极速PK10', link: '/play/BxkZVPiJb63a', src: require('./assets/img/blue-js-pk10.png') },
        { sort: 2, show: true, code: 'jsft', title: '极速飞艇', link: '/play/7043222726362', src: require('./assets/img/blue-js-ft.png') },
        { sort: 3, show: true, code: 'jssc', title: '极速飞车', link: '/play/2147212049129', src: require('./assets/img/blue-js-fc.png') },
        { sort: 4, show: true, code: 'jsff', title: '极速分分彩', link: '/play/6681474621111', src: require('./assets/img/blue-js-ff.png') },
        { sort: 5, show: true, code: 'js3f', title: '极速三分彩', link: '/play/960669940301', src: require('./assets/img/blue-js-3f.png') },
        { sort: 6, show: true, code: 'js5f', title: '极速五分彩', link: '/play/1608011465', src: require('./assets/img/blue-js-5f.png') },
      ],
      lotteryItemHovering: false,
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
  },
  methods: {
    ...mapMutations(['SET_CURRENT_MENU_TITLE']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    routerPush(link) {
      this.SET_CURRENT_MENU_TITLE(this.titleText);
      this.ROUTER_PUSH({ path: link });
    },
  },
};
</script>

<style lang="scss">
.LotteryPopular {
  height: 480px;
  padding-top: 40px;
  background-size: cover;
  h3 {
    object-fit: contain;
    font-family: RTWSYaYuanG0v1;
    font-size: 36px;
    letter-spacing: 1.6px;
    .style1 {
      color: var(--v-primary-base);
    }
  }
  .lottery-list {
    margin-top: 30px;
    .lottery-item {
      .img {
        margin: 20px 20px;
        width: 160px;
        height: 160px;
        object-fit: contain;
      }
      h4 {
        font-size: 16px;
        letter-spacing: 0px;
        text-align: center;
      }
      .item-space {
        margin-bottom: 20px;
        width: 34px;
        height: 5px;
        background-color: white;
      }
      &:hover {
        .img {
          content: url('./assets/img/hover-02.png');
        }
        .item-space {
          background-color: var(--v-primary-base);
        }
      }
    }
    .pointer {
      cursor: pointer;
    }
  }
}
</style>
