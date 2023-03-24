<template>
  <!-- 返點/返佣 -->
  <v-dialog v-model="isOpen" max-width="600px" @click:outside="close">
    <v-card>
      <v-card-title class="text-center py-5 d-flex justify-center">
        {{ textFilter('title') }}
      </v-card-title>
      <v-card-text>
        <!-- 列表 -->
        <v-data-table
          :headers="tableHeaders"
          :items="agencyRebate"
          :loading="isLoading"
          :hide-default-header="true"
          class="elevation-1 mb-3"
          :no-data-text="textFilter('noData')"
          hide-default-footer
        >
          <template v-slot:header="{ props: { headers } }">
            <thead>
              <tr>
                <th v-for="item in headers" :key="item.text">
                  {{ textFilter(item.text) }}
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:[`item.rebate`]="{ item }"> {{ item.rebate }} % </template>
          <template v-slot:[`item.commission`]="{ item }"> {{ item.commission }} % </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="close" depressed>{{ textFilter('closeBtn') }}</v-btn>
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
  data() {
    return {
      tableHeaders: [
        {
          text: 'settings',
          sortable: true,
          value: 'game_platform_name',
        },
        {
          text: 'rebate',
          sortable: true,
          value: 'rebate',
        },
        {
          text: 'commission',
          sortable: true,
          value: 'commission',
        },
      ],
    };
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
