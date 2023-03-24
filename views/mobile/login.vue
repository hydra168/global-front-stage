<template>
  <component :is="loginDataComponent"></component>
</template>
<script>
import { mapGetters } from 'vuex';
import { decodeConfigAPIValue } from '../../utils/configAPI';
/**
 * 參考webpack語法
 * https://webpack.docschina.org/guides/dependency-management/#require-with-expression
 */
const createComponentFunction = require.context('@LAYOUT/mobile/Login', true, /.vue/);

function getImport(MOBILE_LOGIN_TYPE) {
  switch (MOBILE_LOGIN_TYPE) {
    case '0':
      return './Login-default/index.vue';
    case '1':
      return './Login-001/index.vue';
    case '2':
      return './Login-002/index.vue';
    case '3':
      return './Login-003/index.vue';
    case '4':
      return './Login-004/index.vue'; // 1159 亞博版
    case '5':
      return './Login-005/index.vue'; // 1455 客制版
    default:
      return './Login-default/index.vue';
  }
}
export default {
  name: 'Login-Mobile',
  computed: {
    ...mapGetters(['config']),
    pcLoginType() {
      if (this.loginData) {
        return this.loginData['MOBILE_LOGIN_TYPE'];
      } else {
        return '0';
      }
    },
    loginData() {
      return decodeConfigAPIValue(this.config[this.loginTypeKey], '');
    },
    loginDataComponent() {
      return createComponentFunction(getImport(this.pcLoginType)).default;
    },
    loginTypeKey() {
      return 'login_platform';
    },
  },
};
</script>
