<template>
  <div id="RightToolbar" class="RightToolbar-003">
    <div class="position-set" :style="itemStyle">
      <template v-for="(item, i) in youshi">
        <div
          :key="i"
          class="item-wrap frozen-hover frozen2 d-flex flex-column justify-center pa-1 mb-1 rounded"
          v-bind="itemWrap"
          @click="item.func"
          @mouseenter="setCurHover(i)"
          @mouseleave="setCurHover(null)"
        >
          <div class="content">
            <v-badge
              v-if="!hideTooltips"
              :value="calcShowBadge(i)"
              :content="item.title"
              :left="left"
              v-bind="{ ...defaultVbadgeProps, ...vbadgeProps }"
            >
              <v-hover v-model="hover">
                <v-icon :size="iconSize" :color="iconColor"> {{ item.icon }} </v-icon>
              </v-hover>
            </v-badge>
            <v-hover v-else v-model="hover">
              <v-icon :size="iconSize" :color="iconColor"> {{ item.icon }} </v-icon>
            </v-hover>

            <transition name="slide-fade">
              <div class="liveChatHoverBox pa-2 white--text" :style="`right: ${width}`" v-if="item.code === 'liveChat' && isliveChatHoverMailShow">
                <span> {{ liveChatHoverMailTxt }} </span>
                <br />
                {{ liveChatHoverMail }}
              </div>
            </transition>
          </div>
        </div>
      </template>
    </div>
    <div :class="openBtnClass" class="open_btn position-set" :style="openBtnStyle" @click="hideBar = !hideBar">
      <!-- {{ $t('g_common_rightToolbar_open') }} -->
      <v-icon dark>view_headline</v-icon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode, isSE } from '@UTILS/';
