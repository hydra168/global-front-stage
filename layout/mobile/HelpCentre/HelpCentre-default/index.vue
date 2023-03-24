<template>
  <div class="helpCenterBox">
    <div v-if="!MOBILE_HELPCENTRE_IS_API_DATA">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item, i) in menuData" :key="i">
          <v-expansion-panel-header>{{ textFilter(item.title) }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <ol>
              <li v-for="(detail, ii) in item.detail" :key="ii">{{ textFilter(detail) }}</li>
            </ol>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item, i) in helperListMenuData" :key="i" @click="getDetail(item)">
          <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
          <v-expansion-panel-content v-if="item.code === curCode">
            <v-row v-if="loading" class="justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
            <v-row v-else>
              <div class="helperDetail" v-html="helperDetailFormatContent" />
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapActions, mapGetters } from 'vuex';
import { MOBILE_HELPCENTRE_IS_API_DATA } from '@G/consts';

export default {
  name: 'helpCentre',
  created() {
    if (this.MOBILE_HELPCENTRE_IS_API_DATA) {
      this.GET_HELPER_LIST();
    }
  },
  data() {
    return {
      MOBILE_HELPCENTRE_IS_API_DATA,
      loading: false,
      curCode: '',
      helperDetailFormater: /@{{{origin}}}@/gi,
      menuData: [
        {
          title: 'title1',
          detail: ['detail1_1', 'detail1_2', 'detail1_3', 'detail1_4', 'detail1_5'],
        },
        {
          title: 'title2',
          detail: ['detail2_1', 'detail2_2', 'detail2_3'],
        },
        {
          title: 'title3',
          detail: ['detail3_1', 'detail3_2', 'detail3_3', 'detail3_4'],
        },
        { title: 'title4', detail: ['detail4_1'] },
      ],
    };
  },
  computed: {
    ...mapGetters(['helperList', 'helperDetail']),
    helperListMenuData() {
      return this.helperList.filter(el => el.status == '1');
    },
    helperDetailFormatContent() {
      if (this.helperDetail.content) {
        return this.helperDetail.content.replace(this.helperDetailFormater, window.location.host);
      }
      return '';
    },
  },
  methods: {
    ...mapActions(['GET_HELPER_LIST', 'GET_HELPER_DETAIL']),
    textFilter(text) {
      return textFilter(text, 'layout_helpCentre_default_index_');
    },
    async getDetail(item) {
      const { code } = item;
      if (this.curCode === code) return;
      this.curCode = code;
      this.loading = true;
      await this.GET_HELPER_DETAIL({ code });
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
.helperDetail {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    background-color: transparent !important;
  }
  .aboutCo {
    background-color: transparent !important;
  }
}
</style>
