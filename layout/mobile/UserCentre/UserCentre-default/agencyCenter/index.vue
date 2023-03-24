<template>
  <v-container class="AgencyCenter">
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>

    <v-select v-model="current" :items="list" :item-text="getI18n" item-value="type"></v-select>
    <component :is="current" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Overview from './overview.vue';
import AgencyPromote from './promote.vue';
import TeamManagement from './team.vue';
import AgencyWallet from './wallet.vue';
import AgencyDescription from './description.vue';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'AgencyCenter',
  components: {
    Overview,
    AgencyPromote,
    TeamManagement,
    AgencyWallet,
    AgencyDescription,
  },
  data() {
    return {
      current: 'Overview',
      getI18n: e => this.textFilter(e.name),
      list: [
        {
          type: 'Overview',
          name: 'overview',
        },
        {
          type: 'AgencyPromote',
          name: 'agencyPromote',
        },
        {
          type: 'TeamManagement',
          name: 'teamManagement',
        },
        {
          type: 'AgencyWallet',
          name: 'agencyWallet',
        },
        {
          type: 'AgencyDescription',
          name: 'agencyDescription',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  methods: {
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_index_');
    },
  },
};
</script>
