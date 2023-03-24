<template>
  <v-dialog ref="announcement" v-model="openStatus" max-width="1200px" content-class="custom-dialog">
    <v-card>
      <v-toolbar dark color="primary" height="60px">
        <v-layout>
          <v-flex xs12>
            <v-toolbar-title class="headline">
              <img class="img" :src="logo" alt="" />
            </v-toolbar-title>
          </v-flex>
        </v-layout>
        <v-btn icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="custom-card-text white">
        <v-container fluid grid-list-md class="content">
          <v-layout>
            <v-flex xs4 sm3 md2 lg2>
              <ul ref="menu">
                <li v-for="i in list" :key="i.Id" :class="{ active: isActive(i.Id) }" @click="changeItem(i)">{{ i.Title }}</li>
              </ul>
            </v-flex>
            <v-flex xs8 sm9 md10 g10 black--text pa-2 class="info-style black--text">
              <div v-if="isText">
                <div v-html="item.Content"></div>
              </div>
              <img v-else :src="item.PicturePc" :alt="item.Title" style="width: 100%" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'announcement-001',
  data() {
    return {
      openStatus: false,
      checkBox: false,
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
    index() {
      return this.announcementCurrentIndex;
    },
    item() {
      return this.announcementCurrentItem;
    },
    isText() {
      return this.item.Content !== '';
    },
    viewDate() {
      return this.announcementViewDate;
    },
  },
  watch: {
    isOpen(v) {
      this.openStatus = v;
    },
    openStatus(v) {
      v || this.SET_ANNOUNCEMENT_IS_OPEN({ ischeck: false, status: v });
    },
  },
  created() {
    this.openStatus = this.isOpen;
    const status = Object.keys(this.item).length === 0;
    if (status) {
      this.SET_ANNOUNCEMENT_CURRENT_ITEM(this.list[0]);
    }
  },
  updated() {
    this.checkBox = !!this.viewDate;
    if (typeof this.index === 'number') {
      /** li 高度為 70px */
      const top = this.index * 70;
      this.$refs.menu.scrollTop = top;
    }
  },
  methods: {
    ...mapMutations(['SET_ANNOUNCEMENT_CURRENT_INDEX', 'SET_ANNOUNCEMENT_CURRENT_ITEM', 'SET_ANNOUNCEMENT_IS_OPEN', 'SET_ANNOUNCEMENT_VIEW_DATE']),
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
  },
};
</script>

<style lang="scss" scoped>
.custom-dialog {
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
      ul {
        list-style-type: none;
        padding: 0;
        max-height: 398px;
        overflow: auto;
        li {
          text-align: left;
          height: 70px;
          font-family: PingFangSC;
          font-size: 16px;
          font-weight: 600;
          font-stretch: normal;
          font-style: normal;
          line-height: 70px;
          letter-spacing: normal;
          color: #4d4d4d;
          padding-left: 20px;
          padding-right: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
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
      max-height: 400px;
      overflow: auto;
      padding: 4px 10px 4px 4px;
      text-align: left;
    }
  }
  .custom-card-note {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #eee;
  }
}
</style>
