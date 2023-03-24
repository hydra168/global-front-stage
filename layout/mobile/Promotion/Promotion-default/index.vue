<template>
  <div class="Promotion">
    <template v-if="isFetchDone">
      <v-img v-if="promotionPic" :src="promotionPic"></v-img>
      <v-img v-else :src="require('./assets/active-top.png')"></v-img>
    </template>
    <div v-if="this.articleTotal" class="tabs">
      <div v-for="(item, index) in tabList" :key="index" class="tab-item" :class="{ active: activeTab === index }" @click="activeTab = index">
        <h1 class="tab-name">{{ $t(item.text) }}</h1>
      </div>
    </div>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>

    <div v-if="activeTab === 0">
      <!-- 預設活動樣式 -->
      <div v-if="!isLoading && !listData.length" class="dropList text-center mb-5">
        <h2 class="display-2">{{ $t('g_com_promotion_default_nullText') }}</h2>
      </div>

      <!-- 活動列表 -->
      <div v-else v-for="(el, k) in listData" :key="k">
        <div class="dropList border" :class="{ open: el.isOpen && !el.isLoading }" @click="openHandle(k)">
          <v-progress-linear v-if="el.isLoading" indeterminate></v-progress-linear>
          <div class="dropList--header">
            <div class="dropList--header__img">
              <div class="dropList--header__img--title">
                <h1 class="title white--text">{{ el.title }}</h1>
              </div>
              <div class="dropList--header__img--content">
                <img v-if="el.mobile_image_url === ''" :src="require('./assets/list-default-img01.png')" style="width: 100%" />
                <img v-else :src="imageUrl + el.mobile_image_url" style="width: 100%" />
              </div>
            </div>
            <div class="dropList--header__content">
              <div class="dropList--header__content--title">
                <h2 class="font-weight-black">{{ el.title }}</h2>
                <p class="">{{ $t('g_com_promotion_default_endTime') }}</p>
                <span class="time">{{ el.between_dates }}</span>
              </div>
              <div class="active--item primary">{{ $t('g_com_promotion_default_details') }}</div>
            </div>
          </div>

          <!-- 內容 -->
          <div class="dropList--body">
            <h1 class="subheading font-weight-bold mb-3">{{ el.title }}</h1>
            <div
              v-if="!Number(config.Show_Mobile_Event_Content) && el.detail.content"
              class="dropList--body--content"
              v-html="el.detail.content"
            ></div>
            <div
              v-if="Number(config.Show_Mobile_Event_Content) && el.detail.mobile_content"
              class="dropList--body--content"
              v-html="el.detail.mobile_content"
            ></div>
            <table v-if="el.detail.conditions" class="dropList--body--table">
              <thead>
                <tr>
                  <th scope="col">{{ $t('g_com_promotion_default_rechargeAmount') }}</th>
                  <th scope="col">{{ $t('g_com_promotion_default_backwaterAmount') }}</th>
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
    </div>
    <!-- <div v-if="activeTab === 1" class="articles">
      <GArticles v-bind="GArticles" />
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { MOBILE_PROMOTION_DEFAULT_OPEN } from '@G/consts';
import { textFilter } from '@UTILS/i18n';
// import GArticles from '@COM/Articles/Articles-default/Articles-default.vue';

