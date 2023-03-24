<template>
  <GloginPass />
</template>
<script>
// import GloginPass from '@LAYOUT/mobile/UserCentre/UserCentre-default/loginPass.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/loginPass.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/loginPass.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/loginPass.vue');
  }
}

export default {
  name: 'loginPass',
  components: {
    GloginPass: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { GloginPass },
};
</script>
