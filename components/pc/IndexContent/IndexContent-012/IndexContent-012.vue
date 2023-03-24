<template>
  <div class="IndexContent-012">
    <div class="container" @click="$router.push('/play/30n4hvJ4MGjhfY')">
      <div class="container__text">
        <span class="text__title">{{ $t(textData.textTitle) }}</span>
        <div class="line__wrap">
          <i class="text__line"></i>
        </div>
        <span class="text__sub__title">{{ $t(textData.textSubTitle) }}</span>
        <p>{{ $t(textData.textContent) }}</p>
        <div :class="hoverStyle" class="text__img" @click="ROUTER_PUSH(textData.link)">
          <img width="100%" :src="logoImg" />
        </div>
      </div>
      <div class="container__img">
        <img :style="bgStyle" :src="bgImg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    bgImg: {
      type: String,
      default: require('./assets/cs-sport2.png'),
    },
    logoImg: {
      type: String,
      default: require('./assets/logo.png'),
    },
    textData: {
      type: Object,
      default: () => {
        return {
          textTitle: 'g_com_indexContent_012_title',
          textSubTitle: 'g_com_indexContent_012_sub_title',
          textContent: 'g_com_indexContent_012_content',
          link: '/play/30n4hvJ4MGjhfY',
        };
      },
    },
    hoverStyle: {
      type: String,
      default: 'swing-hover',
    },
    bgStyle: {
      type: String,
      default: () => '',
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

.IndexContent-012 {
  max-width: 1340px;
  height: 544px;
  margin: 0 auto;

  .container {
    display: flex;
    justify-content: space-between;
  }

  .container__text {
    display: flex;
    flex-direction: column;

    p {
      font-size: 18px;
      line-height: 32px;
    }

    img {
      width: 270px;
      height: 115px;
    }
  }

  .text__title {
    text-align: center;
    font-size: 24px;
    color: #ff8c00;
    margin-bottom: 15px;
  }

  .text__img {
    text-align: center;
    margin-top: 24px;
    cursor: pointer;

    // Hover 效果
    &:hover {
      transform: scale(1.2);
      transition: all 0.5s;
    }
  }

  .line__wrap {
    display: flex;
    justify-content: center;
  }

  .text__line {
    height: 2px;
    width: 250px;
    background: rgba(0, 0, 0, 0.13);
    margin-bottom: 15px;
    text-align: center;
  }

  .text__sub__title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: 12px;
  }

  .container__img {
    img {
      width: 100%;
      // height: 544px;
    }
  }
}
</style>
