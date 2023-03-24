<template>
  <div class="loginItem" :class="className">
    <!-- 帳號資料 -->
    <div class="userInfo">
      <slot name="userInfo" v-bind="{ userInfo }">
        <span class="hi">{{ textFilter('hi') }}</span>
        <a class="username" @click="ROUTER_PUSH('/userCentre')">
          <label style="cursor: pointer">{{ userInfo.name }}</label>
        </a>
      </slot>
    </div>
    <!-- 錢包資料 -->
    <slot name="gameWallet" v-bind="{ balanceAllInfo, isBalanceLoading, GET_BALANCE_ALL_INFO, config, gameWallet }">
      <v-menu :close-on-content-click="false" :open-on-hover="true" :top="false" offset-y max-width="30%">
        <template v-slot:activator="{ on }">
          <v-btn class="balance-btn" text :loading="isBalanceLoading" v-on="on || true" @click="GET_BALANCE_ALL_INFO()">
            {{ textFilter('balance') }}
            <v-icon small class="spinner">cached</v-icon>
          </v-btn>
        </template>
        <v-card class="balance-card">
          <v-list>
            <template v-for="(item, i) in balanceAllInfo">
              <template v-if="i != -2 && (i < 201 || i > 230)">
                <v-list-item :key="i">
                  <v-list-item-content v-if="item.name == undefined || item.name == null || item.name == ''" class="black-text">
                    --
                  </v-list-item-content>
                  <v-list-item-content v-else class="black-text"> {{ item.name }} {{ config.unit }} {{ item.balance | money }} </v-list-item-content>
                </v-list-item>
              </template>
            </template>
            <v-list-item v-if="gameWallet != null">
              <v-list-item-content class="black-text"> {{ gameWalletLabel }} {{ config.unit }} {{ gameWallet | money }} </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </slot>
    <!-- 其他按鍵 -->
    <slot name="default">
      <v-btn text class="deposit-btn" @click="ROUTER_PUSH('/userCentre/deposit')"> {{ textFilter('deposit') }} <v-icon small>input</v-icon> </v-btn>
      <v-btn text class="withdrawals-btn" @click="ROUTER_PUSH('/userCentre/withdrawals')">
        {{ textFilter('withdrawal') }} <v-icon small>money</v-icon>
      </v-btn>
    </slot>
    <!-- 餘額更新 -->
    <slot name="updateBalance" v-bind="{ POST_BALANCE }">
      <v-btn text class="updateBalance-btn" @click="POST_BALANCE()"> {{ textFilter('back') }} <v-icon small>undo</v-icon> </v-btn>
    </slot>
    <!-- 個人信箱 -->
    <slot name="mailNumber" v-bind="{ mailNumber }">
      <aside class="mail-btn mr-5" @click="ROUTER_PUSH('/userCentre/notice')">
        <v-badge color="red" class="badge">
          <span slot="badge" v-if="mailNumber !== ''">{{ mailNumber }}</span>
          <v-icon large>mail</v-icon>
        </v-badge>
      </aside>
    </slot>
    <!-- 登出 -->
    <slot name="logout" v-bind="{ GET_LOGOUT }">
      <v-btn class="logout-btn" depressed @click="GET_LOGOUT">
        <template>{{ textFilter('logout') }}</template>
      </v-btn>
    </slot>
    <v-select
      dense
      outlined
      hide-details
      class="i18n primary--text"
      :value="locale"
      :items="langItem"
      :label="textFilter('changeLanguage')"
      item-text="value"
      item-value="key"
      @change="i18nChangeLang"
    ></v-select>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import gameWalletMixin from '@MIXIN/gameWalletMixin';
import i18nMixin from '@MIXIN/i18nMixin';

export default {
  name: 'loginItem-000',
  props: {
    // 組件的class
    className: {
      type: String,
      default: '',
    },
  },
  mixins: [gameWalletMixin, i18nMixin],
  computed: {
    ...mapGetters(['mailNumber', 'userInfo']),
  },
  methods: {
    ...mapActions(['GET_LOGOUT', 'POST_BALANCE', 'ROUTER_PUSH']),
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
.loginItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
