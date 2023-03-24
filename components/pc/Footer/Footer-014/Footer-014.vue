<template>
  <!-- Footer -->
  <div>
    <div class="wrap">
      <div class="top">
        <div class="flex_center img_002">
          <div><img :src="require('./assets/f_002.png')" /></div>
        </div>
        <div class="flex_center img_002">
          <div><img :src="require('./assets/f_001.png')" /></div>
        </div>
        <div class="flex_center word"><span>CS体育拥有菲律宾政府博彩委員会(PAGCOR)颁发的合法执照。是受国际博彩协会认可的合法博彩公司。</span></div>
        <div class="flex_center word"><span>- 提醒您进行注冊娱乐前，请确保已年满18岁 -</span></div>
      </div>
      <div class="bottom">
        <!-- <div class="flex_center ux_word">
        <div class="action" @click="ROUTER_PUSH('/helpCentre/problem')">常见问题</div>
        <div>｜</div>
        <div class="action" @click="ROUTER_PUSH('/helpCentre/about')">关于我们</div>
        <div>｜</div>
        <div class="action" @click="ROUTER_PUSH('/helpCentre/terms')">使用条款</div>
        <div>｜</div>
        <div class="action" @click="ROUTER_PUSH('liveChat')">联系我们</div>
      </div> -->
        <div class="flex_center ux_word">
          <div v-for="item in copyRightList" :key="item.code" @click="ROUTER_PUSH(item.url)">
            <div>
              <span v-bind:class="item.code">｜</span><span class="action">{{ $t(item.name) }}</span>
            </div>
          </div>
        </div>
        <div class="flex_center word"><span>- 推荐浏览器 -</span></div>
        <div class="flex_center img_003 browser">
          <div><img :src="require('./assets/f_003.png')" /></div>
        </div>
      </div>
    </div>
    <div class="msg copyRight001" :class="titleClass">
      <p>{{ textFilter('copyright', { year, webTitle }) }}</p>
    </div>
  </div>
</template>

<script>
// import VueQr from 'vue-qr';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer-001',
  components: {
    // VueQr,
  },
  props: {
    safeTitleKey: {
      type: String,
      default: 'title_safe',
    },
    wrapClass: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: 'grey--text text--darken-4',
    },
    contentClass: {
      type: String,
      default: 'grey--text text--darken-4',
    },
    logoIconsShow: {
      type: Boolean,
      default: true,
    },
    logoIconFuliTitle: {
      type: String,
      default: 'g_common_logoIcon_welfare_lottery',
    },
    logoIconTiYuTitle: {
      type: String,
      default: 'g_common_logoIcon_sports_lottery',
    },
    isShowSafePay: {
      type: Boolean,
      default: true,
    },
    isShowSafePayBottom: {
      type: Boolean,
      default: false,
    },
    SafePayBottomImg: {
      type: String,
      default: require('./assets/pay04.png'),
    },
    safetyIconsShow: {
      type: Boolean,
      default: true,
    },
    hideAbout: {
      type: Boolean,
      default: false,
    },
    payLogoImg: {
      type: String,
      default: require('./assets/pay02.png'),
    },
    supervision_content_key: {
      type: String,
      default: 'supervision_content',
    },
    showAdminister: {
      type: Boolean,
      default: true,
    },
    partnerIconsShow: {
      type: Boolean,
      default: false,
    },
    showSection: {
      type: Boolean,
      default: true,
    },
    copyRightList: {
      type: Array,
      default: () => [
        { code: 'copyRight_01', url: '/helpCentre/problem', name: '常见问题' },
        { code: 'copyRight_02', url: '/helpCentre/about', name: '关于我们' },
        { code: 'copyRight_03', url: '/helpCentre/terms', name: '使用条款' },
        { code: 'copyRight_04', url: 'liveChat', name: '联系我们' },
      ],
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  data() {
    return {
      logoIcons: [
        { img: require('./assets/welfare.png'), label: this.logoIconFuliTitle },
        { img: require('./assets/sport.png'), label: this.logoIconTiYuTitle },
      ],
      partnerIcons: [{ img: require('./assets/mayi.png') }, { img: require('./assets/alibaba.jpg') }],
    };
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    redirect(item) {
      switch (item.action) {
        case 'register':
          this.SET_GLOBAL_BOX('RegisterBox');
          break;
        case 'liveChat':
          this.SHOW_LIVE_CHAT(0);
          break;
        default:
          this.$router.push(item.url);
      }
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_001_', slot) : textFilter(text, 'com_footer_001_');
    },
  },
};
</script>

<style lang="scss">
.Footer-001-wrap {
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  .Footer-001 {
    .content-wrapper {
      // min-width: 1380px !important;
      .administer {
        margin-left: 10px;
        .text {
          width: 250px;
        }
      }
    }
    .title {
      margin-bottom: 20px;
      text-align: center;
    }
    .text {
      padding-top: 0px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      width: 310px;
      .lt {
        font-size: 16px;
        font-weight: bold;
      }
      .rt {
        font-size: 14px;
        margin: 5px 0;
      }
    }
    .center {
      text-align: center;
      margin: 0 auto;
    }
    .pd20 {
      margin: 10px 0px !important;
    }
    li {
      list-style-type: none;
      text-align: left;
      .hlep {
        padding: 5px;
        font-size: 14px;
        cursor: pointer;
        min-width: 7em;
        display: inline-block;
      }
      span {
        margin-left: 2em;
      }
    }
    .msg {
      color: gray;
      text-align: center;
      font-size: 16px;
      margin: 20px 0px 40px 0px;
    }
    .footer {
      margin: 20px 0px 10px 0px;
      img {
        width: 70%;
      }
    }
  }
  .copyRight001 {
    background-color: #44438e;
    color: #ffffff !important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 64px;
    font-size: 14px;
    p {
      margin: 0 auto !important;
    }
  }
  .helpCentre_wrap {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .link_wrap {
    width: 50%;
  }
}

// hover 效果
.footer__link {
  &:hover {
    font-weight: bold;
    font-size: 16px !important;
    background: rgba($color: #000000, $alpha: 0.2);
    transition: all 0.5s;
  }
}
.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.word {
  margin: 10px 0;
  color: #ffffff;
}
.img_002 {
  padding: 20px 0;
}
.img_003 {
  margin-bottom: 20px;
}
.ux_word {
  margin: 30px 0 20px 0;
  color: #ffffff;
}
.action {
  cursor: pointer;
  &:hover {
    // color: #ffd98b;
    color: var(--v-secondary-base);
    // var(--v-primary-base);
  }
}
.wrap {
  background-color: var(--v-primary-base);
}
.top {
  background: linear-gradient(172deg, #ffffff 50%, var(--v-primary-base) 50%);
}
.bottom {
  background-color: var(--v-primary-base);
}
.browser {
  padding-bottom: 20px;
}
.copyRight001 {
  margin-top: -20px;
  background-color: #44438e;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  font-size: 14px;
  p {
    margin: 0 auto !important;
  }
}
.copyRight_01 {
  display: none;
}
</style>
