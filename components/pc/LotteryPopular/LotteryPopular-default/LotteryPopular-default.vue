<template>
  <v-card class="LotteryPopular" outlined>
    <v-card-title :class="[titleClass]" v-html="$t(titleText)"> </v-card-title>
    <v-container>
      <v-row :justify="rowJustify">
        <template v-for="(item, k) in lotteryList">
          <v-col :key="k" cols="2" @click="ROUTER_PUSH(item.link)" class="lottery-item d-flex flex-column align-center pointer" v-bind="bindCol">
            <v-img width="100" :src="item.icon" class="item_img"></v-img>
            <h3 class="text--h3 font-weight-black my-3 itemTitle" :class="itemTitleClass">{{ $t(item.title) }}</h3>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
/**
 * @param titleText: 標題按鈕
 * @param titleClass: 標題樣式
 * @param lotteryList: 顯示彩票
 * @param itemTitleClass: 標題按鈕
 */
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular',
  props: {
    titleText: {
      type: String,
      default: 'g_com_lotteryPopular_default_title',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    titleClass: {
      type: String,
      default: 'justify-center headline grey lighten-2',
    },
    itemTitleClass: {
      type: String,
      default: 'primary--text',
    },
    // .itemTitle hover 效果
    isHover: {
      type: Boolean,
      default: false,
    },
    lotteryItemBind: {
      type: Object,
    },
    rowJustify: {
      type: String,
      default: 'start',
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'jsPk10',
          title: 'g_common_gameList_jsPk10',
          subTitle: '',
          icon: require('./assets/img/blue-js-pk10.png'),
          link: 'play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'jssc',
          title: 'g_common_gameList_jscar',
          subTitle: '',
          icon: require('./assets/img/blue-js-fc.png'),
          link: 'play/2147212049129',
        },
        {
          sort: 3,
          show: true,
          code: 'jsft',
          title: 'g_common_gameList_jsft',
          subTitle: '',
          icon: require('./assets/img/blue-js-ft.png'),
          link: 'play/7043222726362',
        },
        {
          sort: 4,
          show: true,
          code: 'jsffc',
          title: 'g_common_gameList_jsffc',
          subTitle: '',
          icon: require('./assets/img/blue-js-ff.png'),
          link: 'play/6681474621111',
        },
        {
          sort: 5,
          show: true,
          code: 'js3fc',
          title: 'g_common_gameList_js3fc',
          subTitle: '',
          icon: require('./assets/img/blue-js-sf.png'),
          link: 'play/960669940301',
        },
        {
          sort: 6,
          show: true,
          code: 'js5fc',
          title: 'g_common_gameList_js5fc',
          subTitle: '',
          icon: require('./assets/img/blue-js-wf.png'),
          link: 'play/1608011465',
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    bindCol() {
      return Object.assign({ class: { itemhover: this.isHover } }, this.lotteryItemBind);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss">
@import '@ASSETS/scss/hover.scss';
.LotteryPopular {
  .pointer {
    cursor: pointer;
  }
  .itemhover:hover .itemTitle {
    border-radius: 7px;
    background-color: var(--v-primary-base);
    padding: 0 20px;
  }
  //hover效果
  .lottery-item:hover {
    .item_img {
      animation: swing 1s 1;
    }
  }
}
</style>
