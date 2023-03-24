<template>
  <v-container fluid class="FishLobby-default pa-0">
    <div>
      <v-img class="white--text align-center" :src="headerBanner"></v-img>
    </div>
    <v-container>
      <v-row row wrap justify="left">
        <v-col v-for="(item, i) in liveList" :key="i" :cols="4">
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
  name: 'FishLobby-default',
  data() {
    return {
      headerBanner: require('./assets/fishLobbyBanner01.png'),
      liveList: [
        { label: 'ICG国神魔捕鱼', img: require('./assets/fish01.png'), link: '/promo/fish/1' },
        { label: 'ICG中国神魔塔防', img: require('./assets/fish02.png'), link: '/promo/fish/2' },
        { label: 'ICG龙珠捕鱼', img: require('./assets/fish03.png'), link: '/promo/fish/3' },
        { label: 'BG西遊捕魚', img: require('./assets/fish04.png'), link: '/promo/fish/4' },
        { label: 'BG捕魚大師', img: require('./assets/fish05.png'), link: '/promo/fish/5' },
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
.FishLobby-default {
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
