<template>
  <GDeposit />
</template>

<script>
// import GDeposit from '@LAYOUT/pc/UserCentre/UserCentre-default/Deposit.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Deposit.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/Deposit.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Deposit.vue');
  }
}
export default {
  name: 'Deposit',
  // components: { GDeposit },
  components: {
    GDeposit: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
