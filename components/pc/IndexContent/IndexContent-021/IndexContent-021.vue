<template>
  <section class="IndexContent-021" :style="bgImg">
    <v-container class="content__wrap">
      <div class="text__wrap">
        <div class="main__title">
          <i class="primary icon__normal"></i>
          <span class="primary--text text__title">{{ $t(textData.textTitle) }}</span>
        </div>
        <div>
          <i class="primary icon__round"></i>
          <span>{{ $t(textData.textSubTitle1) }}</span>
        </div>
        <div class="text__list">{{ $t(textData.textContent1) }}</div>
        <div>
          <i class="primary icon__round"></i>
          <span>{{ $t(textData.textSubTitle2) }}</span>
        </div>
        <div class="text__list">{{ $t(textData.textContent2) }}</div>
        <div class="bet__btn" :class="hoverStyle" @click="ROUTER_PUSH('/ultimate')">
          <span>{{ $t(textData.textBtn) }}</span>
        </div>
      </div>
      <img class="lottery__img" :src="lotteryImg" />
    </v-container>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'IndexContent-021',

  props: {
    bg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    lotteryImg: {
      type: String,
      default: require('./assets/lottery.png'),
    },
    textData: {
      type: Object,
      default: () => {
        return {
          textTitle: 'g_common_gameList_lottery_flagship',
          textSubTitle1: 'g_com_indexContent021_text1',
          textSubTitle2: 'g_com_indexContent021_text2',
          textContent1: 'g_com_indexContent021_text3',
          textContent2: 'g_com_indexContent021_text4',
          textBtn: 'g_common_gameList_betting',
        };
      },
    },
    hoverStyle: {
      type: String,
      default: 'frozen-hover',
    },
  },

  computed: {
    bgImg() {
      return {
        background: `url(${this.bg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';

.IndexContent-021 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content__wrap {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
}

.text__wrap,
.lottery__img {
  width: 460px;
  height: 355px;
}

.text__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  border: solid 1px rgba(246, 220, 178, 0.46);
}

.icon__normal {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 14px;
  transform: rotate(45deg);
}

.icon__round {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}

.main__title {
  margin-bottom: 16px;
  font-size: 24px;
}

.text__list {
  margin: 8px 0;
}

.bet__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 48px;
  margin-top: 24px;
  border: solid 1px rgba(246, 220, 178, 0.46);
  font-size: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    transition: all 0.5s;
  }
}
</style>
