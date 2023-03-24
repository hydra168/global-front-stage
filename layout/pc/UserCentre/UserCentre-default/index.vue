<template>
  <v-container id="Usercentre" :class="userCentreClass" class="h100 pa-0">
    <v-row class="h100 justify-center flex-nowrap">
      <!-- 選單 -->
      <v-col
        :cols="menuCols"
        :class="{
          h100: true,
          'pa-0': isUserCentre002,
          'no-box-shadow': isUserCentre002,
          'primary-menu': isUserCentre001 || isUserCentre002,
        }"
      >
        <v-card :class="{ primary: isUserCentre002 }">
          <v-expansion-panels :flat="!isUserCentre001" :readonly="isUserCentre002" v-model="currentMenu" multiple accordion>
            <v-expansion-panel
              v-for="(item, k) in menuData"
              :key="k"
              :class="({ active: currentMenu[0] === k }, item.class)"
              @click="isUserCentre002 ? routerPush(item) : () => {}"
            >
              <v-expansion-panel-header>
                <div class="title-inner-wrap">
                  <div v-if="isUserCentre001" class="title-img mr-3 primary">
                    <div>
                      <img class="pa-1 title-pic" :src="require(`./assets/icon/left-menu-${item.icon}-icon.png`)" />
                    </div>
                  </div>
                  <div v-if="isUserCentre002">
                    <div class="page-title-img-wrap mr-8">
                      <v-icon class="v-icon-show" v-text="item.titleIcon" />
                    </div>
                  </div>
                  <div :class="{ bolder: isUserCentre001, 'header-title': true }">{{ $t(item.title ? item.title : item.subTitle) }}</div>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content v-if="item.subMenu">
                <v-list tile expand>
                  <v-list-item v-show="!sub.disabled" v-for="(sub, kk) in item.subMenu" :class="sub.class" :key="kk" @click="routerPush(sub)">
                    <v-list-item-icon>
                      <v-icon
                        :class="`v-icon-${sub.icon} icon-hide`"
                        :style="sub.iconSize ? `font-size:${sub.iconSize}px` : ``"
                        v-text="`face`"
                      ></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="" v-text="`${$t(sub.subTitle)}`"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>

      <!-- 內容 -->
      <v-col :cols="contentCols" :class="{ h100: true, 'pa-0': isUserCentre002, 'no-box-shadow': isUserCentre002 }">
        <div class="mb-5 pr-0" v-if="isUserCentre001 || isUserCentre002"><ProfileReminder /></div>
        <v-card class="pa-3" :class="{ 'pa-10': isUserCentre002, 'pt-0': isUserCentre002 }">
          <v-card-title>
            <div class="page-title-img-wrap mr-8" v-if="currentTitleIcon">
              <v-icon class="v-icon-show" v-text="currentTitleIcon" />
            </div>
            <h2 :class="{ 'text--darken-1': !isUserCentre001 }">{{ $t(currentTitle) }}</h2>
          </v-card-title>
          <v-card-text v-if="!isDialog">
            <router-view></router-view>
          </v-card-text>
          <v-card-text v-else>
            <component :is="formatedPath" style="width: 100% !important" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PC_USER_CENTRE_TYPE } from '@G/consts';
import { mapGetters, mapActions } from 'vuex';
import { userCentreMenuData } from '@ASSETS/userCentre/menu';
import { deepCopy } from '@UTILS';
import { userCentreChildren } from '@G/router/pc/userCentre';
import ProfileReminder from './components/ProfileReminder.vue';

const components = userCentreChildren.reduce((acc, child) => {
  acc[child.name] = child.component;
  return acc;
}, {});

