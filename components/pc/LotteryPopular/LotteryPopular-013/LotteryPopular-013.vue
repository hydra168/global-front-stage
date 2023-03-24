<template>
  <div class="LotteryPopular-013">
    <div class="popular__wrap">
      <div v-for="(item, i) in lotteryList" :key="i" class="popular__item" :class="hoverClass" @click="ROUTER_PUSH(item.link)">
        <div class="lotteryListTitle">
          <span>{{ $t(item.title) }}</span>
        </div>
        <img :src="item.icon" :width="iconWidth" class="popular__wrap" :class="hoverClass" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
// 本組件最好少用，請使用035
export default {
  name: 'LotteryPopular-013',
  props: {
    iconWidth: {
      type: String,
      default: '160px',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
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
          icon: require('./assets/img/lotteryPopular-013-01.png'),
          link: 'play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'jssc',
          title: 'g_common_gameList_jscar',
          subTitle: '',
          icon: require('./assets/img/lotteryPopular-013-02.png'),
          link: 'play/2147212049129',
        },
        {
          sort: 3,
          show: true,
          code: 'jsft',
          title: 'g_common_gameList_jsft',
          subTitle: '',
          icon: require('./assets/img/lotteryPopular-013-03.png'),
          link: 'play/7043222726362',
        },
        {
          sort: 4,
          show: true,
          code: 'jsffc',
          title: 'g_common_gameList_jsffc',
          subTitle: '',
          icon: require('./assets/img/lotteryPopular-013-04.png'),
          link: 'play/6681474621111',
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
.LotteryPopular-013 {
  cursor: pointer;
  .popular__wrap {
    height: 100%;
    display: flex;
    align-items: center;
    .popular__item {
      flex: 1;
      .popular__item-link {
        width: 100%;
      }
    }
    .lotteryListTitle {
      color: white;
      position: relative;
      top: 110px;
      left: 90px;
      width: 35px;
    }
  }
}
</style>
