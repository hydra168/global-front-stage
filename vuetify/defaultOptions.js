import i18n from '@MODULES/i18n';

/** vuetify 語系 */
import en from 'vuetify/es5/locale/en';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import zhHant from 'vuetify/es5/locale/zh-Hant';

export default {
  lang: {
    current: i18n.state.locale,
    locales: { en, 'zh-CN': zhHans, 'zh-TW': zhHant },
  },
  theme: {
    // dark: true, // 啟用深色模式
    options: { customProperties: false }, // 可在元件中<style>使用 Vuetify 變數
    themes: {
      light: {
        primary: {
          base: '#97355b',
          lighten5: '#97355b',
          lighten4: '#97355b',
          lighten3: '#97355b',
          lighten2: '#97355b',
          lighten1: '#97355b',
          darken1: '#97355b',
          darken2: '#97355b',
          darken3: '#97355b',
          darken4: '#97355b',
        },
        secondary: '#f7cd72',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      dark: {
        primary: {
          base: '#97355b',
        },
        secondary: '#f7cd72',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
  icons: [
    {
      iconfont: 'mdi',
    },
    {
      iconfont: 'fa4',
    },
  ],
};
