<template>
  <GLoginPass />
</template>
<script>
// import GLoginPass from '@LAYOUT/pc/UserCentre/UserCentre-default/LoginPass.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/LoginPass.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/LoginPass.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/LoginPass.vue');
  }
}

export default {
  name: 'loginPass',
  components: {
    GLoginPass: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
