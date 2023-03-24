<template>
  <GBalanceRecord />
</template>

<script>
// import GBalanceRecord from '@LAYOUT/pc/UserCentre/UserCentre-default/BalanceRecord.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/BalanceRecord.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/BalanceRecord.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/BalanceRecord.vue');
  }
}
export default {
  name: 'BalanceRecord',
  // components: { GBalanceRecord },
  components: {
    GBalanceRecord: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
