<template>
  <component :is="slotLobbyType"></component>
</template>

<script>
import SlotLobbyDefault from '@LAYOUT/pc/SlotLobby/SlotLobby-default/';
import SlotLobby01 from '@LAYOUT/pc/SlotLobby/SlotLobby-01/';
import { SLOTLOBBY_TYPE } from '@G/consts';
export default {
  name: 'SlotLobby',
  components: { SlotLobbyDefault, SlotLobby01 },
  data() {
    return {
      slotLobbyType: SLOTLOBBY_TYPE ? SLOTLOBBY_TYPE : 'SlotLobbyDefault',
    };
  },
};
</script>
