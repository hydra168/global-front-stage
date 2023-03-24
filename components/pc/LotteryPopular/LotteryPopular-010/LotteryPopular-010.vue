<template>
  <div>
    <div class="title d-flex justify-center mb-5" :style="`color:${text__color};`">{{ $t(title) }}</div>
    <v-row class="LotteryPopular">
      <v-col v-for="(item, index) in lotteryList" :key="index" :cols="cols" @click="ROUTER_PUSH(item.link)" class="item">
        <v-card style="cursor: pointer" class="lottery-popular-card">
          <div class="img__box">
            <img :src="item.img" class="item-img" alt="" />
          </div>
          <div class="pt-2 pb-2 pl-2 pr-2 card__text" :style="`background-color:${content__bg};`">
            <div class="gameHot--text headline d-flex justify-center align-center mb-2" :style="`color:${text__color};`">{{ $t(item.title) }}</div>
            <div class="d-flex justify-center align-center mb-6" :style="`color:${text__color};`">{{ $t(item.text) }}</div>
            <div class="d-flex justify-center align-center" :class="btn__position__type === true ? btn__position : ''">
              <div class="btn d-flex justify-center align-center frozen-hover" :style="`color:${text__color};background-color:${btn__bg};`">
                {{ $t(betTitle) }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjects, mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular',
  props: {
    btn__position__type: {
      type: Boolean,
      default: true,
    },
    btn__bg: {
      type: String,
      default: 'transparent',
    },
    btn__position: {
      type: String,
      default: 'btn__position__1',
    },
    content__bg: {
      type: String,
      default: '#fff',
    },
    text__color: {
      type: String,
      default: '#000',
    },
    cols: {
      type: String,
      default: '6',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'g_com_lotteryPopular_010_brand_game',
    },
    betTitle: {
      type: String,
      default: 'g_common_gameList_betting',
    },
  },
  data() {
    return {
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'sports',
          img: require('./assets/img/lotteryPopular-010-01.png'),
          title: 'g_common_game_cs_sports',
          text: 'g_com_lotteryPopular_010_popularText1',
          link: '/play/30n4hvJ4MGjhfY',
        },
        {
          sort: 2,
          show: true,
          code: 'lottery',
          img: require('./assets/img/lotteryPopular-010-02.png'),
          title: 'g_common_gameList_lottery_flagship',
          text: 'g_com_lotteryPopular_010_popularText2',
          link: '/ultimate',
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
.LotteryPopular {
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #cbcbcb;
  }
  .img__box {
    width: 100%;
    font-size: 0;
    img {
      width: 100%;
    }
  }
}

.title {
  font-size: 30px;
  font-weight: bold;
}
.btn__position__1 {
  position: absolute;
  top: 78px;
  right: 24px;
}
// hover效果
.lottery-popular-card {
  .img__box {
    transition: 0.5s;
    overflow: hidden;
  }
  .card__text {
    min-height: 220px;
  }
  &:hover {
    .img__box {
      filter: brightness(1.1);
    }
    .item-img {
      transform: scale(1.2);
    }
  }
}
</style>
