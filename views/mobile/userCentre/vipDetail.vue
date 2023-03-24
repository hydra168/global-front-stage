<template>
  <GvipDetail />
</template>
<script>
// import GvipLevel from '@LAYOUT/mobile/UserCentre/UserCentre-default/vipLevel.vue';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/vipDetail.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/vipDetail.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/vipDetail.vue');
  }
}
export default {
  name: 'vipLevel',
  components: {
    GvipDetail: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { GvipLevel },
};
</script>
