<template>
  <v-dialog v-model="isLoadingBar.show" hide-overlay persistent width="300">
    <v-card color="primary" dark class="pt-3 text-center">
      <v-card-text>
        {{ isLoadingBar.message ? isLoadingBar.message : textFilter('waitText') }}
        <v-progress-linear indeterminate color="white" class="mb-0 mt-3"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * 等待彈窗
 */
import { mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'LoadingBar',
  computed: {
    ...mapGetters(['isLoadingBar']),
  },
  methods: {
    textFilter(text) {
      return textFilter(text, 'com_loadingBar_');
    },
  },
};
</script>
