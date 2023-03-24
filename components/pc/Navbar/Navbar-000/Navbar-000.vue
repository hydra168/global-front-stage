<template>
  <aside class="narbar-class" :class="className">
    <template v-for="(item, index) in list">
      <v-btn
        class="item-container"
        :key="index"
        :class="[globalContainerClassName, item.btnClassName]"
        :value="index"
        v-bind="{ ...defaultBtnProps, ...globalContainerOption, ...item.btnOption }"
        @click="handItemClick({ func: item.func, funcOption: item.funcOption, index })"
      >
        <slot v-bind="{ item, itemIndex: index, isSelectItem: index === selectIndex }"></slot>
      </v-btn>
    </template>
  </aside>
</template>

<script>
export default {
  name: 'NavBar-000',
  props: {
    // 資料列表
    list: {
      type: Array,
      default: () => [
        {
          containerClass: '',
        },
      ],
    },
    // 組件的class
    className: {
      type: String,
      default: '',
    },
    // 按鍵的通用class
    globalContainerClassName: {
      type: String,
      default: '',
    },
    // 按鍵的通用屬性
    globalContainerOption: {
      type: Object,
      default: () => ({}),
    },
    // 起始按鍵選擇index值
    startIndex: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      selectIndex: null,
      defaultBtnProps: {
        dark: true,
        text: true,
      },
    };
  },
  watch: {
    startIndex(newValue, oldValue) {
      if (oldValue === null) {
        this.selectIndex = newValue;
      }
    },
  },
  mounted() {
    this.selectIndex = this.startIndex;
  },
  methods: {
    // 按鍵點擊時會使用的事件
    handItemClick({ func = f => f, funcOption = {}, index }) {
      this.selectIndex = index;
      func(funcOption);
    },
  },
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/pc/Navbar/index.scss';
// 共用的CSS設定
// 父組件的設定
.narbar-class {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
}
.item-container {
  flex: 0 0 auto;
}
.item-container.v-size--default {
  height: auto;
  padding: 0px 0px 0px 0px;
}
</style>
