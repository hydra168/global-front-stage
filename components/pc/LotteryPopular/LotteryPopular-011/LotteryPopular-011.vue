<template>
  <div class="box__wrap" :style="bgStyle">
    <div class="content__title">
      <div :class="`content__title__text ${contentTitleColor}--text`">{{ $t('g_common_game_hot_game') }}</div>
      <img :src="lineImg" />
    </div>
    <div class="game__list">
      <div
        class="game__box"
        v-for="item in lotteryList"
        :key="item.name"
        :class="[hoverClass]"
        :style="gameStyle(item.src)"
        @click="ROUTER_PUSH(item.link)"
      >
        <p class="name">{{ item.name }}</p>
        <div>{{ $t('g_common_gameList_enter') }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular11',
  props: {
    // 背景圖
    bgImg: {
      type: String,
      default: require('./assets/img/lotteryPopular-011-bg.png'),
    },
    // 底線圖
    lineImg: {
      type: String,
      default: require('./assets/img/lotteryPopular-011-line.png'),
    },
    // 遊戲區塊 title 顏色
    contentTitleColor: {
      type: String,
      default: 'black',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    //hover效果
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
          src: require('./assets/img/lotteryPopular-011-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-011-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-011-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-011-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-011-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-011-06.png'),
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    bgStyle() {
      return {
        background: `url(${this.bgImg}) no-repeat`,
        backgroundSize: '100% 100%',
        height: '498px',
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    gameStyle(img) {
      return {
        background: `url(${img}) no-repeat`,
        backgroundSize: '100% 100%',
        width: '240px',
        height: '240px',
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.box__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .content__title {
    display: flex;
    flex-direction: column;
    text-align: center;
    &__text {
      font-size: 30px;
    }
  }
  .game__list {
    display: flex;
    .game__box {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      position: relative;
      .name {
        position: absolute;
        top: 15%;
      }
    }
  }
}
</style>
