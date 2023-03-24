<template>
  <v-container>
    <v-dialog v-model="showForm" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ textFilter('formDialogTitle') }}</v-card-title>
        <v-card-text style="display: flex; justify-content: center; flex-direction: column">
          {{ textFilter('formDialogContent') }}
          <div class="pay-form" v-html="payForm"></div>
          <template v-if="'testNativeOpen' == payForm">
            <span>{{ userAgent }} </span>
            <div>{{ `isIOSApp:${isIOSApp},isAndroidApp:${isAndroidApp},isNativeApp:${isNativeApp}` }}</div>
            <a @click="NATIVE_OPEN_URL(url)">OPEN LINK TEST</a>
            {{ openSystemWebview }}
            <p>webkit: <br />{{ webkit }}</p>
            <p>messageHandlers: <br />{{ messageHandlers }}</p>
            <p>$App: <br />{{ $App }}</p>
            <p>windowKeys: <br />{{ windowKeys }}</p>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import _ from 'lodash';

window.openNative = function (url) {
  // console.log(window.navigator.userAgent);

  if (/android.*build/i.test(window.navigator.userAgent)) {
    //android
    //vue调用Android方法，且传值给Android （Android方法名为 openSystemWebview）
    //webView.addJavascriptInterface(new WebViewJavaScriptInterface(this), "$App");
    window.$App.openSystemWebview(url);
  } else if (/(iphone|ipad|ipod)/i.test(window.navigator.userAgent) && !/(CriOS|Safari)/i.test(window.navigator.userAgent)) {
    //ios
    //vue调用iOS方法，且传值给iOS （iOS 方法名为 openSystemWebview）
    window.webkit.messageHandlers.openSystemWebview.postMessage(url);
  } else {
    window.open(url);
  }
};
export default {
  name: 'PayConfirm-default',
  props: {},
  data() {
    return {
      showForm: false,
      payForm: null,
      url: window.location.href,
      window,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'isIOSApp', 'isAndroidApp', 'userAgent', 'isNativeApp']),
    openSystemWebview: () => ({
      android: (window.$App?.openSystemWebview || '').toString(),
      ios: (window.webkit?.messageHandlers?.openSystemWebview || '').toString(),
    }),
    webkit: () => window.webkit,
    messageHandlers: () => window.webkit?.messageHandlers,
    $App: () => window.$App,
    windowKeys() {
      return Object.keys(window).filter(key => /app/gi.test(key) || /android/gi.test(key) || /webkit/gi.test(key) || /ios/gi.test(key));
    },
  },
  watch: {
    '$route.params.token'(t) {
      this.GET_LOGIN_BY_TOKEN({ token: t || '' });
    },
  },
  created() {
    this.payForm = this.$route.params.form.replace(/target="_blank"/gi, '');
    setTimeout(() => {
      this.showForm = true;
    }, 10);
    // console.log(window[0]);
    // console.log(Object.keys(window));
  },
  methods: {
    ...mapActions(['GET_LOGIN_BY_TOKEN', 'NATIVE_OPEN_URL']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_deposit_', slot) : textFilter(text, 'layout_userCentre_default_deposit_');
    },
    alert,
  },
};
</script>
<style lang="scss">
.pay-form {
  form .v-btn {
    border-radius: 5px;
    margin-top: 2em;
    height: 3em;
  }
}
</style>
