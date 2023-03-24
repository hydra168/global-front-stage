<template>
  <v-bottom-navigation v-if="!fullscreen" app :active-class="activeClass" :class="bgColor" :dark="dark" v-model="currentMenu">
    <v-btn
      class="d-flex flex-grow-1 py-7"
      :class="btnClassName"
      v-for="(item, index) in menuData"
      :key="index"
      :value="item.title"
      @click="item.func"
    >
      <span class="mt-1" :class="titleColor">{{ $t(item.title) }}</span>
      <v-icon :color="iconColor">{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'bottomNavigation-001',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: 'primary white--text',
    },
    bgColor: {
      type: String,
      default: '',
    },
    titleColor: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: '',
    },
    btnClassName: {
      type: String,
      default: '',
    },
    optionMenuData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentMenu: 'menuData0',
      defaultMenuData: [
        { sort: 1, code: 'home', show: true, title: 'g_com_bottomNavigation_001_menuData0', icon: 'home', func: () => this.ROUTER_PUSH('/home') },
        {
          sort: 2,
          code: 'promotion',
          show: true,
          title: 'g_com_bottomNavigation_001_menuData1',
          icon: 'assignment',
          func: () => this.ROUTER_PUSH('/promotion'),
        },
        {
          sort: 3,
          code: 'deposit',
          show: true,
          title: 'g_com_bottomNavigation_001_menuData2',
          icon: 'credit_card',
          func: () => this.ROUTER_PUSH('/deposit'),
        },
        {
          sort: 4,
          code: 'userCentre',
          show: true,
          title: 'g_com_bottomNavigation_001_menuData3',
          icon: 'person',
          func: () => this.ROUTER_PUSH('/userCentre'),
        },
        {
          sort: 5,
          code: 'liveChat',
          show: true,
          title: 'g_com_bottomNavigation_001_menuData4',
          icon: 'chat',
          func: () => this.SHOW_LIVE_CHAT(0),
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['fullscreen']),
    menuData() {
      return mergeArrayObjectsCode(this.optionMenuData, this.defaultMenuData);
    },
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT', 'ROUTER_PUSH']),
  },
  mounted() {
    const currentRoute = this.menuData.find(item => item.code === this.$route.name);
    if (currentRoute) {
      this.currentMenu = currentRoute.title;
    }
  },
  watch: {
    '$route.name'(route) {
      if (route === 'home') {
        this.currentMenu = this.menuData[0].title;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-btn) {
  min-width: unset !important;
  height: auto !important;
  padding: 8px !important;
}
</style>
