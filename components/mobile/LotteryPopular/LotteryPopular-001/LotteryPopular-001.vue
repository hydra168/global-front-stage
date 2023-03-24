<template>
  <div class="LotteryPopular-001">
    <v-card class="rounded-xl grey lighten-2">
      <v-card-title class="text-h6 grey lighten-2 pa-1 justify-center">{{ $t(titleText) }}</v-card-title>
      <v-container class="rounded-xl white">
        <v-row class="justify-center">
          <template v-for="(item, k) in lotteryList">
            <v-col :key="k" cols="4" class="d-flex flex-column align-center" @click="ROUTER_PUSH(item.link)">
              <img width="100%" class="mb-2" :src="item.icon" />
              <h5 :class="itemTitleClass">{{ $t(item.title) }}</h5>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
/**
 * 热门彩种
 */
export default {
  name: 'LotteryPopular-001',
  props: {
    titleText: {
      type: String,
      default: 'g_com_lotteryPopular_001_title',
    },
    itemTitleClass: {
      type: String,
      default: 'dark--text',
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
          icon: require('./assets/img/blue-js-ff.png'),
          link: 'play/6681474621111',
        },
        {
          sort: 5,
          show: true,
          code: 'blue-js-sf',
          title: 'g_common_gameList_or_js3',
          icon: require('./assets/img/blue-js-sf.png'),
          link: 'play/960669940301',
        },
        {
          sort: 6,
          show: true,
          code: 'blue-js-5f',
          title: '极速五分彩',
          icon: require('./assets/img/blue-js-5f.png'),
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

<style lang="scss"></style>
