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
    <template v-for="(imgData, index) in item.img">
      <img :key="index" class="item-img" :src="imgData.src" :class="globalImgClassName" />
    </template>
    <!-- 顯示ICON -->
    <v-icon class="item-icon" :color="item.iconColor || globalIconColor" :class="[globalItemIconClassName]">{{ item.icon }} </v-icon>
    <!-- 顯示title文字 -->
    <span class="item-title" :class="globalItemTitleClassName">{{ item.title }}</span>
    <!-- 顯示content文字 -->
    <template v-for="(contentData, index2) in item.content">
      <span :key="index2" class="item-content" :class="globalItemContentClassName"> {{ contentData }}</span>
    </template>
    <!-- 顯示追加客製化的部分 -->
    <slot></slot>
  </div>
</template>

<script>
// 本組件是按鍵的DEMO版本，可以用來顯示圖片，icon，文字和追加客製化的功能
import NarBarItemMixin from '../IndexContentItemMixin';

export default {
  name: 'LotteryPupular-item-000',
  mixins: [NarBarItemMixin],
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/pc/LotteryPopularItem/index.scss';
</style>
