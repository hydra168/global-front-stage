<template>
  <!-- 團隊管理 -->
  <div class="TeamManagement">
    <v-divider></v-divider>
    <!-- 搜尋 -->
    <v-row justify="space-between" align="center">
      <v-col>
        <v-text-field :label="textFilter('accountLabel')" v-model="data.username"> </v-text-field>
      </v-col>
      <v-col>
        <v-text-field :label="textFilter('remarksLable')" v-model="data.remark"> </v-text-field>
      </v-col>
      <v-col>
        <v-select :label="textFilter('subordinateLabel')" v-model="data.type" :items="typeList" :item-text="getI18n" item-value="value"></v-select>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" @click="search" depressed>{{ textFilter('searchBtn') }}</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <v-row>
      <v-col>
        <v-data-table
          :headers="tableHeaders"
          :items="tableData"
          :loading="isLoading"
          :hide-default-header="true"
          class="elevation-1 mb-3"
          :no-data-text="textFilter('noData')"
          hide-default-footer
        >
          <template v-slot:header="{ props: { headers } }">
            <thead>
              <tr>
                <th v-for="item in headers" :key="item.text">
                  {{ textFilter(item.text) }}
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:[`item.is_online`]="{ item }">
            <v-icon :color="item.is_online ? 'primary' : 'red'">
              {{ item.is_online ? 'check_circle_outline' : 'highlight_off' }}
            </v-icon>
          </template>
          <template v-slot:[`item.remark`]="{ item }">
            {{ item.remark || '-' }}
          </template>
          <template v-slot:[`item.username`]="{ item }">
            {{ item.username }}
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" v-show="userName === item.username">info</v-icon>
              </template>
              <span>{{ textFilter('currentAccount') }}</span>
            </v-tooltip>
          </template>
          <template v-slot:[`item.created`]="{ item }">
            {{ item.created | formatDate }}
          </template>
          <template v-slot:[`item.last_login`]="{ item }">
            {{ item.last_login | formatDate }}
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-menu left offset-x>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">settings</v-icon>
              </template>
              <v-list>
                <template v-for="i in actionList">
                  <v-list-item v-if="i.isShow || userName !== item.username" :key="i.type" @click="actionFun(i.type, item)">
                    <v-list-item-title>
                      {{ textFilter(i.name) }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
        <v-pagination
          v-if="pagination.length"
          v-model="pagination.page"
          :length="pagination.length"
          :total-visible="10"
          @input="changePage"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- 返點/返佣 -->
    <RebateModal :isOpen="isOpenRebate" @close="closeModal" />

    <!-- 更改備註 -->
    <RemarkModal v-if="isOpenRemark" :isOpen="isOpenRemark" :info="itemObj" @update="updateRemark" @close="closeModal" />

    <!-- 代理團隊 -->
    <TeamModal v-if="isOpenTeam" :isOpen="isOpenTeam" :info="itemObj" @search="callDetailApi" @close="closeModal" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import RebateModal from './RebateModal.vue';
import RemarkModal from './RemarkModal.vue';
import TeamModal from './TeamModal.vue';
import { deepCopy } from '@UTILS';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'TeamManagement',
  components: {
    RebateModal,
    RemarkModal,
    TeamModal,
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
      getI18n: e => this.textFilter(e.text),
      searchData: {},
      tableHeaders: [
        {
          text: 'online',
          sortable: true,
          value: 'is_online',
        },
        {
          text: 'account',
          sortable: true,
          value: 'username',
        },
        {
          text: 'remarks',
          sortable: true,
          value: 'remark',
          width: '200',
        },
        {
          text: 'teamSize',
          sortable: true,
          value: 'team_agent_count',
        },
        {
          text: 'registrationTime',
          sortable: true,
          value: 'created',
        },
        {
          text: 'lastLoginTime',
          sortable: true,
          value: 'last_login',
        },
        {
          text: 'operating',
          sortable: true,
          value: 'action',
        },
      ],
      actionList: [
        {
          type: 'rebate',
          name: 'rebate',
          isShow: true,
        },
        {
          type: 'modifyRemark',
          name: 'modifyRemark',
          isShow: false,
        },
        {
          type: 'detail',
          name: 'detail',
          isShow: true,
        },
      ],
      showAction: false,
      isOpenRebate: false,
      itemObj: {},
      isOpenRemark: false,
      isOpenTeam: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'agencyTeam', 'userInfo', 'agencyStatus']),
    userName() {
      return this.userInfo.name || '';
    },
    tableData() {
      return this.agencyTeam.list || [];
    },
    pagination() {
      const { total } = this.agencyTeam;
      const { page, num } = this.searchData;
      let info = { total: 0, page };
      if (total) {
        info.total = total;
        info.length = Math.ceil(total / num);
      }
      return info;
    },
  },
  watch: {
    agencyStatus(v) {
      if (v && v === 'list') {
        this.closeModal(false);
        this.callListApi();
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
      this.data.page = 1;
      this.searchData = deepCopy(this.data);
      this.callListApi();
    },
    callListApi(ps) {
      const { username, remark, type, page, num } = this.searchData;
      let input = { type, page, num };
      username && (input.username = username);
      remark && (input.remark = remark);
      ps && (input.page = ps);
      this.GET_AGENCY_TEAM(input);
    },
    changePage(ps) {
      this.searchData.page = ps;
      this.callListApi(ps);
    },
    actionFun(type, item) {
      this[type](item);
    },
    rebate(item) {
      this.GET_AGENCY_TEAM_REBATE({ target_id: item.user_id });
      this.isOpenRebate = true;
    },
    modifyRemark(item) {
      this.itemObj = item;
      this.isOpenRemark = true;
    },
    updateRemark(input) {
      this.UPDATE_TEAM_REMARK(input);
    },
    detail(item) {
      this.SET_AGENCY_TEAM_ITEM({});
      this.itemObj = item;
      this.isOpenTeam = true;
    },
    callDetailApi(input) {
      this.GET_AGENCY_TEAM_ITEM(input);
    },
    closeModal(status) {
      this.isOpenRebate = status;
      this.isOpenRemark = status;
      this.itemObj = {};
      this.isOpenTeam = status;
      this.SET_AGENCY_TEAM_REBATE([]);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_teamManagement_');
    },
  },
};
</script>

<style lang="scss">
.TeamManagement {
  .v-data-table > .v-data-table__wrapper > table {
    white-space: nowrap; /*强制不换行*/
    tbody tr td:nth-child(3) {
      white-space: pre-wrap;
    }
  }
}
</style>
