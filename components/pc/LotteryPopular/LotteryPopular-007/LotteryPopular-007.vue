<template>
  <div class="LotteryPopular-007">
    <v-container>
      <div class="block__wrap">
        <div class="img-wrap" @click="ROUTER_PUSH(lotteryList[currentImgIndex].link)">
          <img :src="lotteryList[currentImgIndex].img" />
        </div>
        <div class="" v-for="(item, i) in lotteryList" :key="i">
          <div
            class="title__item"
            :class="[currentImgIndex == i ? activeTitleClass : titleClass]"
            :style="{ width: `${titleWidth}px`, right: `${(titleWidth - 5) * i}px` }"
            @click.prevent="clickHandler(i)"
          >
            <div class="title__wrap" :class="hoverClass">
              <h6 class="title__link">{{ item.title }}</h6>
              <div class="title__sub_wrap">
                <span class="title__sub">{{ $t(item.subtitle) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-007',
  props: {
    titleWidth: {
      type: Number,
      default: 90,
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    titleClass: {
      type: String,
      default: 'grey darken-1',
    },
    activeTitleClass: {
      type: String,
      default: 'primary',
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'background-secondary-hover shadow-hover',
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'east',
          title: 'east',
          subtitle: 'g_common_gameList_jsPk10',
          img: require('./assets/img/01.png'),
          link: 'play/BxkZVPiJb63a',
        },
        {
          sort: 2,
          show: true,
          code: 'south',
          title: 'south',
          subtitle: 'g_common_gameList_jsffc',
          img: require('./assets/img/02.png'),
          link: 'play/6681474621111',
        },
        {
          sort: 3,
          show: true,
          code: 'west',
          title: 'west',
          subtitle: 'g_common_gameList_jscar',
          img: require('./assets/img/03.png'),
          link: 'play/2147212049129',
        },
        {
          sort: 4,
          show: true,
          code: 'north',
          title: 'north',
          subtitle: 'g_common_gameList_jsft',
          img: require('./assets/img/04.png'),
          link: 'play/7043222726362',
        },
      ],
      currentImgIndex: 0, // 取最後一筆當預設值
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    clickHandler(i) {
      this.currentImgIndex = i;
    },
  },
  watch: {
    optionsLotteryList: {
      handler(val) {
        this.lotteryList = mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
      },
      immediate: true,
    },
    lotteryList: {
      handler(val) {
        this.currentImgIndex = val.length - 1;
      },
      immediate: true,
    },
  },
  computed: {
    clickStyle() {
      return { width: `${this.titleWidth}px` };
    },
  },
};
</script>

<style lang="scss" scope>
@import '@ASSETS/scss/hover.scss';
.LotteryPopular-007 {
  .block__wrap {
    color: white;
    background-color: black;
    max-height: 455px;
    overflow: hidden;
    position: relative;
  }
  .img-wrap {
    width: 80%;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .title__item {
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #eaeaea;
    right: 0;
    cursor: pointer;
    &.title-default-class {
      background: linear-gradient(142deg, map-get($white, darken1), map-get($white, darken4));
    }
    &.title-active-class {
      background: linear-gradient(142deg, map-get(map-get($colors, primary), base), map-get(map-get($colors, primary), base));
    }
    .title__wrap {
      position: relative;
      height: 100%;
      padding: 20px 10px;
      .title__sub_wrap {
        position: absolute;
        bottom: 20px;
        right: 10px;
      }
    }
    .title__link {
      font-size: 40px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      text-transform: uppercase;
      letter-spacing: 12px;
      text-shadow: 4px 4px 4px rgba(54, 54, 54, 0.5);
    }
    .title__sub {
      font-size: 22px;
      writing-mode: vertical-rl;
      letter-spacing: 5px;
    }
  }
}
</style>
