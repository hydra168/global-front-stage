<template>
  <GWithdrawalsRecord />
</template>
<script>
// import GWithdrawalsRecord from '@LAYOUT/pc/UserCentre/UserCentre-default/WithdrawalsRecord.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/WithdrawalsRecord.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/WithdrawalsRecord.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/WithdrawalsRecord.vue');
  }
}

export default {
  name: 'withdrawalsRecord',
  components: {
    GWithdrawalsRecord: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
