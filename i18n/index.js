import Vue from 'vue';
import VueI18n from 'vue-i18n';
import G_i18n from '@MODULES/i18n';

/** 語系 */
import en from '@LANG/en';
import zhCN from '@LANG/zh-CN';
import zhTW from '@LANG/zh-TW';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: G_i18n.state.locale,
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  messages: {
    en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
  },
});

export default i18n;
