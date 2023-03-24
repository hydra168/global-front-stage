<template>
  <div class="IndexContent-018" :style="bgImg">
    <div class="wrap white--text">
      <img :class="hoverStyle" :src="logo" @click="ROUTER_PUSH(text.link)" />
      <div class="text__title">{{ $t(text.titleText) }}</div>
      <p class="text__content">{{ $t(text.contentText) }}</p>
      <div class="btn" :class="[btnHoverStyle]" @click="ROUTER_PUSH(text.link)">{{ $t('g_common_gameList_bet') }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'IndexContent-018',

  props: {
    bg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    logo: {
      type: String,
      default: require('./assets/logo.png'),
    },
    text: {
      type: Object,
      default: () => {
        return {
          titleText: 'g_com_indexContent_018_title',
          contentText: 'g_com_indexContent_018_content',
          link: '/play/30n4hvJ4MGjhfY',
        };
      },
    },
    // hover效果
    hoverStyle: {
      type: String,
      default: 'swing-hover',
    },
    btnHoverStyle: {
      type: String,
      default: 'background-primary-hover font-secondary-color-hover translateX30-scale15-hover border-secondary-hover ',
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

.IndexContent-018 {
  display: flex;
  justify-content: flex-end;
}

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 415px;
  height: 900px;
  margin: 76px 315px 97px 0;

  img {
    width: 256px;
    height: 110px;
    margin-bottom: 60px;
    cursor: pointer;
  }

  .text__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  p {
    margin-bottom: 24px;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 30px;
    border-radius: 24px;
    border: 1px solid #fff;
    cursor: pointer;
  }
}
</style>
