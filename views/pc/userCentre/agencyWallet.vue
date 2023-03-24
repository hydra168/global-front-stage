<template>
  <GAgencyWallet />
</template>

<script>
// import GAgencyWallet from '@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyWallet.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyWallet.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/agencyCenter/AgencyWallet.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/AgencyWallet.vue');
  }
}
export default {
  name: 'AgencyWallet',
  // components: { GAgencyWallet },
  components: {
    GAgencyWallet: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
