<template>
  <div class="QuickBar-001">
    <div :class="`wrap ${item.class}-wrap`" v-for="(item, i) in youshi" :key="i" @click="item.func">
      <div :class="`img-wrap ${item.class}-img-wrap`">
        <img :class="`img ${item.class}-img`" :src="item.img" :alt="$t(item.name)" width="100%" />
      </div>
      <div :class="`text-wrap ${item.class}-text-wrap shiny-hover`">
        <h3 :class="`text--h3 font-weight-black grey--text text--darken-2 text ${item.class}-text `">{{ $t(item.name) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mergeArrayObjects } from '@UTILS/index.js';
import { mapMutations, mapActions, mapGetters } from 'vuex';
export default {
  name: 'QuickBar-001',
  props: {
    contents: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultContents: [
        {
          class: 'deposit',
          name: 'g_common_money_quickDeposit',
          img: require('./assets/quickbar-001-deposit.png'),
          func: () => this.ROUTER_PUSH('/userCentre/deposit'),
        },
        {
          class: 'withdrawals',
          name: 'g_common_money_withdrawal',
          img: require('./assets/quickbar-001-withdrawals.png'),
          func: () => this.ROUTER_PUSH('/userCentre/withdrawals'),
        },
        {
          class: 'service',
          name: 'g_common_btn_onlineService',
          img: require('./assets/quickbar-001-service.png'),
          func: () => this.SHOW_LIVE_CHAT(0),
        },
      ],
    };
  },
  computed: {
    youshi() {
      return mergeArrayObjects(this.contents, this.defaultContents);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.QuickBar-001 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .wrap {
    position: relative;
    .img-wrap {
      .img {
        border: 1px solid #ddd;
      }
    }
    .text-wrap {
      position: absolute;
      left: 65%;
      top: 36%;
      .text {
        font-size: 19px;
      }
    }
  }

  // hover效果
  .wrap {
    cursor: pointer;
    .img-wrap {
      transition: 0.5s;
      overflow: hidden;
    }
    &:hover {
      .img-wrap {
        filter: brightness(1.1);
      }
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
