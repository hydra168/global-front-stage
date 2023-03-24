<template>
  <div class="GlobalLayout" :style="variables">
    <SnackBar />
    <LoadingBar />
    <LoginBox v-if="!isMobile" />
    <DialogPage v-if="!isMobile" />
    <router-view />
  </div>
</template>

<script>
import { PC_LOGIN_BOX_TYPE } from '@G/consts';
import cssVars from 'css-vars-ponyfill';
import SnackBar from '@COM/SnackBar.vue';
import LoadingBar from '@COM/LoadingBar.vue';
import DialogPage from '@COM/pc/DialogPage/DialogPage-default/DialogPage-default.vue';
import ws from '../ws';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import getFingerPrint from '../utils/visitor-identifier';
import { each } from 'lodash';

/**
 * 參考webpack語法
 * https://webpack.docschina.org/guides/dependency-management/#require-with-expression
 */
const createComponentFunction = require.context('@COM/LoginBox', true, /.vue/);

export default {
  name: 'GlobalLayout',
  components: {
    SnackBar, // 提示彈窗
    LoadingBar, // 等待彈窗
    LoginBox: createComponentFunction(`./LoginBox-${PC_LOGIN_BOX_TYPE}/LoginBox-${PC_LOGIN_BOX_TYPE}.vue`).default, // 登入註冊彈窗
    DialogPage,
  },
  provide() {
    return {
      themeObj: this.themeObj,
    };
  },
  data() {
    return {
      themeObj: this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light,
    };
  },
  computed: {
    ...mapGetters(['config', 'isLogin', 'isMobile', 'token', 'locale', 'isUserCentreDialog', 'apiVersion', 'packageVersion']),
    currentTheme() {
      const { isDark, themes } = this.$vuetify.theme;
      return themes[isDark ? 'dark' : 'light'];
    },
    variables() {
      const variables = {};
      each(this.currentTheme, (v, name) => {
        if (typeof v === 'string') {
          variables[`--v-${name}-base`] = v;
        } else if (typeof v === 'object') {
          each(v, (sub, subname) => {
            variables[`--v-${name}-${subname}`] = sub;
          });
        }
      });
      return variables;
    },
  },
  async beforeMount() {
    await this.GET_API_VERSION();
    const visitorId = getFingerPrint();
    localStorage.setItem('visitorId', visitorId);
  },
  async created() {
    await this.GET_CONFIGURE();
    await this.ONLOAD();
    this.isLogin && this.GET_BALANCE_ALL_INFO(); // 取得錢包資訊
    this.GET_MENU(); // 取得首頁選單
    this.GET_LOTTORY_GAME_LIST();
    this.GET_ANNOUNCEMENT_LIST(); // 取得彈窗公告
    // this.SET_WEB_TITLE(this.config.title);
    this.LOCALE_HANDLER({ lang: this.locale });
    this.GET_SPOTLIGHTS(); // 取得輪播圖
    this.SET_GLOBAL_BOX(''); // 設定預設
  },
  mounted() {
    // 手機版配適android將vuetify動態插入之script做轉譯(將var(...)去掉)
    if (this.isMobile) {
      cssVars({
        include: '#vuetify-theme-stylesheet',
        onlyLegacy: false,
      });
    }
    if (this.$route.name == 'iStart') this.SET_REFERRAL_CODE(this.$route.params.code || ''); // 取得推薦碼
    if (this.$route.name == 'asToken') this.GET_LOGIN_BY_TOKEN({ token: this.$route.params.token || '' }); // 管理者以玩家身份登入操作
    if (this.token !== '' && this.token !== null) ws.initWebSocket(); // 管理者以玩家身份登入操作
  },
  methods: {
    ...mapActions([
      'ONLOAD',
      'GET_CONFIGURE',
      'GET_BOARD_LIST',
      'GET_MENU',
      'GET_BALANCE_ALL_INFO',
      'GET_SPOTLIGHTS',
      'GET_LOGIN_BY_TOKEN',
      'GET_ANNOUNCEMENT_LIST',
      'LOCALE_HANDLER',
      'GET_API_VERSION',
      'GET_LOTTORY_GAME_LIST',
    ]),
    ...mapMutations(['SET_MAIL_NUMBERMBER', 'SET_REFERRAL_CODE', 'SET_GLOBAL_BOX', 'SET_WEB_TITLE', 'SET_BROWSER_TITLE']),
    changeFavicon(config) {
      if (config.favicon) {
        const favicon = window.document.getElementById('favicon');
        // favicon.href = `${favicon.href}`.replace('favicon.ico', config.favicon);
        favicon.href = config.favicon;
      }
    },
  },
  watch: {
    config(val) {
      this.changeFavicon(val);
      this.LOCALE_HANDLER({ lang: this.locale });
      const doc = window.document.getElementsByTagName('html')[0];
      // Tawk 客服代碼
      if (val.live_chat_tawk) {
        const tpl = `
          var Tawk_API = Tawk_API || {};
          var Tawk_LoadStart = new Date();
          var isTawkLoaded = false;
          (function() {
            var s1 = document.createElement('script');
            var s0 = document.getElementsByTagName('script')[0];
            s1.async = true;
            s1.src = '${val.live_chat_tawk}';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
            Tawk_API.onLoad = function() {
              isTawkLoaded = true;
              Tawk_API.minimize();
            };
            Tawk_API.onChatMinimized = function() {
              setTimeout(function() {
                Tawk_API.hideWidget();
              });
            };
          })();
          function toggleCustomService() {
            if (isTawkLoaded) {
              if (Tawk_API.isChatHidden()) {
                Tawk_API.showWidget();
                Tawk_API.maximize();
              } else {
                Tawk_API.hideWidget();
                Tawk_API.minimize();
              }
            }
          } `;
        const serviceCode = window.document.createElement('script');
        const code = window.document.createTextNode(tpl);
        serviceCode.appendChild(code);
        serviceCode.type = 'text/javascript';
        doc.appendChild(serviceCode);
      }
      // Zendesk 客服代碼
      if (val.live_chat_zendesk) {
        const zendesk = window.document.createElement('script');
        zendesk.id = 'ze-snippet';
        zendesk.src = val.live_chat_zendesk;
        doc.appendChild(zendesk);
      }
      // LiveChat 客服代碼
      if (val.live_chat_other) {
        const license = val.live_chat_other.replace(/https:\/\/www\.livechatinc\.com\/chat-with\/(\d+)\//, '$1');
        const tpl = `
        window.__lc = window.__lc || {};
        window.__lc.license = "${license}";
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))`;
        const serviceCode = window.document.createElement('script');
        const code = window.document.createTextNode(tpl);
        serviceCode.appendChild(code);
        serviceCode.type = 'text/javascript';
        doc.appendChild(serviceCode);
        window.LiveChatWidget.call('minimize');
      }
      // MeiQia 客服代碼
      if (val.live_chat_meiqia) {
        const tpl = `
        (function(a, b, c, d, e, j, s) {
          a[d] = a[d] || function()
          { (a[d].a = a[d].a || []).push(arguments) }
          ;
          j = b.createElement(c),
          s = b.getElementsByTagName(c)[0];
          j.async = true;
          j.charset = 'UTF-8';
          j.src = 'https://static.meiqia.com/widget/loader.js';
          s.parentNode.insertBefore(j, s);
        })(window, document, 'script', '_MEIQIA');
          _MEIQIA('entId', '${val.live_chat_meiqia}');
          _MEIQIA('withoutBtn');
        `;
        const serviceCode = window.document.createElement('script');
        const code = window.document.createTextNode(tpl);
        serviceCode.appendChild(code);
        serviceCode.type = 'text/javascript';
        doc.appendChild(serviceCode);
      }
      // 萬用客服代碼
      if (val.Live_Chat_Script) {
        const tpl = val.Live_Chat_Script.replace(/^\s*<script.*>(.*)<\/script>\s*$/gi, '$1');
        const serviceCode = window.document.createElement('script');
        const code = window.document.createTextNode(tpl);
        serviceCode.appendChild(code);
        serviceCode.type = 'text/javascript';
        doc.appendChild(serviceCode);
      }
    },
    token(t) {
      if (t !== '' && t !== null) {
        ws.initWebSocket();
      } else {
        this.SET_MAIL_NUMBERMBER('');
        ws.close();
      }
    },
    $route: {
      // 重遊戲頁面出來重新取得
      handler(to, form) {
        if (form && form.name === 'play') this.isLogin && this.GET_BALANCE_ALL_INFO(); // 取得錢包資訊
      },
      deep: true,
      immediate: true,
    },
    packageVersion(version) {
      Object.keys(version).forEach(key => {
        window.version = version;
        // /time/gi.test(key) && console.log(`${key}: ${new Date(version[key])}`);
        // !/detail|time/gi.test(key) && console.log(`${key}: ${version[key]}`);
      });
    },
  },
};
</script>
<style lang="scss">
.GlobalLayout {
  height: 100%;
}
</style>
