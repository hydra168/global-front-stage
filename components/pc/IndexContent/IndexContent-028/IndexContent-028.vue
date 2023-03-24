<template>
  <div class="IndexContent-028" :class="contentClass" :style="contentStyle">
    <v-row>
      <v-col cols="6" class="left-side">
        <div class="sub-content py-4"></div>
      </v-col>
      <v-col cols="6" class="content align-self-center pt-2">
        <div class="sub-content-2">
          <h3 :class="h3Class">
            <div class="list-title"></div>
            {{ $t(contents.title) }}
          </h3>
          <template v-for="(item, index) in showContent.list">
            <div :key="index" class="my-1 d-flex align-center" :class="item.className">
              <div :class="`list-${item.listclass}`"></div>
              {{ item.content }}
            </div>
          </template>
          <v-btn v-bind="showContent.btnoptions" @click="ROUTER_PUSH(showContent.link)">
            <v-icon aria-hidden="false"> mdi-play-circle-outline </v-icon>
            {{ $t(contents.btnText) }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mergeArrayObjects } from '../../../../utils/index.js';
import { mapActions } from 'vuex';
export default {
  name: 'IndexContent-028',
  props: {
    contents: {
      type: Object,
      default: () => {
        return {
          title: '彩票旗舰站',
          btnText: 'g_common_gameList_betting',
          link: '/play/cssports',
          btnoptions: {
            class: 'button',
            color: 'secondary',
          },
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
      default: 'white--text pt-2 d-flex align-center',
    },
    // pClass: {
    //   type: String,
    //   default: 'grey--text  text--darken-2',
    // },
    //hover效果
    // hoverClass: {
    //   type: String,
    //   default: 'zoom-in-11-hover  shadow-hover',
    // },
  },
  data() {
    return {
      defaultContent: {
        list: [
          {
            content: '玩法齐全',
            className: '',
          },
          {
            content: '多种玩法，支持元角分，官方开奖公正公平！',
            className: '',
          },
          {
            content: '',
            className: '',
          },
          {
            content: '100%安心娱乐',
            className: '',
          },
          {
            content: '全球顶级硬件安全设备保护资金信息安全， 平台快速稳定！',
            className: '',
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
.IndexContent-028 {
  padding: 75px 0px;
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
    background: 100% 100% / 100% 100% no-repeat url('./assets/part3_img.png');
    position: absolute;
    width: 100%;
    max-width: 760px;
    height: calc((100% + 150px) * 1.2);
    max-height: 550px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    bottom: -18px;
    right: -4%;
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
.sub-content-2 {
  margin: 0px 40% 0px auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-item {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.list-item-icon {
  width: 28px;
  height: 28px;
}
// .list-item-centent {

// }
.list-title {
  width: 13px;
  height: 13px;
  margin: 10px;
  transform: rotate(-315deg);
  background-color: #ffdb00;
}
.list-sub-title {
  width: 9px;
  height: 9px;
  margin: 10px;
  background-color: #ffdb00;
  border-radius: 50%;
}
</style>
