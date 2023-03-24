<template>
  <div class="QuickBar-003">
    <div class="item__wrap item__wrap__quick" :style="`border:1px solid ${textColor}`">
      <div
        class="item__wrap__list"
        :style="`border-right: 1px solid ${item.color}`"
        v-for="item in dataList"
        :key="item.code"
        @click="item.func ? item.func() : ROUTER_PUSH(item.link)"
      >
        <div class="item__wrap--img">
          <img :src="item.icon" :alt="item.code" />
        </div>
        <span :style="`color: ${textColor}`">{{ $t(item.title) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'QuickBar-003',
  props: {
    textColor: {
      type: String,
      default: '#80808042;',
    },
    dataList: {
      type: Array,
      default: () => [
        { code: 'deposit', title: 'g_common_quickBar_deposit', icon: require('./assets/deposit.png'), link: '/deposit', color: '#80808042' },
        {
          code: 'withdrawls',
          title: 'g_common_quickBar_withdrawal',
          icon: require('./assets/withdrawls.png'),
          link: '/withdrawals',
          color: '#80808042',
        },
        { code: 'liveChat', title: 'g_common_quickBar_liveChat', icon: require('./assets/liveChat.png'), link: 'liveChat', color: 'transparent' },
      ],
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss">
.QuickBar-003 {
  .item__wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 50px;
    &__list {
      text-align: center;
      line-height: 1.2;
      padding: 5px;
      width: calc(100% / 3);
    }
    img {
      max-width: 30px;
      max-height: 24px;
    }
  }
}
</style>
