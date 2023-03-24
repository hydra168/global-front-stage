import lodash from 'lodash';
import { default as _Vuetify } from 'vuetify/lib';
import defaultOptions from './defaultOptions';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
export let Vuetify = null;
export const mergeVuetify = ({ Vue, agentOptions = {} }) => {
  Vue.use(_Vuetify);
  const icons = [];
  agentOptions.icons = icons.concat(defaultOptions.icons).concat(agentOptions.icons);
  const finalOptions = lodash.merge(defaultOptions, agentOptions);
  Vuetify = new _Vuetify(finalOptions);
  return Vuetify;
};
