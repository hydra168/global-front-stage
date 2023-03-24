<template>
  <div class="BottomNavigation-002">
    <v-bottom-navigation v-if="!fullscreen" app :active-class="activeClass" :class="bgColor" :dark="dark" v-model="currentMenu">
      <v-btn class="d-flex flex-grow-1 py-7" v-for="(item, index) in menuData" :key="index" :value="item.title" @click="routerPush(item)">
        <span :class="titleColor">{{ textFilter(item.title) }}</span>
        <v-img class="icon" :src="item.imgSrc"></v-img>
        <span class="router-link" v-if="showIndicator" :class="{ active: Cpath == item.name }"></span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'bottomNavigation-002',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: '',
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
    menuData: {
      type: Array,
      default: () => [
        { title: 'menuData0', icon: 'home', name: 'home', imgSrc: require('./assets/img/home.png') },
        { title: 'menuData1', icon: 'credit_card', name: 'deposit', imgSrc: require('./assets/img/deposit.png') },
        { title: 'menuData2', icon: 'assignment', name: 'promotion', imgSrc: require('./assets/img/promotion.png') },
        { title: 'menuData3', icon: 'chat', name: 'liveChat', imgSrc: require('./assets/img/liveChat.png') },
        { title: 'menuData4', icon: 'person', name: 'userCentre', imgSrc: require('./assets/img/userCentre.png') },
      ],
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentMenu: '主页',
      Cpath: this.$route.name,
    };
  },
  computed: {
    ...mapGetters(['fullscreen']),
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT', 'ROUTER_PUSH']),
    ...mapMutations(['SET_CURRENT_MENU_TITLE']),
    routerPush(item) {
      this.Cpath = item.name;
      if (item.name == 'liveChat') {
        this.SHOW_LIVE_CHAT(0);
        return;
      }
      this.$router.push({ name: item.name });
    },
    textFilter(text) {
      return this.$t(`g_com_bottomNavigation_002_${text}`);
    },
  },
};
</script>

<style lang="scss">
.BottomNavigation-002 {
  .icon {
    width: 100%;
    max-width: 22px;
    max-height: 18px;
    margin-bottom: 10px;
  }
  .router-link {
    height: 8px;
    margin-bottom: 5px;
    &.active {
      width: 29px;
      opacity: 0.9;
      background-color: map-get(map-get($colors, primary), base);
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
