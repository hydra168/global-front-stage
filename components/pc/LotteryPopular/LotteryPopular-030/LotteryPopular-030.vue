<template>
  <v-row class="LotteryPopular" v-bind="rowBind">
    <v-col v-for="(item, index) in lotteryList" :key="index" :cols="cols" @click="ROUTER_PUSH(item.link)" class="item pa-1 ma-0">
      <v-card style="cursor: pointer" v-bind="cardBind">
        <v-img :src="item.img" :width="imgWidth" />
        <div class="lottery-carousel__controls gameHot--text headline">{{ $t(item.title) }}</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-030',
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    rowBind: {
      type: Object,
    },
    cols: {
      type: Number,
      default: 3,
    },
    cardBind: {
      type: Object,
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
          code: 'jsPk10',
          img: require('./assets/img/01.png'),
          title: 'g_common_gameList_jsPk10',
          link: '/play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'jsft',
          img: require('./assets/img/02.png'),
          title: 'g_common_gameList_jsft',
          link: '/play/7043222726362',
        },
        {
          sort: 3,
          show: true,
          code: 'jssc',
          img: require('./assets/img/03.png'),
          title: 'g_common_gameList_jscar',
          link: '/play/2147212049129',
        },
        {
          sort: 4,
          show: true,
          code: 'jsffc',
          img: require('./assets/img/04.png'),
          title: 'g_common_gameList_jsffc',
          link: '/play/6681474621111',
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
  .item .lottery-carousel__controls {
    align-items: center;
    background: rgba(241, 231, 28, 0.7);
    bottom: 0;
    display: flex;
    height: 50px;
    justify-content: center;
    list-style-type: none;
    position: absolute;
    width: 100%;
    z-index: 1;
    color: #fff;
    transition: height 0.3s;
  }
  // hover效果
  .item:hover .lottery-carousel__controls {
    height: 100%;
    color: white;
  }
}
</style>
