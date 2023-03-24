<template>
  <GAgencyCenter />
</template>

<script>
// import GAgencyCenter from '@LAYOUT/mobile/UserCentre/UserCentre-default/agencyCenter/index.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/agencyCenter/index.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/agencyCenter/index.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/agencyCenter/index.vue');
  }
}

export default {
  name: 'agencyCenter',
  // components: { GAgencyCenter },
  components: {
    GAgencyCenter: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
};
</script>
