<template>
  <GUsdtHelp />
</template>

<script>
// import GUsdtHelp from '@LAYOUT/pc/UserCentre/UserCentre-default/UsdtHelp.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/UsdtHelp.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/UsdtHelp.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/UsdtHelp.vue');
  }
}
export default {
  name: 'UsdtHelp',
  // components: { GUsdtHelp },
  components: {
    GUsdtHelp: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
