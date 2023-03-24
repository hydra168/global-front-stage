<template>
  <v-dialog v-if="list.length > 0" ref="announcement" v-model="openStatus" max-width="600px" content-class="announcement-dialog">
    <v-card class="round">
      <v-toolbar :dark="dark" color="primary" height="60px">
        <v-layout>
          <v-flex xs12>
            <v-toolbar-title class="headline text-center"> <v-icon>volume_up</v-icon>&nbsp;&nbsp;{{ textFilter('title') }}</v-toolbar-title>
          </v-flex>
        </v-layout>
        <v-btn icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="custom-card-text">
        <v-container fluid grid-list-md class="content">
          <v-tabs class="mt-5" v-model="currentType" vertical>
            <v-tab href="#tab_all">{{ textFilter('all') }}</v-tab>
            <v-tab :href="`#tab_${i}`" v-for="(item, i) in types" :key="i">{{ textFilter(item.title) }}</v-tab>
            <v-tabs-slider></v-tabs-slider>
            <v-tab-item value="tab_all">
              <v-expansion-panels v-model="panel" :disabled="disabled">
                <v-layout v-if="Boolean(list.length)" wrap ma-0>
                  <v-expansion-panel
                    :ref="`tab_all_menu`"
                    v-for="item in list"
                    :key="item.Id"
                    :class="[{ active: isActive(item.Id) }]"
                    @click="changeItem(item)"
                  >
                    <v-expansion-panel-header>
                      <v-card>
                        <v-card-title>
                          <v-toolbar height="40">
                            <v-toolbar-title class="title-date my-0"> {{ item.StartTime | formatD }} {{ item.Title }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                        </v-card-title>
                      </v-card>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-layout class="announcement-content pa-5" v-if="isText">
                        <h4>{{ item.StartTime | formatDate }}</h4>
                        <h3>{{ item.Title }}</h3>
                        <hr />
                        <v-spacer></v-spacer>
                        <div class="mt-3 content-box" v-html="item.Content"></div>
                      </v-layout>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-layout>
                <v-layout v-else wrap row ma-0 justfy-center align-center>
                  <v-flex class="nodata" pa-5
                    ><span>{{ textFilter('noInfo') }}</span></v-flex
                  >
                </v-layout>
              </v-expansion-panels>
            </v-tab-item>
            <v-tab-item v-for="(type, i) in types" :key="i" :value="'tab_' + i">
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-layout v-if="Boolean(currentList.length)" wrap ma-0>
                  <v-expansion-panel
                    :ref="`tab_${i}_menu`"
                    v-for="item in currentList"
                    :key="item.Id"
                    :class="[{ active: isActive(item.Id) }]"
                    @click="changeItem(item)"
                  >
                    <v-expansion-panel-header>
                      <v-card>
                        <v-card-title>
                          <v-toolbar height="40">
                            <v-toolbar-title class="title-date my-0"> {{ item.StartTime | formatD }} {{ item.Title }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                        </v-card-title>
                      </v-card>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-layout class="announcement-content pa-5" v-if="isText">
                        <h4>{{ item.StartTime | formatDate }}</h4>
                        <h3>{{ item.Title }}</h3>
                        <hr />
                        <v-spacer></v-spacer>
                        <div class="mt-3 content-box" v-html="item.Content"></div>
                      </v-layout>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-layout>
                <v-layout v-else wrap row ma-0 justfy-center align-center>
                  <v-flex class="nodata" pa-5
                    ><span>{{ textFilter('noInfo') }}</span></v-flex
                  >
                </v-layout>
              </v-expansion-panels>
            </v-tab-item>
          </v-tabs>
          <v-layout align-center>
            <v-flex px-5 class="checkbox">
              <v-checkbox @change="check" v-model="checkBox" hide-details class="ma-0 pa-0" :label="textFilter('labelText')"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import _ from 'lodash';
import { gsap } from 'gsap';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'announcement',
  data() {
    return {
      panel: [0, 1],
      disabled: false,
      readonly: false,
      isNoData: true,
      openStatus: false,
      checkBox: false,
      currentType: 'tab_all',
      noDataTryTimes: 0,
      noDataInterval: null,
      types: [
        { title: 'system', value: 0 },
        { title: 'maintain', value: 1 },
        { title: 'depositAndWithdrawal', value: 2 },
        { title: 'news', value: 3 },
      ],
    };
  },
  props: {
    dark: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(['announcementIsOpen', 'announcementList', 'announcementCurrentIndex', 'announcementCurrentItem', 'announcementViewDate']),
    isOpen() {
      return this.announcementIsOpen;
    },
    list() {
      return this.announcementList.filter(item => item.IsBulletinBoard);
    },
    curList() {
      if (_.isNaN(this.announcementType)) return this.list;
      else return this.currentList;
    },
    curIndex() {
      const i = _.findIndex(this.curList, this.item);
      return i ? i : 0;
    },
    index() {
      return this.announcementCurrentIndex;
    },
    item() {
      return this.announcementCurrentItem;
    },
    isText() {
      return this.item != null && this.item.Content !== '';
    },
    isPicture() {
      return this.item != null && this.item.PicturePc !== '';
    },
    viewDate() {
      return this.announcementViewDate;
    },
    currentList() {
      return _.filter(this.list, announcement => {
        return announcement.Type == this.announcementType;
      });
    },
    announcementType() {
      return this.currentType.replace(/tab_(\d)/gi, '$1') * 1;
    },
  },
  mounted() {
    this.openStatus = this.isOpen;
    this.currentType = 'tab_all';
    if (this.isNoData) {
      this.noDataInterval = setInterval(() => {
        this.noDataTryTimes += 1;
        if (this.noDataTryTimes > 6 || (this.list && this.list.length > 0)) {
          clearInterval(this.noDataInterval);
          this.isNoData = false;
          this.changeTypeHandler();
        }
      }, 500);
    }
  },
  watch: {
    isOpen(v) {
      this.openStatus = v;
      this.currentType = 'tab_all';
    },
    openStatus(v) {
      v || this.SET_ANNOUNCEMENT_IS_OPEN({ ischeck: true, status: v });
    },
    currentType(next, last) {
      this.changeTypeHandler();
    },
  },
  updated() {
    this.checkBox = !!this.viewDate;
    if (typeof this.curIndex === 'number') {
      /** li 高度為 40px */
      const top = this.curIndex * 40;
      const menu = this.$refs[`${this.currentType}_menu`];
      if (menu) {
        gsap.to(menu, {
          scrollTop: top,
        });
        // menu.scrollTop = top;
      }
    }
  },
  methods: {
    ...mapMutations(['SET_ANNOUNCEMENT_CURRENT_INDEX', 'SET_ANNOUNCEMENT_CURRENT_ITEM', 'SET_ANNOUNCEMENT_IS_OPEN', 'SET_ANNOUNCEMENT_VIEW_DATE']),
    changeTypeHandler() {
      if (this.currentType == 'tab_all') {
        const first = _.first(this.list);
        if (first) {
          this.SET_ANNOUNCEMENT_CURRENT_INDEX(first.Id);
          this.SET_ANNOUNCEMENT_CURRENT_ITEM(first);
        }
      } else {
        if (this.currentList.length) {
          const first = _.first(this.currentList);
          if (first) {
            this.SET_ANNOUNCEMENT_CURRENT_INDEX(first.Id);
            this.SET_ANNOUNCEMENT_CURRENT_ITEM(first);
          }
        } else {
          this.SET_ANNOUNCEMENT_CURRENT_INDEX(-1);
          this.SET_ANNOUNCEMENT_CURRENT_ITEM({});
        }
      }
      this.$nextTick(() => {
        const menu = this.$refs[`${this.currentType}_menu`];
        if (menu) {
          gsap.to(menu, {
            scrollTop: 0,
          });
        }
      });
    },
    isActive(id) {
      return this.item ? this.item.Id === id : false;
    },
    changeItem(item) {
      const index = this.list.findIndex(i => i.Id === item.Id);
      this.SET_ANNOUNCEMENT_CURRENT_INDEX(index);
      this.SET_ANNOUNCEMENT_CURRENT_ITEM(item);
    },
    close() {
      this.openStatus = false;
    },
    check() {
      const date = new Date().toISOString().split('T')[0];
      this.SET_ANNOUNCEMENT_VIEW_DATE(this.checkBox ? date : '');
    },
    textFilter(text) {
      return textFilter(text, 'com_announcementDialog_default_');
    },
  },
};
</script>
<style lang="scss" scoped>
.announcement-dialog {
  .v-toolbar__title {
    margin: auto;
    border-right: 0 !important;
    .img {
      width: 150px;
    }
  }
  .custom-card-text {
    padding: 5px 0 0 0;

    .content {
      margin-left: 0;
      padding-left: 0;
      padding: 0;
      position: relative;
    }
    .info-style {
      height: 400px;
      overflow: auto;
      padding: 4px 10px 4px 4px;
      text-align: left;
    }
    .announcement-content {
      height: 100%;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.25);
      border-width: 0 1px 1px 1px;
      h4 {
        font-weight: normal;
        margin-bottom: 1em;
      }
      h3 {
        margin-bottom: 1em;
      }
    }
    .nodata {
      height: 400px;
      align-content: center;
      text-align: center;
    }
  }
  .custom-card-note {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #eee;
  }
  .v-toolbar {
    box-shadow: none !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25) inset;
    .v-toolbar__title {
      font-size: 16px;
    }
  }
  .title-date {
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    height: 40px;
    line-height: 40px;
    padding-right: 1em;
    display: block;
    min-width: 7em;
  }
  .content-box {
    line-height: 1.3;
  }
}
</style>
<style lang="scss">
.announcement-dialog {
  border-radius: 16px !important;
  overflow-x: hidden;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  .custom-card-text {
    border-style: none !important;
  }
  .checkbox {
    .v-label {
      font-size: 13px;
      line-height: 30px;
    }
  }
}
.layout.wrap {
  position: relative;
  .v-expansion-panel-header__icon {
    position: absolute;
    right: 8.5%;
    top: 45px;
  }
}
.v-dialog > .v-card > .v-card__text {
  padding: 0 !important;
}
// .v-expansion-panel-header {
//   padding: 16px 24px 2px !important;
// }
.container.grid-list-md .layout .flex {
  padding: 12px;
}
.layout {
  display: block !important;
}
.container.grid-list-md .layout:only-child {
  margin: 0;
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
</style>
