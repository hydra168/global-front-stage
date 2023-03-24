<template>
  <v-card class="leader-board" flat tile shaped width="100%">
    <!-- 置中版 -->
    <v-card-title v-if="titleCenterStyle" :class="titleBgClass">
      <v-icon left :large="iconLarge" :class="iconClass">fa-trophy</v-icon>
      <span :class="titleTextClass">{{ textFilter('title') }}</span>
    </v-card-title>
    <!-- 分開版 -->
    <div v-else :class="titleBgClass" class="position-relative">
      <img class="position-absolute pl-4" height="80%" :src="require('./assets/trophy.png')" alt="" style="left: 0" />
      <span :class="titleTextClass">{{ textFilter('title') }}</span>
    </div>
    <v-card-text class="pa-0">
      <v-container fluid pa-0>
        <v-layout class="row wrap" :class="tableHeaderClass">
          <v-flex class="align-self-center" sm2></v-flex>
          <v-flex class="align-self-center" sm3>{{ textFilter('userName') }}</v-flex>
          <v-flex class="align-self-center" sm4>{{ textFilter('bonus') }}</v-flex>
          <v-flex class="align-self-center" sm3>{{ textFilter('game') }}</v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-text class="pa-0">
      <Vertical :height="height">
        <template slot="dataList">
          <template v-for="num in 2">
            <v-layout v-for="(item, key) in randomInfo" :class="verticalRowClass" :key="`${num}_${key}`">
              <v-flex class="align-self-center" sm2>
                <div :class="verticalLableClass">{{ key + 1 }}</div>
              </v-flex>
              <v-flex class="align-self-center font-weight-bold" sm5>{{ item.name }}</v-flex>
              <v-flex class="align-self-center font-weight-bold" sm5>{{ item.number | money }}{{ textFilter('yuan') }}</v-flex>
              <v-flex class="align-self-center font-weight-bold" sm5>{{ commonTextFilter(item.game) }}</v-flex>
            </v-layout>
          </template>
        </template>
      </Vertical>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * props
 * height 設定排行榜高度
 * titleCenterStyle 設定排行榜高度
 * iconClass icon樣式
 * iconLarge icon大小
 * titleBgClass 標題背景樣式
 * titleTextClass 標題文字樣式
 * titleTextClass 標題文字樣式
 *
 */
