<template>
  <div class="LotteryPopular-002">
    <v-row>
      <template v-for="(item, i) in lotteryList">
        <v-col :key="i" cols="4" class="text-center" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
          <img :src="item.icon" width="100%" />
          <h6 :class="titleColor">{{ $t(item.title) }}</h6>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-002',
  props: {
    titleColor: {
      type: String,
      default: 'text-subtitle-2',
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
          code: 'blue-js-pk10',
          title: 'g_common_gameList_jsPk10',
          icon: require('./assets/img/blue-js-pk10.png'),
          link: 'play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'blue-js-fc',
          title: 'g_common_gameList_jscar',
          icon: require('./assets/img/blue-js-fc.png'),
          link: 'play/2147212049129',
        },
        {
          sort: 3,
          show: true,
          code: 'blue-js-ft',
          title: 'g_common_gameList_jsft',
          icon: require('./assets/img/blue-js-ft.png'),
          link: 'play/7043222726362',
        },
        {
          sort: 4,
          show: true,
          code: 'blue-js-ff',
          title: 'g_common_gameList_jsffc',
          icon: require('./assets/img/blue-js-ffc01.png'),
          link: 'play/6681474621111',
        },
        {
          sort: 5,
          show: true,
          code: 'blue-js-sf',
          title: 'g_common_gameList_or_js3',
          icon: require('./assets/img/blue-js-sfc.png'),
          link: 'play/960669940301',
        },
        {
          sort: 6,
          show: true,
          code: 'blue-js-5f',
          title: 'g_common_gameList_or_js5',
          icon: require('./assets/img/blue-js-wfc.png'),
          link: 'play/1608011465',
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
