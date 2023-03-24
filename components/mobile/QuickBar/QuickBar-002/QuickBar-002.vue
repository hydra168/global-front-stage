<template>
  <div class="QuickBar-002">
    <div class="d-flex justify-space-between">
      <template v-for="(item, i) in youshi">
        <div :key="i" class="quickBar-item px-1" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
          <img :src="item.icon" width="100%" alt="" />
          <h6 class="text-subtitle-1 white--text text-center">
            {{ $t(item.title) }}
          </h6>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/index.js';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'QuickBar-002',
  props: {
    itemsOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultItemsData: [
        { sort: 1, show: true, code: 'deposit', title: 'g_common_quickBar_deposit', icon: require('./assets/quickBar-01.png'), link: '/deposit' },
        {
          sort: 2,
          show: true,
          code: 'withdrawls',
          title: 'g_common_quickBar_withdrawal',
          icon: require('./assets/quickBar-02.png'),
          link: '/withdrawals',
        },
        { sort: 3, show: true, code: 'liveChat', title: 'g_common_quickBar_liveChat', icon: require('./assets/quickBar-03.png'), link: 'liveChat' },
      ],
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text) {
      return textFilter(text, 'com_quickBar_');
    },
  },
  computed: {
    youshi() {
      return mergeArrayObjectsCode(this.itemsOptions, this.defaultItemsData);
    },
  },
};
</script>
<style lang="scss">
.QuickBar-002 {
  .quickBar-item {
    width: 100%;
    position: relative;
    h6 {
      position: absolute;
      bottom: 12px;
      right: 50%;
      transform: translateX(50%);
      white-space: nowrap;
    }
  }
}
</style>
