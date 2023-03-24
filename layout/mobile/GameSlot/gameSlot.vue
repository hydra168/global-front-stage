<template>
  <div class="fill-height">
    <FMenu></FMenu>

    <!-- 成功 -->
    <div v-if="!isError">
      <!-- 遊戲連結坎入 -->
      <iframe scrolling="yes" ref="iframe" width="100%" :height="height" :src="showUrl" frameborder="0" @load="loaded($event)"></iframe>
    </div>

    <!-- 失敗 -->
    <v-container v-if="isError" class="fill-height">
      <v-card class="mx-auto d-flex flex-column align-center justify-center" max-width="400">
        <v-card-title>{{ textFilter('errorTitle') }}</v-card-title>
        <v-card-text>{{ textFilter('errorText') }}</v-card-text>
        <v-card-actions>
          <v-btn depressed block large color="primary" class="fill-width" @click="$router.push('/')">
            {{ textFilter('goHome') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import FMenu from './components/floatMenu';
import { textFilter } from '@UTILS/i18n';

export default {
  components: {
    FMenu,
  },
  name: 'GameSlot',
  data() {
    return {
      playType: true, // 用來判斷呼叫的api名稱
      isError: false,
      showUrl: '',
      routeData: null,
      height: '',
      times: 0,
      mql: '',
      playId: '',
      playRoom: '',
    };
  },
  computed: {
    ...mapGetters(['fullscreen', 'gameUrl', 'gameUrlStatus', 'isNativeApp']),
  },
  watch: {
    gameUrlStatus(info) {
      // console.log(this.gameUrl);
      if (info) {
        this.isError = info === 'error';
        // IM 體育直接導向
        if (this.playId === 'IM9k5RBN' && this.isNativeApp) {
          this.NATIVE_OPEN_URL(this.gameUrl);
          this.ROUTER_PUSH('/');
        } else if (this.playId === 'IM9k5RBN') {
          this.WEB_OPEN_URL(this.gameUrl);
          this.ROUTER_PUSH('/');
        } else {
          this.showUrl = this.gameUrl;
        }
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
    await this.SET_FULL_SCREEN(true);
    await this.getUrlHandler();
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
    // 偵測手機橫幅 || 直幅
    this.mql = window.matchMedia('(orientation: portrait)');
    this.onMatchMeidaChange();
    this.mql.addListener(this.onMatchMeidaChange);
  },
  methods: {
    ...mapMutations(['SET_FULL_SCREEN', 'SET_LOADING_BAR', 'SET_GAME_URL_STATUS', 'SET_GAME_PROMO_URL_STATUS', 'SET_FULL_WIDTH']),
    ...mapActions(['GET_ULTIMATE', 'GET_GAME_URL', 'GET_GAME_PROMO_URL', 'ROUTER_PUSH', 'NATIVE_OPEN_URL', 'WEB_OPEN_URL']),
    getUrlHandler() {
      if (this.routeData.params.id === 'loading') {
        return;
      }
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
          if (this.playId === 'IM9k5RBN' && !this.isNativeApp) {
            this.WEB_OPEN_URL(location.href.replace(this.playId, 'loading'));
          }
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
    // 更改直橫幅重新取得 url
    onMatchMeidaChange() {
      this.height = window.innerHeight;
      if (!this.playType) return;
      if (window.orientation == 90 || window.orientation == -90) {
        this.getUrlHandler();
      }
    },
    loaded() {
      this.times ? (this.times = 0) : this.times++;
    },
    textFilter(text) {
      return textFilter(text, 'layout_gameSlot_default_gameSlot_');
    },
  },
  beforeDestroy() {
    // 回復預設
    this.SET_FULL_SCREEN(false);
    this.SET_LOADING_BAR({ show: false });
    this.SET_FULL_WIDTH(false);
    this.mql.removeListener(this.onMatchMeidaChange);
  },
};
</script>
