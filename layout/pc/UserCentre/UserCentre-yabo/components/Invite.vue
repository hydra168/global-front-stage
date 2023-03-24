<template>
  <div v-if="config.Show_Friend_Event" class="Invite">
    <v-btn class="banner" text @click="show">
      <img src="../assets/img/banner-invite.png" />
    </v-btn>
    <Dialog v-model="showInfo" />
  </div>
</template>

<script>
import Dialog from './Dialog';
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';
import { map, clone } from 'lodash';

export default {
  name: 'Invite',
  props: {},
  components: { Dialog },
  async created() {
    const { name } = this.userInfo;
    if (Number(this.config.Show_Friend_Event)) {
      this.GET_INVITE_CODE_INFO({ name });
    }
  },
  watch: {},
  data() {
    return {
      showInfo: null,
    };
  },

  computed: {
    ...mapGetters(['inviteCodeInfo', 'userProfileData', 'userInfo', 'config']),
    Info() {
      return {
        title: '好友推薦',
        submit: { action: this.close, text: '確認' },
        fields: [
          {
            text: '好友推薦碼：',
            name: 'invitCode',
            type: 'copy',
            placeholder: '好友推薦碼：',
            required: true,
            visible: false,
          },
        ],
        form: this.inviteCodeInfo,
        hint: {
          title: '活動說明',
          text: `您推荐的好友经由您提供的好友码注册平台后 ，好友首笔存款符合活动资格时，您会获得红包奖励，红包奖励为每天01:15结算昨天的数据
          介面上今日好友数与今日获得红包，表示昨天您有推荐的好友加入平台`,
        },
      };
    },
  },
  methods: {
    ...mapActions(['GET_INVITE_CODE_INFO', 'GET_USER_PROFILE']),
    show() {
      this.showInfo = this.Info;
    },
    close() {
      this.showInfo = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.Invite ::v-deep {
  .banner {
    position: relative;
    height: auto;
    padding: 0;
    .v-btn__content {
      max-height: none;
      max-width: 100%;
      img {
        max-width: 100%;
      }
    }
  }
}
</style>
