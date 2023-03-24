<template>
  <div class="HelpCommon">
    <v-divider></v-divider>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <div v-if="!isLoading" class="pa-5 rounded">
      <div class="helperDetail" v-html="helperDetailFormatContent"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'HelpCommon',
  data() {
    return {
      helperDetailFormater: /@{{{origin}}}@/gi,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'helperList', 'helperDetail', 'dialogPagePath']),
    formatedPath() {
      return this.dialogPagePath || this.$route.name;
    },
    helperDetailFormatContent() {
      if (this.helperDetail.content) {
        return this.helperDetail.content.replace(this.helperDetailFormater, window.location.host);
      }
      return '';
    },
  },
  watch: {
    formatedPath: {
      handler(val) {
        this.handleCurrentData();
      },
      deep: true,
      immediate: true,
    },
    helperList() {
      this.handleCurrentData();
    },
  },
  methods: {
    ...mapActions(['GET_HELPER_DETAIL']),
    handleCurrentData() {
      if (!this.helperList.length) return;
      for (let item of this.helperList) {
        if (item.code === this.formatedPath) {
          this.GET_HELPER_DETAIL({ code: item.code });
          return;
        }
      }
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
