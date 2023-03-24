<template>
  <div class="IndexContent-021" :style="bgImg">
    <v-container>
      <div class="title__box">
        <div class="text1">{{ $t('g_com_indexContent022_text1') }}</div>
        <div class="text2">-GAME-</div>
      </div>
      <div class="content__box">
        <div class="content__left">
          <div class="content__left__img1">
            <img :src="leftData.logo" />
          </div>
          <div class="content__left__text">
            {{ $t(leftData.text) }}
          </div>
          <div class="content__left__img2" :class="hoverStyle2">
            <span>{{ $t('g_com_indexContent022_text2') }} : </span>
            <img :src="leftData.star" />
          </div>
          <div class="content__left__btn" :class="hoverStyle" @click="ROUTER_PUSH(leftData.link)">
            <img :src="leftData.btn" />
          </div>
        </div>
        <div class="content__right" :class="hoverStyle3">
          <img :src="rightData" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'IndexContent-022',
  props: {
    backgroundImg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    rightData: {
      type: String,
      default: require('./assets/right.png'),
    },
    leftData: {
      type: Object,
      default: () => {
        return {
          logo: require('./assets/chess.png'),
          star: require('./assets/star.png'),
          btn: require('./assets/btn.png'),
          link: '/play/BgFcIROExgMd',
          text: 'g_com_indexContent022_text3',
        };
      },
    },
    hoverStyle: {
      type: String,
      default: 'frozen-hover',
    },
    hoverStyle2: {
      type: String,
      default: 'shiny-hover',
    },
    hoverStyle3: {
      type: String,
      default: 'swing-hover',
    },
  },
  computed: {
    bgImg() {
      return {
        background: `url(${this.backgroundImg}) no-repeat`,
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

.IndexContent-021 {
  .title__box {
    text-align: center;
    .text1 {
      color: #b29456;
      font-size: 30px;
      font-weight: bold;
    }
    .text2 {
      color: #878787;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .content__box {
    display: flex;
    justify-content: space-around;
    .content__right {
      width: 758px;
      height: 524px;
    }
    .content__left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      &__text {
        color: #6a6a68;
        text-align: center;
        width: 415px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      &__img1 {
        text-align: center;
        width: 366px;
        img {
          width: 100%;
        }
      }
      &__img2 {
        display: inline;
        color: #6a6a68;
        font-size: 24px;
        img {
          width: 50%;
        }
        span {
          width: 415px;
        }
      }
      &__btn {
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
  .content__left__btn:hover {
    transform: scale(1.2);
    transition: all 0.5s;
  }
}

.content__left__img2 {
  text-align: center;
}

.content__left__text {
  padding: 10px;
}
</style>
