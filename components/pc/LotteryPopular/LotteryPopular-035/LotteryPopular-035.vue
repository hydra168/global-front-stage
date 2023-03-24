<template>
  <div class="LotteryPopular-013">
    <div class="popular__wrap">
      <div v-for="(item, i) in lotteryList" :key="i" class="popular__item" @click="ROUTER_PUSH(item.link)">
        <img :src="item.icon" :width="iconWidth" class="popular__wrap" :class="hoverClass" />
        <span class="popular__title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
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
          icon: require('./assets/img/lotteryPopular-035-01.png'),
          link: 'play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'jssc',
          title: 'g_common_gameList_jscar',
          subTitle: '',
          icon: require('./assets/img/lotteryPopular-035-02.png'),
          link: 'play/2147212049129',
        },
        {
          sort: 3,
          show: true,
          code: 'jsft',
          title: 'g_common_gameList_jsft',
          subTitle: '',
          icon: require('./assets/img/lotteryPopular-035-03.png'),
          link: 'play/7043222726362',
        },
        {
          sort: 4,
          show: true,
          code: 'jsffc',
          title: 'g_common_gameList_jsffc',
          subTitle: '',
          icon: require('./assets/img/lotteryPopular-035-04.png'),
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
      position: relative;
      .popular__item-link {
        width: 100%;
      }
      .popular__title {
        position: absolute;
        top: 50%;
        right: 33%;
        width: 20%;
        transform: translate(50%, -50%);
        color: white;
      }
    }
  }
}
</style>
