<template>
  <GWithdrawals />
</template>
<script>
// import GWithdrawals from '@LAYOUT/pc/UserCentre/UserCentre-default/Withdrawals.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Withdrawals.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/Withdrawals.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Withdrawals.vue');
  }
}

export default {
  name: 'withdrawals',
  components: {
    GWithdrawals: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
