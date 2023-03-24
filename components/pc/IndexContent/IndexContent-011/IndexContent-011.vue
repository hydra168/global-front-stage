<template>
  <div class="IndexContent-011 text-center" :style="IndexContentStyle">
    <div class="content text-center" :class="contentClass">
      <v-row class="">
        <!-- LOTTERY -->
        <v-col class="d-flex flex-column align-end justify-end col-5 text-right lottery" :class="lotteryClass">
          <h3 class="lottery-title">{{ $t(titleText) }}</h3>
          <p class="app_download text-center zoom-in-11-hover shiny-hover" @click="ROUTER_PUSH(app.routeLink)">
            {{ $t('g_com_indexContent_011_app_download') }}
          </p>
          <div class="image">
            <img class="img" src="./assets/pc-mobile.png" />
          </div>
          <div class="lottery-content text-h5">
            <p v-html="$t(lotteryContentText)" />
          </div>
          <p class="lottery-sub-content text-h6" v-html="$t('g_com_indexContent_011_sub_content')" />
        </v-col>

        <!-- game -->
        <v-col class="col-7 text-left game d-flex">
          <div
            class="show-game"
            v-for="(item, index) in lotteryList"
            :key="index"
            :style="{ 'background-image': `url(${item.src})` }"
            @click="ROUTER_PUSH(item.link)"
          >
            <p class="sub_title white--text">{{ $t(item.title) }}</p>
            <div class="game_start d-flex flex-column align-center">
              <p class="text-center">{{ $t('g_com_indexContent_011_play_now') }}</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'IndexContent-011',
  props: {
    IndexContentStyle: {
      type: Object,
      default: () => {
        return {
          'background-color': '#161616',
        };
      },
    },
    contentClass: {
      type: String,
      default: 'black',
    },
    lotteryClass: {
      type: String,
      default: 'white--text',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    titleText: {
      type: String,
      default: 'g_com_indexContent_011_title',
    },
    lotteryContentText: {
      type: String,
      default: 'g_com_indexContent_011_content',
    },
  },
  data() {
    return {
      app: {
        routeLink: 'appdownload',
      },
      defaultLotteryList: [
        {
          sort: 1,
          show: true,
          code: 'lottery',
          title: 'g_com_indexContent_011_gameList1_title',
          name: 'ultimate',
          link: 'ultimate',
          src: require('./assets/group-17.png'),
        },
        {
          sort: 2,
          show: true,
          code: 'sports',
          title: 'g_com_indexContent_011_gameList2_title',
          name: 'cssports',
          link: 'play/30n4hvJ4MGjhfY',
          src: require('./assets/group-15.png'),
        },
      ],
    };
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.IndexContent-011 {
  height: 554px;
  .content {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // background-attachment: fixed;
    background-image: url('./assets/bg-001.png');
    .lottery {
      margin-top: 20px;
      .lottery-title {
        font-family: Phosphate-Solid;
        font-size: 60px;
        font-style: bold;
        border-bottom: 10px #ff0000 solid;
      }
      .app_download {
        min-width: 100px;
        margin-top: 20px;
        cursor: pointer;
        border: white 1px solid;
        padding: 5px 10px;
      }
      .app {
        margin-top: 20px;
        cursor: pointer;
      }
      .image {
        margin-top: 20px;
      }
      .lottery-content {
        font-family: RTWSYaYuanG0v1;
        letter-spacing: 1.51px;
        text-align: right;
      }
      .lottery-sub-content {
        margin-right: 70px;

        font-weight: 600;
        letter-spacing: 0px;
      }
    }
    .game {
      margin-top: 40px;
      padding-top: 70px;
      padding-left: 60px;
      background-repeat: no-repeat;
      background-position: 30px 30px;
      background-image: url('./assets/bg-002.png');
      .show-game {
        cursor: pointer;
        width: 327px;
        height: 328px;
        // background-color: #000000;
        .sub_title {
          margin-left: 20px;
          margin-top: 20px;

          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0px;
        }
        .game_start {
          position: relative;
          top: 40%;
          p {
            display: none;
            min-width: 100px;
            margin-top: 20px;
            padding: 5px 10px;
            background-color: #ff0000;
          }
        }
        // hover效果
        &:hover {
          border: #e02020 10px solid;
          filter: brightness(110%);
          transform: scale(1.1);
          transition: all 0.5s;
          .game_start p {
            display: block;
          }
        }
      }
    }
  }
}
</style>
