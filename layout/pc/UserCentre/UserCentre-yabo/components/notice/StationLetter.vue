<template>
  <div class="mt-10px">
    <v-card>
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
        <template v-slot:header.is_read>
          <v-icon :disabled="!selected.length" @click="handleDelete">mdi-trash-can-outline</v-icon>
        </template>
        <template v-slot:item="{ item, isSelected, select, expand, isExpanded }">
          <tr @click="handleContent(item, isExpanded, expand)">
            <td><v-checkbox :value="isSelected" hide-details @change="select"></v-checkbox></td>
            <td class="text-xs-left first-td">
              <div class="d-flex align-center">
                <img class="width-20px" :src="readImg" v-if="item.is_read" />
                <img class="width-20px" :src="unreadImg" v-else />
                <img class="width-20px ml-20px" :src="receiveImg" v-if="isReceivable(item)" @click="handleReceive(item)" />
              </div>
            </td>
            <td class="text-xs-left second-td black--text font-weight-600" :class="{ nowrap: !isExpanded }">
              {{ item.title }}
            </td>
            <td>
              <div class="d-flex align-center">
                <span class="time text-no-wrap ml-2 grey--text"> {{ item.send_time | formatDate }}</span>
              </div>
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
    </v-card>
    <DeleteDialog :isOpen="dialogDelete" :delString="this.dialog.delString" @confirm="deleteMail" @close="deleteDialog"></DeleteDialog>
    <ReceiveDialog :isOpen="this.dialog.receive" @confirm="receiveDialog"></ReceiveDialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import DeleteDialog from './DeleteDialog';
import ReceiveDialog from './ReceiveDialog';
import { textFilter } from '@UTILS/i18n';
import readImg from '../../assets/icon/read.png';
import unreadImg from '../../assets/icon/unread.png';
import receiveImg from '../../assets/icon/receive.png';
export default {
  components: {
    DeleteDialog,
    ReceiveDialog,
  },
  data() {
    return {
      readImg,
      unreadImg,
      receiveImg,
      selected: [],
      list: [],
      pagination: {
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
      currentPage: 1,
    };
  },
  computed: {
    dialogDelete() {
      return this.dialog.delete;
    },
    ...mapGetters(['mailNumber', 'isLoading', 'stationLetterList', 'stationLetter', 'deleteLetterStatus', 'receiveRewardStatus']),
    isReceivable() {
      return item => item.type === 1 && !item.is_received;
    },
    headers() {
      return [{ sortable: false, value: 'is_read' }, { sortable: false }, { sortable: false }];
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
      this.$emit('updateUnreadCount', result.unread_count);
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
  },
  mounted() {
    this.GET_STATION_LETTER_LIST({
      page: this.currentPage,
      page_num: this.pagination.rowsPerPage,
      is_show_all: 1,
    });
  },
  methods: {
    ...mapMutations(['SET_DELETE_LETTER_STATUS', 'SET_RECEIVE_REWARD_STATUS']),
    ...mapActions(['GET_STATION_LETTER_LIST', 'GET_STATION_LETTER', 'POST_RECEIVE_REWARD', 'POST_DELETE_LETTERS']),
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
      this.selected = [];
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
      item.is_received = true;
      this.POST_RECEIVE_REWARD({ id: item.id });
    },
    // dialog 相關
    deleteDialog(val) {
      this.dialog.delete = val;
    },
    receiveDialog(val) {
      this.dialog.receive = val;
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_notice_');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-input--selection-controls {
  margin-top: 0;
}
</style>
