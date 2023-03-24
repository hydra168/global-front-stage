import { default as _Vue } from 'vue';
import _ from 'lodash';

import { mergeRouter } from './router';
import { mergeStore } from './modules';
import { mergeVuetify } from './vuetify';

import * as custom from './filters';
import { format } from './utils';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import 'typeface-noto-sans';
import 'typeface-open-sans';

export let Vue = null;
export const initGlobalFrontStage = ({ VueClass = _Vue, vuexModules, routes, vuetifyOptions }) => {
  Vue = VueClass;
  // Vue.config.debug = false
  // Vue.config.devtools = false
  // Vue.config.productionTip = false
  /* eslint-disable */
  Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key]);
  });
  Vue.prototype.$t = function (...args) {
    let trans = !this.$i18n.te(...args) ? args[0] : this.$i18n.t(...args);
    return format(trans);
  };
  Object.defineProperty(Vue.prototype, '_', { value: _ });
  const store = mergeStore({ Vue, agentModules: vuexModules });
  const router = mergeRouter({ Vue, agentRoutes: routes });
  const vuetify = mergeVuetify({ Vue, agentOptions: vuetifyOptions });
  return {
    Vue,
    store,
    router,
    vuetify,
  };
};
