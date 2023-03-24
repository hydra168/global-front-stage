<template>
  <div class="popular">
    <div class="popular__list">
      <div class="popular__list__img" :class="[hoverClass]" v-for="item in lotteryList" :key="item.code" @click="ROUTER_PUSH(item.link)">
        <img :src="item.src" alt="" />
        <span>{{ $t(item.title) }}</span>
        <div v-if="popup === true" class="popup">{{ $t('g_common_gameList_betting') }}</div>
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
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    data() {
      return {
        defaultLotteryList: [
          {
            sort: 1,
            show: true,
            code: 'jsPk10',
            title: 'g_common_gameList_jsPk10',
            src: require('./assets/img/lotteryPopular-033-07.png'),
            link: 'play/BxkZVPiJb63a',
          },
          {
            sort: 2,
            show: true,
            code: 'jssc',
            title: 'g_common_gameList_jscar',
            src: require('./assets/img/lotteryPopular-033-08.png'),
            link: 'play/2147212049129',
          },
          {
            sort: 3,
            show: true,
            code: 'jsft',
            title: 'g_common_gameList_jsft',
            src: require('./assets/img/lotteryPopular-033-09.png'),
            link: 'play/7043222726362',
          },
          {
            sort: 4,
            show: true,
            code: 'jsffc',
            title: 'g_common_gameList_jsffc',
            src: require('./assets/img/lotteryPopular-033-10.png'),
            link: 'play/6681474621111',
          },
          {
            sort: 5,
            show: true,
            code: 'js3fc',
            title: 'g_common_gameList_js3fc',
            src: require('./assets/img/lotteryPopular-033-11.png'),
            link: 'play/960669940301',
          },
          {
            sort: 6,
            show: true,
            code: 'js5fc',
            title: 'g_common_gameList_js5fc',
            src: require('./assets/img/lotteryPopular-033-12.png'),
            link: 'play/1608011465',
          },
        ],
      };
    },
    hoverClass: {
      type: String,
      default: 'fade-in-hover zoom-in-11-hover',
    },
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
