<template>
  <!-- 个人信息 -->
  <div id="Profile" class="Profile">
    <v-divider></v-divider>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>

    <!-- 使用者資訊 -->
    <v-form ref="form" class="mt-8">
      <v-text-field
        prepend-icon="person"
        v-model="profile.username"
        :readonly="usernameReadonly"
        :label="textFilter('usernameLabel')"
        @keyup.native="profile.username = profile.username.replace(/\s+/g, '')"
        required
        type="text"
        ><template v-slot:prepend><img width="20" src="./assets/icon/profile.png" /></template
      ></v-text-field>
      <v-text-field
        v-if="!(config.register_disable_mobile === '1')"
        prepend-icon="stay_primary_portrait"
        v-model="profile.mobile"
        :readonly="mobileReadonly"
        :label="textFilter('mobileLabel')"
        required
        type="text"
        ><template v-slot:prepend><img width="20" src="./assets/icon/phone.png" /></template
      ></v-text-field>
    </v-form>

    <!-- 身分證上傳 -->
    <v-row>
      <v-col v-for="i in [0, 1, 2, 3]" :key="i">
        <ImgInputer
          v-model="file1"
          accept="image/gif,image/png,image/jpeg,image/bmp,image/webp"
          theme="material"
          icon="img2"
          size="small"
          :max-size="16777216"
          auto-upload
          :headers="{ Authorization: `token ` + token }"
          action="/api/s3file"
          :onSuccess="res => uploaded(res, i)"
          :onError="onError"
          :readonly="typeof profile.cards[i] != 'undefined'"
          :imgSrc="profile.cards[i] ? `${profile.cards[i]}` : null"
          :bottomText="textFilter('chooseImg')"
          :hoverText="textFilter('chooseImg')"
          :placeholder="textFilter('chooseImg')"
          :readonly-tip-text="textFilter('imgReadonly')"
        />
      </v-col>
      <v-col cols="12">
        <i class="red--text">{{ textFilter('note') }}</i>
      </v-col>
    </v-row>
    <div class="d-flex flex-row-reverse">
      <v-btn color="primary" @click="updateProfileHandle" :disabled="isLoading" depressed> <v-icon>done</v-icon>{{ textFilter('modifyBtn') }}</v-btn>
    </div>
  </div>
</template>

<script>
// DODO 上傳圖片功能優化
import { mapActions, mapMutations, mapGetters } from 'vuex';
import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Profile',
  components: {
    ImgInputer,
  },
  data() {
    return {
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      profile: {
        cards: [],
      },
      fileData: [],
      mobileReadonly: false,
      usernameReadonly: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'token', 'userProfileData', 'config']),
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
    updateProfileHandle() {
      // 資料檢查
      if (this.profile['username'] == '') {
        this.SET_MESSAGE({ message: this.textFilter('errorUsernameNull') });
        return false;
      }
      // const pattern = /[^u4e00-u9fa5]+$/g;
      // if (!pattern.test(this.profile['username'])) {
      //   this.SET_MESSAGE({ message: this.textFilter('errorUsernameFormat') });
      //   return false;
      // }
      // const pre = /^[1][3456789][0-9]{9}$/;
      // if (!pre.test(this.profile['mobile'])) {
      //   this.SET_MESSAGE({ message: '请输入正确的手机号' });
      //   return false;
      // }
      if (this.profile['cards'].length < (this.config.ID_pic_check || 0)) {
        this.SET_MESSAGE({ message: this.textFilter('errorIDCards') });
        return false;
      }
      if (this.profile['cards'].length > 0) {
        this.profile['cardstr'] = JSON.stringify(this.profile['cards']);
      }
      this.POST_USER_PROFILE({
        mobile: this.profile.mobile,
        username: this.profile.username,
        cardstr: this.profile.cardstr,
      });
    },
    uploaded(res, i) {
      this.profile.cards[i] = res.result;
      this.$forceUpdate();
    },
    onError() {
      this.SET_MESSAGE({ message: this.textFilter('apiError') });
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_profile_');
    },
  },
};
</script>
