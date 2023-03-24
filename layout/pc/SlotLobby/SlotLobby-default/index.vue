<template>
  <v-container fluid class="pa-0">
    <div>
      <v-img class="white--text align-end" :src="areas.headerBanner"></v-img>
    </div>

    <v-container class="my-10">
      <v-row row wrap v-scroll="onScroll" justify="center">
        <v-col v-for="(item, i) in filterGames" :key="i" @click="$router.push('/play/' + item.link)" :cols="2">
          <v-card ripple class="mx-auto item" style="cursor: pointer">
            <v-img class="white--text align-end" height="150px" :src="require(`@IMG/slotIcons/${item.picture}`)">
              <v-card-title class="v-carousel__controls white--text">{{ item.name }}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>

      <div class="py-2 mx-auto text-center my-8" v-if="show != 0">
        <v-progress-circular v-if="show == 1" :width="3" indeterminate color="primary"></v-progress-circular>
        <h5 class="text-md-center title" v-if="show == 2">{{ textFilter('noMore') }}</h5>
      </div>

      <v-btn color="red" dark bottom right fab fixed v-show="goTop" @click="toTop">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-container>

    <!-- <div class="py-2">
      <v-img class="white--text align-end" :src="areas.footerBanner"></v-img>
    </div> -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'slotLobby',
  data() {
    return {
      areas: {
        headerBanner: require('./assets/slotLobbyBanner01.png'),
        footerBanner: require('./assets/slotLobbyBanner02.png'),
      },
      games: [],
      total: 0,
      offsetTop: 0,
      show: 0, // 1:取得更多 2:沒有更多
      countOfPage: 30,
      currPage: 1,
      filter_name: '',
      goTop: false,
    };
  },
  computed: {
    ...mapGetters(['gameSlotList']),
    filterGames() {
      const self = this;
      self.show = 0;
      let filterd = this.games.filter(game => {
        if (self.filter_name == '' || self.filter_name == null) {
          return true;
        }
        return game.name.indexOf(self.filter_name) !== -1;
      });
      self.total = filterd.length;
      if (self.total > 0 && self.total <= self.countOfPage) {
        self.show = 2;
      }
      return filterd;
    },
    totalPage() {
      const self = this;
      if (self.filter_name == '' || self.filter_name == null) {
        return Math.ceil(self.games.length / self.countOfPage);
      } else {
        self.currPage = 1;
        self.toTop();
        return Math.ceil(self.total / self.countOfPage);
      }
    },
  },
  watch: {
    gameSlotList(data) {
      this.games = data;
      this.total = data.length;
      this.show = 1;
    },
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
    this.show = 1;
  },
  async created() {
    await this.GET_GAME_SLOT_LIST(); // 取得電子遊藝列表
  },
  methods: {
    ...mapMutations(['SET_FULL_WIDTH']),
    ...mapActions(['GET_GAME_SLOT_LIST', 'ROUTER_PUSH']),
    toTop() {
      this.$vuetify.goTo(0, {
        duration: 100,
        offset: 0,
        easing: 'easeInOutCubic',
      });
    },
    setPage: function (idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return;
      }
      this.currPage = idx;
    },
    getScrollHeight() {
      let scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0,
        bSH,
        dSH;
      if (document.body) {
        let bSH = document.body.scrollHeight;
      }
      if (document.documentElement) {
        let dSH = document.documentElement.scrollHeight;
      }
      scrollHeight = bSH - dSH > 0 ? bSH : dSH;
      return scrollHeight;
    },
    onScroll(e) {
      const $this = this;
      const windowHeight = document.documentElement.clientHeight;
      $this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      if (windowHeight + $this.offsetTop == $this.getScrollHeight()) {
        if ($this.currPage == $this.totalPage) return;
        $this.show = 1;
        setTimeout(function () {
          if ($this.currPage < $this.totalPage) {
            $this.setPage(++$this.currPage);
            $this.show = 0;
          } else {
            $this.show = 2;
          }
        }, 500);
      } else {
        $this.goTop = false;
      }
      if (windowHeight < $this.offsetTop) {
        $this.goTop = true;
      }
    },
    textFilter(text) {
      return textFilter(text, 'layout_slotLobby_default_index_');
    },
  },
  beforeDestroy() {
    // 回復預設
    this.SET_FULL_WIDTH(false);
  },
};
</script>
<style lang="scss">
.home-wrap {
  background-color: black;
}
// hover效果
.item:hover .v-carousel__controls {
  height: 100%;
  color: white;
  transition-duration: 600ms;
}
</style>
