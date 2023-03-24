<template>
  <div class="lotteryPopular032">
    <div class="pt-0">
      <v-row class="mt-0 ml-0 mr-0">
        <v-col cols="6" class="pt-1 pb-0 pl-6">
          <h1 class="lastest-title my-0">{{ $t('g_common_game_hot_game') }}</h1>
        </v-col>
      </v-row>
      <v-row class="LotteryPopular px-5 pb-5 mt-2">
        <v-col class="item popular__list" :cols="cols" v-for="(item, index) in lotteryList" :key="index" @click="ROUTER_PUSH(item.link)">
          <v-card class="box-shadow" style="cursor: pointer" v-bind="cardBind">
            <img :src="item.img" :alt="item.title" />
            <div class="lottery-carousel__controls gameHot--text text-h6">{{ $t(item.title) }}</div>
            <div class="playnow d-flex align-center justify-center">
              <v-btn text>{{ $t('g_common_gameList_enter') }}</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-032',
  props: {
    cols: {
      type: Number,
      default: 3,
    },
    cardBind: {
      type: Object,
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
          code: 'mglive',
          title: 'g_common_gameList_mglive',
          img: require('./assets/img/live.png'),
          link: 'liveLobby',
        },
        {
          sort: 2,
          show: true,
          code: 'fish',
          title: 'g_common_gameList_fish',
          img: require('./assets/img/fish.png'),
          link: 'play/AGSvcZAA53g2Ly',
        },
        {
          sort: 3,
          show: true,
          code: 'lottery',
          title: 'g_common_gameList_lottery',
          img: require('./assets/img/lottery.png'),
          link: '/ultimate',
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          title: 'g_common_gameList_chesscardBetting',
          img: require('./assets/img/chess.png'),
          link: 'play/46297061913392',
        },
        {
          sort: 5,
          show: true,
          code: 'kgsport',
          title: 'g_common_game_kg_sports',
          img: require('./assets/img/kgsport.png'),
          link: 'play/cssports',
        },
      ],
      sort: 'alphabetically-asc',
      sortItem: [
        {
          text: 'Alphabetically A-Z',
          value: 'alphabetically-asc',
        },
        {
          text: 'Alphabetically Z-A',
          value: 'alphabetically-desc',
        },
        // {
        //   text: 'RTP 0-100',
        //   value: 'rtp-asc',
        // },
        // {
        //   text: 'RTP 100-0',
        //   value: 'rtp-desc',
        // },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
      // let raw = mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
      // raw = raw.filter(item => {
      //   return !this.q || this.$t(item.title).toLowerCase().includes(this.q.toLowerCase());
      // });
      // raw = raw.sort((a, b) => {
      //   const titleA = this.$t(a.title).toLowerCase();
      //   const titleB = this.$t(b.title).toLowerCase();
      //   return titleB > titleA ? -1 : 1;
      // });
      // if (this.sort == 'alphabetically-desc') {
      //   raw = raw.reverse();
      // }
      // return raw;
    },
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.lotteryPopular032 {
  display: flex;
  flex-direction: column;
  background: #22252c;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(#313641),
    color-stop(#191d2e),
    color-stop(#0f171f),
    color-stop(#17191e),
    color-stop(#2d313b),
    color-stop(#2d313b),
    color-stop(#2d313b),
    color-stop(#17191e),
    to(#0b0713)
  );
  background: linear-gradient(to bottom right, #313641, #191d2e, #0f171f, #17191e, #2d313b, #2d313b, #2d313b, #17191e, #0b0713);
  position: relative;
  &:before {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(./assets/img/noise.png) center center repeat;
    opacity: 0.4;
  }
}

.popular__title {
  width: 100%;
  text-align: center;
  padding: 16px 0 40px 0;
}
.item {
  .playnow {
    border: 1px solid #928467;
    background: rgba(0, 0, 0, 0);
    width: 100%;
    height: 83%;
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 0.15s;
    .v-btn {
      padding: 10px 16px;
      font-size: 18px;
      line-height: 1.3333333;
      background: #c0ab6f;
      background: -webkit-gradient(linear, left top, left bottom, from(#e4d3a3), to(#9f8846));
      background: linear-gradient(#e4d3a3, #9f8846);
      border-color: #c0ab6f;
      transform: translateY(50px);
      transition-duration: 0.15s;
      opacity: 0;
    }
  }
  &:hover {
    .playnow {
      background: rgba(192, 171, 111, 0.6);
      transition-duration: 0.25s;
      .v-btn {
        transform: translateY(0px);
        opacity: 1;
        transition-duration: 0.5s;
      }
    }
  }
}
.LotteryPopular {
  .item .lottery-carousel__controls {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 15px 8px;
    margin-bottom: 4px;
    color: #fdf8ee;
    text-align: center;
    background: #a01428;
    background: -webkit-gradient(linear, left top, left bottom, from(#ce102d), to(#741220));
    background: linear-gradient(#ce102d, #741220);
  }
  // hover效果
  .item:hover .lottery-carousel__controls {
    height: 100%;
    color: white;
    text-shadow: 0 0 6px #fdf8ee, 0 0 10px #e4d3a3, 0 0 16px #e4d3a3, 0 0 20px #e4d3a3;
  }
  .popular__list {
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
.lastest-title {
  font-family: 'Roboto Slab', serif;
  font-weight: 500;
  font-size: 30px;
  text-transform: uppercase;
  color: #d4ccbb;
  letter-spacing: 4px;
  position: relative;
  display: inline-block;
  color: #fdf8ee;
  text-shadow: 0 0 6px #fdf8ee, 0 0 10px #e4d3a3, 0 0 16px #e4d3a3, 0 0 20px #e4d3a3;
  &:after {
    content: '';
    margin-left: 20px;
    position: absolute;
    top: 50%;
    background-color: #ffe1e5;
    display: inline-block;
    width: 4em;
    height: 2px;
    box-shadow: 0 0 6px #ffe1e5, 0 0 10px #ff435f, 0 0 16px #ff435f, 0 0 20px #ff435f;
  }
}
</style>

<style lang="scss">
.lotteryPopular027 {
  .Search {
    position: relative;
    margin: 15px 15px 0;
    padding: 8px 15px;
    border: 1px solid #b7122b;
    background-color: #a01428;
    border-radius: 0;
    background: -webkit-gradient(linear, left top, left bottom, from(#ce102d), to(#741220));
    background: linear-gradient(#ce102d, #741220);
  }
  font-family: Montserrat, sans-serif;
  .v-input {
    .v-input__prepend-outer {
      background-color: #eee;
      top: 0;
      left: 0;
      margin: 0 !important;
      padding: 0;
      text-align: center;
      i {
        background-color: #17191e;
        color: #17191e;
        opacity: 0.8;
        text-shadow: 0 0 10px #fdf8ee, 0 0 10px #e4d3a3, 0 0 16px #e4d3a3, 0 0 20px #e4d3a3;
        min-height: 40px;
        width: 40px;
        border: 1px solid #b2a68f;
        border-right: 0;
      }
    }
  }
  .v-input__slot fieldset {
    border: 0;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    font-size: 12px;
    border-radius: 0;
    border: 1px solid #b2a68f;
    background: #22252c;
    color: #b2a68f;
  }
  .v-input__append-inner {
    .v-icon.v-icon {
      color: #b2a68f;
    }
  }
  .v-select__selection--comma.v-select__selection,
  .v-text-field__slot input {
    color: #b2a68f !important;
  }
  input::placeholder {
    font-style: italic;
    color: #b2a68f !important;
  }
}

.box-shadow {
  box-shadow: 2px 4px 8px RGBA(0, 0, 0, 0.6) !important;
}
</style>
