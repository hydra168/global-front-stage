<template>
  <div class="IndexContent-006" :class="contentClass" :style="contentStyle">
    <v-row class="d-flex">
      <v-col cols="4" class="sub-content align-self-center">
        <img class="img1" :src="contentsData.imageSrc1" :style="contentsData.imageStyle1" />
      </v-col>
      <v-col cols="4" class="content text-center align-self-center">
        <h3 :class="h3Class">{{ $t(contentsData.title) }}</h3>
        <p :class="pClass" v-html="$t(contentsData.content)"></p>
        <v-btn color="primary" class="button" depressed :class="[hoverClass]" @click="ROUTER_PUSH(contentsData.link)">
          <v-icon large class="mr-2" color="white">{{ contentsData.icon }}</v-icon>
          {{ $t(contentsData.btnText) }}
        </v-btn>
      </v-col>
      <v-col cols="4" class="sub-content d-flex align-self-center`">
        <img class="img2" :src="contentsData.imageSrc2" :style="contentsData.imageStyle2" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'IndexContent-006',
  props: {
    contents: {
      type: Object,
    },
    contentClass: {
      type: String,
      default: 'white',
    },
    contentStyle: {
      type: Object,
    },
    h3Class: {
      type: String,
      default: 'black--text',
    },
    pClass: {
      type: String,
      default: 'black--text',
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'zoom-in-11-hover  shadow-hover',
    },
  },
  data() {
    return {
      defaultContents: {
        title: 'g_com_indexContent_006_title',
        content: 'g_com_indexContent_006_content',
        imageSrc1: require('./assets/01.png'),
        imageStyle1: {},
        imageSrc2: require('./assets/02.png'),
        imageStyle2: { opacity: 1 },
        btnText: 'g_com_indexContent_006_btn_text',
        icon: 'phone_iphone',
        iconSrc: require('./assets/icon.png'),
        link: '/appdownload',
      },
    };
  },
  computed: {
    contentsData() {
      return Object.assign(this.defaultContents, this.contents);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.IndexContent-006 {
  padding: 5%;

  &.black {
    // 需要再優化 改由props傳入
    background: url('./assets/group-19.png') no-repeat;
    background-size: cover;
  }
  h3 {
    font-family: PingFangSC;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.07px;
    margin-bottom: 10px;
  }
  p {
    font-family: PingFangSC;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0px;
  }
  .button {
    margin-top: 20px;
    min-width: 190px;
    height: 55px;

    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.52px;
    text-align: center;
    color: #ffffff;
    .icon {
      max-width: 22px;
      max-height: 34px;
      margin-right: 10px;
    }
  }

  .sub-content {
    text-align: center;
    padding: 5%;
    width: 100%;
    .img1 {
      width: 100%;
      max-width: 258px;
      max-height: 176px;
    }
    .img2 {
      width: 100%;
      max-width: 220px;
      max-height: 220px;
    }
  }
}
</style>
