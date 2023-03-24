<template>
  <div class="LotteryPopular-026">
    <div class="popular__wrap list1">
      <div :class="`popular__game goBig w${index}`" v-for="(item, index) in lotteryList01" :key="item.code" @click="ROUTER_PUSH(item.link)">
        <div :class="`popular__game__name w${index}`">{{ $t(item.name) }}</div>
        <img :class="`popular__game__img w${index}`" :src="item.src" />
      </div>
    </div>
    <div class="popular__wrap list2">
      <div :class="`popular__game goBig w${index}`" v-for="(item, index) in lotteryList02" :key="item.code" @click="ROUTER_PUSH(item.link)">
        <div :class="`popular__game__name w${index}`">{{ $t(item.name) }}</div>
        <img :class="`popular__game__img w${index}`" :src="item.src" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-026',
  props: {
    optionsLotteryList01: {
      type: Array,
      default: () => [],
    },
    optionsLotteryList02: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultLotteryList01: [
        {
          code: '1',
          show: true,
          name: '真人游戏',
          src: require('./assets/img/lotteryPopular-026-03.png'),
          link: 'liveLobby',
        },
        {
          code: '2',
          show: true,
          name: '彩票',
          src: require('./assets/img/lotteryPopular-026-02.png'),
          link: '/ultimate',
        },
      ],
      defaultLotteryList02: [
        {
          code: '3',
          show: true,
          name: '体育',
          src: require('./assets/img/lotteryPopular-026-01.png'),
          link: '/play/30n4hvJ4MGjhfY',
        },
        {
          code: '4',
          show: true,
          name: '老虎机',
          src: require('./assets/img/lotteryPopular-026-04.png'),
          link: '/slotLobby',
        },
        {
          code: '5',
          show: true,
          name: '捕鱼',
          src: require('./assets/img/lotteryPopular-026-05.png'),
          link: '/play/AGSvcZAA53g2Ly',
        },
      ],
    };
  },
  computed: {
    lotteryList01() {
      return mergeArrayObjectsCode(this.optionsLotteryList01, this.defaultLotteryList01);
    },
    lotteryList02() {
      return mergeArrayObjectsCode(this.optionsLotteryList02, this.defaultLotteryList02);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-026 {
  width: 1185px;
  display: flex;
  justify-content: flex-end;
  .goBig {
    transition: all 0.2s;
    transform: scale(1);
    &:hover {
      transform: scale(1.03);
    }
  }
  .popular__wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    &.list1 {
      transform: translateX(90px);
      .popular__game {
        &__name {
          position: absolute;
          font-size: 26px;
          font-style: italic;
          font-weight: 900;
          color: white;
          &.w0 {
            top: 70px;
            left: 380px;
            font-size: 42px;
          }
          &.w1 {
            top: 160px;
            left: 30px;
          }
        }
        &__img {
          width: 100%;
          &.w0 {
            width: 633px;
          }
          &.w1 {
            width: 570px;
          }
        }
      }
    }
    &.list2 {
      transform: translateX(-15px);
      .popular__game {
        text-align: right;
        &__name {
          position: absolute;
          font-size: 26px;
          font-style: italic;
          font-weight: 900;
          color: white;
          &.w0 {
            top: 190px;
            left: 100px;
          }
          &.w1 {
            top: 160px;
            left: 35px;
          }
          &.w2 {
            top: 160px;
            left: 80px;
          }
        }
        &__img {
          width: 100%;
          &.w0 {
            width: 570px;
          }
          &.w1 {
            width: 633px;
          }
          &.w2 {
            width: 633px;
          }
        }
      }
    }
  }
}
</style>
