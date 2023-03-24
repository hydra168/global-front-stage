<template>
  <div class="notice pt-0 pb-10">
    <v-tabs class="tabs" v-model="tab" fixed-tabs color="primary lighten-5" slider-color="transparent">
      <v-tab v-for="(tab, i) in items" :key="tab" :href="`#tab-${i}`" class="primary white--text tab-font" style="font-size: calc(4vw)">
        {{ textFilter(tab) }}
      </v-tab>
      <v-tab-item value="tab-0">
        <!-- <v-layout align-center justify-center>
          <v-flex xs6 text-center pa-2>
            <v-btn @click="deleteAll" :disabled="!list.length" width="100%" class="primary white--text" rounded
              >一鍵刪除<v-icon class="ml-1 font15">fa-trash</v-icon></v-btn
            >
          </v-flex>
          <v-flex xs6>
            <v-btn :loading="recievingAll" @click="recieveAll" :disabled="!list.length" width="100%" class="primary white--text" rounded
              >全部領取<v-icon class="ml-1 font15">fa-gift</v-icon></v-btn
            >
          </v-flex>
        </v-layout> -->
        <template v-if="list.length">
          <v-expansion-panels class="px-1 mt-2" v-model="currentItemId">
            <v-expansion-panel v-for="(item, i) in list" :key="i">
              <v-expansion-panel-header class="px-1" @click="handleContent(item)">
                <v-layout>
                  <v-flex xs9 pa-5>
                    <div class="ellidivsis-title content-title pb-2 grey--text text--darken-1">{{ item.send_time | formatDate }}</div>
                    <div :class="[{ 'ellipsis-title': currentItemId != i }, 'content-title']">{{ item.title }}</div>
                  </v-flex>
                  <v-flex xs3 py-5>
                    <v-chip class="d-flex justify-center" color="primary" outlined v-if="item.is_read">{{ textFilter('read') }}</v-chip>
                    <v-chip class="d-flex justify-center" filter color="primary" v-else>{{ textFilter('unread') }}</v-chip>
                  </v-flex>
                </v-layout>
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
          <v-pagination class="mt-5" v-model="pagination.page" :length="pagination.length" :total-visible="15" :disabled="isLoading"></v-pagination>
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
          <v-expansion-panels class="px-1 mt-2" v-model="currentAnnouncementId">
            <v-expansion-panel v-for="(item, i) in announcementList" :key="i">
              <v-expansion-panel-header
                class="px-1"
                @click="currentAnnouncement == item ? (currentAnnouncement = null) : (currentAnnouncement = item)"
              >
                <v-layout align-center>
                  <v-flex xs12 pa-5>
                    <div class="ellidivsis-title content-title pb-2 grey--text text--darken-1">{{ item.StartTime | formatDate }}</div>
                    <div :class="[{ 'ellipsis-title': currentAnnouncement != item }, 'content-title']">{{ item.Title }}</div>
                  </v-flex>
                </v-layout>
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
  components: {
    DeleteDialog,
    ReceiveDialog,
  },
  data() {
    return {
      tab: 'tab-0',
      checkAll: false,
      // rowsPerPage: 10,
      selectItems: [10, 25, 50],
      selectedId: 0,
      selectedIds: [],
      list: [],
      headers: [
        { text: '时间', align: 'center', sortable: false, class: 'thead-color', value: 'send_time' },
        { text: '标题', align: 'left', sortable: false, class: 'thead-color', value: 'title' },
        { sortable: false },
      ],
      pagination: {
        page: 1,
        length: 0,
        // paginationLength: 0,
        rowsPerPage: 10,
        // sortBy: '',
        // descending: true,
        totalItems: 0,
      },
      dialog: {
        delete: false,
        receive: false,
        delString: '',
      },
      img: {
        right: require('./assets/icon/right-arrow.png'),
        bottom: require('./assets/icon/bottom-arrow.png'),
      },
      currentItemId: null,
      currentItem: {},
      items: ['letter', 'announcement'],
      currentPage: 1,
      currentAnnouncementId: 0,
      currentAnnouncement: {},
    };
  },
  computed: {
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
    ...mapGetters(['announcementList', 'mailNumber', 'isLoading', 'stationLetterList', 'stationLetter', 'deleteLetterStatus', 'receiveRewardStatus']),
  },
  watch: {
    checkAll() {
      this.selected = [];
      this.selected = this.checkAll ? this.list : [];
    },
    'pagination.page'(next, prev) {
      this.GET_STATION_LETTER_LIST({
        page: next,
        page_num: this.pagination.rowsPerPage,
        is_show_all: 1,
      });
    },
    stationLetterList(result) {
      this.list = result.list == null ? [] : result.list;
      // const first = _.first(this.list);
      // if (first) {
      //   this.handleContent(first);
      // }
      this.pagination.totalItems = result.count;
      this.pagination.length = Math.ceil(result.count / this.pagination.rowsPerPage);
      this.pagination.page = result.page;
    },
    stationLetter(result) {
      const now = new Date();
      let listAllDetail = true;
      this.list.forEach(item => {
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
        page_num: this.pagination.rowsPerPage,
        is_show_all: 1,
      });
    },
  },
  mounted() {
    this.GET_STATION_LETTER_LIST({
      page: this.currentPage,
      page_num: this.pagination.rowsPerPage,
      is_show_all: 1,
    });
    this.SET_FULL_WIDTH(1);
  },
  methods: {
    ...mapActions(['GET_STATION_LETTER_LIST', 'GET_STATION_LETTER', 'POST_RECEIVE_REWARD', 'POST_DELETE_LETTERS']),
    ...mapMutations(['SET_MESSAGE', 'SET_FULL_WIDTH', 'SET_DELETE_LETTER_STATUS', 'SET_RECEIVE_REWARD_STATUS']),
    getMailContent(item) {
      this.GET_STATION_LETTER(item);
    },
    deleteMail() {
      const ids = [this.selectedId];
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
    handleDelete(id) {
      this.selectedId = id;
      this.dialog.delString = this.textFilter('removeText');
      this.dialog.delete = true;
    },
    handleReceive(item) {
      // const now = new Date();
      // const end = new Date(item.detail.event_end_time);
      // if (now > end) {
      //   item.rewardExpired = true;
      // } else if (!item.detail.is_received) {
      this.POST_RECEIVE_REWARD({ id: item.id });
      // }
    },
    // dialog 相關
    deleteDialog(val) {
      this.dialog.delete = val;
    },
    receiveDialog(val) {
      this.dialog.receive = val;
    },
    recieveAll() {},
    deleteAll() {},
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_notice_');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-tab--active {
  opacity: 0.6;
}
.content-title {
  line-height: 1.375;
  height: auto;
  display: block;
  color: #757575;
  &.ellipsis-title {
    height: 1.375em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
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
<style lang="scss"></style>
