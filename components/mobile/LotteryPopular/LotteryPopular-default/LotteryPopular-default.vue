<template>
  <v-card outlined>
    <v-toolbar flat :color="barColor" :dark="barDark">
      <v-toolbar-title>{{ $t(titleText) }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small outlined :color="barBtnColor" @click="ROUTER_PUSH('play/BxkZVPiJb63a')">
        {{ textFilter('more') }}<v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-row>
        <template v-for="(item, k) in lotteryList">
          <v-col :key="k" cols="6" @click="ROUTER_PUSH(item.link)">
            <v-card>
              <v-container class="d-flex flex-column justify-center align-center">
                <v-img width="100" :src="item.icon"></v-img>
                <h3 :class="`text--h3 font-weight-black my-3 ${itemTitleColor}`">{{ $t(item.title) }}</h3>
                <v-btn outlined block color="primary">{{ textFilter('enterText') }}<v-icon>keyboard_arrow_right</v-icon> </v-btn>
              </v-container>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
/**
 * @param titleText: 標題按鈕
 * @param lotteryList: 顯示彩票
 * @param barDark: 標題
 * @param barColor: 標題顏色
 * @param barBtnColor: 標題按鈕
 * @param itemTitleColor: 標題按鈕
 */
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular',
  props: {
    titleText: {
      type: String,
      default: 'g_com_lotteryPopular_default_title',
    },
    barDark: {
      type: Boolean,
      default: true,
    },
    barColor: {
      type: String,
      default: 'primary',
    },
    barBtnColor: {
      type: String,
      default: 'secondary',
    },
    itemTitleColor: {
      type: String,
      default: 'primary--text',
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
    ...mapMutations(['SET_CURRENT_MENU_TITLE']),
    routerPush(link) {
      this.SET_CURRENT_MENU_TITLE(this.$t(this.titleText));
      this.$router.push({ path: link });
    },
    textFilter(text) {
      return textFilter(text, 'com_lotteryPopular_default_');
    },
  },
};
</script>
