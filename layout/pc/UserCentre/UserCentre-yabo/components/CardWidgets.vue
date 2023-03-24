<template>
  <div class="CardWidgets white pa-5">
    <v-tabs v-model="currentTab" slider-color="#0bab5e">
      <v-tab class="px-0 font-size-18 font-weight-500" v-for="(item, i) in ['卡片管理', '虚拟币管理']" :key="i" :href="`#tab-${i}`"
        >{{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item class="pa-0" value="tab-0">
        <div v-if="!cards.length" class="grey--text min-height-360px d-flex align-center justify-center font-size-14">
          <span>暂未绑定银行卡账户，<a @click="ROUTER_PUSH({ name: 'addCard' })" class="primary--text d-inline-block">请添加</a></span>
        </div>
        <div v-else class="d-flex flex-column grey--text mt-5">
          <template v-for="(item, i) in cards">
            <span class="pb-2" :key="i">
              <hr class="opacity-2 mx-5 mb-2" v-if="i != 0" />
              {{ item.Bank }}
              <span class="d-inline-block font-size-12 black--text word-break line-height-20"> {{ item.Card }} </span>
            </span>
          </template>
        </div>
      </v-tab-item>
      <v-tab-item class="pa-0" value="tab-1">
        <div v-if="!wallets.length" class="grey--text min-height-360px d-flex align-center justify-center font-size-14">
          <span>暂未绑定虚拟币钱包账户，<a @click="ROUTER_PUSH({ name: 'addWallet' })" class="primary--text d-inline-block">请添加</a></span>
        </div>
        <div v-else class="d-flex flex-column grey--text mt-5">
          <template v-for="(item, i) in wallets">
            <span class="pb-2" :key="i">
              <hr class="opacity-2 mx-5 mb-2" v-if="i != 0" />
              <span class="d-inline-block font-size-12 black--text word-break line-height-15"> {{ item.Card }} </span>
            </span>
          </template>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CardWidgets',
  props: {},
  created() {
    if (!this.userBankList) {
      this.GET_USER_BANK_LIST();
    }
  },
  watch: {},
  data() {
    return {
      currentTab: 1,
    };
  },

  computed: {
    ...mapGetters(['userBankList']),
    cards() {
      return this.userBankList.filter(item => item.Bank.toLowerCase() != 'usdt');
    },
    wallets() {
      return this.userBankList.filter(item => item.Bank.toLowerCase() == 'usdt');
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_bankCard_');
    },
  },
};
</script>
<style lang="scss" scoped>
.CardWidgets {
  ::v-deep {
    .v-slide-group__content {
      justify-content: space-between;
      .v-tab {
        padding: 0;
        min-width: 0;
      }
    }
  }
}
</style>
