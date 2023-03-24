<template>
  <div class="IndexContent-007 mb-10">
    <div class="popular__title">
      <div class="popular__title__text1" :style="text1Color">
        <span>{{ $t(popularTitleText1) }}</span>
      </div>
    </div>
    <div class="d-flex justify-center">
      <div v-for="item in dataList" :key="item.id">
        <div :style="text2Color">
          <div class="pa-10">
            <img width="100%" :src="item.bg" alt="" />
          </div>
          <div class="d-flex justify-center mb-5">
            <v-icon large color="primary">{{ item.icon }}</v-icon>
          </div>
          <div class="d-flex justify-center text01 mb-5">
            <span>{{ $t(item.text01) }}</span>
          </div>
          <div class="text02" style="width: 220px; margin: auto">{{ $t(item.text02) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexContent-007',
  props: {
    popularTitleText1: {
      type: String,
      default: 'g_com_indexContent_007_popular_title_text1',
    },
    popularText1Color: {
      type: String,
      default: '#4080FF',
    },
    popularText2Color: {
      type: String,
      default: '#000',
    },
    dataList: {
      type: Array,
      default: () => [
        {
          bg: require('./assets/img/bg03.png'),
          icon: 'stars',
          text01: 'g_com_indexContent_007_dataList1_text01',
          text02: 'g_com_indexContent_007_dataList1_text02',
        },
        {
          bg: require('./assets/img/bg01.png'),
          icon: 'security',
          text01: 'g_com_indexContent_007_dataList2_text01',
          text02: 'g_com_indexContent_007_dataList2_text02',
        },
        {
          bg: require('./assets/img/bg02.png'),
          icon: 'phone_iphone',
          text01: 'g_com_indexContent_007_dataList3_text01',
          text02: 'g_com_indexContent_007_dataList3_text02',
        },
        {
          bg: require('./assets/img/bg04.png'),
          icon: 'flash_on',
          text01: 'g_com_indexContent_007_dataList4_text01',
          text02: 'g_com_indexContent_007_dataList4_text02',
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
    padding-top: 20px;
    font-size: 24px;
  }
}
</style>
