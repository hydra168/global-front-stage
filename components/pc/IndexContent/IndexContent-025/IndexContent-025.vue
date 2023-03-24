<template>
  <div class="IndexContent-025 mb-10" :style="`background-image:url(${main__background})`">
    <div class="container">
      <div class="about-area">
        <div class="about-us">{{ leftside.content1 }}</div>
        <div class="dash-line">{{ leftside.content2 }}</div>
        <v-btn class="group-btn-btn" @click="ROUTER_PUSH(leftside.link)">{{ leftside.btnContent }}</v-btn>
      </div>
      <template v-for="item in dataList">
        <div :key="item.id" class="pa-3 content__box">
          <div class="flex__center"><img :src="item.bg" alt="" class="bg-img" /></div>
          <div class="flex__center pa-5"><img :src="item.icon" alt="" class="icon-img" /></div>
          <div class="flex__center text01 mb-5">{{ $t(item.text01) }}</div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'IndexContent-025',
  props: {
    main__background: {
      type: String,
      default: '',
    },
    popularText1Color: {
      type: String,
      default: '#000000',
    },
    popularText2Color: {
      type: String,
      default: '#A7A7A7',
    },
    leftdata: {
      type: Object,
      default: () => ({
        content1: '关于我们',
        content2: '-------',
        btnContent: '了解更多',
        link: '/helpCentre/about',
      }),
    },
    dataList: {
      type: Array,
      default: () => [
        {
          bg: require('./assets/bg01.png'),
          icon: require('./assets/icon01.png'),
          text01: 'g_com_indexContent_010_dataList2_text01',
        },
        {
          bg: require('./assets/bg02.png'),
          icon: require('./assets/icon02.png'),
          text01: 'g_com_indexContent_010_dataList3_text01',
        },
        {
          bg: require('./assets/bg03.png'),
          icon: require('./assets/icon03.png'),
          text01: 'g_com_indexContent_010_dataList1_text01',
        },
        {
          bg: require('./assets/bg04.png'),
          icon: require('./assets/icon04.png'),
          text01: 'g_com_indexContent_010_dataList4_text01',
        },
      ],
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
  computed: {
    text1Color() {
      return {
        color: `${this.popularText1Color}`,
      };
    },
    text2Color() {
      return {
        color: `${this.popularText2Color}`,
      };
    },
    defaultLeftData() {
      return {
        content1: '关于我们',
        content2: '-------',
        btnContent: '了解更多',
        link: '/helpCentre/about',
      };
    },
    leftside() {
      return {
        ...this.defaultLeftData,
        ...this.leftdata,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.flex__center {
  display: flex;
  justify-content: center;
}
.content__box {
  width: 15%;
  box-shadow: 2px 3px 3px 2px #cccccc;
}
.text01 {
  font-size: 24px;
  font-weight: bold;
}
.text02 {
  font-size: 16px;
}
.popular__title {
  padding-top: 50px;
  &__text1 {
    text-align: center;
    font-size: 36px;
    font-weight: 600;
  }
  &__text2 {
    text-align: center;
    font-size: 24px;
  }
}
.about-area {
  width: 15%;
  font-size: 30px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid #9e9e9e;
  button {
    color: var(--v-primary-base);
  }
}
.bg-img {
  height: 75px;
  object-fit: contain;
}
.icon-img {
  width: 100%;
  object-fit: contain;
}
</style>