export default {
  name: 'UserCentre',
  components: {
    ...components,
    ProfileReminder,
  },
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userCentreType: PC_USER_CENTRE_TYPE,
      currentTitle: '',
      currentTitleIcon: '',
      currentMenu: [],
      titleNameMap: {},
    };
  },
  created() {
    if (this.config) {
      this.GET_CONFIGURE();
    }
  },
  watch: {
    formatedPath: {
      handler(val) {
        this.currentMenuHandler(val);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['config', 'dialogPagePath', 'isAgency', 'locale']),
    isUserCentre001() {
      return this.userCentreType === 1;
    },
    isUserCentre002() {
      return this.userCentreType === 2;
    },
    userCentreClass() {
      let classText = 'UserCentre';
      if (this.userCentreType) {
        classText = `UserCentre00${this.userCentreType}`;
      }
      return classText;
    },
    formatedPath() {
      return this.dialogPagePath || this.$route.name;
    },
    menuData: {
      get: function () {
        let menu = deepCopy(userCentreMenuData);
        if (this.userCentreType === 2) {
          let menu2 = [];
          const vipEabled = this.config.vip_enable == 1;
          const isAgency = +this.isAgency === 2;
          menu.forEach(item => {
            if (item.name === 'agencyCenter' && !isAgency) {
              return;
            }
            if (item.subMenu) {
              menu2 = menu2.concat(item.subMenu);
            }
          });
          return menu2.filter(item => {
            return vipEabled || !/viplevel/gi.test(item.name);
          });
        } else {
          const vipEabled = this.config.vip_enable == 1;
          const isAgency = +this.isAgency === 2;
          menu.forEach((item, i) => {
            item.subMenu = item.subMenu.filter(menuItem => {
              return vipEabled || !/viplevel/gi.test(menuItem.name);
            });
            item.subMenu.forEach(({ name }, i) => {
              if (this.titleNameMap[name]) {
                item.subMenu[i].subTitle = `g_common_userCentreMenuData_subMenu_${this.titleNameMap[name]}`;
              }
            });
            if (item.name === 'agencyCenter' && !isAgency) {
              menu.splice(i, 1);
            }
          });
        }
        return menu;
      },
    },
    contentCols() {
      return this.locale == 'en' ? 8 : 9;
    },
    menuCols() {
      return this.locale == 'en' ? 4 : 3;
    },
  },
  methods: {
    ...mapActions(['GET_CONFIGURE']),
    routerPush(sub) {
      this.$router.push({ name: sub.name });
    },
    // 當前 menu 展開並且選取
    currentMenuHandler(name) {
      for (let k in this.menuData) {
        // 尋找子層項目
        if (this.userCentreType === 2) {
          if (this.menuData[k].name === name) {
            this.currentMenu = [Number(k)];
            this.currentTitle = this.menuData[k].subTitle;
            return;
          }
        } else {
          for (let kk in this.menuData[k].subMenu) {
            if (this.menuData[k].subMenu[kk].name == 'vipLevel' && this.config.vip_enable == '0') {
              this.menuData[k].subMenu[kk].disabled = true;
            }
            if (this.menuData[k].subMenu[kk].name === name) {
              this.currentMenu = [Number(k)];
              this.currentTitle = this.menuData[k].subMenu[kk].subTitle;
              return;
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
.UserCentre002 {
  .v-expansion-panel-header__icon {
    display: none;
  }
  .header-title {
    color: white;
  }
  .v-icon-show {
    color: white !important;
  }
  .title-inner-wrap {
    display: flex;
    align-items: center;
  }
  .primary-menu {
    max-width: 230px;
    .v-card {
      border-radius: 0px;
      padding: 20px 0px !important;
      .v-expansion-panel {
        background-color: var(--v-primary-base) !important;
        border-radius: 0px !important;
        &.active {
          background-color: var(--v-primary-darken2) !important;
        }
        &:hover {
          background-color: var(--v-primary-lighten2) !important;
        }
      }
    }
  }
  .no-box-shadow {
    .v-card {
      box-shadow: 0 0;
    }
  }
}
</style>
<style lang="scss">
.UserCentre001 {
  .primary-menu {
    max-width: 270px;
  }
  .bolder {
    font-size: 18px;
    font-weight: 600;
  }
  .page-title-img-wrap {
    .v-icon.v-icon-show {
      font-size: 40px;
      color: var(--v-primary-base) !important;
    }
  }
  .title-inner-wrap {
    display: flex;
    align-items: center;
    .title-img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 60px !important;
      clip-path: polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%);
      .title-pic {
        width: 48px;
      }
    }
  }
  .v-expansion-panel-header__icon {
    margin-top: 20px;
    margin-right: 15px;
  }
  .v-expansion-panel-header {
    align-items: flex-start;
    padding: 0px;
  }
  .v-icon.icon-hide {
    color: transparent !important;
  }
  $icons: 'face', 'mail', 'bank', 'pass', 'withdraw-pass', 'vip', 'wallet', 'deposit', 'withdraw', 'deposit-log', 'withdraw-log', 'game-log',
    'balance-log', 'overview', 'agency-promote', 'team-management', 'agency-wallet', 'agency-description';
  @each $icon in $icons {
    .v-icon-#{$icon} {
      background: url('./assets/icon/#{$icon}.png') no-repeat center/contain;
    }
  }
}
</style>
<style lang="scss" scoped>
.UserCentre {
  .v-icon.icon-hide {
    color: transparent !important;
  }
  $icons: 'face', 'mail', 'bank', 'pass', 'withdraw-pass', 'vip', 'wallet', 'deposit', 'withdraw', 'deposit-log', 'withdraw-log', 'game-log',
    'balance-log', 'overview', 'agency-promote', 'team-management', 'agency-wallet', 'agency-description';
  @each $icon in $icons {
    .v-icon-#{$icon} {
      background: url('./assets/icon/#{$icon}.png') no-repeat center/contain;
    }
  }
}
</style>
