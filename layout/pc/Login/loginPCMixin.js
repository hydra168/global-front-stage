import { mapGetters } from 'vuex';
import { decodeConfigAPIValue } from '@UTILS/configAPI';

export default {
  computed: {
    ...mapGetters(['config']),
    loginPCData() {
      return decodeConfigAPIValue(this.config[this.loginPCTypeKey]);
    },
    loginPCTypeKey() {
      return 'login_platform';
    },
    loginCoverBg() {
      return this.loginPCData['PC_LOGIN_COVOR_SRC'] || '';
    },
    loginBottomRightSrc() {
      return this.loginPCData['PC_LOGIN_BOTTOM_RIGHT_IMG_SRC'] || '';
    },
    loginTopSrc() {
      return this.loginPCData['PC_LOGIN_TOP_IMG_SRC'] || '';
    },
    loginLeftSrc() {
      return this.loginPCData['PC_LOGIN_LEFT_IMG_SRC'] || '';
    },
    loginBgSrc() {
      return this.loginPCData['PC_LOGIN_BG_SRC'] || '';
    },
    logoUrlHandler() {
      if (Object.prototype.hasOwnProperty.call(this.loginPCData, 'PC_LOGIN_LOGO_SRC')) {
        return this.loginPCData['PC_LOGIN_LOGO_SRC'] || '';
      } else {
        return this.config.logo_image_pc || '';
      }
    },
  },
};
