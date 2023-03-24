<template>
  <div class="LotteryPopular-008">
    <div v-for="(item, i) in lotteryList" :key="i">
      <div class="d-flex justify-space-between align-center" :class="itemClass">
        <img :src="item.icon" :width="iconWidth" />
        <h6 :class="titleClass">{{ $t(item.title) }}</h6>
        <div :class="btnClass" @click="ROUTER_PUSH(item.link)">{{ item.subTitle ? item.subTitle : commonTextFilter('bet') }}</div>
      </div>
      <hr v-bind="lineStyleObject" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode } from '@UTILS';
export default {
  name: 'LotteryPopular-008',
  props: {
    itemClass: {
      type: String,
      default: '',
    },
    iconWidth: {
      type: String,
      default: '80px',
    },
    titleClass: {
      type: String,
      default: 'text-subtitle-1',
    },
    btnClass: {
      type: String,
      default: 'primary white--text rounded pa-7',
    },
    lineStyle: {
      type: Object,
      default: () => {
        return {
          'border-top': '1px dotted #949494',
          margin: '.8rem 0',
        };
      },
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
      ],
    };
  },
  computed: {
    lineStyleObject() {
      return Object.assign({ style: this.lineStyle });
    },
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    commonTextFilter(text) {
      return textFilter(text, 'common_gameList_', {}, this);
    },
  },
};
</script>
