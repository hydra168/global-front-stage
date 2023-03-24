<template>
  <div class="LotteryPopular-028">
    <div class="popular__title d-flex justify-center align-center flex-column mb-7">
      <div class="popular__title__text1" :style="text1Color">
        <div class="left mr-3"></div>
        <span class="primary--text">{{ $t(popularTitleText1) }}</span>
        <div class="right ml-3"></div>
      </div>
      <div class="popular__title__text2" :style="text1Color">
        <span class="primary--text">{{ $t(popularTitleText2) }}</span>
      </div>
    </div>
    <div class="popular__wrap pa-5" :style="setleftsideBG(leftsideBGUrl)">
      <div
        class="popular__game"
        v-for="(item, index) in lotteryList"
        :class="{ 'select-css': index === selectIndex }"
        :key="item.name"
        @click="setSelectIndex(index)"
        @mouseenter="chnageHoverIndex('enter', index)"
        @mouseleave="chnageHoverIndex('leave', index)"
      >
        <div class="popular__game__name">{{ $t(item.name) }}</div>
        <template v-if="index === selectIndex || index === hoverIndex"> <img :src="item.hoverSrc" /> </template>
        <template v-else> <img :src="item.src" /> </template>
      </div>
    </div>
    <div class="main__img" :style="ImgStyle(lotteryList[selectIndex].contentSrc)" @click="ROUTER_PUSH(lotteryList[selectIndex].link)"></div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-028',
  props: {
    backgroundImg: {
      type: String,
      default: require('./assets/img/lotteryPopular-028-bg.png'),
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    hoverClass: {
      type: String,
      default: 'fade-in-hover zoom-in-11-hover',
    },
    leftsideBGUrl: {
      type: String,
      default: '',
    },
    popularTitleText1: {
      type: String,
      default: 'g_com_indexContent_010_popular_title',
    },
    popularTitleText2: {
      type: String,
      default: 'g_com_indexContent_010_popular_title',
    },
    popularText1Color: {
      type: String,
      default: '#000000',
    },
    popularText2Color: {
      type: String,
      default: '#A7A7A7',
    },
  },
  data() {
    return {
      selectIndex: 0,
      hoverIndex: null,
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'sports',
          name: 'g_common_game_cs_sports',
          link: '/play/30n4hvJ4MGjhfY',
          src: require('./assets/img/lotteryPopular-028-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-028-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-028-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-028-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-028-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-028-06.png'),
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
    setSelectIndex(newIndex = 0) {
      this.selectIndex = newIndex;
    },
    ImgStyle(src) {
      return {
        backgroundImage: `url(${src})`,
        backgroundSize: '100% 100%',
      };
    },
    chnageHoverIndex(event, index) {
      if (event === 'enter') {
        this.hoverIndex = index;
      }
      if (event === 'leave') {
        this.hoverIndex = null;
      }
    },
    setleftsideBG(url = '') {
      if (url === '') {
        return {};
      }
      return {
        backgroundImage: `url(${url})`,
        backgroundSize: '100% 100%',
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-028 {
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  // justify-content: flex-start;
  .popular__wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    // padding: 3% 0% 3% 0;
    width: 20%;
    cursor: pointer;
    .popular__game {
      width: 100%;
      position: relative;
      &__name {
        position: absolute;
        top: 0.8vw;
        left: 1.5vw;
        right: 0;
        font-size: 1vw;
        font-weight: 400;
        color: #000000;
      }
      img {
        width: 100%;
      }
    }
  }
  .main__img {
    width: 80%;
  }
}
.select-css {
  transform: scale(1.1);
  transition: all 0.5s;
}
.popular__title {
  width: 100%;
  padding-top: 50px;
  &__text1 {
    display: inline-flex;
    align-items: center;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
  }
  &__text2 {
    text-align: center;
    font-size: 18px;
  }
}
.left {
  background-image: url('./assets/img/lotteryPopular-028-frame.png');
  background-size: 100% 100%;
  width: 150px;
  height: 30px;
}
.right {
  background-image: url('./assets/img/lotteryPopular-028-frame.png');
  background-size: 100% 100%;
  width: 150px;
  height: 30px;
  transform: rotateY(180deg);
}
</style>
