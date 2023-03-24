<template>
  <v-container class="HelpCentre h100">
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-row v-if="!isLoading" class="h100">
      <!-- 選單 -->
      <v-col cols="3" class="h100">
        <v-card>
          <v-list tile expand>
            <v-list-item v-show="!item.disabled" v-for="(item, kk) in helperListHandler" :key="kk" @click="routerPush(item)">
              <v-list-item-icon class="pl-5">
                <v-icon
                  id="icon"
                  color="primary"
                  :style="icons[item.code].iconSize ? `font-size:${icons[item.code].iconSize}px` : ``"
                  v-text="icons[item.code].icon"
                ></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`${item.title}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <!-- 內容 -->
      <v-col cols="9" class="h100">
        <v-card class="pa-3">
          <v-card-title>
            <h2 id="currentTitle" class="primary--text">{{ currentTitle }}</h2>
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
import { mapActions, mapGetters } from 'vuex';
import { helpCentreChildren } from '../../../../router/pc/helpCentre';

const components = helpCentreChildren.reduce((acc, child) => {
  acc[child.name] = child.component;
  return acc;
}, {});

export default {
  name: 'HelpCentre',
  components,
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: true,
      currentMenu: [],
      currentTitle: '',
      multiple: true,
      icons: {
        about: {
          icon: 'favorite',
          iconSize: '20',
        },
        problem: {
          icon: 'question_answer',
          iconSize: '20',
        },
        features: {
          icon: 'apps',
          iconSize: '20',
        },
        terms: {
          icon: 'drive_file_rename_outline',
          iconSize: '20',
        },
        disclaimer: {
          icon: 'format_quote',
          iconSize: '20',
        },
        policies: {
          icon: 'priority_high',
          iconSize: '20',
        },
        rules: {
          icon: 'emoji_people',
          iconSize: '20',
        },
        agreement: {
          icon: 'dock',
          iconSize: '20',
        },
      },
    };
  },
  created() {
    this.GET_HELPER_LIST();
  },
  mounted() {
    this.currentMenuHandler();
  },
  watch: {
    helperList() {
      this.currentMenuHandler();
    },
    '$route.name'(route) {
      this.currentMenuHandler();
    },
  },
  computed: {
    ...mapGetters(['helperList', 'dialogPagePath']),
    helperListHandler() {
      return this.helperList.filter(el => el.status == '1');
    },
    formatedPath() {
      return this.dialogPagePath || this.$route.name;
    },
  },
  methods: {
    ...mapActions(['GET_HELPER_LIST']),
    routerPush(item) {
      this.multiple = false; // 解 vuetify bug
      this.currentTitle = item.title;
      this.$router.push({ name: item.code });
    },
    // 當前 menu 展開並且選取
    currentMenuHandler() {
      if (this.helperList.length == 0) return;
      // 檢查當前路由是否啟用
      let hasRoute = false;
      this.helperList.forEach((el, index) => {
        if (el.code == this.formatedPath && el.status == '1') {
          hasRoute = true;
        } else {
          // 都沒啟用導向首頁
          if (!hasRoute && index == this.helperList.length - 1) {
            this.$store.commit('SET_DIALOG_PAGE');
            this.$router.push('/');
          }
        }
      });

      // 如果不存在 重新導向第一筆資料的路由
      if (!hasRoute) {
        this.$router.push({ name: this.helperListHandler[0].code });
        return;
      }
      this.isLoading = false;
      for (let k in this.helperListHandler) {
        if (this.helperListHandler[k].code === this.formatedPath) {
          this.currentMenu = [Number(k)];
          this.currentTitle = this.helperListHandler[k].title;
          return;
        }
      }
    },
  },
};
</script>
