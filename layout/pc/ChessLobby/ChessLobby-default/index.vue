<template>
  <v-container fluid class="ChessLobby-default pa-0">
    <div>
      <v-img class="white--text align-center" :src="headerBanner"></v-img>
    </div>
    <v-container>
      <v-row row wrap justify="center">
        <v-col v-for="(item, i) in chessList" :key="i" :cols="4">
          <v-card @click="ROUTER_PUSH(item.link)" style="cursor: pointer" ripple class="mx-auto">
            <v-img class="white--text" width="100%" :src="item.img">
              <v-card-title class="controls white--text">{{ item.label }}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'ChessLobby-default',
  data() {
    return {
      headerBanner: require('./assets/chessLobbyBanner01.png'),
      chessList: [
        { label: '棋牌比赛版', img: require('./assets/chess01.png'), link: '/play/ZMUmRpOvGIvG' },
        { label: '棋牌常规版', img: require('./assets/chess02.png'), link: '/play/qYJA8PC2Y2n4' },
      ],
    };
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  methods: {
    ...mapMutations(['SET_FULL_WIDTH']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  beforeDestroy() {
    // 回復預設
    this.SET_FULL_WIDTH(false);
  },
};
</script>

<style lang="scss">
.ChessLobby-default {
  .controls {
    position: absolute;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    bottom: 0;
    display: flex;
    height: 50px;
    justify-content: center;
    list-style-type: none;
    width: 100%;
    z-index: 1;
    color: #fff;
    transition: height 0.3s;
    padding: 0;
    &:hover {
      background: rgba($color: #000, $alpha: 0.2);
      height: 100%;
      transition: all 0.5s;
    }
  }
}
</style>
