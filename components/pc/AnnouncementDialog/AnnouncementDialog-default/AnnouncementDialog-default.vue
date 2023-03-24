<template>
  <v-dialog v-if="list.length > 0" ref="announcement" v-model="openStatus" max-width="1200px" content-class="announcement-dialog">
    <v-card class="round">
      <v-toolbar dark color="primary" height="60px">
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
          <v-tabs class="mt-5" v-model="currentType">
            <v-tab href="#tab_all">{{ textFilter('all') }}</v-tab>
            <v-tab :href="`#tab_${i}`" v-for="(item, i) in types" :key="i">{{ textFilter(item.title) }}</v-tab>
            <v-tabs-slider></v-tabs-slider>
            <v-tab-item value="tab_all">
              <v-layout v-if="Boolean(list.length)" wrap row ma-0>
                <v-flex xs4 pa-0>
                  <ul :ref="`tab_all_menu`">
                    <li v-for="item in list" :key="item.Id" :class="['py-0', { active: isActive(item.Id) }]" @click="changeItem(item)">
                      <v-toolbar height="40">
                        <v-toolbar-title class="title-date my-0"> {{ item.StartTime | formatD }}</v-toolbar-title>
                        <v-toolbar-title class="px-2"> {{ item.Title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon>chevron_right</v-icon>
                      </v-toolbar>
                    </li>
                  </ul>
                </v-flex>
                <v-flex xs8 pa-0 class="info-style">
                  <template v-if="isText">
                    <div class="announcement-content pa-5">
                      <h4>{{ item.StartTime | formatDate }}</h4>
                      <h3>{{ item.Title }}</h3>
                      <hr />
                      <v-spacer></v-spacer>
                      <div class="mt-3 content-box" v-html="item.Content"></div>
                    </div>
                  </template>
                  <img v-else :src="item.PicturePc" :alt="item.Title" style="width: 100%" />
                </v-flex>
              </v-layout>
              <v-layout v-else wrap row ma-0 justfy-center align-center>
                <v-flex class="nodata" xs12 pa-5
                  ><span>{{ textFilter('noInfo') }}</span></v-flex
                >
              </v-layout>
            </v-tab-item>
            <v-tab-item v-for="(type, i) in types" :key="i" :value="'tab_' + i">
              <v-layout v-if="Boolean(currentList.length)" wrap row ma-0>
                <v-flex xs4 pa-0>
                  <ul :ref="`tab_${i}_menu`">
                    <li v-for="item in currentList" :key="item.Id" :class="['py-0', { active: isActive(item.Id) }]" @click="changeItem(item)">
                      <v-toolbar height="40">
                        <v-toolbar-title class="title-date my-0"> {{ item.StartTime | formatD }}</v-toolbar-title>
                        <v-toolbar-title class="px-2"> {{ item.Title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon>chevron_right</v-icon>
                      </v-toolbar>
                    </li>
                  </ul>
                </v-flex>
                <v-flex xs8 pa-0 class="info-style">
                  <template v-if="isText">
                    <div class="announcement-content pa-5">
                      <h4>{{ item.StartTime | formatDate }}</h4>
                      <h3>{{ item.Title }}</h3>
                      <hr />
                      <v-spacer></v-spacer>
                      <div class="mt-3 content-box" v-html="item.Content"></div>
                    </div>
                  </template>
                  <img v-else-if="isPicture" :src="item.PicturePc" :alt="item.Title" style="width: 100%" />
                </v-flex>
              </v-layout>
              <v-layout v-else wrap row ma-0 justfy-center align-center>
                <v-flex class="nodata" xs12 pa-5
                  ><span>{{ textFilter('noInfo') }}</span></v-flex
                >
              </v-layout>
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
  props: ['logo'],
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
      ul {
        list-style-type: none;
        padding: 0;
        // max-height: 398px;
        height: 400px;
        overflow: auto;
        z-index: 1;
        position: relative;
        border-top: 1px solid rgba(0, 0, 0, 0.25);
        box-shadow: -1px 0 1px rgba(0, 0, 0, 0.25) inset;
        li {
          text-align: left;
          height: auto;
          padding: 5px;
          font-family: microsoft yahei;
          font-size: 16px;
          letter-spacing: normal;
          position: relative;
          z-index: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.6;
          cursor: pointer;
          transition-duration: 0.3s;
          border-bottom: 1px dotted rgba(0, 0, 0, 0.25);
          .v-icon {
            opacity: 0;
          }
          &:hover {
            opacity: 0.8;
            .v-icon {
              opacity: inherit;
            }
          }
          &.active {
            opacity: 1;
            &:after {
              content: '';
              position: absolute;
              height: 100%;
              width: 1px;
              background: #fff;
              z-index: 1;
              right: -1px;
              top: 0;
            }
          }
          &:hover,
          &.active {
            margin-right: -1em;
            background: #fff;
            .v-icon {
              opacity: inherit;
            }
            background-color: map-get(map-get($colors, primary), base);
            color: #ffffff;
          }
          &.active {
            background-color: map-get(map-get($colors, primary), base);
            color: #ffffff;
          }
        }
      }
    }
    .info-style {
      height: 400px;
      overflow: auto;
      padding: 4px 10px 4px 4px;
      text-align: left;
    }
    .announcement-content {
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.25);
      border-width: 1px 1px 1px 0;
      height: 100%;
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
  overflow: hidden;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  .checkbox {
    .v-label {
      font-size: 13px;
      line-height: 30px;
    }
  }
}
</style>