import '@ASSETS/scss/hover.scss';
export default {
  name: 'RightToolbar-003',
  props: {
    // 春聯靠左 || 靠右
    position: {
      type: String,
      default: 'right',
    },
    // 春聯顯示小字靠左 || 靠右
    left: {
      type: Boolean,
      default: true,
    },
    // 樣式: 'primary rounded-xl ..'
    color: {
      type: String,
      default: 'primary',
    },
    dark: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '50px',
    },
    titleClass: {
      type: String,
      default: 'subtitle-2 white--text pa-0 text-center',
    },
    // 客服 hover 顯示 mail 資訊
    liveChatHoverMail: {
      type: String,
      default: '',
    },
    liveChatHoverMailTxt: {
      type: String,
      default: '請洽：',
    },
    // 更新選項
    optionsMenuData: {
      type: Array,
      default: () => [],
    },
    iconColor: {
      type: String,
      default: 'white',
    },
    itemWrapBind: {
      type: Object,
    },
    //是否要選用菱形樣式
    isRhombus: {
      type: Boolean,
      default: false,
    },
    //是否要選用菱形圓角樣式
    isRhombusRounded: {
      type: Boolean,
      default: false,
    },
    //是否要選用圓形樣式
    isRounded: {
      type: Boolean,
      default: false,
    },
    hideBarProp: {
      type: Boolean,
      default: undefined,
    },
    hideTooltips: {
      type: Boolean,
      default: false,
    },
    openBtnClass: {
      type: String,
      default: () => '',
    },
    vbadgeProps: {
      type: Object,
      default: () => ({}),
    },
    // 是否只顯示一個Badge
    isSingleVBadgeProps: {
      type: Boolean,
      default: false,
    },
    iconSize: {
      type: String,
      default: '24px',
    },
  },
  data() {
    return {
      curHoveringIndex: null,
      hover: false,
      hideBarData: false,
      defaultMenuData: [
        {
          sort: 1,
          show: true,
          code: 'liveChat',
          titleKey: 'g_common_link_feedback',
          func: () => this.liveChatHandler(),
          icon: 'chat',
        },
        {
          sort: 2,
          show: true,
          code: 'liveChat2',
          titleKey: 'g_com_loginBar_001_online_service',
          func: () => this.SHOW_LIVE_CHAT(0),
          icon: 'support_agent',
        },
        {
          sort: 3,
          show: true,
          code: 'deposit',
          titleKey: 'g_common_btn_recharge',
          func: () => this.ROUTER_PUSH('/userCentre/deposit'),
          icon: 'attach_money',
        },
        {
          sort: 4,
          show: true,
          code: 'installdownload',
          titleKey: 'g_common_link_pc',
          func: () => this.ROUTER_PUSH('/installdownload'),
          icon: 'desktop_windows',
        },
        {
          sort: 5,
          show: true,
          code: 'appdownload',
          titleKey: 'g_common_link_app',
          func: () => this.ROUTER_PUSH('/appdownload'),
          icon: 'smartphone',
        },
        {
          sort: 6,
          show: true,
          code: 'promotion',
          titleKey: 'g_common_link_promotions',
          func: () => this.ROUTER_PUSH('/promotion'),
          icon: 'card_giftcard',
        },
        {
          sort: 7,
          show: true,
          code: 'helpCentre',
          titleKey: 'g_common_link_help',
          func: () => this.ROUTER_PUSH('/helpCentre'),
          icon: 'help_outline',
        },
        {
          sort: 8,
          show: true,
          code: 'scrollTop',
          titleKey: 'g_common_rightToolbar_scrollTop',
          func: () => this.ROUTER_PUSH('scrollTop'),
          icon: 'vertical_align_top',
        },
        {
          sort: 9,
          show: true,
          code: 'close',
          titleKey: 'g_common_rightToolbar_close',
          func: () => (this.hideBar = !this.hideBar),
          icon: 'chevron_right',
        },
      ],
      defaultVbadgeProps: {
        color: 'error',
        ligtht: true,
        'offset-x': '-10',
        'offset-y': '15',
        transition: 'slide-x-transition',
      },
    };
  },
  computed: {
    hideBar: {
      get() {
        return typeof this.hideBarProp != 'undefined' ? this.hideBarProp : this.hideBarData;
      },
      set(val) {
        if (typeof this.hideBarProp != 'undefined') {
          this.$emit('updateHideBar', val);
        } else {
          this.hideBarData = val;
        }
      },
    },
    youshi() {
      const menu = mergeArrayObjectsCode(this.optionsMenuData, this.defaultMenuData);
      menu.forEach(el => {
        el.title = this.$t(el.titleKey);
      });
      return menu;
    },
    isliveChatHoverMailShow() {
      return !!this.liveChatHoverMail && this.youshi[this.curHoveringIndex] && this.youshi[this.curHoveringIndex].code === 'liveChat';
    },
    itemWrap() {
      const itemWrapClass = this.color.split(' ');
      itemWrapClass.push({ rhombus: this.isRhombus, rounded20: this.isRhombusRounded, rounded50: this.isRounded });
      return Object.assign({ dark: this.dark }, { class: itemWrapClass }, this.itemWrapBind);
    },
    itemStyle() {
      let ob = {};
      const getNumber = strPx => strPx.match(/^-?\d+/);
      const widthNum = Number(getNumber(this.width));
      const final = -widthNum - 20;
      ob[this.position] = this.hideBar ? `${final}px` : '0px';
      return ob;
    },
    openBtnStyle() {
      let ob = {};
      const getNumber = strPx => strPx.match(/^-?\d+/);
      const widthNum = Number(getNumber(this.width));
      const final = -widthNum - 20;
      const hidePx = isSE() ? '40px' : '0px';
      ob[this.position] = this.hideBar ? hidePx : `${final}px`;
      return ob;
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'OPEN_MAIL', 'SHOW_LIVE_CHAT']),
    // 聯繫客服方式 處理
    liveChatHandler() {
      this.isliveChatHoverMailShow ? this.OPEN_MAIL({ mailAddress: this.liveChatHoverMail }) : this.SHOW_LIVE_CHAT(0);
    },
    setCurHover(i) {
      this.curHoveringIndex = i;
    },
    // 計算是否顯示badge
    calcShowBadge(index) {
      if (!this.isSingleVBadgeProps) {
        return this.hover;
      } else {
        return this.hover && this.curHoveringIndex === index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.RightToolbar-003 {
  .position-set {
    position: fixed;
    z-index: 200;
    transform-origin: 0 50%;
    transform: translate(0%, -50%);
    transition: all 0.2s;
    top: 50%;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  .item-wrap {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 4px rgba(50, 50, 50, 0.1);
    // 菱形
    &.rhombus {
      width: 50px;
      height: 50px;
      transform: rotateZ(45deg);
      margin-top: 15px;
      .content {
        transform: rotateZ(-45deg);
      }
    }
    // 菱形圓角
    &.rounded20 {
      width: 50px;
      height: 50px;
      border-radius: 20px !important;
    }
    // 圓形
    &.rounded50 {
      width: 50px;
      height: 50px;
      border-radius: 50px !important;
    }
    .liveChatHoverBox {
      position: absolute;
      right: 0px;
      bottom: 2px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }
  }
  .open_btn {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    // writing-mode: vertical-rl;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
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
</style>
