<template>
  <div class="IndexContent-027" :class="contentClass" :style="contentStyle">
    <v-row>
      <v-col cols="8" class="left-side">
        <div class="sub-content py-4"></div>
      </v-col>
      <v-col cols="4" class="content align-self-center pt-2">
        <div class="sub-content-2">
          <h3 :class="h3Class">
            {{ $t(contents.title) }}
          </h3>
          <div class="divider-class"></div>
          <v-divider></v-divider>
          <template v-for="(item, index) in showContent.list">
            <div :key="index" class="list-item my-2" :class="item.class" @click="item.func || emptyfunc">
              <div class="list-item-icon">
                <img :src="item.src" width="100%" height="100%" />
              </div>
              <div class="list-item-centent">
                {{ item.content }}
              </div>
            </div>
          </template>
          <v-btn v-if="showContent.btnText" v-bind="showContent.btnoptions" @click="ROUTER_PUSH(showContent.link)">
            <v-icon aria-hidden="false"> mdi-play-circle-outline </v-icon>
            {{ $t(showContent.btnText) }}
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
  name: 'IndexContent-027',
  props: {
    contents: {
      type: Object,
      default: () => {
        return {
          title: '热门体育游戏入口',
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
        list: [
          {
            src: require('./assets/sport_icon_4.png'),
            content: '篮球',
            func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
          },
          {
            src: require('./assets/sport_icon_3.png'),
            content: '羽球',
            func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
          },
          {
            src: require('./assets/sport_icon_5.png'),
            content: '排球',
            func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
          },
          {
            src: require('./assets/sport_icon_6.png'),
            content: '足球',
            func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
          },
          {
            src: require('./assets/sport_icon_1.png'),
            content: '美式足球',
            func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
          },
          {
            src: require('./assets/sport_icon_2.png'),
            content: '棒球',
            func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
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
    emptyfunc() {
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.IndexContent-027 {
  padding: 30px 0px;
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
    background: 100% 100% / 100% 100% no-repeat url('./assets/part2_img.png');
    position: absolute;
    width: 28%;
    max-width: 500px;
    height: 150%;
    max-height: 610px;
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
  margin: 0px 50% 0px auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
.divider-class {
  height: 6px;
  width: 100%;
  background-color: white;
}
// .list-item-centent {

// }
</style>
