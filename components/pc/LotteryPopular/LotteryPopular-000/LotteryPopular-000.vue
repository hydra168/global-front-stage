<template>
  <ul class="lottery-popular" :class="className">
    <template v-for="(item, index) in list">
      <li class="item-container" :key="index" :class="[globalContainerClassName, item.containerClassName]">
        <slot v-bind="{ item, itemIndex: index, isSelectItem: index === selectIndex, changeSelectEvent: selectEvent }"></slot>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'LotteryPupular-000',
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
    // 容器的通用class
    globalContainerClassName: {
      type: String,
      default: '',
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
    this.selectEvent(this.startIndex);
  },
  methods: {
    selectEvent(index) {
      this.selectIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/pc/LotteryPopular/index.scss';
</style>

<style lang="scss" scoped>
.lottery-popular {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 0px;
}
.item-container {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
