<template>
  <div
    class="item"
    :class="[
      globalItemClassName,
      item.itemClassName,
      isSelectItem ? 'select-item' : '',
      isSelectItem ? globalItemSelectClassName : '',
      isSelectItem ? item.itemSelectClassName : '',
    ]"
    @click="handItemClick({ func: item.func, funcOption: item.funcOption, itemIndex, changeSelectEvent })"
  >
    <!-- 顯示圖片 -->
    <img class="item-img" v-if="item.showImg" :src="item.imgSrc" :class="[globalImgClassName, item.imgClassName]" />
    <!-- 顯示ICON -->
    <v-icon
      class="item-icon"
      v-if="item.showIcon"
      :color="item.iconColor || globalIconColor"
      :class="[globalItemIconClassName, item.itemIconClassName]"
      >{{ item.icon }}
    </v-icon>
    <!-- 顯示title文字 -->
    <span class="item-title" v-if="item.showTitle" :class="[globalItemTitleClassName, item.itemTitleClassName]">{{ item.title }}</span>
    <!-- 顯示content文字 -->
    <span class="item-content" v-if="item.showContent" :class="[globalItemContentClassName, item.itemContentClassName]">{{ item.content }}</span>
    <!-- 顯示追加客製化的部分 -->
    <slot></slot>
  </div>
</template>

<script>
// 本組件是按鍵的DEMO版本，可以用來顯示圖片，icon，文字和追加客製化的功能
import QuickBarItemMixin from '../IndexContentItemMixin';

export default {
  name: 'QuickBar-item-000',
  mixins: [QuickBarItemMixin],
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/pc/QuickBarItem/index.scss';
</style>
