<template>
  <v-container id="Profile" class="hasBgColor profileBox">
    111
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-form>
      <v-text-field
        v-model="profile.username"
        :readonly="usernameReadonly"
        label="姓名"
        :placeholder="textFilter('usernameLabel')"
        required
        type="text"
      ></v-text-field>
      <v-text-field
        v-if="!(config.register_disable_mobile === '1')"
        v-model="profile.mobile"
        :readonly="mobileReadonly"
        type="text"
        label="手机"
        placeholder="手机"
      ></v-text-field>
    </v-form>
    <div v-show="showifusernameed" class="subBox">
      <!-- <v-subheader class="pa-0" @click="showcards = !showcards">
        <v-icon small class="info--text">add</v-icon>
        {{ textFilter('idText') }}
        {{ textFilter('idText') }} （<i class="red--text">{{ textFilter('optional') }}</i> ）
      </v-subheader> -->
      <!-- <v-subheader class="pa-0">
        <i class="red--text" v-show="showcards">
          {{ textFilter('fileSizeLimit') }}
        </i>
      </v-subheader> -->
      <!-- <v-layout wrap v-show="showcards">
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
        <i class="red--text note">{{ textFilter('note') }}</i>
      </v-layout> -->
      <div class="btnBox">
        <v-btn @click.stop="updateProfile" :loading="isLoading" depressed color="#0CB04E" dark>{{ textFilter('submitBtn') }}</v-btn>
        <v-btn color="#0CB04E" outlined @click="$router.push({ name: 'userCentre' })">{{ textFilter('cancelBtn') }}</v-btn>
      </div>
      <v-list class="mt-5 listBox">
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
    </div>
    <div v-show="showifedited">
      <div class="listBox" @click="editLoginPass()">
        <p>登录密码</p>
        <p>********</p>
        <div class="rightBox">修改密码</div>
      </div>
      <div class="listBox" @click="editwithdrawalsPass()">
        <p>提款密码</p>
        <p>********</p>
        <div class="rightBox">修改密码</div>
      </div>
    </div>
  </v-container>
</template>

<script>
// import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Profile',
  // components: {
  //   ImgInputer,
  // },
  data() {
    return {
      showcards: true,
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
      showifusernameed: false,
      showifedited: false,
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
    const { name: routeName } = this.$route;
    if (routeName === 'profile') {
      this.SET_CURRENT_MENU_TITLE('个人资料');
    }
  },
  watch: {
    userProfileData(data) {
      this.usernameReadonly = !!data.username;
      this.mobileReadonly = !!data.mobile;
      this.showifusernameed = !data.username;
      this.showifedited = !!data.username;
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

      // 這段在關閉驗證身分證 之後要打開
      // if (this.profile['cards'].length < (this.config.ID_pic_check || 0)) {
      //   this.SET_MESSAGE({ message: this.textFilter('errorIDCards') });
      //   return false;
      // }
      // 這段在關閉驗證身分證 之後要打開
      // if (this.profile['cards'].length > 0) {
      //   this.profile['cardstr'] = JSON.stringify(this.profile['cards']);
      // }

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
    editLoginPass() {
      this.$router.push({ name: 'loginPass' });
    },
    editwithdrawalsPass() {
      this.$router.push({ name: 'withdrawalsPass' });
    },
  },
};
</script>
<style scoped lang="scss">
#Profile {
  height: 100vh;
  background: rgb(246, 246, 246);
  .theme--light.v-text-field > .v-input__control > .v-input__slot:before,
  .theme--light.v-text-field > .v-input__control > .v-input__slot:after {
    display: none !important;
  }
}
.listBox {
  background: #fff;
  margin-top: 12px;
  padding: 15px 10px 10px 10px;
  border-radius: 6px;
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2);
  position: relative;
  p {
    margin-bottom: 0;
    font-size: 10px;
  }
  .v-list-item__content {
    font-size: 10px;
  }
  .rightBox {
    position: absolute;
    right: 35px;
    top: 30%;
    font-size: 12px;
    color: rgb(11, 171, 94);
  }
  .rightBox:after {
    content: '';
    display: block;
    background: url('./assets/img/edit.png') no-repeat center center/cover;
    width: 14px;
    height: 14px;
    position: absolute;
    right: -25px;
    top: 2px;
  }
}
.profileBox form {
  background: #fff;
  margin-top: 78px;
  padding: 10px 10px 0 10px;
  border-radius: 6px;
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2);
}
.layout.wrap {
  .flex {
    text-align: center;
  }
}
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
.v-progress-linear {
  height: 1px !important;
  position: absolute;
  z-index: 11;
  top: 66px;
}
.btnBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  button {
    margin: 0 5px;
  }
}
.subBox {
  padding-bottom: 100px;
}
.note {
  font-size: 10px;
  margin: 5px auto 25px;
}
</style>
<style lang="scss">
#Profile {
  .theme--light.v-text-field > .v-input__control > .v-input__slot:before,
  .theme--light.v-text-field > .v-input__control > .v-input__slot:after {
    display: none !important;
  }
}
</style>
