<template>
  <div class="BottomNavigation-003">
    <v-bottom-navigation v-if="!fullscreen" app :active-class="activeClass" :class="bgColor" :dark="dark" v-model="currentMenu">
      <v-btn class="d-flex flex-grow-1 py-7" v-for="(item, index) in menuData" :key="index" :value="item.title" @click="routerPush(item)">
        <span :class="titleColor">{{ textFilter(item.title, useTextFilter) }}</span>
        <v-img class="icon" :src="item.imgSrc" v-if="item.name !== 'home'"></v-img>
        <v-icon :color="iconColor" v-if="item.name === 'home'">{{ item.icon }}</v-icon>
        <span class="router-link" :class="{ active: Cpath == item.name }"></span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'bottomNavigation-003',
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
    useTextFilter: {
      type: Boolean,
      default: true,
    },
    menuData: {
      type: Array,
      default: () => [
        { title: 'menuData0', icon: 'home', name: 'home', imgSrc: require('./assets/home.png') },
        { title: 'menuData1', icon: 'credit_card', name: 'deposit', imgSrc: require('./assets/deposit.png') },
        { title: 'menuData2', icon: 'assignment', name: 'promotion', imgSrc: require('./assets/promotion.png') },
        { title: 'menuData3', icon: 'chat', name: 'liveChat', imgSrc: require('./assets/liveChat.png') },
        { title: 'menuData4', icon: 'person', name: 'userCentre', imgSrc: require('./assets/userCentre.png') },
      ],
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
    ...mapActions(['SHOW_LIVE_CHAT']),
    ...mapMutations(['SET_CURRENT_MENU_TITLE']),
    routerPush(item) {
      this.Cpath = item.name;
      if (item.name == 'liveChat') {
        this.SHOW_LIVE_CHAT(0);
        return;
      }
      if (item.name == 'liveChat2') {
        this.SHOW_LIVE_CHAT(1);
        return;
      }
      this.$router.push({ name: item.name });
    },
    textFilter(text, useTextFilter) {
      return useTextFilter ? this.$t(`g_com_bottomNavigation_003_${text}`) : text;
    },
  },
};
</script>

<style lang="scss">
.BottomNavigation-003 {
  .icon {
    max-width: 22px;
    max-height: 18px;
    margin-bottom: 10px;
  }
  .router-link {
    height: 8px;
    margin-bottom: 5px;
    &.active {
      display: none;
    }
  }
  .v-bottom-navigation {
    button:nth-child(3) {
      .icon {
        transform: scale(2.5) translateY(-6px);
      }
      .v-image__image--cover {
        background-size: auto 100%;
      }
      &:hover {
        .icon {
          animation: flow 1s ease-in-out;
        }
      }
    }
    .v-btn--active {
      background-color: #fff !important;
    }
    .v-btn__content {
      padding-bottom: 5px;
      & > span {
        z-index: 100;
      }
    }
  }
}
@keyframes flow {
  0% {
    transform: scale(2.5) translateY(-6px);
  }
  25% {
    transform: scale(2.5) translateY(-12px);
  }
  50% {
    transform: scale(2.5) translateY(-9px);
  }
  75% {
    transform: scale(2.5) translateY(-12px);
  }
  100% {
    transform: scale(2.5) translateY(-6px);
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
