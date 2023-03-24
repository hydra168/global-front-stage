<template>
  <div class="walletsBox">
    <!-- 無遊戲錢包時顯示的空白內容 -->
    <!-- <v-list-item v-if="!gameWallet || !gameWalletLabel" class="gameWalletDisplay">
      <v-list-item-icon>
        <v-icon>games</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ gameWalletLabel || textFilter('gameWallet') }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="ml-auto">
        <v-icon :disabled="isLoading || isBalanceLoading" @click="POST_BALANCE()"> undo </v-icon>
      </v-list-item-action>
    </v-list-item> -->
    <!-- /.無遊戲錢包時顯示的空白內容 -->
    <!-- 遊戲錢包 -->
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <div class="groupBox">
      <div class="walletsHeaderBox">
        <div>
          <p>總金額(元)</p>
        </div>
        <!-- 主錢包 -->
        <div class="walletsInBox">
          <div v-if="balanceAllInfo['0'] && loadBalanceErrorCount <= 3">
            <div class="walletsInBoxLeftBox">
              <span v-if="balanceAllInfo['0'] && loadBalanceErrorCount <= 3" class="subheading">
                $
                <strong>{{ balanceAllInfo['0'].balance | money }}</strong>
              </span>
              <span v-if="loadBalanceErrorCount > 3">{{ textFilter('loadingError') }}</span>
              <div class="reload" :disabled="isLoading || isBalanceLoading" @click="GET_BALANCE_ALL_INFO()" />
            </div>
          </div>
        </div>
        <div class="gridBox">
          <div class="blockBox withoutAfter" @click="pushToDeposit()">
            <span class="depositIcon">存款</span>
          </div>
          <div class="blockBox withoutAfter" @click="pushToWithdrawals()">
            <span class="withdrawalIcon">提款</span>
          </div>
        </div>
      </div>
      <v-list-group color="white" class="gameWalletDisplay" append-icon="redo" @click="POST_BALANCE()">
        <template v-slot:activator>
          <v-list-item-title class="releativeBox">
            <span> {{ gameWalletLabel || textFilter('gameWallet') }}明細 </span>
          </v-list-item-title>
        </template>
        <div class="gridBox">
          <v-list-item v-for="(item, i) in gameWallet" :key="i" class="blockBox">
            <template>
              <span v-if="loadBalanceErrorCount <= 3" class="subheading">
                {{ gameWallet[i].name }}<b>¥{{ gameWallet[i].balance | money }}</b>
              </span>
              <span v-else-if="loadBalanceErrorCount > 3">{{ textFilter('loadingError') }}</span>
            </template>
          </v-list-item>
        </div>
      </v-list-group>
    </div>
    <div v-if="cardType === 1 && Number(config.Show_Friend_Event)" class="cardBox">
      <div class="cardInBox">
        <h3>好友推薦</h3>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :value="inviteCodeInfo.invitCode"
                  label="好友推薦碼"
                  outlined
                  readonly
                  append-icon="mdi-content-copy"
                  ref="myText2"
                  @click:append="copyText2"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <h4>活動說明</h4>
        <p>
          您推荐的好友经由您提供的好友码注册平台后 ，好友首笔存款符合活动资格时，您会获得红包奖励，红包奖励为每天01:15结算昨天的数据
          介面上今日好友数与今日获得红包，表示昨天您有推荐的好友加入平台
        </p>
        <div class="btnBox" @click="closeCardBox()">確認</div>
      </div>
    </div>

    <div class="bannerBox" @click="openCardBox()" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import ws from '@G/ws';
import { MOBILE_USERCENTRE_NEED_REDIRECT, MOBILE_USERCENTRE_MENU_TITLE_DEPOSIT, MOBILE_USERCENTRE_MENU_TITLE_RECORD } from '@G/consts';
import _ from 'lodash';

