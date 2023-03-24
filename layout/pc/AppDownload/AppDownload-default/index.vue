<template>
  <div class="appdownload-wrapper">
    <div class="appdownload" :style="computedMainBgStyle">
      <div class="right-wrap">
        <div class="slogn">{{ textFilter('slognText', slognText) }}</div>
        <div class="stillUpdate">{{ textFilter('updateText', updateText) }}</div>
        <!-- <div class="lookStatus">{{ textFilter('statusText') }}</div> -->
        <div class="ma-3">
          <vue-qr :text="appDownloadPath" :size="250" :margin="20"></vue-qr>
        </div>
        <div class="app-wrap">
          <img src="./assets/ios.png" />
          <img src="./assets/android.png" />
        </div>
        <div class="lookStatus">{{ textFilter('note', note) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import VueQr from 'vue-qr';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'appdownload',
  components: {
    VueQr,
  },
  // props: {
  //   templateType: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      slognText: '一切精彩尽在掌握',
      updateText: '移动设备 iOS/Android 版本持续更新',
      note: '安装好 APP 后请按提示步骤操作,否则无法正常使用',
    };
  },
  async created() {
    await this.SET_FULL_WIDTH(true);
  },
  computed: {
    ...mapGetters(['config', 'locale', 'appDownloadPath']),
    computedMainBg() {
      return require(`./assets/main.jpg`);
    },
    computedMainBgStyle() {
      return `background-image: url('${this.config.appDownloadPage || this.computedMainBg}');`;
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
    justify-content: space-between;
    align-items: center;
    color: white;
    .slogn {
      font-size: 80px;
      font-weight: bold;
    }
    .stillUpdate {
      font-size: 30px;
    }
    .lookStatus {
      font-size: 25px;
    }
    .downloadBtn {
      width: 420px;
      cursor: pointer;
    }
    .app-wrap {
      img {
        width: 220px;
        margin: 20px 10px;
      }
    }
  }
}
</style>
