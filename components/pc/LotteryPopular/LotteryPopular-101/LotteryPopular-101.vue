<template>
  <div class="lottery-popular" :class="className">
    <swiper :options="swiperOption" ref="mySwiper">
      <template v-for="(item, index) in list">
        <swiper-slide class="item-container" :key="index" :class="[globalContainerClassName, item.containerClassName]">
          <slot v-bind="{ item, itemIndex: index, isSelectItem: index === selectIndex, changeSelectEvent: selectEvent }"></slot>
        </swiper-slide>
      </template>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { mapActions } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'LotteryPupular-101',
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    // 資料列表
    list: {
      type: Array,
      default: () => [
        {
          containerClass: '',
        },
      ],
    },
    // 組件的class
    className: {
      type: String,
      default: '',
    },
    // 容器的通用class
    globalContainerClassName: {
      type: String,
      default: '',
    },
    // 起始按鍵選擇index值
    startIndex: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      selectIndex: null,
      swiperOption: {
        slidesPerView: 6,
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
  watch: {
    startIndex(newValue, oldValue) {
      if (oldValue === null) {
        this.selectIndex = newValue;
      }
    },
  },
  mounted() {
    this.selectEvent(this.startIndex);
  },
  methods: {
    selectEvent(index) {
      this.selectIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/pc/LotteryPopular/index.scss';
</style>

<style lang="scss" scoped>
.lottery-popular {
  .swiper-container {
    overflow: hidden;
    padding: 115px 0px;
    width: 1350px;
    margin: 0px auto;
  }
  .swiper-button-prev {
    background: url('./assets/pre.png') no-repeat;
    background-size: cover;
    width: 40px;
    height: 40px;
    left: 0;
    margin-top: -20px;
    border-radius: 20px;
  }
  .swiper-button-next {
    background: url('./assets/next.png') no-repeat;
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
}
.item-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
//
</style>
