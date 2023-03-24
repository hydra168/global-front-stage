<template>
  <!-- 團隊管理 -->
  <div class="TeamManagement">
    <!-- 搜尋 -->
    <v-row v-if="!isOpenTeam">
      <v-col cols="12">
        <v-text-field :label="textFilter('accountLabel')" v-model="data.username"> </v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field :label="textFilter('remarksLable')" v-model="data.remark"> </v-text-field>
      </v-col>
      <v-col cols="12">
        <v-select :label="textFilter('subordinateLabel')" v-model="data.type" :items="typeList" :item-text="getI18n" item-value="value"></v-select>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" block depressed :loading="isLoading" :disabled="isLoading" @click="search">{{ textFilter('searchBtn') }}</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <div v-if="!isOpenTeam">
      <v-row v-for="item in tableData" :key="item.id">
        <v-col>
          <div class="infoList">
            <div class="title">
              <v-icon :color="item.is_online ? 'green' : 'red'">
                {{ item.is_online ? 'check_circle_outline' : 'highlight_off' }}
              </v-icon>
              {{ item.username }}
              <span v-if="userName === item.username">{{ textFilter('currentAccount') }}</span>
            </div>
            <div class="content">
              <div class="row">
                <div>{{ textFilter('registrationTime') }}</div>
                <div>{{ item.created | formatDate }}</div>
                <div>{{ textFilter('lastLoginTime') }}</div>
                <div>{{ item.last_login | formatDate }}</div>
              </div>
              <div class="row">
                <div>{{ textFilter('remarks') }}</div>
                <div>{{ item.remark || '-' }}</div>
                <div>{{ textFilter('teamSize') }}</div>
                <div>{{ item.team_agent_count }}</div>
              </div>
              <div class="btn">
                <div :class="{ two: userName === item.username, three: userName !== item.username }" @click="detail(item)">
                  <span>{{ textFilter('detail') }}</span>
                </div>
                <div v-if="userName !== item.username" class="three" @click="modifyRemark(item)">
                  <span>{{ textFilter('modifyRemark') }}</span>
                </div>
                <div :class="{ two: userName === item.username, three: userName !== item.username }" @click="rebate(item)">
                  <span>{{ textFilter('rebate') }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="mt-5" color="primary" block depressed :loading="isLoading" :disabled="moreBtnStatus" @click="changePage">
            {{ textFilter(moreBtnStatus ? 'noMore' : 'loadMore') }}
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- 代理團隊 -->
    <TeamModal v-if="isOpenTeam" :info="itemObj" @search="callDetailApi" @close="closeModal" />

    <!-- 更改備註 -->
    <RemarkModal v-if="isOpenRemark" :isOpen="isOpenRemark" :info="itemObj" @update="updateRemark" @close="closeModal" />

    <!-- 返點/返佣 -->
    <RebateModal :isOpen="isOpenRebate" @close="closeModal" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import TeamModal from './teamModal.vue';
import RemarkModal from './remarkModal.vue';
import RebateModal from './rebateModal.vue';
import { deepCopy } from '@UTILS';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'TeamManagement',
  components: {
    TeamModal,
    RemarkModal,
    RebateModal,
  },
  data() {
    return {
      data: {
        username: '',
        remark: '',
        type: 1,
        page: 1,
        num: 10,
      },
      getI18n: e => this.textFilter(e.text),
      typeList: [
        {
          text: 'select1',
          value: 1,
        },
        {
          text: 'select0',
          value: 0,
        },
      ],
      searchData: {},
      tableData: [],
      itemObj: {},
      isOpenTeam: false,
      isOpenRemark: false,
      isOpenRebate: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencyTeam', 'userInfo', 'agencyStatus']),
    userName() {
      return this.userInfo.name || '';
    },
    totalPage() {
      const { total } = this.agencyTeam;
      const { num } = this.searchData;
      let info = 0;
      total && (info = Math.ceil(total / num));
      return info;
    },
    moreBtnStatus() {
      return this.totalPage ? this.totalPage <= this.searchData.page : true;
    },
  },
  watch: {
    'agencyTeam.list'(v) {
      v && (this.tableData = this.tableData.concat(v));
    },
    agencyStatus(v) {
      if (v && v === 'list') {
        this.closeModal(false);
        this.search();
      }
      v && this.SET_AGENCY_STATUS('');
    },
  },
  created() {
    this.SET_AGENCY_TEAM({});
    this.search();
  },
  methods: {
    ...mapActions(['GET_AGENCY_TEAM', 'GET_AGENCY_TEAM_REBATE', 'UPDATE_TEAM_REMARK', 'GET_AGENCY_TEAM_ITEM']),
    ...mapMutations(['SET_AGENCY_TEAM', 'SET_AGENCY_TEAM_REBATE', 'SET_AGENCY_STATUS', 'SET_AGENCY_TEAM_ITEM']),
    search() {
      this.tableData = [];
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi() {
      const { username, remark, type, page, num } = this.searchData;
      let input = { type, page, num };
      username && (input.username = username);
      remark && (input.remark = remark);
      this.GET_AGENCY_TEAM(input);
    },
    changePage() {
      this.searchData.page++;
      this.callListApi();
    },
    detail(item) {
      this.SET_AGENCY_TEAM_ITEM({});
      this.itemObj = item;
      this.isOpenTeam = true;
    },
    callDetailApi(input) {
      this.GET_AGENCY_TEAM_ITEM(input);
    },
    modifyRemark(item) {
      this.itemObj = item;
      this.isOpenRemark = true;
    },
    updateRemark(input) {
      this.UPDATE_TEAM_REMARK(input);
    },
    rebate(item) {
      this.GET_AGENCY_TEAM_REBATE({ target_id: item.user_id });
      this.isOpenRebate = true;
    },
    closeModal(status) {
      this.isOpenRebate = status;
      this.isOpenRemark = status;
      this.itemObj = {};
      this.isOpenTeam = status;
      this.SET_AGENCY_TEAM_REBATE([]);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_team_');
    },
  },
};
</script>

<style lang="scss" scoped>
.TeamManagement {
  .infoList {
    .title {
      color: #fff;
      background: map-get(map-get($colors, primary), base);
      display: inline-block;
      padding: 5px 20px;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding-top: 10px;
      border: solid 1px map-get(map-get($colors, primary), base);
      border-radius: 0 5px 5px 5px;
      .row {
        margin-left: 8px;
        margin-right: 8px;
        border-top-color: #bdbdbd;
        border-top-width: 1px;
        border-top-style: solid;
        &:nth-child(1) {
          border-top-width: 0px;
        }
        &:nth-last-child(1) {
          padding-bottom: 0;
        }
        & > div {
          width: 25%;
          word-break: break-all;
          &:nth-child(odd) {
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
          }
          &:nth-child(even) {
            padding-left: 5px;
          }
        }
      }
      .btn {
        margin-top: 10px;
        border-width: 1px;
        border-color: #e0e0e0;
        border-top-style: solid;
        & > div {
          &.two {
            width: 50%;
          }
          &.three {
            width: 33%;
          }
          display: inline-block;
          text-align: center;
          border-width: 1px;
          border-color: #e0e0e0;
          border-right-style: solid;
          &:nth-last-child(1) {
            border-width: 0px;
          }
          span {
            margin: 10px 0;
            display: block;
          }
        }
      }
    }
  }
}
</style>
