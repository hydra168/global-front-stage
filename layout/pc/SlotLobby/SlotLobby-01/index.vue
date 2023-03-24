<template>
  <v-container fluid class="SlotLobby-01 pa-0">
    <div>
      <v-img class="white--text align-center" :src="headerBanner"></v-img>
    </div>
    <v-container>
      <v-card class="my-5">
        <v-tabs v-model="tab" background-color="primary accent-4" centered dark icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1" class="pa-5">
            游戏厅
            <v-img src="./assets/ICG_logo.png" width="100%"></v-img>
          </v-tab>

          <v-tab href="#tab-2" class="pa-5">
            游戏厅
            <v-img src="./assets/MG_logo.png" width="100%"></v-img>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
            <v-card flat>
              <v-row row wrap>
                <v-col v-for="(item, i) in gamelist" :key="i" :cols="4">
                  <v-card @click="ROUTER_PUSH(item.link)" style="cursor: pointer" ripple class="mx-auto">
                    <v-img class="white--text" width="100%" :src="item.img">
                      <v-card-title class="controls white--text">{{ item.label }}</v-card-title>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'SlotLobby-01',
  data() {
    return {
      tab: null,
      headerBanner: require('./assets/slotLobbyBanner01.png'),
      // slotLobby: [
      //   {
      //     code: 'icg',
      //     title: '游戏厅',
      //     img: require('./assets/ICG_logo.png'),
      //     gamelist: [
      //       { label: '五媚娘', img: require('./assets/icg/icgslot01.png'), link: '/promo/slot/01' },
      //       { label: '角头', img: require('./assets/icg/icgslot02.png'), link: '/promo/slot/02' },
      //       { label: '妈祖', img: require('./assets/icg/icgslot03.png'), link: '/promo/slot/03' },
      //       { label: '给您钱', img: require('./assets/icg/icgslot04.png'), link: '/promo/slot/04' },
      //       { label: '鼠来宝', img: require('./assets/icg/icgslot05.png'), link: '/promo/slot/05' },
      //       { label: '官将首', img: require('./assets/icg/icgslot06.png'), link: '/promo/slot/06' },
      //       { label: '鼠年钱黏', img: require('./assets/icg/icgslot07.png'), link: '/promo/slot/07' },
      //       { label: '浪子回头', img: require('./assets/icg/icgslot08.png'), link: '/promo/slot/08' },
      //       { label: '媜嬛无双', img: require('./assets/icg/icgslot09.png'), link: '/promo/slot/09' },
      //       { label: '一代宗师', img: require('./assets/icg/icgslot10.png'), link: '/promo/slot/10' },
      //       { label: '火辣重庆', img: require('./assets/icg/icgslot11.png'), link: '/promo/slot/11' },
      //       { label: '沙漠骆驼', img: require('./assets/icg/icgslot12.png'), link: '/promo/slot/12' },
      //       { label: '后羿射日', img: require('./assets/icg/icgslot13.png'), link: '/promo/slot/13' },
      //       { label: '黄金选择', img: require('./assets/icg/icgslot14.png'), link: '/promo/slot/14' },
      //       { label: '枕上发', img: require('./assets/icg/icgslot15.png'), link: '/promo/slot/15' },
      //       { label: '十里桃花', img: require('./assets/icg/icgslot16.png'), link: '/promo/slot/16' },
      //       { label: '桃园结义', img: require('./assets/icg/icgslot17.png'), link: '/promo/slot/17' },
      //       { label: '唐人街探案', img: require('./assets/icg/icgslot18.png'), link: '/promo/slot/18' },
      //     ],
      //   },
      //   { code: 'mg', title: '游戏厅', img: require('./assets/MG_logo.png'), gamelist: [] },
      // ],
      gamelist: [
        { label: '五媚娘', img: require('./assets/icg/icgslot01.png'), link: '/promo/slot/01' },
        { label: '角头', img: require('./assets/icg/icgslot02.png'), link: '/promo/slot/02' },
        { label: '妈祖', img: require('./assets/icg/icgslot03.png'), link: '/promo/slot/03' },
        { label: '给您钱', img: require('./assets/icg/icgslot04.png'), link: '/promo/slot/04' },
        { label: '鼠来宝', img: require('./assets/icg/icgslot05.png'), link: '/promo/slot/05' },
        { label: '官将首', img: require('./assets/icg/icgslot06.png'), link: '/promo/slot/06' },
        { label: '鼠年钱黏', img: require('./assets/icg/icgslot07.png'), link: '/promo/slot/07' },
        { label: '浪子回头', img: require('./assets/icg/icgslot08.png'), link: '/promo/slot/08' },
        { label: '媜嬛无双', img: require('./assets/icg/icgslot09.png'), link: '/promo/slot/09' },
        { label: '一代宗师', img: require('./assets/icg/icgslot10.png'), link: '/promo/slot/10' },
        { label: '火辣重庆', img: require('./assets/icg/icgslot11.png'), link: '/promo/slot/11' },
        { label: '沙漠骆驼', img: require('./assets/icg/icgslot12.png'), link: '/promo/slot/12' },
        { label: '后羿射日', img: require('./assets/icg/icgslot13.png'), link: '/promo/slot/13' },
        { label: '黄金选择', img: require('./assets/icg/icgslot14.png'), link: '/promo/slot/14' },
        { label: '枕上发', img: require('./assets/icg/icgslot15.png'), link: '/promo/slot/15' },
        { label: '十里桃花', img: require('./assets/icg/icgslot16.png'), link: '/promo/slot/16' },
        { label: '桃园结义', img: require('./assets/icg/icgslot17.png'), link: '/promo/slot/17' },
        { label: '唐人街探案', img: require('./assets/icg/icgslot18.png'), link: '/promo/slot/18' },
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
.SlotLobby-01 {
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
