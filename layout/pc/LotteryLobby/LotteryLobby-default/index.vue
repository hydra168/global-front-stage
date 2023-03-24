<template>
  <v-container fluid id="lotteryLobby-default">
    <v-row row wrap class="pa-0" justify="center">
      <div class="lotteryLobby-header"></div>
    </v-row>
    <v-container class="my-10">
      <v-row row wrap justify="center">
        <v-col cols="6">
          <v-card ripple class="lotteryLobby-item" @click="ROUTER_PUSH('/play/68835709494')">
            <div class="lotteryLobby-img-left">
              <span class="lotteryLobby-text"> 旗舰版 </span>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card ripple class="lotteryLobby-item" @click="ROUTER_PUSH('/ultimate')">
            <div class="lotteryLobby-img-right">
              <span class="lotteryLobby-text"> 经典版 </span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'lotteryLobby',
  data() {
    return {
      header: {
        width: '520px',
        banner: require('./assets/img/headerBanner.png'),
      },
    };
  },
  computed: {
    ...mapGetters(['gameSlotList']),
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  methods: {
    ...mapMutations(['SET_FULL_WIDTH']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  beforeDestroy() {
    this.SET_FULL_WIDTH(false);
  },
};
</script>
<style lang="scss">
#lotteryLobby-default {
  background-image: url('./assets/img/bg.png');
  background-size: 100% 100%;
  padding: 100px 0px;
  .lotteryLobby-header {
    width: auto;
    min-width: 500px;
    min-height: 200px;
    background-image: url('./assets/img/headerBanner.png');
    background-size: 100% 100%;
  }
  .lotteryLobby-img-left {
    width: auto;
    min-width: 550px;
    min-height: 430px;
    background-image: url('./assets/img/horseLeft.png');
    background-size: 100% 100%;
  }
  .lotteryLobby-img-right {
    width: auto;
    min-width: 550px;
    min-height: 430px;
    background-image: url('./assets/img/horseRight.png');
    background-size: 100% 100%;
  }
  .lotteryLobby-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    box-shadow: none;
  }
  .lotteryLobby-text {
    position: absolute;
    bottom: -80px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 260px;
    height: 90px;
    background-image: url('./assets/img/btn.png');
    display: flex;
    justify-content: center;
    font-size: 40px;
    align-items: flex-start;
    padding-top: 5px;
  }
}
</style>
