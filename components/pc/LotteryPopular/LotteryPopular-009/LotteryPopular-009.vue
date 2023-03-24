<template>
  <div class="popular">
    <div class="popular__list">
      <div class="popular__list__img" :class="[hoverClass]" v-for="item in lotteryList" :key="item.name" @click="ROUTER_PUSH(item.link)">
        <img :src="item.src" alt="" />
        <span>{{ $t(item.name) }}</span>
        <div v-if="popup === true" class="popup">
          <div>
            <!-- {{ $t('g_common_gameList_betting') }} -->
            {{ $t(betTitle) }}
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
  name: 'LotteryPopular',
  props: {
    popup: {
      type: Boolean,
      default: false,
    },
    hoverClass: {
      type: String,
      default: 'fade-in-hover zoom-in-11-hover',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    betTitle: {
      type: String,
      default: 'g_common_gameList_betting',
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
          src: require('./assets/img/lotteryPopular-009-01.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          name: 'g_common_game_lottery_game',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-009-02.png'),
        },
        {
          sort: 3,
          show: true,
          code: 'live',
          name: 'g_common_game_live_hall',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-009-03.png'),
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          name: 'g_common_game_kaiyuan',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-009-04.png'),
        },
        {
          sort: 5,
          show: true,
          code: 'slot',
          name: 'g_common_game_slot_hall',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-009-05.png'),
        },
        {
          sort: 6,
          show: true,
          code: 'fish',
          name: 'g_common_game_ag_fish',
          link: '/play/AGSvcZAA53g2Ly',
          src: require('./assets/img/lotteryPopular-009-06.png'),
        },
      ],
    };
  },
  computed: {
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
.popular {
  max-width: 1270px;
  margin: 0 auto;
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
    justify-content: center;
    flex-wrap: wrap;
    &__img {
      cursor: pointer;
      position: relative;
      font-size: 0;
      span {
        position: absolute;
        left: 167px;
        top: 182px;
        color: white;
        font-weight: 600;
        font-size: 24px;
      }
    }
  }
}
.popular__list__img {
  position: relative;
  overflow: hidden;
  .popup {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    div {
      padding: 10px 20px 10px 20px;
      border: 1px solid #fff;
      font-size: 16px;
      color: white;
    }
  }
  &:hover .popup {
    top: 0;
    transition: 0.3s;
  }
}
</style>
