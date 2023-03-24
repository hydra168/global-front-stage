<template>
  <div class="LotteryPopular-024" :style="bgImg">
    <div class="popular__wrap">
      <div class="popular__game" :class="[hoverClass]" v-for="item in lotteryList" :key="item.name" @click="ROUTER_PUSH(item.link)">
        <div class="popular__game__name">{{ $t(item.name) }}</div>
        <img :src="item.src" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-024',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    backgroundImg: {
      type: String,
      default: require('./assets/img/lotteryPopular-024-bg.png'),
    },
    hoverClass: {
      type: String,
      default: 'fade-in-hover zoom-in-11-hover',
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
          src: require('./assets/img/lotteryPopular-024-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-024-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-024-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-024-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-024-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-024-06.png'),
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    bgImg() {
      return {
        background: `url(${this.backgroundImg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-024 {
  display: flex;
  justify-content: flex-end;
  .popular__wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin: 3% 10% 3% 0;
    width: 20%;
    cursor: pointer;
    .popular__game {
      width: 100%;
      position: relative;
      &__name {
        position: absolute;
        top: 2.1vw;
        left: 1.5vw;
        right: 0;
        font-size: 1.2vw;
        font-weight: 600;
        color: #f6dcb2;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
