<template>
  <div class="LoginBar-001">
    <v-row class="mb-1">
      <v-col cols="4" class="pa-2 pl-3">
        <v-img v-if="isShowLogo" :width="logoWidth" :src="logoUrlHandler" @click="$router.push('/')" style="cursor: pointer"></v-img>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="5">
        <div v-if="isLogin" class="d-flex justify-end align-center mb-2">
          <span class="warning--text">{{ userInfo && userInfo.name }}</span>
          <v-divider class="warning mx-4" vertical></v-divider>
          <v-btn v-if="balanceAllInfo['0']" class="logout d-inline-block" text small color="warning" tile @click="$router.push({ name: 'wallet' })">
            <template> {{ balanceAllInfo['0'].name }} : {{ balanceAllInfo['0'].balance }}</template>
          </v-btn>
          <v-btn class="logout ml-2 d-inline-block" depressed small color="warning" tile @click="$router.push({ name: 'deposit' })">
            <template>{{ textFilter('deposit') }}</template>
          </v-btn>
          <v-btn class="logout ml-2 d-inline-block" depressed small color="warning" tile @click="$router.push({ name: 'withdrawals' })">
            <template>{{ textFilter('withdrawal') }}</template>
          </v-btn>
          <v-btn class="logout ml-2 d-inline-block" depressed small color="warning" tile @click="$router.push({ name: 'wallet' })">
            <template>{{ $t('g_common_navbar_menu_center') }}</template>
          </v-btn>
          <v-btn class="logout ml-2 d-inline-block" :loading="isLoading" depressed small color="primary" tile @click="postLogout">
            <template>{{ textFilter('logout') }}</template>
          </v-btn>
        </div>
        <div v-else class="d-flex align-start">
          <v-text-field
            class="d-inline-block mr-2 mb-2"
            color="grey"
            dense
            style="width: 70px"
            :error-messages="errorMsg"
            outlined
            v-model="loginInfo.Name"
            hide-details="auto"
            required
            placeholder="请输入帐号"
          />
          <v-text-field
            class="d-inline-block mb-2"
            color="grey"
            outlined
            dense
            v-model="loginInfo.Passwd"
            style="width: 70px"
            required
            hide-details="auto"
            :error-messages="errorPassMsg"
            :append-icon="visibility ? 'visibility' : 'visibility_off'"
            :type="visibility ? 'text' : 'password'"
            @click:append="visibility = !visibility"
            @keyup.enter="login(loginInfo)"
            placeholder="请输入密码"
          />
          <v-btn class="d-inline-block mt-2 ml-5" :loading="isLoading" depressed small color="primary" @click.native="postLogin(loginInfo)">
            {{ $t('g_common_loginNow') }}
          </v-btn>
          <v-btn class="gold-color d-inline-block mt-2 ml-3" depressed small @click.stop="$router.push({ name: 'register' })">
            {{ textFilter('openAnAccount') }}
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-end mt-2">
          <v-btn color="primary" small depressed tile class="mr-2" @click="openAnnounc = !openAnnounc">公告</v-btn>
          <v-btn
            color="yellow lighten-5"
            outlined
            small
            depressed
            tile
            class="mr-2"
            @click="SET_MESSAGE({ message: $t('g_com_loginBox_contactCustomerService') })"
          >
            {{ $t('g_com_loginBox_forget') }}
          </v-btn>
          <v-btn color="yellow lighten-5" outlined small depressed tile class="mr-0" @click="$router.push({ name: 'helpCentre' })">
            {{ $t('g_common_link_help') }}
          </v-btn>

          <!-- <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn color="yellow lighten-5" class="white--text" outlined small depressed tile v-bind="attrs" v-on="on">{{ currentLocale }} </v-btn>
            </template>

            <v-list dense style="width: 150px; border: 1px solid #fffde7">
              <v-list-item v-for="(item, i) in langItem" :key="i" link @click="changeLang(item.key)">
                <v-list-item-title
                  ><span class="text-caption">{{ item.value }}</span></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu> -->
        </div>
      </v-col>
    </v-row>
    <div class="Announcement-wrap" :class="{ active: openAnnounc }">
      <GAnnouncement wrapClass="black py-1" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import GAnnouncement from '@COM/pc/Announcement/Announcement-default/Announcement-default.vue';

export default {
  name: 'LoginBar-006',
  components: { GAnnouncement },
  props: {
    logoWidth: {
      type: Number,
      default: 70,
    },
    isShowLogo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loginInfo: {},
      visibility: false,
      msgObj: { code: null, type: '' },
      errorMsg: [],
      errorPassMsg: [],
      openAnnounc: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'isLogin', 'balanceAllInfo', 'config', 'isBalanceLoading', 'userInfo', 'locale', 'langItem', 'gameWalletLabel']),
    logoUrlHandler() {
      return this.config.logo_image_pc;
    },
    currentLocale() {
      return this.langItem.find(({ key }) => key === this.locale).value;
    },
  },
  watch: {
    loginInfo: {
      handler(val) {
        this.errorMsg = [];
        this.errorPassMsg = [];
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(['SET_LOGIN_REDIRECT', 'SET_MESSAGE']),
    ...mapActions(['GET_LOGOUT', 'POST_LOGIN', 'POST_MESSAGE', 'GET_BALANCE_ALL_INFO', 'LOCALE_HANDLER']),
    postLogin(loginInfo) {
      if (!loginInfo.Name) {
        this.errorMsg = this.$t('g_com_loginBox_errorNameNull');
        return;
      }
      if (!loginInfo.Passwd) {
        this.errorPassMsg = this.$t('g_com_loginBox_errorPasswdNull');
        return;
      }
      this.POST_LOGIN(loginInfo).catch(err => {
        if (err.status == 400) {
          this.errorMsg = err.message;
        }
      });
    },
    changeLang(lang) {
      this.LOCALE_HANDLER({ lang });
    },
    postLogout() {
      this.GET_LOGOUT();
    },
    postMessage(value) {
      this.POST_MESSAGE({ code: 200, type: 'toUserPage', value });
    },
    textFilter(text) {
      return textFilter(text, 'com_loginBar_001_');
    },
  },
};
</script>

<style lang="scss">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  transition: background-color 50000s ease-in-out 100000s;
  -webkit-text-fill-color: #fff !important;
  color: #fff !important;
  background: #000;
}

.LoginBar-001 {
  z-index: 200;
  // .v-text-field--filled.v-input--dense > .v-input__control > .v-input__slot,
  // .v-text-field--full-width.v-input--dense > .v-input__control > .v-input__slot,
  // .v-text-field--outlined.v-input--dense > .v-input__control > .v-input__slot {
  //   min-height: 30px;
  //   background-color: white;
  // }
  // .v-text-field input {
  //   padding: 0px;
  //   color: black;
  // }
  // .v-text-field--outlined.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot {
  //   min-height: 30px;
  // }
  // .theme--dark.v-input input {
  //   color: black;
  // }
  .gold-color {
    background-image: linear-gradient(180deg, #dbcb9d, #a89254) !important;
    // background-color: #c5b179 !important;
  }
  .Announcement-wrap {
    height: 0px;
    transition: height 0.3s;
    &.active {
      height: 38px;
    }
  }
}
</style>
