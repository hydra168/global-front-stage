import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  created() {
    this.CHECK_REMEMBER();
    if (this.rememberData) {
      this.loginInfo = {
        Name: this.rememberData.n,
        Passwd: this.rememberData.p,
        Remember: true,
      };
    }
  },
  // 為了防止使用mixins時設定沖突，名稱請加上'login'當前綴
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
    ...mapGetters(['rememberData']),
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX', 'SET_LOGIN_REDIRECT']),
    ...mapActions(['POST_LOGIN', 'CHECK_REMEMBER']),
    login(loginInfo) {
      if (this.isLoginDialog) {
        this.SET_GLOBAL_BOX('LoginBox');
      } else {
        this.SET_LOGIN_REDIRECT(null);
        this.POST_LOGIN(loginInfo);
      }
    },
  },
};
