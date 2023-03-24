import { mapActions, mapMutations, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  created() {},
  // 為了防止使用mixins時設定沖突，名稱請加上'gameWallet'當前綴
  props: {
    isLoginDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loginInfo: {},
    };
  },
  computed: {
    ...mapGetters(['balanceAllInfo', 'config', 'isBalanceLoading', 'gameWalletLabel']),
    gameWallet() {
      let total = null;
      const wallet = _.find(this.balanceAllInfo, (w, index) => index >= 201 && index <= 220);
      if (wallet) {
        total = wallet.balance;
      }
      return total;
    },
  },
  methods: {
    ...mapActions([
      // 'GET_LOGOUT',
      // 'SHOW_LIVE_CHAT',
      // 'POST_BALANCE',
      'GET_BALANCE_ALL_INFO',
      // 'POST_LOGIN',
      // 'CHECK_REMEMBER',
      // 'LOCALE_HANDLER',
      // 'ROUTER_PUSH'
    ]),
  },
};
