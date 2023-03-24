<template>
  <div class="lotteryPopular" :style="backgroundStyle">
    <div class="game__wrap">
      <div class="game__list" :class="hoverClass" v-for="item in lotteryList" :key="item.name" @click="ROUTER_PUSH(item.link)">
        <div :style="gameBackgroudStyle(item.src)"></div>
        <div class="game__name">{{ $t(item.name) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    background: {
      type: Object,
      default: () => {
        return {
          img: require('./assets/img/lotteryPopular-004-bg.png'),
          height: '900px',
        };
      },
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'zoom-in-12-hover fade-in-hover',
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'sports',
          name: 'g_common_game_cs_sports',
          link: '/play/30n4hvJ4MGjhfY',
          src: require('./assets/img/lotteryPopular-004-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-004-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-004-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-004-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-004-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-004-06.png'),
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    backgroundStyle() {
      return {
        background: `url(${this.background.img}) no-repeat`,
        backgroundSize: `100% 100%`,
        height: this.background.height,
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    gameBackgroudStyle(src) {
      return {
        background: `url(${src}) no-repeat`,
        backgroundSize: '100% 100%',
        width: '312px',
        height: '312px',
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.lotteryPopular {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 917px;
  .game__wrap {
    max-width: 1056px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .game__list {
      display: flex;
      align-items: center;
      width: calc((100% - 60px) / 3);
      margin: 10px;
      cursor: pointer;
      position: relative;
    }
    .game__name {
      font-size: 21.6px;
      color: #ffffff;
      position: absolute;
      top: 86.5%;
      left: 3%;
    }
  }
}
</style>
