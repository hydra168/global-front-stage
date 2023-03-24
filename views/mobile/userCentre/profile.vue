<template>
  <Gprofile />
</template>
<script>
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/profile.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/profile.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/profile.vue');
  }
}

export default {
  name: 'profile',
  components: {
    Gprofile: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
};
</script>