export default {
  name: 'Promotion',
  components: {
    // GArticles,
  },
  data() {
    return {
      defaultOpenIndex: MOBILE_PROMOTION_DEFAULT_OPEN ? 0 : null,
      openId: null,
      listData: [],
      currentDetail: {
        content: '',
      },
      promotionType: {
        1: { title: '首充优惠', icon: 'icon-p01.png' },
        2: { title: '充值优惠', icon: 'icon-p02.png' },
        3: { title: '晋级奖励', icon: 'icon-p02.png' },
        4: { title: '流水活动', icon: 'icon-p04.png' },
        5: { title: '系统补偿', icon: 'icon-p02.png' },
        6: { title: '其他礼金', icon: 'icon-p02.png' },
      },
      isFetchDone: false,
      activeTab: 0,
      tabList: [
        { text: '优惠活动' },
        //  { text: '文章' }
      ],
      GArticles: {},
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'config', 'promotionList', 'promotionDetail', 'promotionPic', 'articleTotal']),
    imageUrl() {
      return this.config.image_url ?? '';
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
    this.SET_CURRENT_MENU_TITLE(this.textFilter('title'));
    this.GET_PROMOTION_LIST(); // 取得優惠列表
    await this.GET_PROMOTION_PIC(); // 取得形象圖
    this.isFetchDone = true;
  },
  methods: {
    ...mapActions(['GET_PROMOTION_LIST', 'GET_PROMOTION_DETAIL', 'GET_PROMOTION_PIC']),
    ...mapMutations(['SET_PROMOTION_DETAIL', 'SET_CURRENT_MENU_TITLE']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_promotion_default_', slot) : textFilter(text, 'layout_promotion_default_');
    },
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
        this.defaultOpenIndex = null;
      });
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
      let showTxt = '正在进行中';
      if (endDate) {
        const now = new Date();
        const end = new Date(endDate);
        const diff = new Date(end - now).getTime();
        const date = Math.floor(diff / (3600000 * 24)); // 剩餘天數
        const hmm = diff % (24 * 3600 * 1000); // 剩餘時數
        const hours = Math.floor(hmm / (3600 * 1000));
        const mmm = hmm % (3600 * 1000); // 剩餘分數
        const mins = Math.floor(mmm / (60 * 1000));
        showTxt = `${date}天 ${hours}小时 ${mins}分钟`;
        Number(date) > 365 && (showTxt = '正在进行中');
      }
      return showTxt;
    },
  },
};
</script>
<style lang="scss" scoped>
.Promotion {
  $default-height: 135px;
  $item-height: 28px;
  .loadingWrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    height: auto;
  }
  .dropList {
    margin: 10px;
    max-height: $default-height;
    overflow: hidden;
    transition: max-height 0.8s;
    position: relative;
    text-align: center;
    &.open {
      max-height: 1000px;
    }
    &.border {
      border: 1px solid #cfcfcf;
    }
    .dropList--header {
      height: $default-height;
      display: flex;
      overflow: hidden;
      cursor: pointer;
      .dropList--header__img {
        // flex: 1 0 auto;
        width: 220px;
        background-color: grey;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        .dropList--header__img--title {
          position: absolute;
          top: 0;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          height: $item-height;
          line-height: $item-height;
          text-align: left;
          background-color: map-get(map-get($colors, primary), base);
          padding: 0 5px;
        }
        .dropList--header__img--content {
          flex: 1 0 auto;
          display: flex;
          overflow: hidden;
          justify-content: center;
          align-items: center;
          margin-top: 28px;
        }
      }
      .dropList--header__content {
        flex: 1 0 auto;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        p {
          margin-bottom: 0px;
        }
        .active--item {
          height: $item-height;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3px 10px;
          color: #ffffff;
          img {
            width: auto;
            height: 100%;
          }
        }
        .dropList--header__content--title {
          flex: 1 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 5px;
          h2 {
            font-size: 18px;
          }
          .time {
            word-wrap: break-word;
            font-size: 12px;
            color: map-get(map-get($colors, primary), base);
          }
        }
      }
    }
    .dropList--body {
      padding: 15px;
      text-align: left;
      overflow: scroll;
      height: 270px;
      p {
        word-wrap: break-word;
      }
      // .dropList--body--content {
      //   text-align: center;
      // }
      .dropList--body--table {
        width: 100%;
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
        display: flex;
        flex-direction: column;
        // align-items: center;
        margin-top: 30px;

        .title--line {
          width: 90px;
          height: 5px;
          background-color: map-get(map-get($colors, primary), base);
          border-radius: 3.5px;
          margin-bottom: 15px;
        }
        .title {
          margin-bottom: 5px;
        }
      }
    }
  }

  .tabs {
    display: flex;
    padding: 12px;

    .tab-item {
      flex: 1;
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

  .articles {
    padding: 0 12px;
  }
}
</style>
