<template>
  <div id="RightToolbar" class="RightToolbar-004">
    <div class="toolbar-btn__wrap" :class="{ hide: clickChange }">
      <template v-for="(item, i) in menuDataFilter">
        <div
          :key="i"
          class="toolbar-btn fade-in-hover d-flex flex-column justify-end align-center pa-2 ma-1 pointer rounded"
          @click="routerPush(item.link)"
          @mouseenter="setCurHover(i)"
          @mouseleave="setCurHover(null)"
        >
          <div :style="iconStyle(item.icon)"></div>
          <h6 :class="`subtitle-2 justify-center pa-0 text-center mb-0 ${textColor}--text`">{{ $t(item.title) }}</h6>
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
    <div class="hide-btn pointer" :class="{ show: clickChange }" @click="clickChange = !clickChange">展开</div>
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
        { name: 'appdownload', title: 'APP下载', link: '/appdownload', icon: require(`./assets/appdownload.png`) },
        { name: 'installdownload', title: 'PC下载', link: '/installdownload', icon: require(`./assets/installdownload.png`) },
        { name: 'promotion', title: '优惠活动', link: '/promotion', icon: require(`./assets/promotion.png`) },
        { name: 'liveChat', title: '投诉通道', link: 'liveChat', icon: require(`./assets/liveChat.png`) },
        { name: 'scrollTop', title: '返回顶部', link: 'scrollTop', icon: require(`./assets/scrollTop.png`) },
        { name: 'scrollRight', title: '收起', link: 'scrollRight', icon: require(`./assets/scrollRight.png`) },
      ],
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
        case 'liveChat':
          if (this.liveChatHoverMail) {
            window.open('mailto:' + this.liveChatHoverMail);
          } else {
            this.SHOW_LIVE_CHAT(0);
          }
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
          this.$router.push(link);
          break;
      }
    },
    setCurHover(i) {
      this.curHoveringIndex = i;
    },
    iconStyle(src) {
      return {
        background: `url(${src}) no-repeat`,
        backgroundSize: '100% 100%',
        width: this.width,
        height: this.height,
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
    right: 0px;
    top: 50%;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    transition: right 0.3s;

    &.hide {
      right: -90px;
      padding-right: 0px;
    }
    .toolbar-btn {
      background-color: white;
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

    background: rgba(0, 0, 0, 0.5);
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
}
</style>
