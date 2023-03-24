<template>
  <div class="lotteryPopular027">
    <v-container class="pt-0">
      <h1 class="lastest-title">Latest</h1>
      <v-row class="LotteryPopular">
        <div class="popular__wrap">
          <v-col class="item popular__list" :cols="cols" v-for="(item, index) in lotteryList" :key="index" @click="ROUTER_PUSH(item.link)">
            <v-card style="cursor: pointer" v-bind="cardBind">
              <img :src="item.img" :alt="item.title" />
              <div class="lottery-carousel__controls gameHot--text headline">
                {{ $t(item.title) }}
              </div>
              <div class="playnow d-flex align-center justify-center">
                <v-btn text>PLAY NOW</v-btn>
              </div>
            </v-card>
          </v-col>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular-027',
  props: {
    cols: {
      type: Number,
      default: 4,
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
          code: 'kgsport',
          title: 'g_common_game_kg_sports',
          img: require('./assets/img/lotteryPopular-027-01.png'),
          link: 'play/30n4hvJ4MGjhfY',
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          title: 'g_common_gameList_lottery',
          img: require('./assets/img/lotteryPopular-027-02.png'),
          link: '/ultimate',
        },
        {
          sort: 3,
          show: true,
          code: 'mglive',
          title: 'g_common_gameList_mglive',
          img: require('./assets/img/lotteryPopular-027-03.png'),
          link: 'liveLobby',
        },
        {
          sort: 4,
          show: true,
          code: 'chess',
          title: 'g_common_gameList_chesscardBetting',
          img: require('./assets/img/lotteryPopular-027-04.png'),
          link: 'play/BgFcIROExgMd',
        },
        {
          sort: 5,
          show: true,
          code: 'fish',
          title: 'g_common_gameList_fish',
          img: require('./assets/img/lotteryPopular-027-05.png'),
          link: 'play/AGSvcZAA53g2Ly',
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

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.lotteryPopular027 {
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
    background: url(./assets/img/lotteryPopular-027-noise.png) center center repeat;
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
    height: 100%;
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
      opacity: 0.1;
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
  display: flex;
  width: 100%;
  justify-content: center;
  .item .lottery-carousel__controls {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // -o-text-overflow: ellipsis;
    // -moz-binding: url(assets/xml/ellipsis.xml#ellipsis);
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
  }
  .popular__wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px;
    max-width: 1300px;
  }
  .popular__list {
    width: 100%;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
.lastest-title {
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
  text-transform: uppercase;
  color: #d4ccbb;
  letter-spacing: 4px;
  position: relative;
  display: inline-block;
  color: #fdf8ee;
  text-shadow: 0 0 6px #fdf8ee, 0 0 10px #e4d3a3, 0 0 16px #e4d3a3, 0 0 20px #e4d3a3;

  margin-top: 20px;
  margin-bottom: 10px;
  &:after {
    content: '';
    margin-left: 20px;
    position: absolute;
    top: 50%;
    background-color: #ffe1e5;
    display: inline-block;
    width: 150px;
    height: 2px;
    box-shadow: 0 0 6px #ffe1e5, 0 0 10px #ff435f, 0 0 16px #ff435f, 0 0 20px #ff435f;
  }
}
</style>
