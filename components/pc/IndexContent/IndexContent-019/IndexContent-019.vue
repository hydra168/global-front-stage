<template>
  <section class="IndexContent-019" :style="bgImg">
    <main class="game__wrap" :style="gameBgImg">
      <div class="game__list" v-for="(node, index) in list" :key="index" @click="ROUTER_PUSH(node.link)">
        <img :src="node.src" :alt="node.name" />
        <span class="title__text">{{ $t(node.name) }}</span>
        <div class="title__line primary"></div>
        <div class="game__btn primary">
          <span class="btn__text" :class="hoverStyle">{{ $t('g_common_gameList_play_now') }}</span>
        </div>
      </div>
    </main>
    <div class="mobile__wrap">
      <div class="mobile__title">LOTTERY</div>
      <img class="mobile__img" :src="mobileBg" />
      <div class="mobile__text">
        <span class="primary--text">{{ $t('g_com_indexContent019_Text1') }}</span>
        <p>{{ $t('g_com_indexContent019_Text2') }}</p>
        <span class="primary--text">{{ $t('g_com_indexContent019_Text3') }}</span>
        <p>{{ $t('g_com_indexContent019_Text4') }}</p>
      </div>
      <div class="mobile__small__text">- {{ $t('g_com_indexContent019_Text5') }}<span class="primary--text">HTML5</span> -</div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'IndexContent-019',

  props: {
    bg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    gameBg: {
      type: String,
      default: require('./assets/game-bg.png'),
    },
    list: {
      type: Array,
      default: () => [
        { name: 'g_common_game_lottery_bet', link: '/ultimate', src: require('./assets/lottery.png') },
        { name: 'g_common_game_cs_sports', link: '/play/30n4hvJ4MGjhfY', src: require('./assets/sport.png') },
      ],
    },
    mobileBg: {
      type: String,
      default: require('./assets/mobile.png'),
    },
    hoverStyle: {
      type: String,
      default: 'shiny-hover',
    },
  },

  computed: {
    bgImg() {
      return {
        background: `url(${this.bg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
    gameBgImg() {
      return {
        background: `url(${this.gameBg}) no-repeat`,
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

.IndexContent-019 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.game__wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 800px;
  height: 430px;
  margin: 105px 24px 121px 0;
}

.game__list {
  color: #fff;
  position: relative;
  cursor: pointer;

  img {
    width: 326px;
    height: 326px;

    &:hover {
      opacity: 0.5;
    }
  }

  .title__text {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 20px;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.2);
    transition: all 0.5s;

    .game__btn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      left: 80px;
      bottom: 30px;
    }
  }
}

.title__line {
  position: absolute;
  left: 20px;
  top: 60px;
  width: 30px;
  height: 10px;
}

.game__btn {
  display: none;
  width: 170px;
  height: 40px;
  border-radius: 6px;
  color: #000;
}

.mobile__wrap {
  color: #fff;
}

.mobile__title {
  font-size: 60px;
  font-weight: bold;
}

.mobile__img {
  width: 330px;
  height: 330px;
  padding-left: 30px;
}

.mobile__text {
  display: flex;
  font-size: 36px;
}

.mobile__small__text {
  text-align: center;
  font-size: 18px;
}
</style>
