<template>
  <v-row class="LotteryPopular" v-bind="rowBind">
    <v-col v-for="(item, index) in lotteryList" :key="index" :cols="cols" @click="ROUTER_PUSH(item.link)" class="item pa-1 ma-0">
      <v-card style="cursor: pointer" v-bind="cardBind">
        <v-img :src="item.img" :width="imgWidth" />
        <div class="lottery-carousel__controls gameHot--text headline">
          {{ $t(item.title) }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular',
  props: {
    rowBind: {
      type: Object,
    },
    cols: {
      type: Number,
      default: 6,
    },
    cardBind: {
      type: Object,
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    imgWidth: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'jspk10',
          title: 'g_common_game_jsPk10',
          img: require('./assets/img/lotteryPopular-034-01.png'),
          link: '/play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'jscar',
          title: 'g_common_gameList_jscar',
          img: require('./assets/img/lotteryPopular-034-02.png'),
          link: '/play/2147212049129',
        },
        {
          sort: 3,
          show: true,
          code: 'jsft',
          title: 'g_common_gameList_jsft',
          img: require('./assets/img/lotteryPopular-034-03.png'),
          link: '/play/7043222726362',
        },
        {
          sort: 4,
          show: true,
          code: 'jsffc',
          title: 'g_common_gameList_jsffc',
          img: require('./assets/img/lotteryPopular-034-04.png'),
          link: '/play/6681474621111',
        },
        {
          sort: 5,
          show: true,
          code: 'js3fc',
          title: 'g_common_gameList_js3fc',
          img: require('./assets/img/lotteryPopular-034-05.png'),
          link: '/play/960669940301',
        },
        {
          sort: 6,
          show: true,
          code: 'js5fc',
          title: 'g_common_gameList_js5fc',
          img: require('./assets/img/lotteryPopular-034-06.png'),
          link: '/play/1608011465',
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

<style lang="scss" scope>
.LotteryPopular {
  background-color: inherit;
  .item .lottery-carousel__controls {
    align-items: center;
    // background: rgba(0, 0, 0, 0.3);
    bottom: 0;
    display: flex;
    height: 50px;
    justify-content: center;
    list-style-type: none;
    position: absolute;
    width: 100%;
    z-index: 1;
    transition: height 0.3s;
    font-family: PingFangTC;
    font-size: 21px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.93px;
    color: #3c3c3c;
  }
  // hover效果
  .item:hover .lottery-carousel__controls {
    height: 100%;
    color: #545454;
  }
  .cards {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
