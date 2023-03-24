<template>
  <v-row class="LotteryPopular-006" :no-gutters="noGutters">
    <v-col v-for="(item, index) in lotteryList" :key="index" class="item pa-0" :cols="cols">
      <div :class="cardClass" style="cursor: pointer" @click="item.func">
        <img :src="item.src" class="item-img" />
        <img v-if="item.iconImage" :src="item.iconImage" class="item__icon" />
        <div v-if="showNowBtn" class="item-nowBtn">
          <span>{{ $t(item.btnBetTitle) }}</span>
        </div>
        <div v-if="showBtnTitle" class="item-btn" :class="btnClass">
          <span>{{ $t(item.btnTitle) }}</span>
        </div>
      </div>
      <h5 v-if="showTitle" class="title" :class="titleClass">{{ $t(item.title) }}</h5>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode, mergeArrayObjects } from '@UTILS/';

export default {
  name: 'LotteryPopular-006',
  props: {
    cardClass: {
      type: String,
      default: 'white black--text',
    },
    noGutters: {
      type: Boolean,
      default: false,
    },
    cols: {
      type: String,
      default: '6',
    },
    btnClass: {
      type: String,
      default: 'text-subtitle-1',
    },
    titleClass: {
      type: String,
      default: 'text-h6 d-flex justify-center align-center py-2',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    // 顯示btnTitle區塊
    showBtnTitle: {
      type: Boolean,
      default: true,
    },
    // 顯示立即下注按鈕
    showNowBtn: {
      type: Boolean,
      default: false,
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'sport',
          src: require('./assets/img/01.png'),
          iconImage: '',
          title: 'g_common_gameList_sport',
          btnTitle: 'g_common_gameList_bet',
          btnBetTitle: 'g_common_gameList_bet',
          func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          src: require('./assets/img/02.png'),
          iconImage: '',
          title: 'g_common_gameList_lottery',
          btnTitle: 'g_common_gameList_bet',
          btnBetTitle: 'g_common_gameList_bet',
          func: () => this.ROUTER_PUSH('/ultimate'),
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss">
.LotteryPopular-006 {
  .item {
    position: relative;
  }
  .title {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
  }
  .item-img {
    width: 100%;
    vertical-align: middle;
  }
  .item-nowBtn {
    position: absolute;
    right: 3%;
    bottom: 25%;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.3rem 2.5rem;
    border-radius: 2rem;
  }
  .item-btn {
    position: absolute;
    bottom: 0px;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-btn:hover {
    height: 96%;
    color: #ffffff;
    transition: height 0.3s;
  }
  .item__icon {
    position: absolute;
    bottom: 60px;
    left: 20px;
    height: 24px;
  }
}
</style>
