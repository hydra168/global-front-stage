import { mapGetters } from 'vuex';
import { decodeConfigAPIValue } from '@UTILS/configAPI';

export default {
  computed: {
    ...mapGetters(['config']),
    loginMobileData() {
      return decodeConfigAPIValue(this.config[this.loginMobileTypeKey]);
    },
    loginMobileTypeKey() {
      return 'login_platform';
    },
    loginTopImgSrc() {
      return this.loginMobileData['MOBILE_LOGIN_TOP_IMG_SRC'] || '';
    },
    loginBgSrc() {
      return this.loginMobileData['MOBILE_LOGIN_BG_SRC'] || '';
    },
    logoUrlHandler() {
      if (Object.prototype.hasOwnProperty.call(this.loginMobileData, 'MOBILE_LOGIN_LOGO_SRC')) {
        return this.loginMobileData['MOBILE_LOGIN_LOGO_SRC'] || '';
      } else {
        return this.config.logo_image_mobile || '';
      }
    },
  },
};
