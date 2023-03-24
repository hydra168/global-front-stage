<template>
  <Grecord />
</template>
<script>
// import Grecord from '@LAYOUT/mobile/UserCentre/UserCentre-default/record.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/record.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/record.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/record.vue');
  }
}
export default {
  name: 'record',
  components: {
    Grecord: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { Grecord },
};
</script>
