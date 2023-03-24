<template>
  <div class="ProfileEdit white pa-5" :class="{ highlight: isEditing.profile }">
    <h3 class="mt-0 black--text d-flex font-weight-400 align-center">
      个人资料
      <v-spacer />
      <v-btn @click="editProfile" class="font-size-14 pr-0" text>
        {{ isEditing.profile ? '确认' : '修改' }}
        <v-icon>{{ isEditing.profile ? 'check' : 'edit' }}</v-icon>
      </v-btn>
    </h3>
    <h4 class="mt-5 black--text d-flex font-size-16 font-weight-400 align-center">
      账户安全
      <v-spacer />
      <span class="error--text font-size-12">为保证能正常提款，请填写银行卡开户的姓名，提交后无法修改</span>
    </h4>
    <v-text-field class="my-2 align-center" solo outlined dense persistent-hint :value="userProfileData.name" hide-details placeholder="" readonly>
      <template #prepend>
        <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">用戶名：</label>
      </template>
    </v-text-field>
    <v-text-field
      class="my-2 align-center"
      solo
      outlined
      dense
      persistent-hint
      v-model="userProfileData.username"
      hide-details
      placeholder=""
      :readonly="!isEditing.profile"
    >
      <template #prepend>
        <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">姓名：</label>
      </template>
    </v-text-field>
    <v-text-field
      class="my-2 align-center"
      solo
      outlined
      dense
      persistent-hint
      v-model="userProfileData.mobile"
      hide-details
      placeholder=""
      :readonly="!isEditing.profile"
      disabled
    >
      <template #prepend>
        <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">手机：</label>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ProfileEdit',
  created() {
    this.GET_USER_PROFILE();
    this.isEditing.profile = this.$route.name == 'changeName';
  },
  watch: {
    $route(route) {
      this.isEditing.profile = this.$route.name == 'changeName';
    },
  },
  data() {
    return {
      isEditing: {
        profile: false,
      },
    };
  },
  computed: {
    ...mapGetters(['config', 'userProfileData']),
  },
  methods: {
    ...mapActions(['GET_USER_PROFILE', 'POST_USER_PROFILE']),
    textFilter(text) {
      return textFilter(text, 'g_com_profile');
    },
    async editProfile() {
      const profile = {
        username: this.userProfileData.username,
        mobile: this.userProfileData.mobile,
      };
      if (this.isEditing.profile) {
        await this.POST_USER_PROFILE(this.userProfileData);
      }
      await this.GET_USER_PROFILE();
      this.isEditing.profile = !this.isEditing.profile;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  &.highlight {
    animation: hi 2s 1s;
  }
}
@keyframes hi {
  0% {
    box-shadow: 0 0 0 4px var(--v-warning-base) inset;
  }
  100% {
    box-shadow: 0 0 0 4px transparent inset;
  }
}
</style>
