<template>
  <GmodifyPass />
</template>
<script>
// import GmodifyPass from '@LAYOUT/mobile/UserCentre/UserCentre-default/modifyPass.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/modifyPass.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/modifyPass.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/modifyPass.vue');
  }
}
export default {
  name: 'modifyPass',
  components: {
    GmodifyPass: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { GmodifyPass },
};
</script>
