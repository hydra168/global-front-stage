<template>
  <GuserCentre />
</template>
<script>
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/index.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/index.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/index.vue');
  }
}

export default {
  name: 'userCentre',
  components: {
    GuserCentre: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
};
</script>
