<template>
  <div class="LotteryPopular-017" :style="bgImg">
    <div class="popular__title" :style="titleBg">
      <div :style="titleCnColor">{{ $t(cnTitle) }}</div>
    </div>
    <div class="popular__content">
      <div class="popular__wrap">
        <div class="popular__list" :class="[hoverClass]" v-for="item in lotteryList" :key="item.name" @click="ROUTER_PUSH(item.link)">
          <img :src="item.src" :alt="item.name" />
          <span>{{ $t(item.name) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-017',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    cnTitle: {
      type: String,
      default: 'g_common_gameList_quick_game',
    },
    bg: {
      type: String,
      default: require('./assets/img/lotteryPopular-017-bg.png'),
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
    //hover效果
    hoverClass: {
      type: String,
      default: 'swing-hover fade-in-hover',
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
          src: require('./assets/img/lotteryPopular-017-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-017-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-017-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-017-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-017-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-017-06.png'),
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
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-017 {
  display: flex;
  flex-direction: column;
}

.popular__title {
  width: 100%;
  text-align: center;
  padding: 16px 0 40px 0;
}

.popular__content {
  display: flex;
  width: 100%;
  justify-content: center;
}

.popular__wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 80px 0;
  max-width: 1220px;
}

.popular__list {
  width: calc(100% / 3);
  position: relative;
  cursor: pointer;

  img {
    width: 380px;
    height: 330px;
  }

  span {
    position: absolute;
    top: 40px;
    left: 50px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
