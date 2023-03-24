<template>
  <GWallet />
</template>
<script>
// import GWallet from '@LAYOUT/pc/UserCentre/UserCentre-default/Wallet.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Wallet.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/Wallet.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Wallet.vue');
  }
}

export default {
  name: 'wallet',
  components: {
    GWallet: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
