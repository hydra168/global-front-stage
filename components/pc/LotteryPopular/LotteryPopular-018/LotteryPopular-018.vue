<template>
  <section class="LotteryPopular-018" :style="bgImg">
    <div class="popular__wrap">
      <div class="popular__title" :style="titleStyle">{{ $t(title) }}</div>
      <ul class="popular__content">
        <li class="popular__list" :class="[hoverClass]" v-for="(item, index) in lotteryList" :key="index" @click="ROUTER_PUSH(item.link)">
          <img :src="item.src" />
          <span>{{ $t(item.name) }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-018',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    bg: {
      type: String,
      default: require('./assets/img/lotteryPopular-018-bg.png'),
    },
    title: {
      type: String,
      default: 'g_common_gameList_quick_game',
    },
    titleStyle: {
      type: Object,
      default: () => {
        return {
          color: '#fff',
          fontSize: '36px',
          fontWeight: 'bold',
        };
      },
    },
    //hover效果
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
          src: require('./assets/img/lotteryPopular-018-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-018-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-018-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-018-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-018-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-018-06.png'),
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
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-018 {
  display: flex;
  justify-content: flex-end;
}

.popular__wrap {
  width: 882px;
  margin-right: 150px;
}

.popular__title {
  text-align: center;
  margin: 28px 0 50px 0;
}

.popular__content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 126px;
  border-radius: 24px;
  padding: 30px;
  background: rgba($color: #fff, $alpha: 0.6);

  li {
    cursor: pointer;
    list-style-type: none;
  }
}

.popular__list {
  position: relative;
  margin-bottom: 16px;

  img {
    width: 400px;
    height: 132px;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 86px;
    height: 22px;
    border: 1px solid #fff;
    border-radius: 24px;
    color: #fff;
    position: absolute;
    right: 20px;
    bottom: 30px;
  }
}
</style>
