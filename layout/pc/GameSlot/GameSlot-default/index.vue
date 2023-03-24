<template>
  <v-container fluid grid-list-md class="content h100" px-0 py-2>
    <!-- 成功 -->
    <div v-if="!isError" class="d-flex align-center justify-center">
      <!-- 遊戲連結坎入 -->
      <iframe scrolling="yes" ref="iframe" :width="width" :height="height" :src="showUrl" frameborder="0" @load="loaded($event)"></iframe>
      <!-- 全螢幕控制鍵 -->
      <v-fab-transition>
        <v-btn color="pink" dark top right fab @click="SET_FULL_SCREEN(!fullscreen)" fixed>
          <v-icon v-if="fullscreen">fullscreen_exit</v-icon>
          <v-icon v-else>fullscreen</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>

    <!-- 失敗 -->
    <v-layout v-if="isError" align-center justify-center class="h100">
      <div class="d-flex flex-column justify-center">
        <h3 class="display-3 mb-5">{{ textFilter('errorTitle') }}</h3>
        <span class="subheading text-center">
          {{ textFilter('errorText') }}
        </span>
        <v-divider class="my-7"></v-divider>
        <div class="title mb-3"></div>
        <v-btn class="mx-0" color="primary" large @click="$router.push('/')" depressed>
          {{ textFilter('goHome') }}
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { PC_GAME_IFRAME_WIDTH } from '@G/consts';

export default {
  name: 'GameSlot',
  data() {
    return {
      playType: true, // 用來判斷呼叫的api名稱
      playId: '',
      playRoom: '',
      isError: false,
      showUrl: '',
      routeData: null,
      height: 0,
      times: 0,
      iframeHeight: 0,
      width: PC_GAME_IFRAME_WIDTH ? PC_GAME_IFRAME_WIDTH : '100%',
    };
  },
  computed: {
    ...mapGetters(['fullscreen', 'gameUrl', 'gameUrlStatus']),
  },
  watch: {
    gameUrlStatus(info) {
      if (info) {
        this.isError = info === 'error';
        this.showUrl = this.gameUrl;
        this.$forceUpdate();
      }
      this.SET_GAME_URL_STATUS(null);
      this.SET_GAME_PROMO_URL_STATUS(null);
    },
    $route: {
      handler(info) {
        this.routeData = info;
        this.getUrlHandler();
        // this.playType ? this.GET_GAME_URL({ id: this.playId }) : this.GET_ULTIMATE(this.ultimateType);
        this.times++;
      },
      deep: true,
    },
  },
  async created() {
    await (this.routeData = this.$route);
    await this.getUrlHandler();
    this.getHeight();
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  methods: {
    ...mapMutations(['SET_FULL_SCREEN', 'SET_LOADING_BAR', 'SET_GAME_URL_STATUS', 'SET_GAME_PROMO_URL_STATUS', 'SET_FULL_WIDTH']),
    ...mapActions(['GET_ULTIMATE', 'GET_GAME_URL', 'GET_GAME_PROMO_URL']),
    getUrlHandler() {
      if (this.routeData.name === 'ultimate') {
        this.playType = false;
        this.ultimateType = this.routeData.name;
      }
      if (this.routeData.name === 'play') {
        this.playType = true;
        this.playId = this.routeData.params.id;
        this.playRoom = this.routeData.query.room;
      }
      if (this.routeData.name === 'promo') {
        this.playType = this.routeData.params.type;
        this.playId = this.routeData.params.id;
      }
      switch (this.playType) {
        case false:
          this.GET_ULTIMATE(this.ultimateType);
          break;
        case true:
          this.GET_GAME_URL({ id: this.playId, room: this.playRoom });
          break;
        case 'live' || 'chess' || 'fish' || 'slot':
          this.GET_GAME_PROMO_URL({ type: this.playType, id: this.playId });
          break;

        default:
          this.GET_ULTIMATE(this.ultimateType);
          break;
      }
    },
    getHeight() {
      this.height = window.innerHeight;
      // loginBar-height: 100px, GameSlot-padding: 8px * 2
      this.iframeHeight = window.innerHeight - (100 + 16);
    },
    loaded() {
      this.times ? (this.times = 0) : this.times++;
      if (this.fullscreen) {
        this.height = window.innerHeight;
      } else if (this.iframeHeight) {
        this.height = this.iframeHeight;
      } else {
        this.height = window.innerHeight;
      }
    },
    textFilter(text) {
      return textFilter(text, 'layout_gameSlot_default_index_');
    },
  },
  beforeDestroy() {
    // 回復預設
    this.SET_FULL_SCREEN(false);
    this.SET_FULL_WIDTH(false);
    this.SET_LOADING_BAR({ show: false });
  },
};
</script>
