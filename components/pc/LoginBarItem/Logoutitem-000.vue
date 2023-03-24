<template>
  <div class="logoutItem" :class="className">
    <!-- 登入名稱 -->
    <v-text-field
      class="login-info-name"
      dense
      hide-details
      outlined
      v-model="loginInfo.Name"
      required
      :placeholder="textFilter('account')"
    ></v-text-field>
    <!-- 登入密碼 -->
    <v-text-field
      class="login-info-password"
      outlined
      dense
      v-model="loginInfo.Passwd"
      required
      hide-details
      :append-icon="'visibility_off'"
      :type="'password'"
      @keyup.enter="login(loginInfo)"
      :placeholder="textFilter('password')"
    ></v-text-field>
    <!-- 記住帳密選項 -->
    <v-checkbox class="login-info-remember" hide-details dense v-model="loginInfo.Remember">
      <span slot="label">{{ textFilter('remember') }}</span>
    </v-checkbox>
    <!-- 登入按鍵 -->
    <v-btn class="login-btn" depressed @click.native="login(loginInfo)">{{ textFilter('login') }}</v-btn>
    <!-- 註冊按鍵 -->
    <v-btn class="register-btn" hide-details depressed @click.stop="SET_GLOBAL_BOX('RegisterBox')">{{ textFilter('openAnAccount') }}</v-btn>
    <!-- i18n -->
    <v-select
      dense
      outlined
      hide-details
      class="i18n"
      :value="locale"
      :items="langItem"
      :label="textFilter('changeLanguage')"
      item-text="value"
      item-value="key"
      @change="i18nChangeLang"
    ></v-select>
    <!-- 其他 -->
    <slot name="default"></slot>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import loginMixin from '@MIXIN/loginMixin';
import i18nMixin from '@MIXIN/i18nMixin';

export default {
  name: 'logout-item-000',
  props: {
    // 組件的class
    className: {
      type: String,
      default: '',
    },
  },
  mixins: [loginMixin, i18nMixin],
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    textFilter(text) {
      return textFilter(text, 'com_loginBar_001_');
    },
  },
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/pc/LoginBarItem/index.scss';
</style>
<style lang="scss" scoped>
.logoutItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
