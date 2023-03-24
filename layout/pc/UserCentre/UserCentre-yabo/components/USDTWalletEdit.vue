<template>
  <div class="ProfileEdit white pa-5">
    <h3 class="mt-0 black--text d-flex font-weight-400 align-center">
      USDT钱包
      <v-spacer />
      <span class="error--text font-size-12">USDT钱包添加一组即可</span>
    </h3>
    <div class="d-flex mt-5 font-size-14 grey--text line-height-40px">
      <label class="field-name">USDT钱包：</label>
      <div class="d-flex flex-column pl-1em flex-grow-1">
        <span
          class="word-break line-height-15 my-2 d-block"
          v-for="(item, i) in userBankList.filter(item => item.Bank.toLowerCase() == 'usdt')"
          :key="i"
        >
          {{ item.Card }}
        </span>
      </div>
      <div class="d-flex align-end justify-flex-end">
        <v-btn outlined class="grey--text d-block" depressed @click="ROUTER_PUSH({ name: 'addWallet' })"> 添加USDT钱包 </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'USDTWalletEdit',
  props: {
    value: {
      type: Object,
      default: () => null,
    },
  },
  created() {
    if (!this.userBankList || !this.userBankList.length) {
      this.GET_USER_BANK_LIST();
    }
    if (this.$route.name == 'addWallet') {
      this.addWallet();
    }
  },
  watch: {
    $route(route) {
      if (route.name == 'addWallet') {
        this.addWallet();
      }
    },
    draw(val) {
      if (!val) {
        this.ROUTER_PUSH({ name: 'profile' });
      }
    },
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['config', 'userBankList']),
    wallet() {
      return {
        title: '添加USDT钱包',
        submit: { action: this.POST_USER_BANK, text: '提交' },
        fields: [
          {
            text: 'USDT钱包：',
            name: 'Card',
            type: 'qr',
            rules: [v => !!v || '不可空白'],
            placeholder: 'USDT付款方钱包地址',
            hint: '为了您的资金能够迅速到账，请确保填写的姓名与银行卡的开户姓名一致',
            required: true,
            uploadText: '上传收款二维码',
          },
        ],
        form: { Bank: 'USDT', Card: null },
      };
    },
    draw: {
      get() {
        return this.value;
      },
      set(payload) {
        this.$emit('input', payload);
      },
    },
  },
  methods: {
    ...mapActions(['GET_USER_BANK_LIST', 'POST_USER_BANK', 'ROUTER_PUSH']),
    addWallet() {
      this.draw = this.wallet;
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_bankCard_');
    },
  },
};
</script>
