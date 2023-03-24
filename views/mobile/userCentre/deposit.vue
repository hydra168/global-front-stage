<template>
  <Gdeposit />
</template>
<script>
// import Gdeposit from '@LAYOUT/mobile/UserCentre/UserCentre-default/deposit.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/deposit.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/deposit.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/deposit.vue');
  }
}

export default {
  name: 'deposit',
  components: {
    Gdeposit: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { Gdeposit },
};
</script>
