<template>
  <GinstallDownload :templateType="appdownloadTemplateType" />
</template>

<script>
import GinstallDownload from '@LAYOUT/pc/InstallDownload/InstallDownload-default/';
import { PAGE_APPDOWNLOAD_TYPE } from '../../consts';
export default {
  name: 'InstallDownload',
  components: { GinstallDownload },
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
      return this.config.pcdownload_template_type || this.templateType;
    },
  },
};
</script>
