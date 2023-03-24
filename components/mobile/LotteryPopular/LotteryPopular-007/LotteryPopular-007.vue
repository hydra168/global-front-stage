<template>
  <div class="LotteryPopular-007">
    <div class="item__wrap" :style="boderStyle" v-if="isShowTab">
      <div class="item__wrap__list" :class="bgColorClass(item.id)" v-for="item in tabArray" :key="item.id" @click="handleTab(item.id)">
        <span :class="textColorClass(item.id)">{{ commonTextFilter(item.title) }}</span>
      </div>
    </div>
    <div class="game__wrap" v-show="this.activeId !== 0" @click="ROUTER_PUSH(gameList[activeId].link)">
      <img :src="gameImg" />
    </div>
    <div class="hotgame__wrap" v-show="this.activeId == 0">
      <div class="hotgame__list" :style="hotgameListStyle(img.src)" v-for="img in hotGameList" :key="img.id" @click="ROUTER_PUSH(img.link)">
        <div class="hotgame__list__title">{{ commonTextFilter(img.name) }}</div>
        <div :class="`hotgame__list__button linear-${img.code}`">{{ commonTextFilter('start', 1) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-007',
  props: {
    boderStyle: {
      type: String,
      default: 'border:0px solid',
    },
    bgColor: {
      type: String,
      default: 'white',
    },
    textColor: {
      type: String,
      default: 'primary',
    },
    activeBgColor: {
      type: String,
      default: 'transparent',
    },
    activeTextColor: {
      type: String,
      default: 'white',
    },
    isShowTab: {
      type: Boolean,
      default: true,
    },
    tabList: {
      type: Array,
      default: () => [
        { id: 0, title: 'hot', active: true },
        { id: 1, title: 'lottery', active: false },
        { id: 2, title: 'sport', active: false },
        { id: 3, title: 'live', active: false },
        { id: 4, title: 'chess', active: false },
        { id: 5, title: 'slot', active: false },
        { id: 6, title: 'fish', active: false },
      ],
    },
    gameList: {
      type: Array,
      default: () => [
        { id: 0, name: '热门' },
        { id: 1, name: '彩票', link: '/ultimate', src: require('./assets/img/lotteryPopular-005-01.png') },
        { id: 2, name: '体育', link: '/play/30n4hvJ4MGjhfY', src: require('./assets/img/lotteryPopular-005-02.png') },
        { id: 3, name: '真人', link: '/play/AGwftrtxRP9syJ', src: require('./assets/img/lotteryPopular-005-03.png') },
        { id: 4, name: '棋牌', link: '/play/BgFcIROExgMd', src: require('./assets/img/lotteryPopular-005-04.png') },
        { id: 5, name: '电子', link: '/slotLobby', src: require('./assets/img/lotteryPopular-005-05.png') },
        { id: 6, name: '捕鱼', link: '/play/AGSvcZAA53g2Ly', src: require('./assets/img/lotteryPopular-005-06.png') },
      ],
    },
    hotGameList: {
      type: Array,
      default: () => [
        { id: 1, name: 'lottery', code: 'lottery', link: '/ultimate', src: require('./assets/img/lotteryPopular-005-hot01.png') },
        { id: 2, name: 'sport', code: 'sport', link: '/play/30n4hvJ4MGjhfY', src: require('./assets/img/lotteryPopular-005-hot02.png') },
        { id: 3, name: 'live', code: 'live', link: '/play/AGwftrtxRP9syJ', src: require('./assets/img/lotteryPopular-005-hot03.png') },
        { id: 4, name: 'chess', code: 'chess', link: '/play/BgFcIROExgMd', src: require('./assets/img/lotteryPopular-005-hot04.png') },
        { id: 5, name: 'slot', code: 'slot', link: '/slotLobby', src: require('./assets/img/lotteryPopular-005-hot05.png') },
        { id: 6, name: 'fish', code: 'fish', link: '/play/AGSvcZAA53g2Ly', src: require('./assets/img/lotteryPopular-005-hot06.png') },
      ],
    },
  },
  data() {
    return {
      activeId: 0,
      tabArray: this.tabList,
      gameImg: require('./assets/img/sport.png'),
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    bgColorClass(val) {
      if (this.tabArray[val].active) {
        return `${[this.activeBgColor]}`;
      } else {
        return `${[this.bgColor]}`;
      }
    },
    textColorClass(val) {
      if (this.tabArray[val].active) {
        return `${[this.activeTextColor]}--text`;
      } else {
        return `${[this.textColor]}--text`;
      }
    },
    hotgameListStyle(src) {
      return {
        background: `url(${src}) no-repeat`,
        height: '7rem',
        backgroundSize: '100% 100%',
        marginTop: '0.5rem',
      };
    },
    handleTab(val) {
      this.tabArray = this.tabArray.map(item => {
        if (item.id === val) {
          item.active = true;
          this.activeId = val;
        } else {
          item.active = false;
        }
        return item;
      });
      this.gameImg = this.gameList[val].src;
    },
    commonTextFilter(text, val) {
      if (val) {
        return textFilter(text, 'common_gameList_');
      } else {
        return textFilter(text, 'common_lotteryPopular_');
      }
    },
  },
};
</script>

<style lang="scss">
.LotteryPopular-007 {
  .item__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    margin-bottom: 10px;
    padding: 0;
    &__list {
      text-align: center;
      line-height: 1.2;
      padding: 5px;
      width: 13%;
    }
  }
  .item__wrap__list {
    transform: translateY(-4px);
  }
  .transparent {
    width: 29%;
    background-image: url('./assets/img/fake01.png');
    background-size: 100% 100%;
    background-position: center center;
    transform: scale(1.1) translateY(1px);
    background-color: transparent !important;
    border-color: transparent !important;
  }
  .game__wrap {
    margin-top: -39px;
    img {
      width: 100%;
    }
  }

  .hotgame__wrap {
    width: 100%;
    margin-top: -39px;
    .hotgame__list {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &__title {
        color: #ffffff;
        font-size: 18px;
        font-weight: 600;
        align-self: center;
        margin-bottom: 15px;
        margin-left: 70px;
      }
      &__button {
        cursor: pointer;
        color: #ffffff;
        text-align: center;
        width: 64px;
        height: 20px;
        margin: 0 13px;
        align-self: flex-end;
        font-size: 10px;
        font-weight: 600;
        border-radius: 15px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      }
      .linear-sport {
        background-image: linear-gradient(to right, #fa9c79, #ff842b);
      }
      .linear-live {
        background-image: linear-gradient(to right, #ecacf7, #be7ac8);
      }
      .linear-chess {
        background-image: linear-gradient(107deg, #b4ec51, #429321);
      }
      .linear-lottery {
        background-image: linear-gradient(107deg, #fad961, #f76b1c);
      }
      .linear-slot {
        background-image: linear-gradient(287deg, #9c4cff, #5871f7 51%, #31daf0);
      }
      .linear-fish {
        background-image: linear-gradient(137deg, #08d190 37%, #0a8ed8 79%);
      }
    }
  }
}
</style>
