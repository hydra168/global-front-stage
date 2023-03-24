<template>
  <Gwithdrawals />
</template>
<script>
// import Gwithdrawals from '@LAYOUT/mobile/UserCentre/UserCentre-default/withdrawals.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/withdrawals.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/withdrawals.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/withdrawals.vue');
  }
}
export default {
  name: 'withdrawals',
  components: {
    Gwithdrawals: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { Gwithdrawals },
};
</script>
