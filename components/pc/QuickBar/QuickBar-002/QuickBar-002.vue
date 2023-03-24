<template>
  <div class="QuickBar-002">
    <div
      v-for="(item, i) in navBtnsHandler"
      :key="i"
      @click="ROUTER_PUSH(item.link)"
      @mouseenter="currentIndex = i"
      @mouseleave="currentIndex = null"
      class="items--wrap"
      :class="[{ 'bg-left': bgLeft, 'bg-full': bgFull, 'justify-end': titleRight }, itemClass]"
      :style="{ backgroundImage: `url(${item.src})` }"
    >
      <div class="item--title pa-7" :class="[currentIndex === i ? itemHoverClass : titleClass]">
        {{ $t(item.title) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mergeArrayObjects } from '@UTILS/';
export default {
  name: 'QuickBar-002',
  props: {
    bgLeft: {
      type: Boolean,
      default: true,
    },
    bgFull: {
      type: Boolean,
      default: false,
    },
    itemClass: {
      type: String,
      default: 'rounded-pill',
    },
    itemHoverClass: {
      type: String,
      default: 'primary white--text font-weight-black',
    },
    titleClass: {
      type: String,
      default: 'white',
    },
    titleRight: {
      type: Boolean,
      default: true,
    },
    navBtnsOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentIndex: null,
      defaultNavBtns: [
        { code: 'deposit', title: 'g_common_money_quickDeposit', src: require('./assets/deposit.png'), link: '/userCentre/deposit' },
        { code: 'withdrawals', title: 'g_common_money_withdrawal', src: require('./assets/withdrawals.png'), link: '/userCentre/withdrawals' },
        { code: 'liveChat', title: 'g_common_btn_onlineService', src: require('./assets/liveChat.png'), link: 'liveChat' },
      ],
    };
  },
  computed: {
    navBtnsHandler() {
      return mergeArrayObjects(this.navBtnsOptions, this.defaultNavBtns);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scope>
.QuickBar-002 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  .items--wrap {
    width: 100%;
    max-height: 95px;
    overflow: hidden;
    border: 1px solid #d8d8d8;
    background-repeat: no-repeat;
    display: flex;

    cursor: pointer;
    &.bg-left {
      background-size: 50%;
      background-position: left center;
    }
    &.bg-full {
      background-size: cover;
      background-position: center center;
    }
    .item--title {
      width: 50%;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }
  }
}
</style>
