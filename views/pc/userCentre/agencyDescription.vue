<template>
  <GAgencyDescription />
</template>

<script>
// import GAgencyDescription from '@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyDescription.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyDescription.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/agencyCenter/AgencyDescription.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyDescription.vue');
  }
}
export default {
  name: 'AgencyDescription',
  // components: { GagencyDescription },
  components: {
    GAgencyDescription: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
