<template>
  <div class="LotteryPopular-023" :style="backgroundImg">
    <div class="popular__wrap">
      <div class="popular__game__wrap">
        <div class="popular__game" :class="[hoverClass]" v-for="item in lotteryList" :key="item.name" @click="ROUTER_PUSH(item.link)">
          <div class="popular__game__name">{{ $t(item.name) }}</div>
          <div class="popular__game__play">{{ $t('g_common_gameList_play') }}</div>
          <img :src="item.src" :alt="$t(item.name)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-023',
  props: {
    backgroundImg: {
      type: Object,
      default: () => {
        return {
          background: `url(${require('./assets/img/lotteryPopular-023-bg.png')}) no-repeat`,
          backgroundSize: '100% 100%',
        };
      },
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    hoverClass: {
      type: String,
      default: 'shiny-hover zoom-in-11-hover',
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
          src: require('./assets/img/lotteryPopular-023-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-023-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-023-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-023-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-023-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-023-06.png'),
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-023 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .popular__wrap {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .popular__game__wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border-radius: 10px;
      .popular__game {
        margin: 20px;
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        &__name {
          color: white;
          text-align: center;
          font-size: 0.859vw;
          position: absolute;
          top: 1.37vw;
          left: 0;
          right: 0;
          margin: 0 auto;
        }
        &__play {
          color: white;
          text-align: center;
          font-size: 0.859vw;
          position: absolute;
          bottom: 1.85vw;
          left: 0;
          right: 0;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
