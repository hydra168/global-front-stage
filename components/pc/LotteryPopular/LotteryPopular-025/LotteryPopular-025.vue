<template>
  <div class="lotteryPopular025" :style="bgImg">
    <div class="popular__title" :style="titleBg">
      <div :style="titleCnColor">{{ $t(cnTitle) }}</div>
    </div>
    <v-row class="LotteryPopular">
      <div class="popular__wrap">
        <v-col class="item popular__list" :cols="cols" v-for="(item, index) in lotteryList" :key="index" @click="ROUTER_PUSH(item.link)">
          <v-card style="cursor: pointer" v-bind="cardBind">
            <img :src="item.img" :alt="item.title" />
            <div class="lottery-carousel__controls gameHot--text headline">
              {{ $t(item.title) }}
            </div>
          </v-card>
        </v-col>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-025',
  props: {
    cnTitle: {
      type: String,
      default: 'g_common_gameList_quick_game',
    },
    bg: {
      type: String,
      default: require('./assets/img/lotteryPopular-025-bg.png'),
    },
    cols: {
      type: Number,
      default: 4,
    },
    cardBind: {
      type: Object,
    },
    bgColor: {
      type: String,
      default: '#023144',
    },
    titleCn: {
      type: Object,
      default: () => {
        return {
          color: '#ffb200',
          fontSize: '36px',
        };
      },
    },
    titleEn: {
      type: Object,
      default: () => {
        return {
          color: '#ababab',
          fontSize: '24px',
        };
      },
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'pk10',
          title: 'g_common_gameList_jsPk10',
          img: require('./assets/img/lotteryPopular-025-01.png'),
          link: 'play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'jscar',
          title: 'g_common_gameList_jscar',
          img: require('./assets/img/lotteryPopular-025-02.png'),
          link: 'play/2147212049129',
        },
        {
          sort: 3,
          show: true,
          code: 'jsft',
          title: 'g_common_gameList_jsft',
          img: require('./assets/img/lotteryPopular-025-03.png'),
          link: 'play/7043222726362',
        },
        {
          sort: 4,
          show: true,
          code: 'jsffc',
          title: 'g_common_gameList_jsffc',
          img: require('./assets/img/lotteryPopular-025-04.png'),
          link: 'play/6681474621111',
        },
        {
          sort: 5,
          show: true,
          code: 'js3fc',
          title: 'g_common_gameList_js3fc',
          img: require('./assets/img/lotteryPopular-025-05.png'),
          link: 'play/960669940301',
        },
        {
          sort: 6,
          show: true,
          code: 'lft',
          title: 'g_common_gameList_js5fc',
          img: require('./assets/img/lotteryPopular-025-06.png'),
          link: 'play/1608011465',
        },
      ],
    };
  },
  computed: {
    bgImg() {
      return {
        background: `url(${this.bg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
    titleBg() {
      return {
        background: this.bgColor,
      };
    },
    titleCnColor() {
      return {
        color: this.titleCn.color,
        fontSize: this.titleCn.fontSize,
      };
    },
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
.lotteryPopular025 {
  display: flex;
  flex-direction: column;
}

.popular__title {
  width: 100%;
  text-align: center;
  padding: 16px 0 40px 0;
}

.LotteryPopular {
  display: flex;
  width: 100%;
  justify-content: center;
  .item .lottery-carousel__controls {
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    bottom: 0;
    display: flex;
    height: 40px;
    justify-content: center;
    list-style-type: none;
    position: absolute;
    width: 100%;
    z-index: 1;
    color: #fff;
    transition: height 0.3s;
  }
  // hover效果
  .item:hover .lottery-carousel__controls {
    height: 100%;
    color: white;
  }
  .popular__wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px;
    max-width: 1300px;
  }
  .popular__list {
    width: 100%;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>
