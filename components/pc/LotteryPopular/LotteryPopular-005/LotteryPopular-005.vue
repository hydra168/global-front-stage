<template>
  <div class="LotteryPopular-005">
    <v-row v-bind="wrapBind">
      <v-col v-for="(item, i) in lotteryList" :key="i" :cols="cols" class="lottery-item" :class="itemClass" @click="ROUTER_PUSH(item.link)">
        <img :src="item.icon" :alt="item.code" :width="iconWidth" class="item_img" :class="hoverClass" />
        <div class="ml-2">
          <h6 v-if="titleShow" :class="titleClass">{{ $t(item.title) }}</h6>
          <span v-if="subTitleShow" :class="subTitleClass">{{ item.subTitle }}</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-005',
  props: {
    cols: {
      type: String,
      default: '',
    },
    iconWidth: {
      type: String,
      default: '80px',
    },
    titleShow: {
      type: Boolean,
      default: true,
    },
    subTitleShow: {
      type: Boolean,
      default: true,
    },
    wrapBind: {
      type: Object,
      default: () => {},
    },
    itemClass: {
      type: String,
      default: 'd-flex justify-left align-center',
    },
    titleClass: {
      type: String,
      default: 'text-subtitle-1 font-weight-bold grey--text text--darken-3',
    },
    subTitleClass: {
      type: String,
      default: 'caption',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'swing-hover',
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
          icon: require('./assets/img/blue-js-ffc01.png'),
          link: 'play/6681474621111',
        },
        {
          sort: 5,
          show: true,
          code: 'js3fc',
          title: 'g_common_gameList_js3fc',
          subTitle: '',
          icon: require('./assets/img/blue-js-sfc.png'),
          link: 'play/960669940301',
        },
        {
          sort: 6,
          show: true,
          code: 'js5fc',
          title: 'g_common_gameList_js5fc',
          subTitle: '',
          icon: require('./assets/img/blue-js-wfc.png'),
          link: 'play/1608011465',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
  },
};
</script>

<style lang="scss" scope>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-005 {
  cursor: pointer;
}
</style>
