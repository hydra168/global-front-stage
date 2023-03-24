<template>
  <div class="installdownload-wrapper">
    <div class="installdownload" :style="computedMainBgStyle">
      <div class="right-wrap">
        <h1 class="slognText">{{ textFilter(slognText, 'slognText') }}</h1>
        <div class="installdownload-wrap">
          <div class="download">
            <img src="./assets/windows-icon.png" alt="" />
            <h2>{{ textFilter('windows', windows) }}</h2>
            <h4>{{ textFilter('windowsVersion', windowsVersion) }}</h4>
            <h4>{{ textFilter('windowsBit', windowsBit) }}</h4>
            <a :href="installPathWindows" target="_blank" download>
              <v-btn large rounded depressed class="download-btn">{{ textFilter('downloadBtn', downloadBtn) }}</v-btn>
            </a>
          </div>
          <div class="download">
            <img src="./assets/mac-icon.png" alt="" />
            <h2>{{ textFilter('mac', mac) }}</h2>
            <h4>{{ textFilter('supportSystem', supportSystem) }}</h4>
            <h4>{{ textFilter('macVersion', macVersion) }}</h4>
            <a :href="installPathMac" target="_blank" download>
              <v-btn large rounded depressed class="download-btn">{{ textFilter('downloadBtn', downloadBtn) }}</v-btn>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { PC_INSTALLDOWNLOAD_SLOGN_TEXT } from '@G/consts';
export default {
  name: 'installdownload',
  props: {
    templateType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      slognText: PC_INSTALLDOWNLOAD_SLOGN_TEXT,
      windows: 'Windows',
      windowsVersion: '请推荐使用 Windows 10',
      windowsBit: '64 位元以上版本',
      downloadBtn: '下载',
      mac: 'Mac',
      supportSystem: '请推荐使用 Mac',
      macVersion: '10.5.6 以上版本',
    };
  },
  computed: {
    ...mapGetters(['config']),
    computedMainBg() {
      return require(`./assets/main.jpg`);
    },
    computedMainBgStyle() {
      return `background-image: url('${this.config.installDownloadPage || this.computedMainBg}');`;
    },
    installPath() {
      return this.config.pc_download_link ? this.config.pc_download_link : this.config.app;
    },
    installPathWindows() {
      return `${this.installPath}/pc-client.zip`;
    },
    installPathMac() {
      return `${this.installPath}/os-client.zip`;
    },
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  methods: {
    ...mapMutations(['SET_FULL_WIDTH']),
    textFilter(text, defaultVal) {
      return textFilter(text, 'layout_installDownload_default_index_', false, false, defaultVal);
    },
  },
  beforeDestroy() {
    // 回復預設
    this.SET_FULL_WIDTH(false);
  },
};
</script>

<style lang="scss" scoped>
.installdownload-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.installdownload {
  width: 100%;
  min-height: 1000px;
  max-height: 1000px;
  min-width: 1280px;
  max-width: 1960px;
  position: relative;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .right-wrap {
    width: 55%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    h1 {
      font-size: 60px;
      font-weight: bold;
      margin: 0px;
    }
    h2 {
      margin: 5px 0px 10px 0px;
    }
    .installdownload-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .download {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 50px 50px;
        a {
          text-decoration: none;
        }
        .download-btn {
          cursor: pointer;
          width: 200px;
          margin-top: 20px;

          :hover {
            color: #000;
          }
        }
      }
    }
  }
}
</style>
