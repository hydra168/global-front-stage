<template>
  <div class="LotteryPopular-003" :class="LotteryClass">
    <div class="title-area" :class="titleClass">
      <img class="icon align-center" />
      <span class="title-text">{{ $t(titleText) }}</span>
      <img class="icon" />
    </div>
    <div class="content-wrap">
      <v-container class="content">
        <v-row class="content-row justify-center">
          <template v-for="(item, k) in lotteryList">
            <v-col :key="k" :cols="item.col || 4" class="d-flex flex-column align-center" @click="ROUTER_PUSH(item.link)">
              <template v-if="item.show || true">
                <img class="row-img mb-2" width="100%" :src="item.icon" />
                <h5 class="row-title" :class="itemTitleClass">{{ $t(item.title) }}</h5>
              </template>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
/**
 * 热门彩种
 */
export default {
  name: 'LotteryPopular-003',
  props: {
    LotteryClass: {
      type: String,
      default: '',
    },
    titleText: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      // 可選樣式 default,style1
      default: 'default',
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
<style lang="scss">
.LotteryPopular-003 {
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .title-area {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    &.default {
      &::after {
        position: absolute;
        left: 10%;
        width: 25%;
        top: 50%;
        content: '';
        height: 1px;
        background-color: #d8d8d8;
      }
      &::before {
        position: absolute;
        right: 10%;
        width: 25%;
        top: 50%;
        content: '';
        height: 1px;
        background-color: #d8d8d8;
      }
    }
    &.style1 {
      font-family: MFLiHei_Noncommercial;
      font-size: 24px;
      .icon {
        margin: 3px 10px;
        width: 21px;
        height: 29px;
        background: url('./assets/img/bitmap.png');
      }
    }
  }
  .content-wrap {
    border: 1px solid #d8d8d8;
    border-radius: 10px;
  }
}
</style>
