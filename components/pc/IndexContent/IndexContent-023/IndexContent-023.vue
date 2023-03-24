<template>
  <div class="IndexContent-023" :style="`background-image:url(${main__background})`">
    <div class="popular__title d-flex justify-center align-center flex-column mb-7">
      <div class="popular__title__text1" :style="text1Color">
        <div class="left mr-3"></div>
        <span class="primary--text">{{ $t(popularTitleText1) }}</span>
        <div class="right ml-3"></div>
      </div>
      <div class="popular__title__text2" :style="text1Color">
        <span class="primary--text">{{ $t(popularTitleText2) }}</span>
      </div>
    </div>
    <div class="flex__center align-stretch">
      <div v-for="item in dataList" :key="item.id" class="d-flex align-stretch">
        <div
          class="ml-10 mr-10 content__box translateYT20-hover pb-10"
          :style="`background-image:url(${sub__background});background-size: 100% 100%;`"
        >
          <div class="flex__center pa-10">
            <div class="d-flex justify-center align-center" :style="`height:100px;width:200px;`">
              <img :src="item.bg" alt="" :width="`100px`" />
            </div>
          </div>
          <div class="flex__center text01 mb-5">{{ $t(item.text01) }}</div>
          <div class="text02" style="width: 220px; margin: auto">{{ $t(item.text02) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexContent-023',
  props: {
    main__background: {
      type: String,
      default: '',
    },
    sub__background: {
      type: String,
      default: '',
    },
    popularTitleText1: {
      type: String,
      default: 'g_com_indexContent_010_popular_title',
    },
    popularTitleText2: {
      type: String,
      default: 'g_com_indexContent_010_popular_title',
    },
    popularText1Color: {
      type: String,
      default: '#000000',
    },
    popularText2Color: {
      type: String,
      default: '#A7A7A7',
    },
    dataList: {
      type: Array,
      default: () => [
        {
          bg: require('./assets/bg03.png'),
          text01: 'g_com_indexContent_010_dataList1_text01',
          text02: 'g_com_indexContent_010_dataList1_text02',
        },
        {
          bg: require('./assets/bg01.png'),
          text01: 'g_com_indexContent_010_dataList2_text01',
          text02: 'g_com_indexContent_010_dataList2_text02',
        },
        {
          bg: require('./assets/bg02.png'),
          text01: 'g_com_indexContent_010_dataList3_text01',
          text02: 'g_com_indexContent_010_dataList3_text02',
        },
        {
          bg: require('./assets/bg04.png'),
          text01: 'g_com_indexContent_010_dataList4_text01',
          text02: 'g_com_indexContent_010_dataList4_text02',
        },
      ],
    },
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
  },
};
</script>
<style lang="scss" scoped>
.flex__center {
  display: flex;
  justify-content: center;
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
    display: inline-flex;
    align-items: center;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
  }
  &__text2 {
    text-align: center;
    font-size: 18px;
  }
}
.left {
  background-image: url('./assets/frame.png');
  background-size: 100% 100%;
  width: 150px;
  height: 30px;
}
.right {
  background-image: url('./assets/frame.png');
  background-size: 100% 100%;
  width: 150px;
  height: 30px;
  transform: rotateY(180deg);
}
</style>
