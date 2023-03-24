<template>
  <div class="LotteryPopular-020" :style="bgImg">
    <div class="popular__wrap">
      <div class="top__list">
        <div class="top__item" :class="[hoverClass]" v-for="(item, i) in lotteryTopList" :key="i" @click="ROUTER_PUSH(item.link)">
          <img :src="item.src" :alt="$t(item.name)" />
          <div :class="`top__item__name ${textColor}`">{{ $t(item.name) }}</div>
        </div>
      </div>
      <div class="bottom__list">
        <div class="bottom__item" :class="[hoverClass]" v-for="(item, i) in lotteryBottomList" :key="i" @click="ROUTER_PUSH(item.link)">
          <img :src="item.src" :alt="$t(item.name)" />
          <div :class="`bottom__item__name ${textColor}`">{{ $t(item.name) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-020',
  props: {
    backgroundImg: {
      type: String,
      default: require('./assets/img/lotteryPopular-020-bg.png'),
    },
    textColor: {
      type: String,
      default: 'primary--text',
    },
    optionsTopLotteryList: {
      type: Array,
      default: () => [],
    },
    optionsBottomLotteryList: {
      type: Array,
      default: () => [],
    },
    hoverClass: {
      type: String,
      default: 'frozen-hover',
    },
  },
  data() {
    return {
      defaultTopLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'sports',
          name: 'g_common_game_cs_sports',
          link: '/play/30n4hvJ4MGjhfY',
          src: require('./assets/img/lotteryPopular-020-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-020-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-020-03.png'),
        },
      ],
      defaultBottomLotteryList: [
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-020-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-020-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-020-06.png'),
        },
      ],
    };
  },
  computed: {
    lotteryTopList() {
      return mergeArrayObjectsCode(this.optionsTopLotteryList, this.defaultTopLotteryList);
    },
    lotteryBottomList() {
      return mergeArrayObjectsCode(this.optionsBottomLotteryList, this.defaultBottomLotteryList);
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

.LotteryPopular-020 {
  .popular__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .top__list,
    .bottom__list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px;
      width: 100%;
    }
    .top__list {
      .top__item {
        margin: 20px;
        transform: translateX(-4.29vw);
        cursor: pointer;
        position: relative;
        width: 17.5%;
        &__name {
          position: absolute;
          top: 1.93vw;
          left: 2.83vw;
          font-size: 0.86vw;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .bottom__list {
      .bottom__item {
        margin: 20px;
        transform: translateX(4.29vw);
        cursor: pointer;
        position: relative;
        width: 17.5%;
        &__name {
          position: absolute;
          top: 1.93vw;
          left: 2.83vw;
          font-size: 0.86vw;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
