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
    @click="handItemClick({ func: item.func, funcOption: item.funcOption })"
  >
    <!-- 顯示圖片 -->
    <img :class="['item-img', globalImgClassName, item.imgClassName]" :src="item.imgSrc" />
    <!-- 顯示圖片 -->
    <img :class="['item-sub-img', globalSubImgClassName, item.subImgClassName]" :src="item.subImgSrc" />
    <!-- 顯示title文字 -->
    <span :class="['item-title', globalItemTitleClassName, item.itemTitleClassName]">{{ item.title }}</span>
    <!-- 顯示title文字 -->
    <span :class="['item-sub-title', globalItemSubTitleClassName, item.itemSubTitleClassName]">{{ item.subTitle }}</span>
    <!-- 顯示content文字 -->
    <span class="item-content" v-if="item.showContent" :class="[globalItemContentClassName, item.itemContentClassName]">{{ item.content }}</span>
    <!-- 顯示追加客製化的部分 -->
    <slot></slot>
  </div>
</template>

<script>
// 本組件是按鍵的DEMO版本，可以用來顯示圖片，icon，文字和追加客製化的功能
import IndexContentItemMixin from '../IndexContentItemMixin';

export default {
  name: 'Index-content-item-000',
  mixins: [IndexContentItemMixin],
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
// @import "@G/assets/scss/pc/LotteryPopularItem/index.scss";
</style>
