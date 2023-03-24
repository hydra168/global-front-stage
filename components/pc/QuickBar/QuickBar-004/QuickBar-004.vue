<template>
  <div class="QuickBar-004">
    <template v-for="(item, i) in quickBarList">
      <div :key="i" class="item__wrap frozen-hover" :class="itemClass" @click="ROUTER_PUSH(item.link)">
        <img :src="item.img" class="item__wrap-img" />
        <div class="item__wrap-content" :class="itemContentClass">
          <div class="item__wrap-content-title">
            <img :src="item.icon" :style="{ width: iconWidth }" />
            <span :class="titleClass">{{ $t(item.title) }}</span>
          </div>
          <div class="item__wrap-content-line" :class="lineClass"></div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mergeArrayObjects } from '@UTILS/';
export default {
  name: 'QuickBar-004',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    itemClass: {
      type: String,
      default: 'rounded-lg',
    },
    itemContentClass: {
      type: String,
      default: 'grey darken-1',
    },
    iconWidth: {
      type: String,
      default: '45px',
    },
    titleClass: {
      type: String,
      default: 'white--text mt-4',
    },
    lineClass: {
      type: String,
      default: 'primary',
    },
  },
  data: () => {
    return {
      defaultItemsData: [
        {
          code: 'deposit',
          title: 'g_common_money_deposit',
          img: require('./assets/quickBar-1.png'),
          icon: require('./assets/deposit.png'),
          link: '/userCentre/deposit',
        },
        {
          code: 'withdrawals',
          title: 'g_common_money_withdrawals',
          img: require('./assets/quickBar-2.png'),
          icon: require('./assets/withdrawls.png'),
          link: '/userCentre/withdrawals',
        },
        {
          code: 'liveChat',
          title: 'g_common_btn_onlineService',
          img: require('./assets/quickBar-3.png'),
          icon: require('./assets/liveChat.png'),
          link: 'liveChat',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  computed: {
    quickBarList() {
      return mergeArrayObjects(this.list, this.defaultItemsData);
    },
  },
};
</script>

<style lang="scss">
@import '@ASSETS/scss/hover.scss';
.QuickBar-004 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -10px;
  img {
    width: 100%;
  }
  .item__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 155px;
    width: 100%;
    overflow: hidden;
    margin-right: 10px;
    cursor: pointer;

    .item__wrap-img {
      width: 50%;
      height: 100%;
      object-fit: cover;
    }
    .item__wrap-content {
      width: 100%;
      height: 100%;

      .item__wrap-content-title {
        height: 95%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .item__wrap-content-line {
        height: 5%;
        width: 100%;
        background-color: black;
      }
    }
  }
  // hover效果
  .item__wrap {
    transition: 0.5s;
    overflow: hidden;
    &:hover {
      filter: brightness(1.1);
      .item__wrap-img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
