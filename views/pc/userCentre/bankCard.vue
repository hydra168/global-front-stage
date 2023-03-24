<template>
  <GBankCard />
</template>

<script>
// import GBankCard from '@LAYOUT/pc/UserCentre/UserCentre-default/BankCard.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/BankCard.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/BankCard.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/BankCard.vue');
  }
}
export default {
  name: 'BankCard',
  // components: { GBankCard },
  components: {
    GBankCard: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
