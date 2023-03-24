<template>
  <GGamesRecord />
</template>

<script>
// import GGamesRecord from '@LAYOUT/pc/UserCentre/UserCentre-default/GamesRecord.vue';
import { PC_USERCENTRE_TEMPLATE } from '@G/consts';

function getImport(PC_USERCENTRE_TEMPLATE) {
  switch (PC_USERCENTRE_TEMPLATE) {
    case 'default':
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/GamesRecord.vue');
    case 'yabo':
      return import('@LAYOUT/pc/UserCentre/UserCentre-yabo/GamesRecord.vue');
    default:
      return import('@LAYOUT/pc/UserCentre/UserCentre-default/GamesRecord.vue');
  }
}
export default {
  name: 'GamesRecord',
  // components: { GGamesRecord },
  components: {
    GGamesRecord: () => getImport(String(PC_USERCENTRE_TEMPLATE)),
  },
};
</script>
