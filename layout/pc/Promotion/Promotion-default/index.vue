<template>
  <v-container fluid class="Promotion">
    <template v-if="isFetchDone">
      <div class="promotionPic d-flex justify-center">
        <img width="100%" v-if="promotionPic" :src="promotionPic" />
        <img width="100%" v-else :src="require('./assets/active-top.png')" />
      </div>
    </template>
    <v-container grid-list-md class="content pt-9">
      <div class="title-wrap text-center">
        <h1 v-if="!this.articleTotal" class="primary--text mb-3">{{ textFilter('promotions') }}</h1>
        <div v-else class="tabs">
          <div v-for="(item, index) in tabList" :key="index" class="tab-item" :class="{ active: activeTab === index }" @click="activeTab = index">
            <h1 class="tab-name">{{ $t(item.text) }}</h1>
          </div>
        </div>
        <div class="title-point"></div>
        <div class="title-line primary"></div>
      </div>
      <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>

      <div v-if="activeTab === 0">
        <!-- 預設活動樣式 -->
        <div v-if="!isLoading && !listData.length" class="dropList text-center mb-5">
          <h2 class="stayTuned">{{ textFilter('stayTuned') }}</h2>
        </div>

        <!-- 活動列表 -->
        <div v-else class="dropList boder" :class="{ open: el.isOpen && !el.isLoading }" v-for="(el, k) in listData" :key="k" @click="openHandle(k)">
          <div class="dropList--header">
            <div class="dropList--header__img">
              <v-img v-if="el.pc_image_url === ''" :src="require('./assets/list-default-img01.png')" />
              <v-img v-else :src="imageUrl + el.pc_image_url" />
              <div class="dropList--header__img--title">
                <h1 class="subheading white--text">{{ el.title }}</h1>
              </div>
            </div>
            <div class="dropList--header__content">
              <div class="dropList--header__content--title">
                <div class="d-flex align-center mb-3">
                  <img class="icon" :src="require(`./assets/${promotionType[el.promotion_type].icon}`)" alt="" />
                  <h2 class="display-1 font-weight-black grey--text text--darken-3">{{ el.title }}</h2>
                </div>
                <p class="mb-0 grey--text text--darken-3">
                  {{ textFilter('endTime') }}
                  <span class="time">
                    {{ textFilter(el.between_dates.showText, el.between_dates) }}
                  </span>
                </p>
              </div>
              <div class="dropList--header__content--active">
                <div class="active--item primary">{{ textFilter('details') }}</div>
              </div>
            </div>
          </div>

          <!-- 內容 -->
          <div class="dropList--body">
            <div v-if="el.detail.content" class="dropList--body--content grey--text text--darken-3" v-html="el.detail.content"></div>
            <h1 v-else class="grey--text text--darken-3">{{ textFilter('noContent') }}</h1>
            <table v-if="el.detail.conditions" class="dropList--body--table">
              <thead>
                <tr>
                  <th scope="col">{{ textFilter('rechargeAmount') }}</th>
                  <th scope="col">{{ textFilter('bonusAmount') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, kk) in el.detail.conditions" :key="kk">
                  <td>{{ item.amount }}</td>
                  <td>{{ item.gain }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <div v-if="activeTab === 1">
        <GArticles v-bind="GArticles" />
      </div> -->
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { PC_PROMOTION_DEFAULT_OPEN } from '@G/consts';
// import GArticles from '@COM/Articles/Articles-default/Articles-default.vue';

export default {
  name: 'Promotion',
  components: {
    // GArticles,
  },
  data() {
    return {
      listData: [],
      promotionType: {
        1: { title: 'first', icon: 'icon-p01.png' },
        2: { title: 'recharge', icon: 'icon-p02.png' },
        3: { title: 'promotion', icon: 'icon-p02.png' },
        4: { title: 'water', icon: 'icon-p04.png' },
        5: { title: 'system', icon: 'icon-p02.png' },
        6: { title: 'other', icon: 'icon-p02.png' },
      },
      isFetchDone: false,
      activeTab: 0,
      tabList: [
        { text: '优惠活动' },
        // { text: '文章' }
      ],
      GArticles: {},
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'promotionList', 'promotionDetail', 'promotionPic', 'articleTotal']),
    imageUrl() {
      return this.config.image_url ?? '';
    },
    defaultOpenIndex: {
      get: function () {
        if (PC_PROMOTION_DEFAULT_OPEN == 0) return null; // 全關
        if (PC_PROMOTION_DEFAULT_OPEN == 1) return 0; // 展開第一個優惠活動
        if (PC_PROMOTION_DEFAULT_OPEN == 2) return Number(this.$route.params.openIndex) - 1; // 展開特定優惠活動
        return null;
      },
      set: function () {},
    },
  },
  watch: {
    promotionList() {
      this.listHandler();
    },
    promotionDetail(data) {
      data && this.detailHandler(data);
    },
  },
  async created() {
    this.GET_PROMOTION_LIST(); // 取得優惠列表
    await this.GET_PROMOTION_PIC(); // 取得形象圖
    this.isFetchDone = true;
  },
  methods: {
    ...mapActions(['GET_PROMOTION_LIST', 'GET_PROMOTION_DETAIL', 'GET_PROMOTION_PIC']),
    ...mapMutations(['SET_PROMOTION_DETAIL']),
    listHandler() {
      this.promotionList.forEach((el, i) => {
        const data = { ...el };
        data.isLoading = false;
        data.detail = {};
        data.between_dates = this.betweenDates(data.event_end_time);
        data.isOpen = false;
        this.listData.push(data);
        const needFetch = this.defaultOpenIndex !== null && this.defaultOpenIndex === i ? true : false;
        if (needFetch) this.openHandle(i);
      });
      this.defaultOpenIndex = null;
    },
    detailHandler(data) {
      this.listData[this.openIndex].detail = data;
      this.listData[this.openIndex].detail.conditions = this.listData[this.openIndex].detail.conditions || null;
      this.listData[this.openIndex].isLoading = false;
      this.listData[this.openIndex].isOpen = true;
      this.$forceUpdate();
      this.SET_PROMOTION_DETAIL(null);
    },
    // 細項展開處理
    openHandle(i) {
      this.openIndex = i;
      if (this.listData[i].isOpen) {
        this.listData[i].isOpen = false;
        this.$forceUpdate();
      } else {
        this.listData[i].isLoading = true;
        this.GET_PROMOTION_DETAIL({ id: this.listData[i].id });
      }
    },
    // 倒數處理
    betweenDates(endDate) {
      const o = {
        showText: 'isGoing',
        date: null,
        hours: null,
        mins: null,
      };
      if (endDate) {
        const now = new Date();
        const end = new Date(endDate);
        const diff = new Date(end - now).getTime();
        // 剩餘天數
        const date = Math.floor(diff / (3600000 * 24));
        // 剩餘時數
        const hmm = diff % (24 * 3600 * 1000);
        const hours = Math.floor(hmm / (3600 * 1000));
        // 剩餘分數
        const mmm = hmm % (3600 * 1000);
        const mins = Math.floor(mmm / (60 * 1000));
        o.date = date;
        o.hours = hours;
        o.mins = mins;
        o.showText = 'dateText';
        Number(date) > 365 && (o.showText = 'isGoing');
      }
      return o;
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_promotion_default_index_', slot) : textFilter(text, 'layout_promotion_default_index_');
    },
  },
};
</script>

<style lang="scss" scoped>
.Promotion {
  div {
    box-sizing: border-box;
  }
  .top-img {
    img {
      width: 100%;
      min-width: 1200px;
      margin-bottom: 30px;
    }
  }
  .content {
    margin-bottom: 40px;
    .title-wrap {
      position: relative;
      margin-bottom: 50px;
      .title-point {
        width: 10px;
        height: 10px;
        margin: auto;
        transform: rotate(45deg);
        background-color: var(--v-primary-base);
      }
      .title-line {
        &::before {
          content: '';
          position: absolute;
          bottom: 5px;
          right: 0;
          width: 47%;
          height: 2px;
          background-color: map-get(map-get($colors, primary), base);
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 47%;
          height: 2px;
          background-color: map-get(map-get($colors, primary), base);
        }
      }
    }
    .dropList {
      margin-bottom: 20px;
      max-height: 200px;
      overflow: hidden;
      transition: max-height 1s;
      position: relative;
      &.open {
        max-height: 1000px;
      }
      &.boder {
        border: 1px solid #979797;
        border-radius: 7px;
      }
      .dropList--header {
        height: 200px;
        display: flex;
        overflow: hidden;
        cursor: pointer;
        .dropList--header__img {
          width: 800px;
          background-color: grey;
          overflow: hidden;
          position: relative;
          .dropList--header__img--title {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: left;
            padding: 5px;
            background-color: rgba(#000000, 0.8);
          }
        }
        .dropList--header__content {
          flex: 1 0 auto;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          p {
            text-align: left;
            font-size: 18px;
          }
          .dropList--header__content--title {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 20px;
            background: #ffffff;
            .icon {
              width: 40px;
              margin-right: 10px;
            }
            .time {
              color: map-get(map-get($colors, primary), base);
            }
          }
          .dropList--header__content--active {
            display: flex;
            color: white;
            .active--item {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: 21px;
              padding: 8px 0;
              img {
                max-width: 110px;
              }
            }
          }
        }
      }
      .dropList--body {
        max-height: 50vh;
        padding: 20px;
        text-align: center;
        overflow: scroll;
        background: #ffffff;
        p {
          word-wrap: break-word;
        }
        .dropList--body--content {
          text-align: left;
        }
        .dropList--body--table {
          width: 50%;
          color: #ffffff;
          border-collapse: collapse;
          margin: 50px auto;
          th,
          td {
            padding: 0.75rem;
            vertical-align: top;
            border: 2px solid #dee2e6;
            background-color: #2b2b2b;
          }
          thead th {
            text-align: center;
            vertical-align: bottom;
            padding: 0.75rem;
            background-color: map-get(map-get($colors, primary), base);
          }
        }
        .dropList--body--notice {
          text-align: left;
          .title--tag {
            display: inline-block;
            width: 10px;
            height: 20px;
            background-color: map-get(map-get($colors, primary), base);
            margin-right: 10px;
            vertical-align: top;
          }
          .title {
            display: inline-block;
            margin-bottom: 15px;
          }
        }
      }
    }
  }

  .tabs {
    display: flex;
    margin-bottom: 12px;

    .tab-item {
      padding: 0 16px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      cursor: pointer;
      color: map-get(map-get($colors, primary), base);
      border-radius: 2px;
      font-size: 16px;

      &.active {
        background-color: map-get(map-get($colors, primary), base);
        color: #fff;
      }

      &:hover {
        background-color: map-get(map-get($colors, primary), base);
        color: #fff;
      }
    }
  }
}
</style>
