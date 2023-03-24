<template>
  <div class="IndexContent-016" :style="`background-color:${backgroundColor}`">
    <div class="popular__title d-flex justify-center align-center">
      <div class="popular__title__text1" :style="text1Color">
        <span>{{ $t(popularTitleText1) }}</span>
      </div>
    </div>
    <div class="flex__center">
      <div class="box__style" v-for="item in dataList" :key="item.id">
        <div class="ml-10 mr-10 content__box">
          <div class="flex__center pa-10">
            <v-icon v-bind="listIconBind">{{ item.icon }}</v-icon>
          </div>
          <div class="flex__center text01 mb-5">{{ $t(item.text01) }}</div>
          <div class="text02">{{ $t(item.text02) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexContent-016',
  props: {
    backgroundColor: {
      type: String,
      default: '#FFFBEA',
    },
    popularTitleText1: {
      type: String,
      default: 'g_com_indexContent_016_popular_title',
    },
    popularText1Color: {
      type: String,
      default: '#000000',
    },
    popularText2Color: {
      type: String,
      default: '#A7A7A7',
    },
    listIconBind: {
      type: Object,
      default: () => {
        return {
          xLarge: true,
          color: 'brown',
        };
      },
    },
    dataList: {
      type: Array,
      default: () => [
        {
          icon: 'stars',
          text01: 'g_com_indexContent_016_list1_name',
          text02: 'g_com_indexContent_016_list1_text',
        },
        {
          icon: 'security',
          text01: 'g_com_indexContent_016_list2_name',
          text02: 'g_com_indexContent_016_list2_text',
        },
        {
          icon: 'phone_iphone',
          text01: 'g_com_indexContent_016_list3_name',
          text02: 'g_com_indexContent_016_list3_text',
        },
        {
          icon: 'flash_on',
          text01: 'g_com_indexContent_016_list4_name',
          text02: 'g_com_indexContent_016_list4_text',
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
  writing-mode: vertical-lr;
  text-orientation: mixed;
  width: 40px;
  min-height: 150px;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #b28106;
  padding: 10px;
  display: flex;
  align-items: center;
}
.text02 {
  font-size: 16px;
  width: 160px;
  margin: auto;
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
.box__style {
  background-color: #fffcf4;
  border: 1px solid #979797;
  position: relative;
  padding-bottom: 20px;
  padding-left: 20px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
