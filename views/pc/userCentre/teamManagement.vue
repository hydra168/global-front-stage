<template>
  <GTeamManagement />
</template>
<script>
// import GTeamManagement from '@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/TeamManagement.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/TeamManagement.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/agencyCenter/TeamManagement.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/agencyCenter/TeamManagement.vue');
  }
}

export default {
  name: 'TeamManagement',
  components: {
    GTeamManagement: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
