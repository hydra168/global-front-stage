<template>
  <GappDownload :templateType="appdownloadTemplateType" />
</template>

<script>
import { PC_APPDOWNLOAD_COMPONENT_TYPE, PAGE_APPDOWNLOAD_TYPE } from '@G/consts';

function getImport(PC_LOGIN_TYPE) {
  switch (PC_LOGIN_TYPE) {
    case 'default':
      return import('@LAYOUT/pc/AppDownload/AppDownload-default');
    case '1':
      return import('@LAYOUT/pc/AppDownload/AppDownload-001');
    default:
      return import('@LAYOUT/pc/AppDownload/AppDownload-default');
  }
}

export default {
  name: 'AppDownload',
  components: {
    GappDownload: () => getImport(String(PC_APPDOWNLOAD_COMPONENT_TYPE)),
  },
  data() {
    return {
      templateType: PAGE_APPDOWNLOAD_TYPE ? PAGE_APPDOWNLOAD_TYPE : 'complex',
    };
  },
  computed: {
    config() {
      return this.$store.getters.config;
    },
    appdownloadTemplateType() {
      return this.config.appdownload_template_type || this.templateType;
    },
  },
};
</script>
