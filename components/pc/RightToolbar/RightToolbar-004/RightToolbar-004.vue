<template>
  <div id="RightToolbar" class="RightToolbar-004">
    <div class="toolbar-btn__wrap" :class="{ hide: clickChange }">
      <template v-for="(item, i) in menuDataFilter">
        <div
          :key="i"
          :style="iconStyle(item)"
          class="toolbar-btn fade-in-hover d-flex flex-column justify-end pa-2 mb-3 pointer rounded"
          :class="item.itemClassName"
          @click="item.func || routerPush(item.link)"
          @mouseenter="setCurHover(i)"
          @mouseleave="setCurHover(null)"
        >
          <h6 :class="`h6-class ${textColor}--text ${item.titleClassName}`">{{ item.title }}</h6>
          <transition name="slide-fade">
            <div
              class="liveChatHoverBox pa-2 white--text primary"
              :style="`right: ${width}`"
              v-if="item.name === 'liveChat' && isliveChatHoverMailShow"
            >
              <span> {{ liveChatHoverMailTxt }}: </span><br />
              {{ liveChatHoverMail }}
            </div>
          </transition>
        </div>
      </template>
    </div>
    <!-- 展開按鍵 -->
    <div class="hide-btn pointer" :class="{ show: clickChange, [scrollLeftOpion.className]: true }" @click="clickChange = !clickChange">
      {{ scrollLeftOpion.text }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import '@ASSETS/scss/hover.scss';
export default {
  name: 'RightToolbar-004',
  props: {
    /**
     * 底圖寬高
     */
    width: {
      type: String,
      default: '90px',
    },
    height: {
      type: String,
      default: '104px',
    },
    /**
     * 文字顏色
     */
    textColor: {
      type: String,
      default: 'primary',
    },
    //
    liveChatHoverMailTxt: {
      type: String,
      default: '投诉建议请寄信到',
    },
    liveChatHoverMail: {
      type: String,
      default: '',
    },
    /**
     * 選單控制 填入要顯示的選項
     */
    showOptions: {
      type: Array,
      default: () => [
        { name: 'deposit' },
        { name: 'withdrawal' },
        { name: 'appdownload' },
        { name: 'installdownload' },
        { name: 'promotion' },
        { name: 'liveChat' },
        { name: 'liveChatTawk' },
        { name: 'scrollTop' },
        { name: 'scrollRight' },
      ],
    },
    menuData: {
      type: Array,
      default: () => [
        {
          name: 'appdownload',
          title: 'APP下载',
          link: '/appdownload',
          icon: require(`./assets/appdownload.png`),
        },
        {
          name: 'installdownload',
          title: 'PC下载',
          link: '/installdownload',
          icon: require(`./assets/installdownload.png`),
        },
        {
          name: 'promotion',
          title: '优惠活动',
          link: '/promotion',
          icon: require(`./assets/promotion.png`),
        },
        {
          name: 'liveChat',
          title: '投诉通道',
          link: 'liveChat',
          icon: require(`./assets/liveChat.png`),
        },
        {
          name: 'scrollTop',
          title: '返回顶部',
          link: 'scrollTop',
          icon: require(`./assets/scrollTop.png`),
        },
        {
          name: 'scrollRight',
          title: '收起',
          link: 'scrollRight',
          icon: require(`./assets/scrollRight.png`),
        },
      ],
    },
    // 展開的按鍵相關
    scrollLeftOpion: {
      type: Object,
      default: () => ({
        // className使用空字串可能有問題
        className: 'empty-class',
        text: '展开',
      }),
    },
  },
  data: () => {
    return {
      clickChange: false,
      curHoveringIndex: null,
    };
  },
  computed: {
    menuDataFilter() {
      let menuDataHandler = [];
      this.menuData.forEach(el => {
        this.showOptions.forEach(op => {
          el.name === op.name && menuDataHandler.push(el);
        });
      });
      return menuDataHandler;
    },
    isliveChatHoverMailShow() {
      return !!this.liveChatHoverMail && this.menuDataFilter[this.curHoveringIndex] && this.menuDataFilter[this.curHoveringIndex].name === 'liveChat';
    },
  },
  methods: {
    ...mapActions(['PAGE_GO_TOP', 'SHOW_LIVE_CHAT', 'ROUTER_PUSH']),
    routerPush(link) {
      switch (link) {
        case 'mail':
          window.open('mailto:' + this.liveChatHoverMail);
          break;
        case 'liveChat':
          this.SHOW_LIVE_CHAT(0);
          break;
        case 'liveChatTawk':
          this.SHOW_LIVE_CHAT(1);
          break;
        case 'scrollTop':
          this.PAGE_GO_TOP();
          break;
        case 'scrollRight':
          this.clickChange = !this.clickChange;
          break;
        default:
          this.ROUTER_PUSH(link);
          break;
      }
    },
    setCurHover(i) {
      this.curHoveringIndex = i;
    },
    iconStyle(item) {
      return {
        backgroundImage: `url(${item.icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        width: this.width,
        height: this.height,
        ...item.styles,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.RightToolbar-004 {
  .toolbar-btn__wrap {
    position: fixed;
    z-index: 200;
    transform-origin: 0 50%;
    transform: translate(0%, -50%);
    right: 10px;
    top: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    transition: right 0.3s;
    &.hide {
      right: -90px;
      padding-right: 0px;
    }
    .toolbar-btn {
      position: relative;
      .liveChatHoverBox {
        position: absolute;
        right: 0px;
        top: 30%;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      .slide-fade-enter-active {
        transition: all 0.3s ease;
      }
      .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 1);
      }
      .slide-fade-enter,
      .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
      }
    }
  }
  .hide-btn {
    position: fixed;
    z-index: 200;
    transform-origin: 0 50%;
    transform: translate(0%, -50%);
    right: -50px;
    top: 50%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    transition: right 0.3s;

    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    color: white;
    writing-mode: vertical-rl;
    &.show {
      right: 0px;
    }
  }
  .pointer {
    cursor: pointer;
  }
  h6 {
    font-weight: normal;
  }
  .h6-class {
    // subtitle-2
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.0071428571em;
    line-height: 1.375rem;
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    padding: 0px;
    text-align: center;
    margin-bottom: 16px;
  }
}
</style>
