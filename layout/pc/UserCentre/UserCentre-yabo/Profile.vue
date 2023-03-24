<template>
  <!-- 个人信息 -->
  <div id="Profile" class="d-flex">
    <div class="width-680px mr-5 position-relative overflow-hidden">
      <ProfileEdit class="mb-5" />
      <BankCardEdit v-model="drawObject" class="mb-5" />
      <USDTWalletEdit v-model="drawObject" class="mb-5" />
      <PasswordEdit v-model="dialogObject" />
      <Drawer v-model="drawObject" />
      <Dialog v-model="dialogObject" />
    </div>
    <div class="width-240px">
      <Friends v-if="Number(config.Show_Friend_Event)" class="mb-5" />
      <CardWidgets />
    </div>
  </div>
</template>

<script>
// DODO 上傳圖片功能優化
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import Drawer from './components/Drawer';
import Dialog from './components/Dialog';
import ProfileEdit from './components/ProfileEdit';
import BankCardEdit from './components/BankCardEdit';
import USDTWalletEdit from './components/USDTWalletEdit';
import PasswordEdit from './components/PasswordEdit';
import Friends from './components/Friends';
import CardWidgets from './components/CardWidgets';

export default {
  name: 'Profile',
  components: { Drawer, Dialog, ProfileEdit, BankCardEdit, USDTWalletEdit, PasswordEdit, Friends, CardWidgets },
  data() {
    return {
      drawObject: null,
      dialogObject: null,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'token', 'userProfileData', 'config']),
    drawer() {
      return true;
    },
  },
  watch: {
    userProfileData(info) {
      this.usernameReadonly = !!info.username;
      this.mobileReadonly = !!info.mobile;
      this.profile = info;
    },
  },
  created() {
    this.GET_USER_PROFILE();
  },
  methods: {
    ...mapActions(['GET_USER_PROFILE', 'POST_USER_PROFILE']),
    ...mapMutations(['SET_MESSAGE']),
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_profile_');
    },
  },
};
</script>
