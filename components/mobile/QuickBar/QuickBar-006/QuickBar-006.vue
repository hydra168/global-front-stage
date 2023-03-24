<template>
  <div class="QuickBar-006">
    <div
      v-for="(item, i) in quickBarList"
      :key="i"
      class="items"
      :class="itemWrapClass"
      @click="item.func ? item.func() : handleRouterPush(item.link)"
    >
      <!-- <div class="line" v-bind:class="i" /> -->
      <div class="item text-center" :class="itemClass">
        <img :src="item.icon" :alt="item.code" v-bind="imgBind" />
      </div>
      <h6 class="text-subtitle-1 text-center" v-bind="h6Bind">{{ $t(item.title) }}</h6>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'QuickBar-006',
  props: {
    itemWrapClass: {
      type: String,
      // 可選樣式[default,style1]
      // default: 'default',
      default: '',
    },
    itemClass: {
      type: String,
      // default: 'primary rounded-circle mb-2 pa-5',
      default: '',
    },
    titleClass: {
      type: String,
      default: '',
    },
    imgBind: {
      type: Object,
      default: () => {},
    },
    titleBind: {
      type: Object,
      default: () => {},
    },
    quickBarListOptions: {
      type: Array,
      default: () => [],
    },
  },
  data: () => {
    return {};
  },
  computed: {
    defaultQuickBarList() {
      return [
        { code: 'deposit', title: 'g_com_quickBar_deposit', icon: require('./assets/qb_001.png'), link: '/deposit', show: true },
        { code: 'withdrawls', title: 'g_com_quickBar_withdrawals', icon: require('./assets/qb_002.png'), link: '/withdrawals', show: true },
        { code: 'liveChat', title: 'g_com_quickBar_liveChat', icon: require('./assets/qb_003.png'), link: 'liveChat', show: true },
      ];
    },
    quickBarList() {
      return mergeArrayObjectsCode(this.quickBarListOptions, this.defaultQuickBarList);
    },
    h6Bind() {
      return Object.assign({ class: this.titleClass }, this.titleBind);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text) {
      return textFilter(text, 'com_quickBar_');
    },
    handleRouterPush(link) {
      if (link === 'showWindowsSportInfo') {
        return window.open('https://tyzb360.com/');
      }
      return this.ROUTER_PUSH(link);
    },
  },
};
</script>

<style lang="scss">
.QuickBar-006 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 20px 0;

  .items {
    // width: calc(100%/3);
    flex: 1;

    .item {
      img {
        width: 28px;
        height: 22px;
      }
    }
  }

  .items:not(:last-child) {
    border-right: 1px #ababab solid;
  }

  /* h6 {
    margin-bottom: 2px;
  } */
  /* display: flex;
  align-items: center;
  justify-content: space-around;
  .item__wrap {
    .item__wrap-img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.default {
      .item__wrap-img {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
        }
      }
    }
    &.style1 {
      .item__wrap-img {
        width: 80px;
        img {
          width: 28px;
          height: 22px;
        }
      }
      h6 {
        margin-bottom: 10px;
      }
    }
  } */
}
</style>
