<template>
  <div class="IndexContent-010" :style="`background-image:url(${main__background})`">
    <div class="popular__title d-flex justify-center align-center">
      <div class="popular__title__text1" :style="text1Color">
        <span>{{ $t(popularTitleText1) }}</span>
        <img src="./assets/title.png" />
      </div>
    </div>
    <div class="flex__center">
      <div v-for="item in dataList" :key="item.id">
        <div class="ml-10 mr-10 content__box">
          <div class="flex__center pa-10"><img :src="item.bg" alt="" /></div>
          <div class="flex__center text01 mb-5">{{ $t(item.text01) }}</div>
          <div class="text02" style="width: 220px; margin: auto">{{ $t(item.text02) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexContent-010',
  props: {
    main__background: {
      type: String,
      default: '',
    },
    popularTitleText1: {
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
          bg: require('./assets/bg01.png'),
          text01: 'g_com_indexContent_010_dataList1_text01',
          text02: 'g_com_indexContent_010_dataList1_text02',
        },
        {
          bg: require('./assets/bg02.png'),
          text01: 'g_com_indexContent_010_dataList2_text01',
          text02: 'g_com_indexContent_010_dataList2_text02',
        },
        {
          bg: require('./assets/bg03.png'),
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
    text-align: center;
    font-size: 36px;
    font-weight: 600;
  }
  &__text2 {
    text-align: center;
    font-size: 24px;
  }
}
</style>
