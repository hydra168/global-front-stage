<template>
  <div class="new-swiper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, i) in optionsLotteryList" :key="i">
        <div class="platform-item" :class="[hoverClass]">
          <img :src="item.src" :alt="$t(item.name)" />
          <h4 :style="mainBgColor">{{ $t(item.name) }}</h4>
          <p>{{ $t(item.text) }}</p>
          <v-btn class="run shiny-hover" rounded dark small depressed :style="btnBgColor" @click="ROUTER_PUSH(item.link)">
            {{ $t('g_common_gameList_experience') }}
          </v-btn>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'LotteryPopular014',
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    optionsLotteryList: {
      type: Array,
      default: () => [
        {
          code: 'chesscard',
          name: 'g_common_gameList_chesscard',
          text: 'g_com_lotteryPopular_014_popularText1',
          link: '/play/BgFcIROExgMd',
          src: require('./assets/img/lotteryPopular-014-01.png'),
        },
        {
          code: 'live',
          name: 'g_common_gameList_live',
          text: 'g_com_lotteryPopular_014_popularText2',
          link: '/liveLobby',
          src: require('./assets/img/lotteryPopular-014-02.png'),
        },
        {
          code: 'fish',
          name: 'g_common_gameList_fish',
          text: 'g_com_lotteryPopular_014_popularText3',
          link: '/play/xQgYmRriQODH',
          src: require('./assets/img/lotteryPopular-014-03.png'),
        },
        {
          code: 'gameBet',
          name: 'g_common_game_esports_bet',
          text: 'g_com_lotteryPopular_014_popularText4',
          link: '/slotLobby',
          src: require('./assets/img/lotteryPopular-014-04.png'),
        },
        {
          code: 'lottery',
          name: 'g_common_game_lottery_bet',
          text: 'g_com_lotteryPopular_014_popularText5',
          link: '/ultimate',
          src: require('./assets/img/lotteryPopular-014-05.png'),
        },
      ],
    },

    mainColor: {
      type: String,
      default: '#ff8b00',
    },
    btnBg: {
      type: String,
      default: 'linear-gradient(to right, #ff5d38, #ff8b00)',
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'zoom-in-11-hover',
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // on: {
        //   click: () => {
        //     const item = this.list[this.$refs.mySwiper.swiper.clickedIndex % this.list.length];
        //     if (item && item.link) {
        //       this.go(item.link);
        //     }
        //   },
        // },
        // coverflowEffect: {
        //   rotate: 30, //slide做3d旋转时Y轴的旋转角度。默认50。
        //   stretch: 10, //每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
        //   depth: 60, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
        //   modifier: 2, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
        //   slideShadows: true, //开启slide阴影。默认 true。
        // },
        // cubeEffect: {
        //   slideShadows: true, //开启slide阴影。默认 true。
        //   shadow: true, //开启投影。默认 true。
        //   shadowOffset: 100, //投影距离。默认 20，单位px。
        //   shadowScale: 0.6, //投影缩放比例。默认0.94。
        // },
        // autoplay: {
        //   delay: 3000, //自动切换的时间间隔，单位ms
        //   stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换 如果设置为true，当切换到最后一个slide时停止自动切换。
        //   disableOnInteraction: true, //用户操作swiper之后，是否禁止autoplay。
        //   reverseDirection: true, //开启反向自动轮播。
        //   waitForTransition: true, //等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
        // },
        // flipEffect: {
        //   slideShadows: true, //slides的阴影。默认true。
        //   limitRotation: true, //限制最大旋转角度为180度，默认true。
        // },
        // zoom: {
        //   maxRatio: 5, //最大倍数
        //   minRatio: 2, //最小倍数
        //   toggle: false, //不允许双击缩放，只允许手机端触摸缩放。
        //   containerClass: 'my-zoom-container', //zoom container 类名
        // },
        // navigation: {
        //   nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
        //   prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
        //   hideOnClick: true, //点击slide时显示/隐藏按钮
        //   disabledClass: 'my-button-disabled', //前进后退按钮不可用时的类名。
        //   hiddenClass: 'my-button-hidden', //按钮隐藏时的Class
        // },
        // pagination: {
        //   el: '.swiper-pagination',
        //   type: 'bullets',
        //   //type: 'fraction',
        //   //type : 'progressbar',
        //   //type : 'custom',
        //   progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
        //   bulletElement: 'li', //设定分页器指示器（小点）的HTML标签。
        //   dynamicBullets: true, //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
        //   dynamicMainBullets: 2, //动态分页器的主指示点的数量
        //   hideOnClick: true, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
        //   clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        // },
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        //   hide: true, //滚动条是否自动隐藏。默认：false，不会自动隐藏。
        //   draggable: true, //该参数设置为true时允许拖动滚动条。
        //   snapOnRelease: true, //如果设置为false，释放滚动条时slide不会自动贴合。
        //   dragSize: 30, //设置滚动条指示的尺寸。默认'auto': 自动，或者设置num(px)。
        // },
      },
    };
  },
  computed: {
    // lotteryList() {
    //   return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    // },
    mainBgColor() {
      return {
        color: this.mainColor,
      };
    },
    btnBgColor() {
      return {
        backgroundImage: this.btnBg,
      };
    },
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    // go(link) {
    //   if (/^http(s)*:\/\//.test(link)) {
    //     window.open(link);
    //   } else {
    //     this.ROUTER_PUSH(link);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.new-swiper {
  width: 100%;
  height: 550px;
  display: flex;
  justify-self: center;
  align-items: center;
  .swiper-container {
    overflow: hidden;
    padding: 115px 0px;
    width: 1350px;
    margin: 0px auto;
  }
  .swiper-button-prev {
    background: url('./assets/img/lotteryPopular-014-pre.png') no-repeat;
    background-size: cover;
    width: 40px;
    height: 40px;
    left: 0;
    margin-top: -20px;
    border-radius: 20px;
  }
  .swiper-button-next {
    background: url('./assets/img/lotteryPopular-014-next.png') no-repeat;
    background-size: cover;
    width: 40px;
    height: 40px;
    right: 0;
    margin-top: -20px;
    border-radius: 20px;
  }
  .swiper-slide {
    height: 350px;
    transform: scale(1);
  }
  .swiper-slide-prev {
    transform: scale(1.3);
    z-index: 65;
    transform-origin: 50% 50%;
  }
  .swiper-slide-active {
    transform: scale(1.5);
    z-index: 66;
    transform-origin: 50% 50%;
    margin: 0px 30px;
  }
  .swiper-slide-next,
  .swiper-slide-prev {
    transform: scale(1.3);
    z-index: 1;
    transform-origin: 50% 50%;
  }
  .platform-item {
    width: 200px;
    height: 350px;
    background: #f4f6f9;
    z-index: 2;
    background-size: 100%;
    margin: 0 auto;
    text-align: center;
    box-shadow: 0 0 20px rgba(35, 35, 35, 0.3);
    border-radius: 20px;
    img {
      width: 200px;
      margin-top: 25px;
    }
    h4 {
      color: #f7901d;
      font-size: 20px;
      margin: 0px;
    }
    p {
      font-size: 12px;
      color: rgb(102, 102, 102);
      padding: 10px 15px;
      margin: 0;
    }
    .run {
      cursor: pointer;
    }
  }
}
</style>
