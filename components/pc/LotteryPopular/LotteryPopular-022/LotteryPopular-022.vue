<template>
  <div class="LotteryPopular-022" :style="bgImg">
    <div class="popular__content" :style="smallBgImg">
      <div class="content__wrap zoom-in-11-hover">
        <div v-if="iconImg" class="content__icon" :style="iconImg"></div>
        <div class="content__title">{{ $t(titleText) }}</div>
        <div class="content__text">{{ $t(contentText) }}</div>
        <div class="content__btn frozen-hover" @click="ROUTER_PUSH(link)">{{ $t(linkText) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-022',
  props: {
    bg: {
      type: String,
      default: require('./assets/img/lotteryPopular-022-bg.png'),
    },
    smallBg: {
      type: String,
      default: require('./assets/img/lotteryPopular-022-smallBg.png'),
    },
    icon: {
      type: String,
      default: require('./assets/img/lotteryPopular-022-cssport.png'),
    },
    titleText: {
      type: String,
      default: 'g_com_lotteryPopular_022_popularTitleText',
    },
    contentText: {
      type: String,
      default: 'g_com_lotteryPopular_022_popularContentText',
    },
    link: {
      type: String,
      default: '/play/30n4hvJ4MGjhfY',
    },
    linkText: {
      type: String,
      default: 'g_common_gameList_betting',
    },
  },

  computed: {
    bgImg() {
      return {
        background: `url(${this.bg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
    smallBgImg() {
      return {
        width: '1000px',
        height: '500px',
        background: `url(${this.smallBg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
    iconImg() {
      return {
        width: '230px',
        height: '100px',
        background: `url(${this.icon}) no-repeat`,
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
.LotteryPopular-022 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 10px 0;
}

.popular__content {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.content__wrap {
  width: 30%;
  margin-right: 300px;
}

.content__icon {
  margin-bottom: 24px;
}

.content__title,
.content__btn {
  font-size: 24px;
  font-weight: bold;
  color: #ffbd00;
  margin: 16px 0;
}

.content__btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 46px;
  color: #000;
  background: #ffbd00;
}
</style>
