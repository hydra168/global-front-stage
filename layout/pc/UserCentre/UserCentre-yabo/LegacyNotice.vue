<template>
  <div class="notice">
    <v-divider></v-divider>
    <v-tabs class="mt-5" v-model="currentTab">
      <v-tab :href="`#tab_${i}`" v-for="(item, i) in ['letter', 'announcement']" :key="i">{{ textFilter(item) }}</v-tab>
      <v-tabs-slider></v-tabs-slider>
      <v-tab-item value="tab_0">
        <div class="d-flex flex-row-reverse mb-5">
          <v-btn class="white--text" color="primary" depressed normal @click="handleDelete()" :disabled="!selected.length">
            {{ textFilter('deleteSelected') }}
          </v-btn>
        </div>
        <v-data-table
          :headers="headers"
          :items="list"
          :loading="isLoading"
          :disable-sort="isLoading"
          class="elevation-1 game-record-table"
          :page.sync="pagination.page"
          :items-per-page.sync="pagination.itemsPerPage"
          show-select
          v-model="selected"
          hide-default-footer
        >
          <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
          <template slot="no-data">
            <v-alert v-if="!isLoading" :value="true" color="success" icon="warning">
              {{ textFilter('empty') }}
            </v-alert>
          </template>
          <template v-slot:item="{ item, isSelected, select, expand, isExpanded }">
            <tr @click="handleContent(item, isExpanded, expand)">
              <td><v-checkbox :value="isSelected" @change="select"></v-checkbox></td>
              <td class="text-xs-left first-td" width="270px">
                <div class="d-flex align-center">
                  <button class="read-btn" v-if="item.is_read">{{ textFilter('read') }}</button>
                  <button class="noread-btn primary" v-else>{{ textFilter('unread') }}</button>
                  <span class="time text-no-wrap ml-2">
                    {{ item.send_time | formatDate }}
                  </span>
                </div>
              </td>
              <td class="text-xs-left second-td" :class="{ nowrap: !isExpanded }">
                {{ item.title }}
              </td>
              <td class="text-xs-right">
                <a>
                  <img :src="isExpanded ? img.bottom : img.right" />
                </a>
              </td>
            </tr>
          </template>
          <!-- expansion content -->
          <template v-slot:expanded-item="{ item }">
            <tr>
              <td colspan="4">
                <v-card flat class="expand-content">
                  <v-card-text v-html="item.detail ? item.detail.content : ''"></v-card-text>
                  <v-card-actions v-if="item.detail ? item.detail.type == 1 : false" class="receive">
                    <v-btn depressed class="white--text ml-auto" color="primary" @click="handleReceive(item)" :disabled="item.detail.is_received">
                      {{ textFilter(item.detail.is_received ? 'received' : 'receive') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-pagination class="mt-5" v-model="pagination.page" :length="pagination.length" :total-visible="15" :disabled="isLoading"></v-pagination>
      </v-tab-item>
      <v-tab-item value="tab_1">
        <div class="d-flex justify-end mb-5">
          <v-chip
            class="mx-3"
            label
            :color="`primary`"
            :outlined="!isActive(type.value)"
            @click="activate(type.value)"
            v-for="(type, i) in announcementTypes"
            :key="i"
            >{{ textFilter(type.title) }}</v-chip
          >
        </div>
        <v-data-table
          :headers="headers"
          :items="list2"
          :loading="isLoading"
          :disable-sort="isLoading"
          class="elevation-1 game-record-table"
          :page="pagination2.page"
          :items-per-page="pagination2.itemsPerPage"
          hide-default-footer
        >
          <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
          <template slot="no-data">
            <v-alert v-if="!isLoading" :value="true" color="success" icon="warning">
              {{ textFilter('noInfo') }}
            </v-alert>
          </template>
          <template v-slot:item="{ item, isSelected, select, expand, isExpanded }">
            <tr @click="handleExpand(item, isExpanded, expand)">
              <td class="text-xs-left first-td" width="120px">
                <div class="d-flex align-center">
                  <span class="time text-no-wrap ml-2"> {{ item.time | formatDate }}</span>
                </div>
              </td>
              <td class="text-xs-left second-td" :class="{ nowrap: !isExpanded }">{{ item.title }}</td>
              <td class="text-right justify-right">
                <a>
                  <img :src="isExpanded ? img.bottom : img.right" />
                </a>
              </td>
            </tr>
          </template>
          <template v-slot:expanded-item="{ item }">
            <tr>
              <td colspan="4">
                <v-card flat class="expand-content">
                  <v-card-text v-if="!!item.content" v-html="item.content"></v-card-text>
                  <div v-else-if="!!item.picturePc">
                    <div class="imgcontent">
                      <img :src="item.picturePc" />
                    </div>
                  </div>
                </v-card>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-pagination class="mt-5" v-model="pagination2.page" :length="pagination2.length" :total-visible="15" :disabled="isLoading"></v-pagination>
      </v-tab-item>
    </v-tabs>
    <DeleteDialog :isOpen="dialogDelete" :delString="this.dialog.delString" @confirm="deleteMail" @close="deleteDialog"></DeleteDialog>
    <ReceiveDialog :isOpen="this.dialog.receive" @confirm="receiveDialog"></ReceiveDialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import DeleteDialog from './components/notice/DeleteDialog';
import ReceiveDialog from './components/notice/ReceiveDialog';
import _ from 'lodash';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Notice',
  components: {
    DeleteDialog,
    ReceiveDialog,
  },
  data() {
    return {
      checkAll: false,
      // rowsPerPage: 10,
      selectItems: [10, 25, 50],
      selected: [],
      list: [],
      pagination: {
        page: 1,
        length: 0,
        rowsPerPage: 10,
        totalItems: 0,
      },
      pagination2: {
        page: 1,
        length: 0,
        rowsPerPage: 10,
        totalItems: 0,
      },
      dialog: {
        delete: false,
        receive: false,
        delString: '',
      },
      detail: {
        id: 0,
        type: 0,
        receive: false,
        mailContent: '',
      },
      img: {
        right: require('./assets/icon/right-arrow.png'),
        bottom: require('./assets/icon/bottom-arrow.png'),
      },
      currentPage: 1,
      currentTab: 'tab_0',
      announcementTypes: [
        { title: 'all', value: null },
        { title: 'system', value: 0 },
        { title: 'maintain', value: 1 },
        { title: 'depositAndWithdrawal', value: 2 },
      ],
      currentAnnouncementType: null,
    };
  },
  computed: {
    dialogDelete() {
      return this.dialog.delete;
    },
    ...mapGetters(['mailNumber', 'announcementList', 'isLoading', 'stationLetterList', 'stationLetter', 'deleteLetterStatus', 'receiveRewardStatus']),
    list2() {
      const items = [];
      _.filter(this.announcementList, item => {
        return this.currentAnnouncementType == null || item.Type == this.currentAnnouncementType;
      }).forEach((item, i) => {
        items.push({
          id: item.Id,
          time: item.StartTime,
          title: item.Title,
          content: item.Content,
          picturePc: item.PicturePc,
        });
      });
      return items;
    },
    headers() {
      return [
        { text: this.textFilter('time'), align: 'center', sortable: false, class: 'thead-color', value: 'send_time' },
        { text: this.textFilter('title'), align: 'left', sortable: false, class: 'thead-color', value: 'title' },
        { sortable: false },
      ];
    },
  },
  watch: {
    checkAll() {
      this.selected = [];
      this.selected = this.checkAll ? this.list : [];
    },
    'pagination.page'(next, prev) {
      this.currentPage = next;
      this.GET_STATION_LETTER_LIST({
        page: next,
        page_num: this.pagination.rowsPerPage,
        is_show_all: 1,
      });
    },
    stationLetterList(result) {
      this.list.forEach(item => {
        if (result.list != null && result.list != []) {
          const target = result.list.find(listItem => listItem.id == item.id);
          if (target != null) {
            target.detail = item.detail;
          }
        }
      });
      this.list = result.list;
      this.pagination.totalItems = result.count;
      this.pagination.length = Math.ceil(result.count / this.pagination.rowsPerPage);
      this.pagination.page = result.page;
    },
    stationLetter(result) {
      this.currentItem.detail = result;
      this.list.forEach(item => {
        item.is_read = item.id === result.id ? true : item.is_read;
        if (item.id !== result.id && item.expand) {
          item.expand(false);
        }
      });
      this.currentItem.expand();
      this.loading = false;
    },
    deleteLetterStatus(status) {
      if (status) {
        this.dialog.delete = false;
      }
      this.SET_DELETE_LETTER_STATUS(0);
    },
    receiveRewardStatus(status) {
      if (status) {
        this.currentItem.detail.is_received = true;
        this.dialog.receive = true;
      }
      this.SET_RECEIVE_REWARD_STATUS(0);
    },
    mailNumber(num) {
      this.GET_STATION_LETTER_LIST({
        page: this.currentPage,
        page_num: this.pagination.rowsPerPage,
        is_show_all: 1,
      });
    },
    list2(items) {
      this.pagination2.totalItems = items.length;
      this.pagination2.length = Math.ceil(items.length / this.pagination2.rowsPerPage);
      this.pagination2.page = 1;
    },
  },
  mounted() {
    this.GET_STATION_LETTER_LIST({
      page: this.currentPage,
      page_num: this.pagination.rowsPerPage,
      is_show_all: 1,
    });
    if (!this.announcementList.length) {
      this.GET_ANNOUNCEMENT_LIST();
    } else {
      this.pagination2.totalItems = this.list2.length;
      this.pagination2.length = Math.ceil(this.list2.length / this.pagination2.rowsPerPage);
      this.pagination2.page = 1;
    }
  },
  methods: {
    ...mapMutations(['SET_DELETE_LETTER_STATUS', 'SET_RECEIVE_REWARD_STATUS']),
    ...mapActions(['GET_ANNOUNCEMENT_LIST', 'GET_STATION_LETTER_LIST', 'GET_STATION_LETTER', 'POST_RECEIVE_REWARD', 'POST_DELETE_LETTERS']),
    getMailContent(item) {
      this.loading = true;
      this.GET_STATION_LETTER(item);
      this.currentItem = item;
    },
    deleteMail() {
      const ids = [];
      this.selected.forEach(item => {
        ids.push(item.id);
      });
      this.loading = true;
      this.POST_DELETE_LETTERS({ ids });
    },
    // event 處理相關
    handleContent(item, isExpanded, expand) {
      item.isExpanded = isExpanded;
      item.expand = expand;
      if (this.loading) {
        return;
      }
      if (isExpanded && this.loading !== true) {
        isExpanded = expand(false);
      } else {
        this.getMailContent(item);
      }
    },
    handleDelete() {
      const temp = [];
      this.selected.forEach(item => {
        if (!item.is_read) {
          temp.push(item.id);
        }
      });
      this.dialog.delString = this.textFilter(temp.length === 0 ? 'deleteText1' : 'deleteText2');
      this.dialog.delete = true;
    },
    handleReceive(item) {
      this.POST_RECEIVE_REWARD({ id: item.id });
    },
    // dialog 相關
    deleteDialog(val) {
      this.dialog.delete = val;
    },
    receiveDialog(val) {
      this.dialog.receive = val;
    },
    handleExpand(item, isExpanded, expand) {
      item.isExpanded = isExpanded;
      item.expand = expand;
      if (isExpanded) {
        isExpanded = expand(false);
      } else {
        this.list2.forEach(ann => {
          if (ann.id == item.id) {
            ann.expand && ann.expand(true);
          } else {
            ann.expand && ann.expand(false);
          }
        });
      }
    },
    isActive(type) {
      return type == this.currentAnnouncementType;
    },
    activate(type) {
      return (this.currentAnnouncementType = type);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_notice_');
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  .thead-color {
    background-color: #14805e;
  }
  .expand-content * {
    line-height: 1.375;
  }
}

.imgcontent {
  img {
    width: 100%;
  }
}

.first-td {
  padding-left: 35px !important;
}

.second-td {
  max-width: 500px;
  padding-left: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nowrap {
  white-space: nowrap;
}

.read-btn {
  width: 55px;
  height: 29px;
  border-radius: 4px;
  background-color: #9e9e9e;
  color: #ffffff;
}

.noread-btn {
  width: 55px;
  height: 29px;
  border-radius: 4px;
  color: #ffffff;
}

.diy-page-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .diy-page {
    position: absolute;
    margin-left: 350px;
    display: flex;
    align-items: center;
    span {
      padding-left: 15px;
    }
    .diy-page-select {
      width: 45px !important;
      // .v-input__slot {
      //   width: 60px !important;
      // }
    }
  }
}
</style>
