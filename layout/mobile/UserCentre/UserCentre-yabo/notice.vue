<template>
  <div class="notice">
    <v-tabs v-model="tab" fixed-tabs slider-color="transparent" class="tabBox">
      <v-tab v-for="(tab, i) in items" :key="i" :href="`#tab-${i}`" style="font-size: calc(4vw)" active-class="activeTabs">
        {{ tab.name }}
        <v-badge v-show="hasUnreadMail(tab)" :content="unreadCount" offset-x="-2" offset-y="-2" color="rgba(255, 52, 52, 1)"></v-badge>
      </v-tab>
      <v-tab-item value="tab-0">
        <v-card class="ma-1" v-if="listStationLetter.length">
          <v-container class="px-4 py-0">
            <v-row align="center">
              <v-col cols="2">
                <v-checkbox v-model="checkAll"></v-checkbox>
              </v-col>
              <v-col offset="6" cols="4" class="d-flex justify-end">
                <v-icon :disabled="!this.selectedIds.some(Boolean)" @click="handleDeleteMultiple">mdi-trash-can-outline</v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <template v-if="listStationLetter.length">
          <v-expansion-panels class="px-1 mt-2" v-model="currentItemId">
            <v-expansion-panel v-for="(item, i) in listStationLetter" :key="i">
              <v-expansion-panel-header class="px-1" expand-icon="" @click="handleContent(item)">
                <v-container>
                  <v-row align="center">
                    <v-col cols="2">
                      <v-checkbox v-model="selectedIds[i]" @click="checkCancelBubble"></v-checkbox>
                    </v-col>
                    <v-col cols="6">
                      <div :class="[{ 'ellipsis-title': currentItemId != i }]" class="content-title black--text font-size-14px font-weight-600">
                        {{ item.title }}
                      </div>
                    </v-col>
                    <v-col cols="4">
                      <div class="send_time text-end">{{ item.send_time | formatDate }}</div>
                      <div class="sendtimeBox mt-2">
                        <v-chip class="receive mr-2" v-if="isReceivable(item)" @click="beforeReceive(item)"></v-chip>
                        <v-chip class="isRead mr-1" v-if="item.is_read"></v-chip>
                        <v-chip class="unRead mr-1" v-else></v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-progress-circular
                  v-if="!item.detail && currentItem.id === item.id"
                  indeterminate
                  color="primary"
                  style="margin-left: 45%"
                ></v-progress-circular>
                <div v-else-if="!!item.detail">
                  <div class="py-5 htmlcontent" v-html="item.detail.content"></div>
                  <div>
                    <v-btn
                      rounded
                      depressed
                      class="primary white--text"
                      v-if="item.detail.type === 1"
                      :disabled="item.detail.is_received"
                      @click="handleReceive(item)"
                    >
                      {{ textFilter(item.detail.is_received ? 'received' : 'receive') }}
                    </v-btn>
                    <v-btn rounded depressed class="ml-2 primary white--text" @click="handleDelete(item.id)">{{ textFilter('deleteBtn') }}</v-btn>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <v-layout v-else nodata align-center grey--text>
          <v-flex text-center>
            <span>{{ textFilter('noInfo') }}</span>
          </v-flex>
        </v-layout>
        <DeleteDialog :isOpen="this.dialog.delete" @confirm="deleteMail" @close="deleteDialog"></DeleteDialog>
        <ReceiveDialog :isOpen="this.dialog.receive" @confirm="receiveDialog" @close="receiveDialog"></ReceiveDialog>
      </v-tab-item>
      <v-tab-item value="tab-1">
        <template v-if="announcementList.length">
          <!-- <v-card class="ma-3 px-2 py-4">
            <div class="d-flex align-center gap-15 font-size-14 grey--text">
              <v-select
                v-model="announcementType"
                :items="announcementTypes"
                :item-text="getI18n"
                item-value="value"
                outlined
                dense
                hide-details
              ></v-select>
            </div>
            <div class="d-flex align-center gap-15 font-size-14 grey--text">
              <v-text-field
                v-model="rangeDatesText"
                label="日期范围"
                readonly
                @click="dateModalShow = true"
                clearable
                hide-details
              ></v-text-field>
              <v-dialog ref="dialog" v-if="dateModalShow" v-model="dateModalShow" persistent width="290px">
                <v-date-picker v-model="rangeDates" color="primary" range no-title locale="zh-CN">
                  <v-btn color="primary" outlined @click="dateModalShow = false">{{ $t('g_com_daterange_cancelBtn') }}</v-btn>
                  <v-btn color="primary" depressed @click="rangeDatesHandler()">{{ $t('g_com_daterange_confirmBtn') }}</v-btn>
                </v-date-picker>
              </v-dialog>
            </div>
          </v-card> -->
          <v-expansion-panels class="px-1 mt-2" v-model="currentAnnouncementId">
            <v-expansion-panel v-for="(item, i) in listAnnouncement" :key="i">
              <v-expansion-panel-header
                class="px-1"
                expand-icon=""
                @click="currentAnnouncement == item ? (currentAnnouncement = null) : (currentAnnouncement = item)"
              >
                <v-container>
                  <v-row align="center">
                    <v-col offset="1" cols="7">
                      <div
                        :class="[{ 'ellipsis-title': currentAnnouncement != item }]"
                        class="content-title black--text font-size-14px font-weight-600"
                      >
                        {{ item.Title }}
                      </div>
                      <div class="mt-1 grey--text nowrap" v-html="item.Content"></div>
                    </v-col>
                    <v-col cols="4">
                      <div class="send_time text-end">{{ item.StartTime | formatDate }}</div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="!!item.Content">
                  <div class="py-5 htmlcontent" v-html="item.Content"></div>
                </div>
                <div v-else-if="!!item.PictureMobile">
                  <div class="py-5 imgcontent">
                    <img :src="item.PictureMobile" />
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <v-layout v-else nodata align-center grey--text>
          <v-flex text-center>
            <span>{{ textFilter('noInfo') }}</span>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import DeleteDialog from './components/DeleteDialog';
