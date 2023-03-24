<template>
  <div class="IndexContent-026" :class="contentClass" :style="contentStyle">
    <v-row>
      <v-col cols="5" class="left-side">
        <div class="sub-content py-4">
          <template v-for="(imgData, index) in showContent.imgList">
            <img :key="`img-${index}`" :src="imgData.src" :style="imgData.style" class="pa-2" />
          </template>
          <template v-for="(textData, index) in showContent.textList">
            <div :key="`text-${index}`" :class="textData.className" class="pa-2" :style="textData.style">
              {{ textData.content }}
            </div>
          </template>
          <template v-for="(btnData, index) in showContent.btnList">
            <v-btn :key="`btn-${index}`" class="button" @click="btnData.func" v-bind="btnData.options">
              {{ $t(btnData.text) }}
            </v-btn>
          </template>
        </div>
      </v-col>
      <v-col cols="7" class="content align-self-center pt-2 pl-16">
        <img class="image" :src="contents.imageSrc" />
        <h3 :class="h3Class">
          <span>|</span>
          {{ $t(contents.title) }}
        </h3>
        <p class="content-content-class" :class="pClass">{{ $t(contents.content) }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mergeArrayObjects } from '../../../../utils/index.js';
import { mapActions } from 'vuex';
export default {
  name: 'IndexContent-026',
  props: {
    contents: {
      type: Object,
      default: () => {
        return {
          title: 'g_com_indexContent_005_title',
          content: 'g_com_indexContent_005_content',
          imageSrc: require('./assets/logo.png'),
          btnText: 'g_common_gameList_betting',
          link: '/play/cssports',
        };
      },
    },
    contentClass: {
      type: String,
      default: 'secondary',
    },
    contentStyle: {
      type: Object,
    },
    h3Class: {
      type: String,
      default: 'primary--text pt-2',
    },
    pClass: {
      type: String,
      default: 'grey--text  text--darken-2',
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'zoom-in-11-hover  shadow-hover',
    },
  },
  data() {
    return {
      defaultContent: {
        imgList: [
          {
            src: require('./assets/part1_h5_icon.png'),
            // style: {
            //   order: 0
            // },
          },
          {
            src: require('./assets/part1_img.png'),
            // style: {
            //   order: 0
            // },
          },
        ],
        textList: [
          {
            content: '随时随地，手机投注',
            // style: {
            //   order: 0
            // },
          },
          {
            content: '- 全面支持HTML5 -',
            // style: {
            //   order: 0
            // },
          },
        ],
        btnList: [
          {
            func: () => this.ROUTER_PUSH('appdownload'),
            text: '手机下载',
            options: {
              color: 'white',
              outlined: true,
            },
            // style: {
            //   order: 0
            // },
          },
        ],
      },
    };
  },
  computed: {
    showContent() {
      return {
        ...this.defaultContent,
        ...this.contents,
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.IndexContent-026 {
  padding: 130px 0px;
  height: 100%;
  h3 {
    font-family: PingFangSC;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    margin-bottom: 20px;
    span {
      margin-right: 5px;
    }
  }
  p {
    font-family: PingFangSC;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.72;
    letter-spacing: normal;
  }
  .left-side {
    position: relative;
  }
  .sub-content {
    background: 100%/100% url('./assets/part1_abg.png');
    position: absolute;
    width: 18.75vw;
    max-width: 360px;
    height: 27vw;
    max-height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    bottom: 10px;
    right: 10px;
    color: white;
  }
  .button {
    margin-top: 20px;
    width: 190px;
    height: 55px;

    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.52px;
    text-align: center;
    // Hover 效果
    &:hover {
      transform: scale(1.1);
      transition: all 0.5s;
      box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.25);
    }
  }
  .image {
    max-width: 160px;
    max-height: 70px;
  }
}
.content-content-class {
  max-width: 630px;
}
</style>
