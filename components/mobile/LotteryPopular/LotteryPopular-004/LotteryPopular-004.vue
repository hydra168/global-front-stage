<template>
  <div class="LotteryPopular-004">
    <div
      v-for="(item, i) in lotteryList"
      :key="i"
      class="lotteryPopular__wrap d-flex"
      :class="{ 'flex-row-reverse': i % 2 === 0 }"
      @click="ROUTER_PUSH(item.link)"
    >
      <div class="img__wrap"><img :src="item.img" width="100%" /></div>
      <div class="title__wrap" :class="titleClass">
        <h6 class="title__wrap-text" :class="[i % 2 === 0 ? 'right' : 'left']">{{ $t(item.title) }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'LotteryPopular-004',
  props: {
    itemsOption: {
      type: Array,
      default: () => [],
    },
    titleClass: {
      type: String,
      default: 'primary white--text',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultLotteryList: [
        { sort: 1, code: 'jsPk10', show: true, title: 'g_common_gameList_jsPk10', img: require('./assets/img/01.png'), link: 'play/BxkZVPiJb63a' },
        { sort: 3, code: 'jssc', show: true, title: 'g_common_gameList_jscar', img: require('./assets/img/02.png'), link: 'play/2147212049129' },
        { sort: 4, code: 'jsft', show: true, title: 'g_common_gameList_jsft', img: require('./assets/img/03.png'), link: 'play/7043222726362' },
        { sort: 2, code: 'jsff', show: true, title: 'g_common_gameList_jsffc', img: require('./assets/img/04.png'), link: 'play/6681474621111' },
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
.LotteryPopular-004 {
  .lotteryPopular__wrap {
    height: 130px;
    overflow: hidden;
    .img__wrap {
      width: 92%;
    }
    .title__wrap {
      width: 8%;
      position: relative;
      .title__wrap-text {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        text-align: center !important;
        align-items: center;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-size: 1.1em;
        text-shadow: -2px 4px 3px rgba(0, 0, 0, 0.3);
        &.right {
          right: 3px;
        }
        &.left {
          left: 3px;
        }
      }
    }
  }
}
</style>
