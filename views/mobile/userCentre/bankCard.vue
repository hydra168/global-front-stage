<template>
  <GbankCard />
</template>
<script>
import { MOBILE_USERCENTRE_TEMPLATE } from '@G/consts';
// import GbankCard from '@LAYOUT/mobile/UserCentre/UserCentre-default/bankCard.vue';

function getImport(MOBILE_USERCENTRE_TEMPLATE) {
  switch (MOBILE_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/bankCard.vue');
    case 'yabo':
      return import('@LAYOUT/mobile/UserCentre/UserCentre-yabo/bankCard.vue');
    default:
      return import('@LAYOUT/mobile/UserCentre/UserCentre-default/bankCard.vue');
  }
}

export default {
  name: 'bankCard',
  // components: { GbankCard },
  components: {
    GbankCard: () => getImport(String(MOBILE_USERCENTRE_TEMPLATE)),
  },
};
</script>
