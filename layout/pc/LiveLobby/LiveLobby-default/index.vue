<template>
  <v-container fluid class="LiveLobby-default pa-0">
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
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'LiveLobby-default',
  data() {
    return {
      headerBanner: require('./assets/liveLobbyBanner01.png'),
      liveList: [
        { label: 'AG 真人', img: require('./assets/live05.png'), link: '/play/AGwftrtxRP9syJ' },
        { label: 'AE 真人', img: require('./assets/live04.png'), link: '/play/AEnfybm2' },
        { label: 'BG 真人', img: require('./assets/live02.png'), link: '/play/BGwftrtxRP9syJ' },
        // { label: 'OG 国际厅', img: require('./assets/live01.png'), link: '/play/AGwftrtxRP9syJ' },
        // { label: 'MG 国际厅', img: require('./assets/live03.png'), link: '/play/AGwftrtxRP9syJ' },
      ],
    };
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  methods: {
    ...mapMutations(['SET_FULL_WIDTH']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text) {
      return textFilter(text, 'layout_liveLobby_default_index_');
    },
  },
  beforeDestroy() {
    // 回復預設
    this.SET_FULL_WIDTH(false);
  },
};
</script>

<style lang="scss">
.LiveLobby-default {
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
