<template>
  <GNotice />
</template>
<script>
// import GNotice from '@LAYOUT/pc/UserCentre/UserCentre-default/Notice.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Notice.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/Notice.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/Notice.vue');
  }
}

export default {
  name: 'Notice',
  components: {
    GNotice: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
