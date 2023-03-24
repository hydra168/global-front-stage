<template>
  <GWithdrawalsPass />
</template>
<script>
// import GWithdrawalsPassPass from '@LAYOUT/pc/UserCentre/UserCentre-default/WithdrawalsPassPass.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/WithdrawalsPass.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/WithdrawalsPass.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/WithdrawalsPass.vue');
  }
}

export default {
  name: 'withdrawalsPass',
  components: {
    GWithdrawalsPass: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
