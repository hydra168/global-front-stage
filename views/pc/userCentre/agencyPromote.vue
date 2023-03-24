<template>
  <GAgencyPromote />
</template>

<script>
// import GAgencyPromote from '@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyPromote.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyPromote.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/agencyCenter/AgencyPromote.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyPromote.vue');
  }
}
export default {
  name: 'AgencyPromote',
  // components: { GagencyPromote },
  components: {
    GAgencyPromote: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
