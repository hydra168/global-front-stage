<template>
  <div class="LotteryPopular-014">
    <v-row>
      <template v-for="(item, i) in lotteryList">
        <v-col :key="i" :cols="item.cols" @click="ROUTER_PUSH(item.link)">
          <div class="item__wrap shiny-hover" :class="itemClass">
            <div class="item__wrap-img d-flex flex-column align-center" :class="itemImgClass">
              <img :src="item.img" class="item__wrap-img-link" :style="{ width: itemImgWidth }" />
              <h6 :class="itemTitleClass">{{ $t(item.title) }}</h6>
            </div>
            <div class="item__wrap-content" :class="itemContentClass">
              <div class="d-flex flex-column align-center justify-center" :style="{ height: '95%' }">
                <img :src="item.icon" :style="{ width: itemIconWidth }" />
                <span :class="activeClass">{{ $t(item.activeText) }}</span>
              </div>
              <div :class="lineClass" :style="{ height: '5%' }"></div>
            </div>
          </div>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-014',
  props: {
    itemClass: {
      type: String,
      default: 'rounded-lg',
    },
    itemImgClass: {
      type: String,
      default: 'white pa-4',
    },
    itemImgWidth: {
      type: String,
      default: '80px',
    },
    itemTitleClass: {
      type: String,
      default: 'text-subtitle-2 grey--text text--darken-4',
    },
    itemContentClass: {
      type: String,
      default: 'grey darken-2',
    },
    itemIconWidth: {
      type: String,
      default: '40px',
    },
    activeClass: {
      type: String,
      default: 'text-subtitle-2 white--text mt-4',
    },
    lineClass: {
      type: String,
      default: 'primary',
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
          code: 'jsPk10',
          cols: '4',
          title: 'g_common_gameList_jsPk10',
          img: require('./assets/img/blue-js-pk10.png'),
          icon: require('./assets/img/icon.png'),
          link: 'play/BxkZVPiJb63a',
          activeText: 'g_common_gameList_betting',
        },
        {
          sort: 2,
          show: true,
          code: 'jssc',
          cols: '4',
          title: 'g_common_gameList_jscar',
          img: require('./assets/img/blue-js-fc.png'),
          icon: require('./assets/img/icon.png'),
          link: 'play/2147212049129',
          activeText: 'g_common_gameList_betting',
        },
        {
          sort: 3,
          show: true,
          code: 'jsft',
          cols: '4',
          title: 'g_common_gameList_jsft',
          img: require('./assets/img/blue-js-ft.png'),
          icon: require('./assets/img/icon.png'),
          link: 'play/7043222726362',
          activeText: 'g_common_gameList_betting',
        },
        {
          sort: 4,
          show: true,
          code: 'jsffc',
          cols: '4',
          title: 'g_common_gameList_jsffc',
          img: require('./assets/img/blue-js-ff.png'),
          icon: require('./assets/img/icon.png'),
          link: 'play/6681474621111',
          activeText: 'g_common_gameList_betting',
        },
        {
          sort: 5,
          show: true,
          code: 'js3fc',
          cols: '4',
          title: 'g_common_gameList_js3fc',
          img: require('./assets/img/blue-js-sf.png'),
          icon: require('./assets/img/icon.png'),
          link: 'play/960669940301',
          activeText: 'g_common_gameList_betting',
        },
        {
          sort: 6,
          show: true,
          code: 'js5fc',
          cols: '4',
          title: 'g_common_gameList_js5fc',
          img: require('./assets/img/blue-js-5f.png'),
          icon: require('./assets/img/icon.png'),
          link: 'play/1608011465',
          activeText: 'g_common_gameList_betting',
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
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-014 {
  img {
    width: 100%;
  }
  .item__wrap {
    display: flex;
    overflow: hidden;
    cursor: pointer;
    .item__wrap-img {
      width: 60%;
    }
    .item__wrap-content {
      width: 40%;
    }
  }
  // hover效果
  .item__wrap:hover {
    .item__wrap-img-link {
      animation: swing 1s 1;
    }
  }
}
</style>
