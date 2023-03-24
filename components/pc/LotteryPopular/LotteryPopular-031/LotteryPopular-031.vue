<template>
  <div class="LotteryPopular-031">
    <div class="group-wrap">
      <div class="group-btn-wrap" v-for="item in lotteryList" :key="item.icon">
        <v-img class="group-btn-image" :src="item.icon" />
        <div class="group-btn-title" :class="item.titleClass">{{ $t(item.title) }}</div>
        <div class="group-btn-text" :class="item.textClass">{{ item.text }}</div>
        <v-btn class="group-btn-btn" @click="item.func ? item.func() : ROUTER_PUSH(item.link)"> {{ item.buttonText }} </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-031',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    betText: {
      type: String,
      default: 'g_common_gameList_bet',
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'jsPk10',
          title: 'g_common_gameList_jsPk10',
          text: '',
          buttonText: '立即操作',
          icon: require('./assets/img/lotteryPopular-031-01.png'),
          link: 'play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'jsffc',
          title: 'g_common_gameList_jsffc',
          text: '',
          buttonText: '立即操作',
          icon: require('./assets/img/lotteryPopular-031-02.png'),
          link: 'play/6681474621111',
        },
        {
          sort: 3,
          show: true,
          code: 'jssc',
          title: 'g_common_gameList_jscar',
          text: '',
          buttonText: '立即操作',
          icon: require('./assets/img/lotteryPopular-031-03.png'),
          link: 'play/2147212049129',
        },
        {
          sort: 4,
          show: true,
          code: 'jsft',
          title: 'g_common_gameList_jsft',
          text: '',
          buttonText: '立即操作',
          icon: require('./assets/img/lotteryPopular-031-04.png'),
          link: 'play/7043222726362',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-031 {
  width: 100%;
  display: flex;
  justify-content: center;
  background-position: center center;
  .group-wrap {
    display: flex;
    flex-wrap: wrap;
    .group-btn-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;
      width: 25%;
      .group-btn-title {
        position: absolute;
        font-size: 20px;
        top: 12%;
      }
      .group-btn-text {
        position: absolute;
        font-size: 50px;
        top: 35%;
        // padding-left: 1.5em;
        color: var(--v-primary-base);
      }
      .group-btn-btn {
        position: absolute;
        font-size: 16px;
        top: 75.5%;
        padding-left: 1.5em;
        color: var(--v-primary-base);
      }
    }
  }

  // hover效果
  .group-btn-wrap:hover {
    color: var(--v-secondary-base) !important;
    .group-btn-image,
    .group-btn-title {
      animation: swing 1s 1;
    }
  }
}
</style>
