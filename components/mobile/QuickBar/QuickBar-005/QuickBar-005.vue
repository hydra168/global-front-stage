<template>
  <div class="QuickBar-005">
    <div class="items__wrap d-flex justify-space-between align-center">
      <template v-for="(item, i) in youshi">
        <div v-if="item.show" :key="i" class="item__wrap" :class="itemClass" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
          <div v-if="linePosition === 'top'" class="item__top_line" :class="lineColor" :style="lineStyleObject"></div>
          <v-icon v-if="item.icon" :class="iconClass" :color="iconColor" large>{{ item.icon }}</v-icon>
          <img v-if="item.pic" :src="item.pic" :width="iconWidth" :class="iconClass" />
          <span :class="titleClass">{{ $t(item.title) }}</span>
          <div v-if="linePosition === 'bottom'" class="item__bottom_line" :class="lineColor" :style="lineStyleObject"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'QuickBar-005',
  props: {
    itemClass: {
      type: String,
      default: 'grey darken-2 rounded-lg',
    },
    titleClass: {
      type: String,
      default: 'white--text',
    },
    iconWidth: {
      type: String,
      default: '45px',
    },
    iconClass: {
      type: String,
      default: 'my-2',
    },
    iconColor: {
      type: String,
      default: 'white',
    },
    lineColor: {
      type: String,
      default: 'primary',
    },
    lineHeight: {
      type: String,
      default: '10px',
    },
    linePosition: {
      type: String,
      default: 'bottom',
    },
    optionData: {
      type: Array,
      default: () => [],
    },
  },
  data: () => {
    return {
      defaultData: [
        { show: true, code: 'deposit', title: 'g_com_quickBar_deposit', icon: 'monetization_on', link: '/deposit' },
        { show: true, code: 'withdrawls', title: 'g_com_quickBar_withdrawals', icon: 'payment', link: '/withdrawals' },
        { show: true, code: 'liveChat', title: 'g_com_quickBar_liveChat', icon: 'support_agent', link: 'liveChat' },
        { show: false, code: 'suggestions', title: 'g_com_quickBar_suggestions', icon: 'chat', link: 'liveChat' },
      ],
    };
  },
  computed: {
    youshi() {
      return mergeArrayObjectsCode(this.optionData, this.defaultData);
    },
    lineStyleObject() {
      return {
        height: this.lineHeight,
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>
<style lang="scss">
.QuickBar-005 {
  .items__wrap {
    margin-right: -1rem;
  }
  .item__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    margin-right: 1rem;
  }
  .item__bottom_line {
    margin-top: 5px;
    width: 100%;
  }
  .item__top_line {
    width: 100%;
  }
}
</style>
