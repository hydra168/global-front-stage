<template>
  <div class="popular" :style="`background-image:url(${main__background});`">
    <div class="popular__title">
      <div class="popular__title__text1" :style="text1Color">
        <span>{{ $t(popularTitleText1) }}</span>
      </div>
      <img :src="lineImage" />
      <div class="popular__title__text2" :style="text2Color">
        <span>{{ $t(popularTitleText2) }}</span>
      </div>
    </div>
    <div class="popular__list">
      <div
        class="popular__list__img"
        :class="hoverClass"
        :style="`background: url(${item.src}) no-repeat;background-size: 100% 100%`"
        v-for="item in lotteryList"
        :key="item.name"
        @click="ROUTER_PUSH(item.link)"
      >
        <span>{{ $t(item.name) }}</span>
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
    main__background: {
      type: String,
      default: 'none',
    },
    popularTitleText1: {
      type: String,
      default: 'g_com_lotteryPopular_003_popularTitleText1',
    },
    popularTitleText2: {
      type: String,
      default: 'g_com_lotteryPopular_003_popularTitleText2',
    },
    popularText1Color: {
      type: String,
      default: '#13805e',
    },
    popularText2Color: {
      type: String,
      default: '#424242',
    },
    lineImage: {
      type: String,
      default: require('./assets/img/line.png'),
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
          code: 'sports',
          name: 'g_common_game_cs_sports',
          link: '/play/30n4hvJ4MGjhfY',
          src: require('./assets/img/lotteryPopular-003-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-003-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-003-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-003-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-003-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-003-06.png'),
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    text1Color() {
      return {
        color: `${this.popularText1Color}`,
      };
    },
    text2Color() {
      return {
        color: `${this.popularText2Color}`,
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
.popular {
  max-width: 1270px;
  margin: 0 auto;
  background-size: 100% 100%;
  .popular__title {
    padding-top: 50px;
    &__text1 {
      text-align: center;
      font-size: 36px;
      font-weight: 600;
    }
    &__text2 {
      text-align: center;
      padding-top: 20px;
      font-size: 24px;
    }
  }
  .popular__list {
    display: flex;
    flex-wrap: wrap;
    &__img {
      width: calc(100% / 3);
      height: 400px;
      cursor: pointer;
      position: relative;
      span {
        position: absolute;
        left: 20px;
        top: 338px;
        font-weight: 600;
        font-size: 24px;
      }
    }
  }
}
</style>
