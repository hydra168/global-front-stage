import { mapActions, mapGetters } from 'vuex';
import { IS_SHOW_LOGINPAGE_I18N } from '../consts';

export default {
  // 為了防止使用mixins時設定沖突，名稱請加上'i18n'當前綴
  computed: {
    ...mapGetters(['locale', 'langItem']),
    i18nLoginBarShowComponent() {
      return true;
    },
    i18nLoginPageShowComponent() {
      return IS_SHOW_LOGINPAGE_I18N;
    },
  },
  methods: {
    ...mapActions(['LOCALE_HANDLER']),
    i18nChangeLang(lang) {
      this.LOCALE_HANDLER({ lang });
    },
  },
};
