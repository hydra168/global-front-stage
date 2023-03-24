<template>
  <v-toolbar-title class="header-menu-title">
    <template v-if="showtitle">
      <h4 class="title">{{ menuTitle }}</h4>
    </template>
    <template v-if="showImg">
      <img class="logo" :src="logoUrl" />
    </template>
  </v-toolbar-title>
</template>

<script>
import { MOBILE_HEADER_ALLSHOW_LOGO } from '@G/consts';

export default {
  name: 'header-menu-title',
  props: {
    menuTitle: {
      type: String,
      default: '',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    routeName: {
      type: String,
      default: '',
    },
  },
  computed: {
    showtitle() {
      return !MOBILE_HEADER_ALLSHOW_LOGO && this.routeName !== 'home';
    },
    showImg() {
      if (MOBILE_HEADER_ALLSHOW_LOGO) {
        return true;
      } else {
        return this.routeName === 'home';
      }
    },
  },
};
</script>

<style>
.header-menu-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  margin: 0px;
}
.logo {
  height: 40px;
}
</style>
