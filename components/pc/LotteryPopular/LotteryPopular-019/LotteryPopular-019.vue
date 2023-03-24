<template>
  <div class="LotteryPopular-019" :style="bgImg">
    <div class="popular__content">
      <div class="popular__title white--text">{{ $t(title) }}</div>
      <div class="popular__wrap">
        <div class="popular__list black--text fade-in-hover" v-for="item in lotteryList" :key="item.name" @click="ROUTER_PUSH(item.link)">
          <img :src="item.src" :alt="$t(item.name)" class="fillet-hover" />
          <div class="text__wrap">
            <div>{{ $t(item.name) }}</div>
            <div class="enter__btn white--text black shiny-hover">{{ $t('g_common_gameList_enter') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-019',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'g_common_gameList_quick_game',
    },
    bg: {
      type: String,
      default: require('./assets/img/lotteryPopular-019-bg.png'),
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
          src: require('./assets/img/lotteryPopular-019-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-019-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-019-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-019-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-019-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-019-06.png'),
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
.LotteryPopular-019 {
  display: flex;
  flex-direction: column;
}

.popular__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popular__title {
  font-size: 30px;
  margin-top: 24px;
}

.popular__wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 60px 0;
  max-width: 1220px;
}

.popular__list {
  width: calc(100% / 3);
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;

  img {
    width: 380px;
    height: 330px;
  }

  span {
    position: absolute;
    top: 40px;
    left: 50px;
    font-size: 20px;
    font-weight: bold;
  }
}

.text__wrap {
  position: absolute;
  left: 40px;
  bottom: 28px;
}

.enter__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  border-radius: 6px;
  margin-top: 10px;
}
</style>
