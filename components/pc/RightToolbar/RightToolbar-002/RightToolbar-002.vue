<template>
  <aside id="RightToolbar" class="RightToolbar-002">
    <v-img src="./assets/service.png">
      <div class="top-box">
        <div class="button-1 swing-hover" @click="gotToDeposit">{{ $t(firstBtnTitle) }}</div>
        <div class="button-2 swing-hover" @click="goToHelpCentre">{{ $t(secondBtnTitle) }}</div>
      </div>
      <vue-qr class="swing-hover" :text="appDownloadPath || ''" :size="200" :margin="20"></vue-qr>
    </v-img>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import '@ASSETS/scss/hover.scss';
import VueQr from 'vue-qr';

export default {
  name: 'RightToolbar-002',
  props: {
    firstBtnTitle: {
      type: String,
      default: 'g_com_rightToolbar_002_quickDeposit',
    },
    secondBtnTitle: {
      type: String,
      default: 'g_com_rightToolbar_002_help',
    },
    firstBtnOnClick: {
      type: Function,
      default: null,
    },
    secondBtnOnClick: {
      type: Function,
      default: null,
    },
  },
  components: { VueQr },
  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
  },
  methods: {
    goToHelpCentre() {
      this.$router.push('/helpCentre');
    },
    gotToDeposit() {
      this.$router.push('/userCentre/deposit');
    },
  },
};
</script>

<style lang="scss">
.RightToolbar-002 {
  position: fixed;
  top: 20%;
  right: 0;
  z-index: 10;
  width: 173px;
  .top-box {
    position: absolute;
    left: 5px;
    width: 160px;
    height: 200px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    .button-1 {
      width: 140px;
      position: absolute;
      top: 35px;
      color: white;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .button-2 {
      width: 140px;
      position: absolute;
      color: white;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  img {
    position: relative;
    width: 55%;
    margin: 94% 0 0 23%;
  }
}
</style>
