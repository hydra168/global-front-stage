<template>
  <GOverview />
</template>
<script>
// import GOverview from '@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/Overview.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/Overview.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/agencyCenter/Overview.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/Overview.vue');
  }
}

export default {
  name: 'overView',
  components: {
    GOverview: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
