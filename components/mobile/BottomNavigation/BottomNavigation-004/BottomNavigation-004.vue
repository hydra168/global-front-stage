<template>
  <div class="BottomNavigation-004">
    <v-bottom-navigation v-if="!fullscreen" app :active-class="activeClass" :class="bgColor" :dark="dark" v-model="currentMenu">
      <v-btn
        class="d-flex flex-grow-1 py-7"
        :class="btnClassName"
        v-for="item in menuData"
        :key="item.id"
        :value="item.title"
        @click="routerPush(item)"
      >
        <span class="mt-1" v-bind:class="[Cpath === item.code ? activeTitleColor : titleColor]">{{ $t(item.title) }}</span>
        <v-img v-if="Cpath !== item.code" :src="item.src" alt=""></v-img>
        <v-img v-else :src="item.srcActive" alt=""></v-img>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'bottomNavigation-004',
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
    activeTitleColor: {
      type: String,
      default: 'primary--text',
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
      Cpath: this.$route.name,
      defaultMenuData: [
        {
          id: 'bn_001',
          code: 'home',
          title: '首页',
          src: require('./assets/bn_001.png'),
          srcActive: require('./assets/bn_001_a.png'),
        },
        {
          id: 'bn_002',
          code: 'deposit',
          title: '充值',
          src: require('./assets/bn_002.png'),
          srcActive: require('./assets/bn_002_a.png'),
        },
        {
          id: 'bn_003',
          code: 'liveChat',
          title: '客服',
          src: require('./assets/bn_003.png'),
          srcActive: require('./assets/bn_003_a.png'),
        },
        {
          id: 'bn_004',
          code: 'promotion',
          title: '优惠',
          src: require('./assets/bn_004.png'),
          srcActive: require('./assets/bn_004_a.png'),
        },
        {
          id: 'bn_005',
          code: 'userCentre',
          title: '我的',
          src: require('./assets/bn_005.png'),
          srcActive: require('./assets/bn_005_a.png'),
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
    ...mapActions(['SHOW_LIVE_CHAT']),
    routerPush(item) {
      this.Cpath = item.code;
      if (item.func) {
        item.func();
      } else {
        if (item.code == 'liveChat') {
          this.SHOW_LIVE_CHAT(0);
          return;
        }
        this.$router.push({ name: item.code });
      }
    },
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
<style lang="scss">
.BottomNavigation-004 {
  .v-image__image {
    width: 22px !important;
    height: 21px !important;
    top: 12px !important;
    background-position: unset !important;
  }
  .v-image__image--cover {
    background-size: unset;
  }
  .v-btn__content {
    span {
      transform: translate(0px, -6px);
    }
  }
}
</style>
<style lang="scss" scoped>
:deep(.v-btn) {
  min-width: unset !important;
  height: auto !important;
  padding: 8px !important;
}
</style>
