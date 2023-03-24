<template>
  <v-bottom-navigation class="bottomNavigation-class" v-if="!fullscreen" :class="className" v-bind="navigationOption" v-model="selectIndex">
    <template v-for="(item, index) in list">
      <v-btn
        class="item-container"
        :key="index"
        :class="[globalBtnClassName, item.btnClassName]"
        :value="index"
        v-bind="{ ...globalBtnOption, ...item.btnOption }"
        @click="handItemClick({ func: item.func, funcOption: item.funcOption })"
      >
        <slot v-bind="{ item, itemIndex: index, isSelectItem: index === selectIndex }"></slot>
      </v-btn>
    </template>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'bottomNavigation-000',
  props: {
    navigationOption: {
      type: Object,
      default: () => ({
        dark: false,
        app: true,
        activeClass: 'primary white--text',
      }),
    },
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
    globalBtnClassName: {
      type: String,
      default: '',
    },
    // 按鍵的通用屬性
    globalBtnOption: {
      type: Object,
      default: () => ({}),
    },
    // 起始按鍵選擇index值
    startIndex: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters(['fullscreen']),
  },
  data() {
    return {
      selectIndex: null,
    };
  },
  watch: {
    startIndex(newValue, oldValue) {
      this.selectIndex = newValue;
    },
  },
  mounted() {
    this.selectIndex = this.startIndex;
  },
  methods: {
    // 按鍵點擊時會使用的事件
    handItemClick({ func = f => f, funcOption = {} }) {
      func(funcOption);
    },
  },
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/mobile/BottomNavigation/index.scss';
</style>
<style lang="scss" scoped>
:deep(.v-btn) {
  min-width: unset !important;
  height: auto !important;
  &.v-btn--active:before {
    opacity: 0;
  }
}
</style>
