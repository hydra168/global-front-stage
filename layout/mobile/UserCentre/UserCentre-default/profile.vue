<template>
  <v-container id="Profile" class="hasBgColor">
    <v-progress-linear v-if="isLoading" indeterminate class="mb-3"></v-progress-linear>
    <v-form>
      <v-text-field
        v-model="profile.username"
        :readonly="usernameReadonly"
        @keyup.native="profile.username = profile.username.replace(/\s+/g, '')"
        :label="textFilter('usernameLabel')"
        autofocus
        required
        type="text"
      ></v-text-field>
      <v-text-field
        v-if="!(config.register_disable_mobile === '1')"
        v-model="profile.mobile"
        :readonly="mobileReadonly"
        type="text"
        :label="textFilter('mobileLabel')"
        :placeholder="textFilter('mobilePlaceholder')"
      ></v-text-field>
    </v-form>
    <v-subheader class="pa-0" @click="showcards = !showcards">
      <v-icon small class="info--text">add</v-icon>
      {{ textFilter('idText') }}
      <!-- {{ textFilter('idText') }} （<i class="red--text">{{ textFilter('optional') }}</i> ） -->
    </v-subheader>
    <v-subheader class="pa-0">
      <i class="red--text" v-show="showcards">
        {{ textFilter('fileSizeLimit') }}
      </i>
    </v-subheader>
    <v-layout wrap v-show="showcards">
      <v-flex xs6 mb-4 v-for="i in [0, 1, 2, 3]" :key="i">
        <ImgInputer
          v-model="file1"
          accept="image/gif,image/png,image/jpeg,image/bmp,image/webp"
          theme="material"
          icon="img2"
          size="small"
          auto-upload
          :max-size="16777216"
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
      </v-flex>
      <i class="red--text">{{ textFilter('note') }}</i>
    </v-layout>

    <v-btn @click.stop="updateProfile" :loading="isLoading" block depressed color="primary">{{ textFilter('submitBtn') }}</v-btn>
    <v-btn color="primary" block outlined class="mt-3" @click="$router.push({ name: 'userCentre' })">{{ textFilter('cancelBtn') }}</v-btn>

    <v-list class="mt-5">
      <h4 class="mb-3 pl-3">{{ textFilter('description') }}</h4>
      <v-list-item>
        <v-list-item-content>{{ textFilter('description1').replace(/\d+\.\s*/, '') }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>{{ textFilter('description2').replace(/\d+\.\s*/, '') }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>{{ textFilter('description3').replace(/\d+\.\s*/, '') }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>{{ textFilter('description4').replace(/\d+\.\s*/, '') }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Profile',
  components: {
    ImgInputer,
  },
  data() {
    return {
      showcards: false,
      loading: false,
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      profile: {
        cards: [],
      },
      mobileReadonly: false,
      usernameReadonly: false,
    };
  },
  computed: {
    ...mapGetters(['config', 'token', 'isLoading', 'userProfileData']),
  },
  created() {
    this.GET_USER_PROFILE();
    this.SET_CURRENT_MENU_TITLE(this.textFilter('userInfo'));
  },
  mounted() {
    this.SET_FULL_WIDTH(1);
  },
  watch: {
    userProfileData(data) {
      this.usernameReadonly = !!data.username;
      this.mobileReadonly = !!data.mobile;
      this.profile = data;
      // try {
      //   this.profile.cards = JSON.parse(this.profile.cards);
      // } catch (e) {
      //   console.log(e);
      // }
      if (this.profile.cards == '') {
        this.profile.cards = [];
      }
      this.username = this.profile['username'];
    },
  },
  methods: {
    ...mapActions(['GET_USER_PROFILE', 'POST_USER_PROFILE']),
    ...mapMutations(['SET_MESSAGE', 'SET_CURRENT_MENU_TITLE', 'SET_FULL_WIDTH']),
    onError() {
      this.SET_MESSAGE({ message: this.textFilter('apiError') });
    },
    uploaded(res, i) {
      this.profile.cards[i] = res.result;
      this.$forceUpdate();
    },
    async updateProfile() {
      if (this.profile['username'] == '') {
        this.SET_MESSAGE({ message: this.textFilter('errorUsernameNull') });
        return false;
      }
      // const pattern = /[^u4e00-u9fa5]+$/g;
      // if (!pattern.test(this.profile['username'])) {
      //   this.SET_MESSAGE({ message: this.textFilter('errorUsernameFormat') });
      //   return false;
      // }
      if (this.profile['cards'].length < (this.config.ID_pic_check || 0)) {
        this.SET_MESSAGE({ message: this.textFilter('errorIDCards') });
        return false;
      }

      if (this.profile['cards'].length > 0) {
        this.profile['cardstr'] = JSON.stringify(this.profile['cards']);
      }
      // var pre = /^[1][3456789][0-9]{9}$/;
      // if (!pre.test(this.profile['mobile'])) {
      //   this.SET_MESSAGE({ message: '请输入正确的手机号' });
      //   return false;
      // }
      await this.POST_USER_PROFILE(this.profile);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_profile_');
    },
  },
};
</script>
<style scoped lang="scss">
.v-list {
  counter-reset: i;
}
.v-list-item {
  counter-increment: i;
  &:before {
    align-self: flex-start;
    display: flex;
    content: counter(i) '.';
    line-height: 24px;
    padding-right: 0.5em;
  }
  .v-list-item__content {
    align-self: flex-start;
    padding-top: 0;
  }
}
</style>
