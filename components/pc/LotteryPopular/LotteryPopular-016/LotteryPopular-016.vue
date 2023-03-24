<template>
  <div class="LotteryPopular-016">
    <div class="container" :style="logoImg">
      <div class="title">{{ $t(title) }}</div>
      <div class="d-flex justify-center">
        <div class="content__box" :class="[hoverClass]" v-for="item in lotteryList" :key="item.id" @click="ROUTER_PUSH(item.link)">
          <div><img :src="item.src" alt="" /></div>
          <div class="text01">{{ $t(item.name) }}</div>
          <div class="text02">{{ $t(item.name2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-016',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    bgImg: {
      type: String,
      default: require('./assets/img/lotteryPopular-016-bg.png'),
    },
    title: {
      type: String,
      default: 'g_common_gameList_quick_game',
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'zoom-in-11-hover',
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'sports',
          name: 'g_common_game_sport_game',
          name2: 'g_common_game_cs_sports',
          src: require('./assets/img/lotteryPopular-016-01.png'),
          link: '/play/30n4hvJ4MGjhfY',
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_bet',
          name2: 'g_common_gameList_lottery_flagship',
          src: require('./assets/img/lotteryPopular-016-02.png'),
          link: '/ultimate',
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_video',
          name2: 'g_common_game_ag_live',
          src: require('./assets/img/lotteryPopular-016-03.png'),
          link: '/liveLobby',
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_chesscard_showdown',
          name2: 'g_common_game_kaiyuan',
          src: require('./assets/img/lotteryPopular-016-04.png'),
          link: '/play/BgFcIROExgMd',
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_game',
          name2: 'g_common_game_mg_slot',
          src: require('./assets/img/lotteryPopular-016-05.png'),
          link: '/slotLobby',
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_fish_game',
          name2: 'g_common_game_ag_fish',
          src: require('./assets/img/lotteryPopular-016-06.png'),
          link: '/play/AGSvcZAA53g2Ly',
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    logoImg() {
      return {
        background: `url(${this.bgImg}) no-repeat`,
        'background-size': '100% 100%',
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding-left: 200px;
  padding-right: 100px;
  padding-top: 30px;
  padding-bottom: 20px;
  position: relative;
  .title {
    width: 30px;
    position: absolute;
    top: 34px;
    left: 17px;
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
}
.content__box {
  position: relative;
  cursor: pointer;
  .text01 {
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    color: white;
    font-size: 20px;
  }
  .text02 {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    color: white;
    font-size: 16px;
  }
}
</style>
