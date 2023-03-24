<template>
  <div class="IndexContent-005" :class="contentClass" :style="contentStyle">
    <v-row class="d-flex">
      <v-col cols="8" class="content align-self-center">
        <h3 :class="h3Class">
          <span>|</span>
          {{ $t(contents.title) }}
        </h3>
        <p :class="pClass">{{ $t(contents.content) }}</p>
      </v-col>
      <v-col cols="4" class="sub-content align-self-center">
        <img class="image" :src="contents.imageSrc" />
        <v-btn color="primary" depressed class="button" @click="ROUTER_PUSH(contents.link)">
          {{ $t(contents.btnText) }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mergeArrayObjects } from '../../../../utils/index.js';
import { mapActions } from 'vuex';
export default {
  name: 'IndexContent-005',
  props: {
    contents: {
      type: Object,
      default: () => {
        return {
          title: 'g_com_indexContent_005_title',
          content: 'g_com_indexContent_005_content',
          imageSrc: require('./assets/logo.png'),
          btnText: 'g_common_gameList_betting',
          link: '/play/30n4hvJ4MGjhfY',
        };
      },
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
      default: 'grey--text  text--darken-2',
    },
    //hover效果
    hoverClass: {
      type: String,
      default: 'zoom-in-11-hover  shadow-hover',
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.IndexContent-005 {
  padding: 5%;
  height: 100%;
  &.black {
    background: url('./assets/group-18.png') no-repeat;
    background-size: cover;
  }

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
  .sub-content {
    text-align: center;
    .image {
      margin: 0 10%;
      width: 90%;
      max-width: 193px;
      max-height: 83px;
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
      color: #ffffff;
      // Hover 效果
      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.25);
        color: #000;
      }
    }
  }
}
</style>
