<template>
  <GVipLevel />
</template>
<script>
// import GVipLevel from '@LAYOUT/pc/UserCentre/UserCentre-default/VipLevel.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/VipLevel.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/VipLevel.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/VipLevel.vue');
  }
}

export default {
  name: 'vipLevel',
  components: {
    GVipLevel: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
