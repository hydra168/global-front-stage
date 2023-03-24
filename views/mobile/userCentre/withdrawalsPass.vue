<template>
  <GwithdrawalsPass />
</template>
<script>
// import GwithdrawalsPass from '@LAYOUT/mobile/UserCentre/UserCentre-default/withdrawalsPass.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/withdrawalsPass.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/withdrawalsPass.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/withdrawalsPass.vue');
  }
}
export default {
  name: 'withdrawalsPass',
  components: {
    GwithdrawalsPass: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { GwithdrawalsPass },
};
</script>
