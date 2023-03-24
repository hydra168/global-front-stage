<template>
  <div class="IndexContent-017">
    <div class="popular__title">
      <div class="popular__title__text1" :style="text1Color">
        <span>{{ $t(popularTitleText1) }}</span>
      </div>
    </div>
    <div class="flex__center">
      <div v-for="item in dataList" :key="item.id">
        <div>
          <div class="flex__center pa-5"><img :src="item.bg" alt="" /></div>
          <div class="flex__center text01 mb-3">{{ $t(item.text01) }}</div>
          <div class="flex__center mt-5 mb-5">
            <v-icon v-bind="listIconBind">{{ item.vicon }}</v-icon>
          </div>
          <div class="flex__center text02 mb-2">{{ $t(item.text02) }}</div>
          <div class="text03" style="width: 220px; margin: auto">{{ $t(item.text03) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexContent-017',
  props: {
    popularTitleText1: {
      type: String,
      default: 'g_com_indexContent_017_popular_title',
    },
    popularText1Color: {
      type: String,
      default: '#4080FF',
    },
    popularText2Color: {
      type: String,
      default: '#C7C7C7',
    },
    listIconBind: {
      type: Object,
      default: () => {
        return {
          large: true,
          color: 'primary',
        };
      },
    },
    dataList: {
      type: Array,
      default: () => [
        {
          bg: require('./assets/bg03.png'),
          vicon: 'stars',
          text01: 'g_com_indexContent_017_dataList1_text01',
          text02: 'g_com_indexContent_017_dataList1_text02',
          text03: 'g_com_indexContent_017_dataList1_text03',
        },
        {
          bg: require('./assets/bg01.png'),
          vicon: 'security',
          text01: 'g_com_indexContent_017_dataList2_text01',
          text02: 'g_com_indexContent_017_dataList2_text02',
          text03: 'g_com_indexContent_017_dataList2_text03',
        },
        {
          bg: require('./assets/bg02.png'),
          vicon: 'phone_iphone',
          text01: 'g_com_indexContent_017_dataList3_text01',
          text02: 'g_com_indexContent_017_dataList3_text02',
          text03: 'g_com_indexContent_017_dataList3_text03',
        },
        {
          bg: require('./assets/bg04.png'),
          vicon: 'flash_on',
          text01: 'g_com_indexContent_017_dataList4_text01',
          text02: 'g_com_indexContent_017_dataList4_text02',
          text03: 'g_com_indexContent_017_dataList4_text03',
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
.text03 {
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
