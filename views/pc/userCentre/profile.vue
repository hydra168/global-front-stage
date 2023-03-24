<template>
  <GProfile />
</template>
<script>
// import GProfile from '@LAYOUT/pc/UserCentre/UserCentre-default/Profile.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Profile.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/Profile.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Profile.vue');
  }
}

export default {
  name: 'Profile',
  components: {
    GProfile: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
