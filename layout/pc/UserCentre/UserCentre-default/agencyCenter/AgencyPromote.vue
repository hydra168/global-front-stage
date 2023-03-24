<template>
  <!-- 代理推廣 -->
  <div class="AgencyPromote">
    <v-divider></v-divider>
    <v-tabs class="mt-5">
      <v-tab>{{ textFilter('link') }}</v-tab>
      <!-- 推廣鏈接 -->
      <v-tabs-items>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('codeLabel')" v-model="code" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="space-between" align="center" v-for="item in links" :key="item">
          <v-col cols="10">
            <v-text-field :label="textFilter('linkLabel')" :value="item" readonly> </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" @click="copy(item)" depressed>{{ textFilter('copyBtn') }}</v-btn>
          </v-col>
        </v-row>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import { textFilter } from '@UTILS/i18n';
Vue.use(VueClipboard);

export default {
  name: 'AgencyPromote',
  computed: {
    ...mapGetters(['agencyLinks']),
    code() {
      return this.agencyLinks.code || '';
    },
    links() {
      return this.agencyLinks.links || [];
    },
  },
  created() {
    this.SET_AGENCY_LINKS({});
    this.GET_AGENCY_LINKS();
  },
  methods: {
    ...mapActions(['GET_AGENCY_LINKS']),
    ...mapMutations(['SET_MESSAGE', 'SET_AGENCY_LINKS']),
    copy(item) {
      this.$copyText(item).then(
        () => {
          this.SET_MESSAGE({ type: 'success', message: this.textFilter('success') });
        },
        () => {
          this.SET_MESSAGE({ message: this.textFilter('error') });
        }
      );
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_agencyPromote_');
    },
  },
};
</script>
