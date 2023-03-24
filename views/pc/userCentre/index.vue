<template>
  <GUserCentre />
</template>
<script>
// import GUserCentre from '@LAYOUT/pc/UserCentre/UserCentre-default/index.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/index.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/index.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/index.vue');
  }
}

export default {
  name: 'userCentre',
  components: {
    GUserCentre: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