import * as customFilter from '@FILTERS/';
import Vertical from '../Vertical';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'LeaderBoard',
  components: {
    Vertical,
  },
  props: {
    height: {
      type: String,
      default: '484',
    },
    titleCenterStyle: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
      default: 'white--text mr-3',
    },
    iconLarge: {
      type: Boolean,
      default: false,
    },
    titleBgClass: {
      type: String,
      default: 'primary d-flex justify-center align-center py-0',
    },
    titleTextClass: {
      type: String,
      default: 'white--text',
    },
    tableHeaderClass: {
      type: String,
      default: 'grey lighten-2 ma-0',
    },
    verticalRowClass: {
      type: String,
      default: 'row wrap white my-0 mx-1',
    },
    verticalLableClass: {
      type: String,
      default: 'square-num d-flex align-center justify-center mx-auto',
    },
  },
  data: () => {
    return {
      randomText: '1234567890abcdefghijkllmnopqrstuvwxyzABCBEFGHIJKLMNOPQRSTUVWXYZ',
      fakeInfo: [
        { name: 'hjk6****', number: 997869.83, game: 'jscar' },
        { name: 'ac65****', number: 96300.7, game: 'maert' },
        { name: 'hx30****', number: 95587.45, game: 'jsPk10' },
        { name: 'tj87****', number: 94120.94, game: 'jsft' },
        { name: 'MDaZ****', number: 93791.4, game: 'jsPk10' },
        { name: 'dlz9****', number: 92477.42, game: 'cqssc' },
        { name: 'fz2b****', number: 51421.66, game: 'jsPk10' },
        { name: 'RE0b****', number: 90599.83, game: 'jscar' },
        { name: 'qoJZ****', number: 89521.26, game: 'opk10' },
        { name: '0nq8****', number: 88024.22, game: 'jsft' },
        { name: 'uQO2****', number: 87015.95, game: 'maert' },
        { name: 'FjSa****', number: 83949.94, game: 'jsPk10' },
        { name: '3sLO****', number: 145575.77, game: 'jsPk10' },
        { name: '8SL5****', number: 104070.33, game: 'cqssc' },
        { name: 'g6fo****', number: 93869.21, game: 'maert' },
        { name: 'DugZ****', number: 92238.14, game: 'jsPk10' },
        { name: 'JRUX****', number: 81002.4, game: 'jsPk10' },
        { name: 'viy1****', number: 80318.61, game: 'jsPk10' },
        { name: 'qaqb****', number: 79689.88, game: 'maert' },
        { name: 'MePi****', number: 78905.54, game: 'jsft' },
        { name: 'dFHA****', number: 77923.5, game: 'jsPk10' },
        { name: 'sjbd****', number: 76187.52, game: 'jsPk10' },
        { name: 'KQbZ****', number: 75986.16, game: 'jscar' },
        { name: 'YaT3****', number: 74082.87, game: 'jscar' },
        { name: 'p37n****', number: 73973.85, game: 'jsPk10' },
        { name: '206I****', number: 72071.3, game: 'jsft' },
        { name: 'SaK7****', number: 71249.15, game: 'jsPk10' },
        { name: 'oy2n****', number: 70171.02, game: 'maert' },
        { name: 'wq84****', number: 69231.67, game: 'opk10' },
        { name: 'lvf2****', number: 68135.54, game: 'jsPk10' },
        { name: 'wb3k****', number: 67080.7, game: 'cqssc' },
        { name: 'b6k8****', number: 66338.58, game: 'jsPk10' },
        { name: 'je9l****', number: 65818.53, game: 'jsft' },
        { name: 'gjkv****', number: 64644.72, game: 'jsPk10' },
        { name: '7qtp****', number: 63797.42, game: 'jsPk10' },
        { name: 'GM9P****', number: 62431.0, game: 'opk10' },
        { name: 'J592****', number: 61588.96, game: 'opk10' },
        { name: 'fOem****', number: 60051.8, game: 'jsPk10' },
        { name: 'UZNH****', number: 59856.74, game: 'maert' },
        { name: 'fm6n****', number: 58779.84, game: 'maert' },
        { name: '0gsn****', number: 57732.61, game: 'jsPk10' },
        { name: 'CWOR****', number: 56360.7, game: 'jsPk10' },
        { name: 'EA8S****', number: 55567.59, game: 'jsPk10' },
        { name: 'qcCE****', number: 54182.42, game: 'jscar' },
        { name: '0OBr****', number: 53519.89, game: 'jsPk10' },
        { name: 'fkn2****', number: 52915.51, game: 'opk10' },
        { name: 'eg3x****', number: 51226.93, game: 'jsPk10' },
        { name: '8l6j****', number: 50226.95, game: 'maert' },
        { name: '8l6j****', number: 50226.95, game: 'jsft' },
        { name: '8l6j****', number: 50226, game: 'cqssc' },
      ],
    };
  },
  computed: {
    randomInfo() {
      const date = new Date();
      const m = date.getMonth();
      const y = date.getFullYear();
      const d = date.getDate();
      var fakeInfo = this.fakeInfo;
      fakeInfo.map((item, index) => {
        const base = index + 1;
        const abs = m % 2 === 1 ? 1 : -1;
        const textKey = [
          parseInt((item.number * base) % 63),
          parseInt((item.number * base * y) % 63),
          parseInt((item.number * (base + d) * y) % 39),
          parseInt((item.number * base * m) % 63),
        ];
        const randomText = Array.from(textKey, item => this.randomText[item]);
        // item.number = fakeInfo[index] y * abs * m * d;
        item.number = 2001 * (new Date(y, m, d) / new Date('2020/3/30')) + (item.number % 100000) + (fakeInfo.length - base) * y;
        let w = item.name.split('');
        for (let i = textKey[index % 4] % 4; i < 4; i++) {
          w[i] = randomText[i];
        }
        item.name = w.join('');
      });
      return this.fakeInfo;
    },
  },
  methods: {
    textFilter(text) {
      return textFilter(text, 'com_leaderBoard_001_', {}, this);
    },
    commonTextFilter(text) {
      return textFilter(text, 'common_gameList_', {}, this);
    },
  },
};
</script>

<style lang="scss">
.leader-board {
  border: 1px solid #d8d8d8 !important;
  .height30 {
    height: 30px;
    line-height: 30px;
  }
  .position-relative {
    position: relative;
  }
  .position-absolute {
    position: absolute;
  }
  .square-num {
    width: 30px;
    height: 30px;
    background-color: rgb(223, 61, 61);
    color: #fff;
    border-radius: 5px;
  }
  .announce-scroll .layout {
    border-bottom: 1px dotted #d8d8d8 !important;
  }
}
</style>
