<template>
  <div class="ProfileEdit white pa-5">
    <h3 class="mt-0 black--text d-flex font-weight-400 align-center">
      银行卡
      <v-spacer />
      <span class="error--text font-size-12">银行卡添加一张即可</span>
    </h3>
    <div class="d-flex mt-5 font-size-14 grey--text line-height-40px">
      <label class="field-name">银行卡号：</label>
      <div class="d-flex flex-column pl-1em flex-grow-1">
        <span v-for="(item, i) in userBankList.filter(item => item.Bank.toLowerCase() != 'usdt')" :key="i">
          {{ item.Card }}
        </span>
      </div>
      <div class="d-flex align-end justify-flex-end">
        <v-btn outlined class="grey--text d-block" depressed @click="ROUTER_PUSH({ name: 'addCard' })"> 添加银行卡 </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { getI18n, textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { cloneDeep } from 'lodash';

export default {
  name: 'BankCardEdit',
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
    if (this.locale) {
      this.syncData();
    }
    if (this.$route.name == 'addCard') {
      this.addCard();
    }
  },
  watch: {
    locale(loc) {
      this.syncData();
    },
    localeBankList(list) {
      if (this.draw && this.draw.fields && this.draw.fields[2] && this.draw.fields[2].name === 'Bank') {
        try {
          this.draw.fields[2].items = list;
        } catch (e) {
          console.log(e);
        }
      }
    },
    $route(route) {
      if (route.name == 'addCard') {
        this.addCard();
      }
    },
    draw(val) {
      if (!val) {
        this.ROUTER_PUSH({ name: 'profile' });
      }
    },
  },
  data() {
    return {
      globalCountryList: [],
    };
  },

  computed: {
    ...mapGetters(['config', 'locale', 'userBankList', 'bankList']),
    card() {
      return {
        title: '添加银行卡',
        submit: { action: this.POST_USER_BANK, text: '完成' },
        fields: [
          {
            text: '持卡人姓名：',
            name: 'Name',
            type: 'text',
            rules: [v => !!v || '不可空白'],
            placeholder: '请输入持卡人姓名',
            hint: '为了您的资金能够迅速到账，请确保填写的姓名与银行卡的开户姓名一致',
            required: true,
          },
          {
            text: '地区：',
            name: 'Locale',
            items: this.countryList,
            type: 'select',
            rules: [v => !!v || '不可空白'],
            placeholder: '请选择地区',
            required: true,
          },
          {
            text: '银行：',
            name: 'Bank',
            items: this.localeBankList,
            type: 'select',
            rules: [v => !!v || '不可空白'],
            placeholder: '请选择银行',
            required: true,
          },
          {
            text: '银行卡号：',
            name: 'Card',
            type: 'text',
            rules: [v => !!v || '不可空白'],
            placeholder: '请输入银行卡号',
            hint: '请认真校对银行卡号，卡号错误资金将无法到账',
            required: true,
          },
        ],
        form: { Locale: 'cn' },
      };
    },
    getI18n,
    localeBankList() {
      return this.bankList?.filter(item => item.locale == this.draw?.form?.Locale);
    },
    countryList() {
      return this.globalCountryList
        ?.filter((item, index) => {
          return ['cn', 'hk', 'mo', 'my', 'sg'].includes(item.alpha2);
        })
        .map(item => {
          return { text: item.name, value: item.alpha2 };
        });
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
    ...mapMutations(['SET_MESSAGE']),
    ...mapActions(['GET_USER_BANK_LIST', 'GET_USER_PROFILE', 'POST_USER_BANK', 'ROUTER_PUSH']),
    async syncData() {
      const mod = await import(`@G/i18n/country/${this.locale}.js`);
      const { globalCountryList } = mod.default;
      this.globalCountryList = globalCountryList;
    },
    async addCard() {
      try {
        const profile = await this.GET_USER_PROFILE();
        if (!profile.username) throw { route: 'changeName', key: 'Name' }; // 1.檢查姓名、身份證
        this.draw = this.card;
      } catch (e) {
        const prefix = 'layout_userCentre_default_withdrawals_';
        this.SET_MESSAGE({
          message: this.textFilter('msg', { msg: this.textFilter(`msg${e.key}`, undefined, prefix) }, prefix),
          type: 'warning',
        });
        this.ROUTER_PUSH({ name: e.route });
      }
    },
    textFilter(text, slot, prefix) {
      return textFilter(text, prefix ?? 'layout_userCentre_default_bankCard_', slot);
    },
  },
};
</script>
