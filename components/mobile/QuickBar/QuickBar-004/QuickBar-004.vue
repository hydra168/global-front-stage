<template>
  <div class="QuickBar-004">
    <div class="item__wrap" :style="bgStyle">
      <div class="item__wrap__list" v-for="item in dataList" :key="item.code" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
        <div :class="`item__wrap__img`">
          <img :src="item.icon" :alt="item.code" />
          <div :class="textColor">{{ $t(item.title) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'QuickBar-004',
  props: {
    bgImg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    textColor: {
      type: String,
      default: 'white',
    },
    dataList: {
      type: Array,
      default: () => [
        { code: 'deposit', title: 'g_com_quickBar_deposit', icon: require('./assets/deposit.png'), link: '/deposit', color: '#80808042' },
        {
          code: 'withdrawls',
          title: 'g_com_quickBar_withdrawals',
          icon: require('./assets/withdrawls.png'),
          link: '/withdrawals',
          color: '#80808042',
        },
        { code: 'liveChat', title: 'g_com_quickBar_liveChat', icon: require('./assets/liveChat.png'), link: 'liveChat', color: '' },
      ],
    },
  },
  computed: {
    bgStyle() {
      return {
        background: `url(${this.bgImg}) no-repeat`,
        backgroundSize: '100% 100%',
        height: '88px',
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss">
.QuickBar-004 {
  .item__wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    &__list {
      text-align: center;
      line-height: 1.2;
      padding: 5px;
      width: calc(100% / 3);
    }
    &__img {
      position: relative;
      div {
        bottom: 35px;
        left: 0;
        right: 0;
        margin: 0 auto;
        position: absolute;
        font-size: 12px;
      }
    }
  }
}
</style>
