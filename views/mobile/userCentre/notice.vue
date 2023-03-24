<template>
  <Gnotice />
</template>
<script>
// import Gnotice from '@LAYOUT/mobile/UserCentre/UserCentre-default/notice';
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/notice.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/notice.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/notice.vue');
  }
}
export default {
  name: 'notice',
  components: {
    Gnotice: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
  // components: { Gnotice },
};
</script>
