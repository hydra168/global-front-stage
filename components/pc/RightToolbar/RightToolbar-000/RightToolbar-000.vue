<template>
  <div :class="['right-tool-bar-modal', className, modalPosition === 'left-side' ? 'left-side-modal' : 'right-side-modal']">
    <ul :class="['right-tool-bar', listMoveClass]">
      <template v-for="(item, index) in showList">
        <li class="item-container" :key="index" :class="[globalContainerClassName, item.containerClassName]">
          <slot v-bind="{ item, itemIndex: index, isSelectItem: index === selectIndex, changeSelectEvent: selectEvent }"></slot>
        </li>
      </template>
    </ul>
    <!-- 展開按鍵 -->
    <div :class="['hide-Prop', hidePropClass]">
      <slot name="hideProp" v-bind="{ showtool: showtool }">
        <!-- 沒有slot的預設組件 -->
        <div class="hide-prop-item" @click="showtool">展开</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightToolbar-000',
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
    // 組件靠左 || 靠右
    modalPosition: {
      type: String,
      default: 'right-side',
    },
    value: {
      type: Boolean,
      default: true,
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
    hidetool() {
      this.$emit('input', false);
    },
    showtool() {
      this.$emit('input', true);
    },
    addHideFunc(list = []) {
      return list.map(element => (`${element.itemClassName}`.includes('hide-item') ? { ...element, func: () => this.hidetool() } : element));
    },
  },
  computed: {
    showList() {
      return this.addHideFunc(this.list);
    },
    listMoveClass() {
      if (this.value) {
        return null;
      }
      return this.modalPosition === 'left-side' ? 'left-side-modal-hide' : 'right-side-modal-hide';
    },
    hidePropClass() {
      if (this.value) {
        return this.modalPosition === 'left-side' ? 'left-side-hide-prop-hide left-side-hide-Prop' : 'right-side-hide-prop-hide right-side-hide-Prop';
      }
      return this.modalPosition === 'left-side' ? 'left-side-hide-Prop' : 'right-side-hide-Prop';
    },
  },
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/pc/RightToolBar/index.scss';
</style>

<style lang="scss" scoped>
.right-tool-bar-modal {
  position: fixed;
  top: 50%;
  transform: translate(0%, -50%);
  z-index: 2000;
}
.left-side-modal {
  left: 0%;
}
.right-side-modal {
  right: 0%;
}
.left-side-modal-hide {
  transform: translate(-100%, 0%);
}
.right-side-modal-hide {
  transform: translate(100%, 0%);
}
.right-tool-bar {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 12px;
  transition: all 1s;
  z-index: 2002;
}
.item-container {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hide-Prop {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  transition: all 1s;
  z-index: 2001;
}
.left-side-hide-Prop {
  left: 0%;
}
.right-side-hide-Prop {
  right: 0%;
}
.left-side-hide-prop-hide {
  transform: translate(-100%, -50%);
}
.right-side-hide-prop-hide {
  transform: translate(100%, -50%);
}
.hide-prop-item {
  padding: 24px 12px;
  background-color: grey;
  color: white;
  writing-mode: vertical-rl;
}
</style>
