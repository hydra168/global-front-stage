<template>
  <GDepositRecord />
</template>

<script>
// import GDepositRecord from '@LAYOUT/pc/UserCentre/UserCentre-default/DepositRecord.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/DepositRecord.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/DepositRecord.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/DepositRecord.vue');
  }
}
export default {
  name: 'DepositRecord',
  // components: { GDepositRecord },
  components: {
    GDepositRecord: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
