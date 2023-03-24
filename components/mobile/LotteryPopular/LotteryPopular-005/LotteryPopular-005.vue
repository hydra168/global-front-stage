<template>
  <div class="LotteryPopular-005">
    <div class="item__wrap" :style="boderStyle">
      <div class="item__wrap__list" :class="bgColorClass(item.id)" v-for="item in tabArray" :key="item.id" @click="handleTab(item.id)">
        <span :class="textColorClass(item.id)">{{ $t(item.title) }}</span>
      </div>
    </div>
    <div class="game__wrap" v-show="activeId !== 0" @click="go(gameList[activeId].link)">
      <img :src="gameImg" />
    </div>
    <div class="game__wrap" v-show="activeId == 4 && Boolean(vipImg)" @click="go(`/play/68835709494`)">
      <img :src="vipImg" />
    </div>
    <div class="hotgame__wrap" v-show="activeId === 0">
      <div class="hotgame__list" :style="hotgameListStyle(img.src)" v-for="img in formatedHotGameList" :key="img.id" @click="go(img.link)">
        <div class="hotgame__list__title">{{ $t(img.name) }}</div>
        <div class="hotgame__list__title2">{{ $t(img.subName) }}</div>
        <div :class="`hotgame__list__button linear-${img.btn}`">{{ $t('g_common_gameList_start') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS';
// 雖然人己經不在了，Fred你寫的也太差了吧
// TODO: 這個組件需要大改
export default {
  name: 'LotteryPopular-005',
  props: {
    boderStyle: {
      type: String,
      default: 'border:1px solid',
    },
    bgColor: {
      type: String,
      default: 'white',
    },
    textColor: {
      type: String,
      default: 'primary',
    },
    //-------------------
    // activeBgColor: 背景顏色
    // activeTextColor: 文字顏色
    // activeRounded: border圓角顯示
    activeBgColor: {
      type: String,
      default: 'primary',
    },
    activeTextColor: {
      type: String,
      default: 'white',
    },
    activeRounded: {
      type: Boolean,
      default: false,
    },
    //--------------------
    tabList: {
      type: Array,
      default: () => [
        { id: 0, title: 'g_common_lotteryPopular_hot', active: true },
        { id: 1, title: 'g_common_lotteryPopular_lottery', active: false },
        { id: 2, title: 'g_common_lotteryPopular_sport', active: false },
        { id: 3, title: 'g_common_lotteryPopular_live', active: false },
        { id: 4, title: 'g_common_lotteryPopular_chess', active: false },
        { id: 5, title: 'g_common_lotteryPopular_slot', active: false },
        { id: 6, title: 'g_common_lotteryPopular_fish', active: false },
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
      default: () => [],
    },
    vipImg: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    formatedHotGameList() {
      return mergeArrayObjectsCode(this.hotGameList, this.defaultHotGameList).filter(item => item.show !== false);
    },
  },
  data() {
    return {
      activeId: 0,
      tabArray: this.tabList,
      gameImg: require('./assets/img/lotteryPopular-005-02.png'),
      defaultHotGameList: [
        {
          sort: 1,
          show: true,
          id: 1,
          name: 'g_common_lotteryPopular_lottery',
          subName: '',
          code: 'lottery',
          btn: 'lottery',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-005-hot01.png'),
        },
        {
          sort: 2,
          show: true,
          id: 2,
          name: 'g_common_lotteryPopular_sport',
          subName: '',
          code: 'sport',
          btn: 'sport',
          link: '/play/30n4hvJ4MGjhfY',
          src: require('./assets/img/lotteryPopular-005-hot02.png'),
        },
        {
          sort: 3,
          show: true,
          id: 3,
          name: 'g_common_lotteryPopular_live',
          subName: '',
          code: 'live',
          btn: 'live',
          link: '/play/AGwftrtxRP9syJ',
          src: require('./assets/img/lotteryPopular-005-hot03.png'),
        },
        {
          sort: 4,
          show: true,
          id: 4,
          name: 'g_common_lotteryPopular_chess',
          subName: '',
          code: 'chess',
          btn: 'chess',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-005-hot04.png'),
        },
        {
          sort: 5,
          show: true,
          id: 5,
          name: 'g_common_lotteryPopular_slot',
          code: 'slot',
          btn: 'slot',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-005-hot05.png'),
        },
        {
          sort: 6,
          show: true,
          id: 6,
          name: 'g_common_lotteryPopular_fish',
          subName: '',
          code: 'fish',
          btn: 'fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-005-hot06.png'),
        },
        {
          sort: 7,
          show: false,
          id: 7,
          name: 'g_common_lotteryPopular_lottery_vip2',
          subName: '',
          code: 'lottery-vip2',
          btn: 'lottery-vip2',
          link: '/play/30963441199',
          src: require('./assets/img/lotteryPopular-005-hot01.png'),
        },
      ],
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    go(link) {
      if (/^http(s)*:\/\//.test(link)) {
        window.open(link);
      } else {
        this.ROUTER_PUSH(link);
      }
    },
    bgColorClass(val) {
      if (this.tabArray[val].active) {
        return this.activeRounded ? `${[this.activeBgColor]} border__radius` : `${[this.activeBgColor]}`;
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
  },
};
</script>

<style lang="scss">
.LotteryPopular-005 {
  .item__wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 3px;
    &__list {
      text-align: center;
      line-height: 1.2;
      padding: 5px;
    }
  }
  .primary {
    border-radius: 10px;
  }
  .game__wrap {
    img {
      width: 100%;
    }
  }

  .hotgame__wrap {
    width: 100%;
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
        margin-top: 2px;
      }
      &__title2 {
        color: #06c1ff;
        font-size: 18px;
        font-weight: 600;
        align-self: center;
        margin-bottom: 15px;
        margin-left: 70px;
        margin-top: -30px;
      }
      &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
        color: #fff;
        width: 64px;
        height: 20px;
        margin: 6px 16px;
        font-size: 10px;
        font-weight: 600;
        border-radius: 15px;
        cursor: pointer;
        box-shadow: 0 2px 4px 0 rgba($color: #000, $alpha: 0.5);
        margin-top: -22px;
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
      .linear-lottery2 {
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
.border__radius {
  border-radius: 11px;
}
</style>
