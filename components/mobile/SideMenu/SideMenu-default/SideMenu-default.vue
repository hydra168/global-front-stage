<template>
  <v-navigation-drawer v-model="isShow" fixed enable-resize-watcher>
    <v-list nav>
      <template v-for="(item, k) in sideMenuData">
        <v-list-item v-if="item.show" :key="k" link @click="item.func">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item v-if="isShowI18n">
        <v-list-item-icon>
          <v-icon>language</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-select
            dense
            outlined
            hide-details
            class="primary--text"
            v-model="lang"
            :items="langItem"
            :label="$t('g_com_sideMenu_default_changeLanguage')"
            item-text="value"
            item-value="key"
            @change="changeLang"
          ></v-select>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { mergeArrayObjectsCode, isSE } from '@UTILS/';
export default {
  name: 'SideMenu',
  props: {
    isShowI18n: {
      type: Boolean,
      default: false,
    },
    // 更新選項
    optionsMenuData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShow: false,
      defaultMenuData: [
        {
          sort: 1,
          show: !window.ReactNativeWebView,
          code: 'appDownload',
          title: 'g_com_sideMenu_default_menu_app',
          name: 'appDownload',
          icon: 'smartphone',
          func: () => this.GET_APP_DOWNLOAD(),
        },
        {
          sort: 2,
          show: true,
          code: 'helpCentre',
          title: 'g_com_sideMenu_default_menu_help',
          icon: 'help',
          func: () => this.ROUTER_PUSH('/helpCentre'),
        },
        {
          sort: 3,
          show: true,
          code: 'announcement',
          title: 'g_com_sideMenu_default_menu_announcement',
          icon: 'notifications',
          func: () => this.ROUTER_PUSH('/announcement'),
        },
        {
          sort: 4,
          show: true,
          code: 'lineCheck',
          title: 'g_com_sideMenu_default_menu_lineCheck',
          icon: 'check',
          func: () => this.ROUTER_PUSH('/lineCheck'),
        },
      ],
    };
  },
  created() {
    this.lang = this.locale;
  },
  computed: {
    ...mapGetters(['showMenu', 'config', 'locale', 'langItem']),
    sideMenuData() {
      const menu = mergeArrayObjectsCode(this.optionsMenuData, this.defaultMenuData);
      return menu;
    },
  },
  watch: {
    showMenu(val) {
      this.isShow = val;
    },
    isShow(val) {
      this.SET_SHOW_MENU(val);
    },
  },
  methods: {
    ...mapMutations(['SET_SHOW_MENU']),
    ...mapActions(['GET_APP_DOWNLOAD', 'LOCALE_HANDLER', 'ROUTER_PUSH']),
    changeLang() {
      // this.SET_LOCALE(this.lang);
      this.LOCALE_HANDLER({ lang: this.lang });
    },
  },
};
</script>