import ReceiveDialog from './components/ReceiveDialog';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import _ from 'lodash';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'notice',
  props: {
    userInfoClass: {
      type: String,
      default: 'userName',
    },
  },
  components: {
    DeleteDialog,
    ReceiveDialog,
  },
  data() {
    return {
      tab: 'tab-0',
      checkAll: false,
      // rowsPerPage: 10,
      // selectItems: [10, 25, 50],
      selectedMails: [],
      listStationLetter: [],
      unreadCount: 0,
      headers: [
        { text: '时间', align: 'center', sortable: false, class: 'thead-color', value: 'send_time' },
        { text: '标题', align: 'left', sortable: false, class: 'thead-color', value: 'title' },
        { sortable: false },
      ],
      pagination: {
        totalItems: 0,
      },
      dialog: {
        delete: false,
        receive: false,
        delString: '',
      },
      currentItemId: null,
      currentItem: {},
      items: [{ name: '個人消息' }, { name: '系統消息' }],
      currentPage: 1,
      currentAnnouncementId: null,
      currentAnnouncement: {},
      announcementType: null,
      getI18n: e => this.textFilter(e.title),
      announcementTypes: [
        { title: 'all', value: null },
        { title: 'system', value: 0 },
        { title: 'maintain', value: 1 },
        { title: 'depositAndWithdrawal', value: 2 },
        { title: 'news', value: 3 },
      ],
      rangeDates: [],
      dateModalShow: false,
    };
  },
  computed: {
    hasUnreadMail() {
      return tab => tab.name === '個人消息' && this.unreadCount > 0;
    },

    selectedIds() {
      return this.listStationLetter.map(item => false);
    },
    dialogDelete() {
      return this.dialog.delete;
    },
    content() {
      return this.stationLetter.mailContent;
    },
    isReceive() {
      return this.stationLetter.receive;
    },
    openPanel() {
      return this.stationLetter.id;
    },
    isReceivable() {
      return item => item.type === 1 && !item.is_received;
    },
    rangeDatesText: {
      get() {
        return this.rangeDates.join(`~`);
      },
      set(newValue) {
        this.rangeDates = [];
        return newValue;
      },
    },
    listAnnouncement() {
      return this.announcementList.filter(item => {
        return (this.announcementType === null || item.Type === this.announcementType) && this.compareTime(item.StartTime);
      });
    },
    ...mapGetters(['announcementList', 'mailNumber', 'isLoading', 'stationLetterList', 'stationLetter', 'deleteLetterStatus', 'receiveRewardStatus']),
  },
  watch: {
    checkAll(value) {
      this.selectedIds.forEach((item, index, thisArray) => {
        thisArray[index] = value;
      });
    },
    'pagination.totalItems'(next, prev) {
      this.GET_STATION_LETTER_LIST({
        page: this.currentPage,
        page_num: next,
        is_show_all: 1,
      });
    },
    stationLetterList(result) {
      this.listStationLetter = result.list == null ? [] : result.list;
      this.pagination.totalItems = result.count;
      this.unreadCount = result.unread_count;
    },
    stationLetter(result) {
      const now = new Date();
      this.listStationLetter.forEach(item => {
        if (item.id == result.id) {
          item.is_read = true;
          item.detail = result;
          const end = new Date(item.detail.event_end_time);
          if (item.detail.type == 1 && this.recievingAll) {
            this.handleReceive(item);
          }
        }
      });
      this.$forceUpdate();
    },
    deleteLetterStatus(status) {
      if (status) {
        this.dialog.delete = false;
      }
      this.SET_DELETE_LETTER_STATUS(0);
    },
    receiveRewardStatus(status) {
      if (status) {
        this.getMailContent(this.currentItem);
      }
      this.SET_RECEIVE_REWARD_STATUS(0);
      this.dialog.receive = true;
    },
    mailNumber(num) {
      this.GET_STATION_LETTER_LIST({
        page: this.currentPage,
        page_num: this.pagination.totalItems,
        is_show_all: 1,
      });
    },
  },
  mounted() {
    this.GET_STATION_LETTER_LIST({
      page: this.currentPage,
      is_show_all: 1,
    });
    this.SET_FULL_WIDTH(1);
  },
  methods: {
    ...mapActions(['GET_STATION_LETTER_LIST', 'GET_STATION_LETTER', 'POST_RECEIVE_REWARD', 'POST_DELETE_LETTERS']),
    ...mapMutations(['SET_MESSAGE', 'SET_FULL_WIDTH', 'SET_DELETE_LETTER_STATUS', 'SET_RECEIVE_REWARD_STATUS']),
    // 以日期搜尋
    rangeDatesHandler() {
      this.dateModalShow = false;
    },
    getMailContent(item) {
      this.GET_STATION_LETTER(item);
    },
    deleteMail() {
      const ids = this.selectedMails;
      this.loading = true;
      this.POST_DELETE_LETTERS({ ids });
    },
    // event 處理相關
    handleContent(item) {
      if (this.isLoading) {
        return;
      }
      if (this.currentItem.id != item.id) {
        this.currentItem = item;
        this.getMailContent(item);
      } else {
        this.currentItem = {};
      }
    },
    checkCancelBubble(e) {
      e.cancelBubble = true;
      this.$forceUpdate();
    },
    handleDeleteMultiple() {
      this.selectedMails = [];
      this.selectedIds.forEach((item, index) => {
        if (item) {
          this.selectedMails.push(this.listStationLetter[index].id);
        }
      });
      this.openDeleteDialog();
    },
    handleDelete(id) {
      this.selectedMails = [id];
      this.openDeleteDialog();
    },
    openDeleteDialog() {
      this.dialog.delString = this.textFilter('removeText');
      this.dialog.delete = true;
    },
    beforeReceive(item) {
      item.is_received = true;
      this.currentItem = item;
      this.handleReceive(item);
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
    compareTime(time) {
      if (this.rangeDates[0]) {
        return (
          (new Date(time).getTime() - new Date(this.rangeDates[0]).getTime()) * (new Date(time).getTime() - new Date(this.rangeDates[1]).getTime()) <=
          0
        );
      } else {
        return true;
      }
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_notice_');
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  padding-top: 70px;
  padding-bottom: 100px;
  background: rgb(246, 246, 246);
  height: 120vh;
  ::v-deep .v-badge__badge {
    width: 25px;
    height: 15px;
    border-radius: 7.5px;
    padding: 2px;
  }
  ::v-deep .tabBox {
    .v-item-group.theme--light.v-slide-group.v-tabs-bar.v-tabs-bar--is-mobile.primary--text {
      margin: 12px;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    }
  }
  .v-item-group {
    margin-bottom: 20px;
  }
  .v-expansion-panel-header {
    padding: 0;
  }
  .sendtimeBox {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    .v-chip.v-size--default {
      border-radius: 0;
    }
  }
  .send_time {
    // -webkit-transform: scale(0.83);
    font-size: 10px;
    color: #434755;
    height: 12px;
    width: 70px;
    overflow: hidden;
  }
  .isRead {
    height: 22px;
    background: url('./assets/img/isRead.png') no-repeat center center/contain;
  }
  .unRead {
    height: 22px;
    background: url('./assets/img/unRead.png') no-repeat center center/contain;
  }
  .receive {
    height: 22px;
    background: url('./assets/img/receive.png') no-repeat center center/contain;
  }
  .tabBox {
    .v-item-group.theme--light.v-slide-group.v-tabs-bar.v-tabs-bar--is-mobile.primary--text {
      margin: 12px;
    }
  }
  .activeTabs {
    color: rgb(11, 171, 94);
    position: relative;
  }
  .activeTabs::before {
    opacity: 0 !important;
  }
  .activeTabs::after {
    content: '';
    height: 3px;
    background: rgb(11, 171, 94);
    width: 37%;
    opacity: 1 !important;
    position: absolute;
    bottom: 0;
    left: 31%;
  }
}
.v-tab--active {
  opacity: 0.6;
}
.content-title {
  line-height: 1.375;
  height: auto;
  display: block;
  &.ellipsis-title {
    height: 1.375em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
}
.nowrap {
  ::v-deep p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
}
.font15 {
  font-size: 15px;
}
.htmlcontent {
  border-top: 1px solid currentColor;
  font-size: 14px;
  color: #666;
}
.imgcontent {
  img {
    width: 100%;
  }
}
.nodata {
  height: calc(100vh - 56px - 56px - 48px);
}
</style>
