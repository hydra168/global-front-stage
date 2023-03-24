<template>
  <div id="appDownLoad" class="appdownload-wrapper">
    <div class="appdownload">
      <div class="appdownload-submain">
        <div class="qr-code">
          <vue-qr :text="appDownloadPath" v-bind="vueQrConfig(templateType)"></vue-qr>
        </div>
        <div class="submain-others"></div>
      </div>
      <div class="appdownload-others"></div>
    </div>
  </div>
</template>

<script>
// 本組件可以
import { mapActions, mapGetters, mapMutations } from 'vuex';
import VueQr from 'vue-qr';
import { textFilter } from '@UTILS/i18n';

const vueQrConfig = {
  1192: {
    size: 200,
    margin: 20,
  },
  1224: {
    size: 200,
    margin: 20,
  },
};

export default {
  name: 'appdownload-001',
  components: {
    VueQr,
  },
  props: {
    templateType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      useClassName: 'class-1192',
    };
  },
  async created() {
    await this.SET_FULL_WIDTH(true);
  },
  computed: {
    ...mapGetters(['config', 'locale', 'appDownloadPath']),
    vueQrConfigMap() {
      return new Map(Object.entries(vueQrConfig));
    },
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  methods: {
    ...mapMutations(['SET_FULL_WIDTH']),
    textFilter(text, defaultVal) {
      return textFilter(text, 'layout_appDownload_default_index_', false, false, defaultVal);
    },
    vueQrConfig(className = '1192') {
      return this.vueQrConfigMap.has(className) ? this.vueQrConfigMap.get(className) : this.vueQrConfigMap.get('1192');
    },
  },
  beforeDestroy() {
    // 回復預設
    this.SET_FULL_WIDTH(false);
  },
};
</script>

<style lang="scss" scoped>
.appdownload-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.appdownload {
  width: 100%;
  min-height: 1000px;
  max-height: 1000px;
  min-width: 1280px;
  max-width: 1960px;
  position: relative;
  background-image: linear-gradient(white, white);
  background-size: cover;
  background-position: center center;
}
.appdownload-submain {
  position: absolute;
  top: 50%;
  left: 25%;
  background-image: linear-gradient(white, white);
  width: 700px;
  height: 700px;
  transform: translate(-50%, -50%);
}
.qr-code {
  margin-left: 62%;
  margin-top: 38%;
}
</style>