export default {
  name: 'wallets',
  data() {
    return {
      cardType: 0,
    };
  },
  computed: {
    ...mapGetters([
      'config',
      'isLoading',
      'balanceTotal',
      'userInfo',
      'isBalanceLoading',
      'balanceAllInfo',
      'loadBalanceErrorCount',
      'userProfileData',
      'userBankList',
      'token',
      'gameRecordList',
      'inviteCodeInfo',
      'gameWalletLabel',
    ]),
    gameWallet() {
      let obj = _.cloneDeep(this.balanceAllInfo);
      delete obj['0'];
      return obj;
    },
  },
  created() {
    if (Number(this.config.Show_Friend_Event)) {
      this.GET_INVITE_CODE_INFO({ name: this.userInfo.name });
    }
  },
  methods: {
    ...mapActions([
      'GET_BALANCE_TOTAL',
      'GET_USER_PROFILE',
      'GET_USER_BANK_LIST',
      'GET_BALANCE_ALL_INFO',
      'POST_BALANCE',
      'GET_LOGOUT',
      'GET_GAMES_RECORD_LIST',
      'GET_VIP_LEVEL',
      'GET_INVITE_CODE_INFO',
    ]),
    ...mapMutations(['SET_CURRENT_MENU_TITLE', 'SET_MESSAGE', 'SET_FULL_WIDTH', 'SET_INVITE_CODE_INFO']),
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_index_');
    },
    pushToDeposit() {
      this.$router.push({ name: 'newDeposit' });
    },
    pushToWithdrawals() {
      this.$router.push({ name: 'withdrawals' });
    },
    openCardBox() {
      this.cardType = 1;
    },
    closeCardBox() {
      this.cardType = 0;
    },
    copyText1() {
      const input = this.$refs.myText1.$refs.input;
      input.select();
      document.execCommand('copy');
      input.setSelectionRange(0, 0); // unselect
      alert('好友註冊連結: ' + input.value);
    },
    copyText2() {
      const input = this.$refs.myText2.$refs.input;
      input.select();
      document.execCommand('copy');
      input.setSelectionRange(0, 0); // unselect
      alert('好友推薦碼: ' + input.value);
    },
  },
  watch: {
    locale() {
      this.GET_BALANCE_ALL_INFO(); // 取得 所有種類的錢包
    },
  },
};
</script>
<style scoped lang="scss">
.walletsBox {
  background: rgb(246, 246, 246);
  height: 100vh;
  padding-top: 68px;
  .v-progress-linear {
    height: 1px !important;
    position: absolute;
    z-index: 11;
    top: 66px;
  }
  .groupBox {
    background: #fff;
    border-radius: 7px;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.2);
    margin: 20px;
    .walletsHeaderBox {
      padding: 15px;
      position: relative;
      p {
        font-size: 12px;
        margin-bottom: 4px !important;
      }
    }
    // .v-icon {
    //   font-size: 14px !important;
    // }
    .releativeBox {
      position: relative;
      color: #333;
      span {
        margin-top: -1px;
        display: block;
      }
    }
    .gridBox {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .blockBox {
      position: relative;
      display: block;
      text-align: center;
      border-bottom: 1px solid #dcdcdd;
      padding: 10px;
      b {
        display: block;
        font-size: 12px;
        font-weight: 200;
      }
    }
    .blockBox:nth-child(odd):after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 30%;
      width: 1px;
      height: 23px !important;
      background: #dcdcdd;
      min-height: auto !important;
    }
    .blockBox.withoutAfter {
      border-bottom: none;
      position: relative;
      margin-top: 20px;
      .depositIcon,
      .withdrawalIcon {
        position: relative;
        display: inline-block;
        margin-left: 30px;
      }
      .depositIcon::before {
        content: '';
        display: block;
        position: absolute;
        width: 40px;
        height: 40px;
        left: -45px;
        top: -10px;
        background: url('./assets/img/deposit.png') no-repeat center center/contain;
      }
      .withdrawalIcon::before {
        content: '';
        display: block;
        position: absolute;
        width: 40px;
        height: 40px;
        left: -45px;
        top: -7px;
        background: url('./assets/img/withdrawal.png') no-repeat center center/contain;
      }
    }
    span {
      font-size: 12px;
    }
    .p12 {
      font-size: 10px;
      position: absolute;
      right: 38px;
      bottom: 16px;
      color: rgb(77, 153, 116);
    }
    span.subheading2 {
      b {
        color: rgb(255, 156, 0);
      }
    }
  }
  .cardBox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    .cardInBox {
      background: #fff;
      border-radius: 4px;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
      margin: 35% 20px;
      padding: 17px;
    }
    .btnBox {
      text-align: center;
      color: #fff;
      width: 77%;
      border-radius: 6px;
      padding: 10px;
      margin: 0 auto;
      background: -webkit-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
      background: -o-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
      background: -moz-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
      background: linear-gradient(to right, rgb(0, 173, 73), rgb(108, 219, 139));
    }
    .mt-20 {
      margin-top: 20px;
    }
    h4 + p {
      font-size: 12px;
      color: rgb(102, 102, 102);
      margin: 10px 3px 20px;
    }
  }
  .bannerBox {
    background: url('./assets/img/banner.png') no-repeat center center/contain;
    height: 70px;
  }
}
</style>
<style lang="scss">
.groupBox {
  .v-icon {
    font-size: 14px !important;
    color: rgb(77, 153, 116);
  }
  .walletsInBox {
    position: relative;
    display: inline-block;
    .font30 {
      font-size: 30px !important;
    }
    .walletsInBoxLeftBox {
      display: inline-block;
      strong {
        font-size: 20px;
      }
      .reload {
        display: block;
        position: absolute;
        right: -26px;
        top: 4px;
        width: 18px;
        height: 20px;
        background: url('./assets/img/reload.png') no-repeat center center/contain;
      }
    }
  }
}
.v-text-field__details {
  display: none;
}
</style>
