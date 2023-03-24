<template>
  <section class="IndexContent-020" :style="bgImg">
    <v-container>
      <main class="content__wrap">
        <div class="left__wrap">
          <div class="text__wrap">
            <i class="primary"></i>
            <span class="primary--text">{{ $t(textData.textTitle) }}</span>
            <p>{{ $t(textData.textSubTitle) }}</p>
          </div>
          <div class="bet__btn" :class="[btnHoverClass]" @click="ROUTER_PUSH(link)">
            <span>{{ $t(textData.textBtn) }}</span>
          </div>
          <div class="title__img">
            <img :src="titleImg" />
          </div>
        </div>
        <div class="right__wrap">
          <img class="device__img" :src="device" />
          <span class="device__title">{{ $t(textData.textContent1) }}</span>
          <span class="device__text">{{ $t(textData.textContent2) }}</span>
        </div>
      </main>
    </v-container>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'IndexContent-020',

  props: {
    bg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    titleImg: {
      type: String,
      default: require('./assets/title-01.png'),
    },
    device: {
      type: String,
      default: require('./assets/device.png'),
    },
    textData: {
      type: Object,
      default: () => {
        return {
          textTitle: 'g_com_indexContent020_text4',
          textSubTitle: 'g_com_indexContent020_text1',
          textContent1: 'g_com_indexContent020_text2',
          textContent2: 'g_com_indexContent020_text3',
          textBtn: 'g_common_gameList_betting',
        };
      },
    },
    btnHoverClass: {
      type: String,
      default: 'translateX20-scale13-hover',
    },
    link: {
      type: String,
      default: () => '/play/30n4hvJ4MGjhfY',
    },
  },

  computed: {
    bgImg() {
      return {
        background: `url(${this.bg}) no-repeat`,
        backgroundSize: 'contain',
        backgroundPosition: 'center bottom',
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
.IndexContent-020 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content__wrap {
  display: flex;
  justify-content: space-between;
  margin: 80px 0 200px 0;
}

// 左側內容
.left__wrap {
  color: #fff;

  .text__wrap {
    width: 500px;

    i {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 12px;
      transform: rotate(45deg);
    }

    span {
      font-size: 24px;
      font-weight: bold;
    }

    p {
      margin-top: 6px;
    }
  }
}

.bet__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 48px;
  border: 1px solid #fff;
  font-size: 20px;
  cursor: pointer;
}

.title__img {
  img {
    margin-top: 40px;
    width: 55px;
    height: 313px;
  }
}

// 右側內容
.right__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.device__img {
  width: 360px;
  height: 200px;
}

.device__title {
  margin-top: 40px;
  font-size: 36px;
}

.device__text {
  font-size: 18px;
  margin-top: 8px;
}
</style>
