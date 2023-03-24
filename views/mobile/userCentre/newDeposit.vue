<template>
  <GnewDeposit />
</template>
<script>
// import GvipLevel from '@LAYOUT/mobile/UserCentre/UserCentre-default/vipLevel.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/newDeposit.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/newDeposit.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/newDeposit.vue');
  }
}
export default {
  name: 'newDeposit',
  components: {
    GnewDeposit: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { GvipLevel },
};
</script>
