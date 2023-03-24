import { getApiPaymentAccountList, getApiPaymentsTypeList, getApiPaymentsMethods } from '../api/data/payment';
import { DEPOSIT_USDT_CHANNELS } from '@G/consts';
import { store } from '../modules';
import app from '@/main';
const state = {
  paymentsTypeList: [],
  paymentAccountList: [],
  usdtAppChannelList: DEPOSIT_USDT_CHANNELS || '1,2,3,4,5',
  customWallets: [],
  paymentMethods: [],
  usdtRate: 0,
};
const actions = {
  // 取得 付款類型列表  1: "微信" 2: "支付宝" 3: "银行" 4: "在线支付"
  async GET_PAYMENT_TYPE_LIST({ commit }) {
    return new Promise((resolve, reject) => {
      getApiPaymentsTypeList().then(res => {
        if (res.isError) {
          res.isOpen && commit('SET_MESSAGE', { message: res.error });
          reject(res);
        } else {
          commit('SET_PAYMENT_TYPE_LIST', res.info);
          resolve(res);
        }
      });
    });
  },
  // 取得 付款渠道列表
  async GET_PAYMENT_ACCOUNTS_LIST({ commit }) {
    const res = await getApiPaymentAccountList();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      commit('SET_PAYMENT_ACCOUNTS_LIST', res.info);
    }
  },
  // 取得 全球支付 付款渠道列表
  async GET_PAYMENT_METHODS({ state, commit }) {
    const res = await getApiPaymentsMethods();
    if (res.isError) {
      res.isOpen && commit('SET_MESSAGE', { message: res.error });
    } else {
      state.paymentMethods = res.result;
      state.usdtRate = res.usdt_rate;
    }
  },
};
const mutations = {
  SET_PAYMENT_TYPE_LIST(state, payload) {
    state.paymentsTypeList = payload;
  },
  SET_PAYMENT_ACCOUNTS_LIST(state, payload) {
    state.paymentAccountList = payload;
    state.paymentAccountList?.forEach((item, i) => {
      if (item.sys_params.trim()) {
        item.sysParams = JSON.parse(item.sys_params);
      }
    });
  },
  ADD_WALLET_QRCODE(state, payload) {
    const wType = 'USDT';
    state.customWallets.push({
      Bank: wType,
      Card: payload,
    });
  },
};
const getters = {
  paymentsTypeList: state => state.paymentsTypeList,
  paymentAccountList: state => state.paymentAccountList ?? [],

  usdtAppChannels: (state, rootState) => {
    const settings = JSON.parse(rootState.config.usdthelper_list_settings || '[]');
    const lagacyChannels = state.usdtAppChannelList.split(',');
    let channels = lagacyChannels.map((key, i) => {
      const mapping = settings.find(item => item.fallback === key);
      let item = {
        value: i,
        text: app.$t(`g_layout_userCentre_default_deposit_usdtAppChannels${key}`),
      };
      if (mapping) {
        item = {
          text: rootState.locale == 'en' ? mapping.labelEN : mapping.labelZH,
          value: Number(mapping.fallback),
          ...mapping,
        };
      }
      return item;
    });
    channels = channels.concat(
      settings
        .filter(item => !lagacyChannels.includes(item.fallback))
        .map(item => {
          return {
            text: rootState.locale == 'en' ? item.labelEN : item.labelZH,

            ...item,
          };
        })
    );
    return channels;
  },
  usdtWallets: (state, rootState) => {
    let wallets;
    // if (Number(rootState.config.is_show_usdt_wallet)) {
    wallets = rootState.userBankList.filter(item => item.Bank == 'USDT');
    // console.log(wallets);
    // }
    if (rootState.virtualUsdtInfo.account) {
      wallets.push({
        Bank: 'USDT',
        Card: rootState.virtualUsdtInfo.account,
      });
    }
    return wallets.concat(rootState.customWallets);
  },
  customWallets: () => state.customWallets,
  paymentMethods: state => state.paymentMethods,
  usdtRate: state => state.usdtRate,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
