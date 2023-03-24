<template>
  <div id="RightToolbar" class="RightToolbar-005">
    <div class="toolbar-btn__wrap" :class="{ hide: hideBar }">
      <template v-for="(item, i) in youshi">
        <div
          :key="i"
          :style="iconStyle(item.icon)"
          class="toolbar-btn fade-in-hover d-flex flex-column justify-end pa-2 mb-3 pointer rounded"
          @click="item.func"
        >
          <h6 :class="`subtitle-2 justify-center pa-0 text-center mb-4 ${textColor}--text`">{{ item.title }}</h6>
        </div>
      </template>
    </div>
    <div class="hide-btn pointer" :class="{ show: hideBar }" @click="hideBar = !hideBar">展开</div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
import '@ASSETS/scss/hover.scss';
export default {
  name: 'RightToolbar-005',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    textColor: {
      type: String,
      default: 'primary',
    },
    optionsMenuData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      hideBar: false,
      defaultMenuData: [
        {
          sort: 1,
          show: true,
          code: 'promotion',
          // title: '优惠活动',
          func: () => this.ROUTER_PUSH('/promotion'),
          icon: require(`./assets/rapid_btn_01.png`),
        },
        {
          sort: 2,
          show: true,
          code: 'liveChat',
          // title: '意见反馈箱',
          func: () => this.SHOW_LIVE_CHAT(0),
          icon: require(`./assets/rapid_btn_02.png`),
        },
        {
          sort: 3,
          show: true,
          code: 'liveChatTawk',
          // title: '在线客服',
          func: () => this.ROUTER_PUSH('liveChatTawk'),
          icon: require(`./assets/rapid_btn_03.png`),
        },
        {
          sort: 4,
          show: true,
          code: 'deposit',
          // title: '充值',
          func: () => this.ROUTER_PUSH('/userCentre/deposit'),
          icon: require(`./assets/rapid_btn_04.png`),
        },
        {
          sort: 5,
          show: true,
          code: 'installdownload',
          // title: 'PC下载',
          func: () => this.ROUTER_PUSH('/installdownload'),
          icon: require(`./assets/rapid_btn_05.png`),
        },
        {
          sort: 6,
          show: true,
          code: 'scrollTop',
          // title: '收起',
          func: () => (this.hideBar = !this.hideBar),
          icon: require(`./assets/rapid_btn_06.png`),
        },
      ],
    };
  },
  computed: {
    youshi() {
      return mergeArrayObjectsCode(this.optionsMenuData, this.defaultMenuData);
    },
  },
  methods: {
    ...mapActions(['PAGE_GO_TOP', 'SHOW_LIVE_CHAT', 'ROUTER_PUSH']),
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
.RightToolbar-005 {
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
      right: -100px;
      padding-right: 0px;
    }
    .toolbar-btn {
      position: relative;
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
