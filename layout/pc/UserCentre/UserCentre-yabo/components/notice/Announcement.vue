<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="3">
            <div class="d-flex align-center gap-15 font-size-14 grey--text">
              <label>查看 :</label>
              <v-select v-model="announcementType" :items="announcementTypes" :item-text="getI18n" item-value="value" outlined dense></v-select>
            </div>
          </v-col>
          <v-col cols="5">
            <div class="d-flex align-center gap-15 font-size-14 grey--text">
              <label class="width-50px">时间 :</label>
              <Daterange
                v-model="date"
                display-format="YYYY-MM-DD"
                no-title
                :solo="true"
                :outlined="true"
                :dense="true"
                :yabo="true"
                :input-props="dateRange.inputProps"
                :menu-props="dateRange.menuProps"
                :presets="dateRange.presets"
                startLabel="startTime"
                endLabel="endTime"
                presetLabel="shortcutOptions"
                separatorLabel="to"
              />
            </div>
          </v-col>
          <v-col class="d-flex" cols="4">
            <div class="flex-grow-1"></div>
            <v-btn class="width-100px" outlined color="grey" @click="reset">{{ $t('g_common_searchBar_resetBtn') }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-10px">
      <v-data-table
        :items="list"
        :loading="isLoading"
        :disable-sort="isLoading"
        class="elevation-1 game-record-table"
        :page="pagination.page"
        :items-per-page="pagination.itemsPerPage"
        hide-default-footer
        hide-default-header
      >
        <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
        <template slot="no-data">
          <v-alert v-if="!isLoading" :value="true" color="success" icon="warning">
            {{ textFilter('noInfo') }}
          </v-alert>
        </template>
        <template v-slot:item="{ item, expand, isExpanded }">
          <tr @click="handleExpand(item, isExpanded, expand)">
            <td class="black--text font-weight-600">{{ item.title }}</td>
            <td class="grey--text"><div class="width-400px nowrap" v-html="item.content"></div></td>
            <td>
              <div class="d-flex align-center">
                <span class="time text-no-wrap ml-2 grey--text"> {{ item.time | formatDate }}</span>
              </div>
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
      <v-pagination class="mt-5" v-model="pagination.page" :length="pagination.length" :total-visible="15" :disabled="isLoading"></v-pagination>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import { textFilter } from '@UTILS/i18n';
import Daterange from '@COM/Daterange';
import { dateRange } from '@UTILS/dateRange';
export default {
  components: {
    Daterange,
  },
  data() {
    return {
      announcementType: null,
      getI18n: e => this.textFilter(e.title),
      announcementTypes: [
        { title: 'all', value: null },
        { title: 'system', value: 0 },
        { title: 'maintain', value: 1 },
        { title: 'depositAndWithdrawal', value: 2 },
        { title: 'news', value: 3 },
      ],
      date: {},
      dateRange,
      pagination: {
        page: 1,
        length: 0,
        rowsPerPage: 10,
        totalItems: 0,
      },
    };
  },
  computed: {
    ...mapGetters(['announcementList', 'isLoading']),
    list() {
      const items = [];
      _.filter(this.announcementList, item => {
        return (this.announcementType === null || item.Type === this.announcementType) && this.compareTime(item.StartTime);
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
  },
  mounted() {
    if (!this.announcementList.length) {
      this.GET_ANNOUNCEMENT_LIST();
    } else {
      this.pagination.totalItems = this.list.length;
      this.pagination.length = Math.ceil(this.list.length / this.pagination.rowsPerPage);
      this.pagination.page = 1;
    }
  },
  methods: {
    ...mapActions(['GET_ANNOUNCEMENT_LIST']),
    handleExpand(item, isExpanded, expand) {
      item.isExpanded = isExpanded;
      item.expand = expand;
      if (isExpanded) {
        isExpanded = expand(false);
      } else {
        this.list.forEach(ann => {
          if (ann.id == item.id) {
            ann.expand && ann.expand(true);
          } else {
            ann.expand && ann.expand(false);
          }
        });
      }
    },
    compareTime(time) {
      if (this.date.start) {
        return (new Date(time).getTime() - new Date(this.date.start).getTime()) * (new Date(time).getTime() - new Date(this.date.end).getTime()) <= 0;
      } else {
        return true;
      }
    },
    reset() {
      this.announcementType = null;
      this.date = {};
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_notice_');
    },
  },
};
</script>

<style lang="scss" scoped>
.v-divider {
  background-color: #f1f1f1;
}
.nowrap {
  ::v-deep p {
    width: 100%;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
