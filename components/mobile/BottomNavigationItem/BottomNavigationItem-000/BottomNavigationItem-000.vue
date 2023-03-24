<template>
  <div
    class="item"
    :class="[globalItemClassName, item.itemClassName, isSelectItem ? `select-item ${globalItemSelectClassName} ${item.itemSelectClassName}` : '']"
  >
    <!-- 顯示圖片 -->
    <img class="item-img" v-if="showImg" :src="item.imgSrc" :class="[globalImgClassName, item.imgClassName]" />
    <!-- 顯示ICON -->
    <v-icon class="item-icon" v-if="showIcon" :color="item.iconColor || globalIconColor" :class="[globalItemIconClassName, item.itemIconClassName]"
      >{{ item.icon }}
    </v-icon>
    <!-- 顯示文字 -->
    <span class="item-title" v-if="showTitle" :class="[globalItemTitleClassName, item.itemTitleClassName]">{{ item.title }}</span>
    <!-- 顯示追加客製化的部分 -->
    <slot></slot>
  </div>
</template>

<script>
// 本組件是按鍵的DEMO版本，可以用來顯示圖片，icon，文字和追加客製化的功能
import BottomNavigationItemMixin from '../BottomNavigationItemMixin';

export default {
  name: 'bottom-navigation-item-000',
  mixins: [BottomNavigationItemMixin],
};
</script>
<style lang="scss" scoped>
// 不同的外觀的載入點
@import '@G/assets/scss/mobile/BottomNavigationItem/index.scss';
.item {
  height: 100%;
}
</style>
