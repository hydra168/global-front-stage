<template>
  <v-card class="leader-board" :class="wrapClass" flat tile shaped width="100%">
    <!-- 置中版 -->
    <v-card-title v-if="titleCenterStyle" :class="titleBgClass">
      <v-icon left :large="iconLarge" :class="iconClass">fa-trophy</v-icon>
      <span :class="titleTextClass"> {{ $t(titleKey) }}</span>
    </v-card-title>
    <!-- 分開版 -->
    <div v-else :class="titleBgClass" class="position-relative">
      <img v-if="rank001" class="position-absolute pl-4" height="80%" :src="require('./assets/rank.png')" alt="" style="left: 0" />
      <img v-else class="position-absolute pl-4" height="80%" :src="require('./assets/trophy.png')" alt="" style="left: 0" />
      <span :class="titleTextClass">{{ $t(titleKey) }}</span>
    </div>
    <v-card-text class="pa-0">
      <v-container fluid>
        <v-layout class="row wrap" :class="tableHeaderClass">
          <v-flex class="align-self-center" sm2></v-flex>
          <v-flex class="align-self-center" sm5>{{ textFilter('userName') }}</v-flex>
          <v-flex class="align-self-center" sm5>{{ textFilter(title2Key) }}</v-flex>
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
              <v-flex class="align-self-center font-weight-bold" sm5>{{ item.number | money }}{{ textFilter(title3Key) }}</v-flex>
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
 * titleCenterStyle 設定標題排版
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
    titleKey: {
      type: String,
      default: 'g_com_leaderBoard_default_title',
    },
    title2Key: {
      type: String,
      default: 'bonus',
    },
    title3Key: {
      type: String,
      default: 'yuan',
    },
    height: {
      type: String,
      default: '484',
    },
    wrapClass: {
      type: String,
      default: '',
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
    rank001: {
      type: Boolean,
      default: false,
    },
    isVipInfo: {
      type: Boolean,
      default: false,
    },
    fakeInfo: {
      type: Array,
      default: () =>
        [
          { number: 99786.83 },
          { number: 96300.7 },
          { number: 95587.45 },
          { number: 94120.94 },
          { number: 93791.4 },
          { number: 92477.42 },
          { number: 91212.66 },
          { number: 90599.83 },
          { number: 89521.26 },
          { number: 88024.22 },
          { number: 87015.95 },
          { number: 86949.94 },
          { number: 85001.77 },
          { number: 84002.33 },
          { number: 83300.21 },
          { number: 82002.14 },
          { number: 81002.4 },
          { number: 80318.61 },
          { number: 79689.88 },
          { number: 78905.54 },
          { number: 77923.5 },
          { number: 76187.52 },
          { number: 75986.16 },
          { number: 74082.87 },
          { number: 73973.85 },
          { number: 72071.3 },
          { number: 71249.15 },
          { number: 70171.02 },
          { number: 69231.67 },
          { number: 68135.54 },
          { number: 67080.7 },
          { number: 66338.58 },
          { number: 65818.53 },
          { number: 64644.72 },
          { number: 63797.42 },
          { number: 62431.0 },
          { number: 61588.96 },
          { number: 60051.8 },
          { number: 59856.74 },
          { number: 58779.84 },
          { number: 57732.61 },
          { number: 56360.7 },
          { number: 55567.59 },
          { number: 54182.42 },
          { number: 53519.89 },
          { number: 52915.51 },
          { number: 51226.93 },
          { number: 50226.95 },
          { number: 50226.95 },
          { number: 50226 },
          { number: 50107.32 },
          { number: 49923.8 },
          { number: 49921 },
          { number: 48485.6 },
          { number: 48400 },
          { number: 47777.3 },
          { number: 46451.2 },
          { number: 45300 },
          { number: 36226 },
          { number: 36118.9 },
          { number: 35142 },
          { number: 34440 },
          { number: 33989.5 },
          { number: 31000 },
          { number: 30888.8 },
          { number: 29801 },
          { number: 28556 },
          { number: 27655.9 },
          { number: 25331.1 },
          { number: 24388 },
          { number: 23909.2 },
        ].map((item, index) => {
          let from1 = index % 2 === 0 ? 65 : 65;
          let from2 = index % 3 === 0 ? 97 : 65;
          const randomLetter1 = String.fromCharCode(from1 + Math.floor(Math.random() * 26));
          const randomLetter2 = String.fromCharCode(from2 + Math.floor(Math.random() * 26));
          const randomLetter3 = String.fromCharCode(from1 + Math.floor(Math.random() * 26));
          const randomLetter4 = String.fromCharCode(from2 + Math.floor(Math.random() * 26));
          return { name: `${randomLetter1}${randomLetter2}${randomLetter3}${randomLetter4}****`, number: item.number };
        }),
    },
  },
  data() {
    return {
      randomText: '1234567890abcdefghijkllmnopqrstuvwxyzABCBEFGHIJKLMNOPQRSTUVWXYZ',
    };
  },
  computed: {
    randomInfo() {
      // const date = new Date();
      // const m = date.getMonth();
      // const y = date.getFullYear();
      // const d = date.getDate();
      // var fakeInfo = this.fakeInfo;
      // fakeInfo.map((item, index) => {
      //   const base = index + 1;
      //   const abs = m % 2 === 1 ? 1 : -1;
      //   const textKey = [
      //     parseInt((item.number * base) % 63),
      //     parseInt((item.number * base * y) % 63),
      //     parseInt((item.number * (base + d) * y) % 39),
      //     parseInt((item.number * base * m) % 63),
      //   ];
      //   const randomText = Array.from(textKey, item => this.randomText[item]);
      //   // item.number = fakeInfo[index] y * abs * m * d;
      //   item.number = 2001 * (new Date(y, m, d) / new Date('2020/3/30')) + (item.number % 100000) + (fakeInfo.length - base) * y;
      //   let w = item.name.split('');
      //   for (let i = textKey[index % 4] % 4; i < 4; i++) {
      //     w[i] = randomText[i];
      //   }
      //   item.name = w.join('');
      // });
      if (this.isVipInfo) {
        return this.fakeInfo.map(item => {
          const randomLetter1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          const randomLetter2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          return {
            ...item,
            name: `vip${randomLetter1}${randomLetter2}${item.name.slice(5, item.name.length)}`,
          };
        });
      } else {
        return this.fakeInfo;
      }
    },
    transform(t) {
      return t.map(o => {
        const f = o.name.split(' ');
        f[0] = f[0].substr(0, 5) + '****';
        const g = String(o.number).split('');
        g[g.length - 1] = '0';
        g[g.length - 2] = '0';
        o.name = f.join('');
        o.number = parseInt(g.join(''));
        return o;
      });
    },
  },
  methods: {
    textFilter(text) {
      return this.$t(`g_com_leaderBoard_default_${text}`);
    },
  },
};
</script>

<style lang="scss">
.leader-board {
  border: 1px solid #d8d8d8 !important;
  overflow: hidden;
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
