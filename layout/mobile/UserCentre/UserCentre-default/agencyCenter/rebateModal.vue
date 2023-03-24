<template>
  <!-- 返點/返佣 -->
  <v-dialog v-model="isOpen" max-width="600px" @click:outside="close">
    <v-card :loading="isLoading">
      <v-card-title class="text-center py-5 d-flex justify-center">
        {{ textFilter('title') }}
      </v-card-title>
      <v-card-text>
        <!-- 列表 -->
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>{{ textFilter('settings') }}</th>
                <th>{{ textFilter('rebate') }}</th>
                <th>{{ textFilter('commission') }}</th>
              </tr>
            </thead>
            <tbody v-if="agencyRebate.length">
              <tr v-for="item in agencyRebate" :key="item.game_platform_id">
                <td>{{ item.game_platform_name }}</td>
                <td>{{ item.rebate }} %</td>
                <td>{{ item.commission }} %</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" class="text-center">{{ textFilter('noResults') }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed @click="close">{{ textFilter('closeBtn') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'RebateModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'agencyRebate']),
  },
  methods: {
    close() {
      this.$emit('close', false);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_rebateModal_');
    },
  },
};
</script>
