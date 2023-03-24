<template>
  <v-snackbar v-model="messageBar.show" :color="messageBar.type" :timeout="timeout" top center>
    <v-icon v-if="messageBar.type == 'success'" color="white"> check_circle </v-icon>
    <v-icon v-if="messageBar.type == 'error'" color="white"> error </v-icon>
    {{ messageBar.message ? messageBar.message : textFilter('errorText') }}
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="SET_MESSAGE({ show: false, type: messageBar.type })">
        <v-icon>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
/**
 * 提示彈窗
 */
import { mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'SnackBar',
  data() {
    return {
      timeout: 6000,
    };
  },
  computed: {
    ...mapGetters(['messageBar']),
  },
  methods: {
    ...mapMutations(['SET_MESSAGE']),
    textFilter(text) {
      return textFilter(text, 'com_snackBar_');
    },
  },
};
</script>
