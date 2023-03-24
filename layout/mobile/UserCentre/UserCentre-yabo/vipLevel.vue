<template>
  <v-main class="vip-wrap vipBox">
    <!-- vip level -->
    <div class="profileBox">
      <div class="titleBox">
        <div>
          <img src="./assets/img/default.png" />
        </div>
        <div>
          <div class="viplevel">
            <div>
              <p>
                {{ userInfo.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="vipLevelPhoto">
          <span>
            <img :src="require(`./assets/img/vip-${this.vipLevelData.current_vip_level}.png`)" />
          </span>
        </div>
      </div>
      <div class="vipactionBox">
        <div class="vipactionLeftBox">VIP{{ this.vipLevelData.current_vip_level }}</div>
        <div class="vipactionmiddleBox">
          <div class="progressBox">
            <span :class="'act-' + percentage.toFixed(0)">{{ formatDecimal(percentage, 1) }}%</span>
            <v-progress-linear :value="percentage" background-color="rgb(245, 245, 245)" color="rgb(0, 173, 73)" :bottom="false" :height="10">
            </v-progress-linear>
          </div>
        </div>
        <div class="vipactionRightBox">VIP{{ this.vipLevelData.next_vip_level }}</div>
      </div>
      <div class="depositInfiBox">
        <div>
          <!-- <span>當前存款(元)</span>
          <span class="ml-2 strong">
            {{ currentDepositAmount | money }}
            </span> -->
          <span>
            您共需达成 <span class="ml-2 strong">{{ needDeposit }}</span
            >元存款，<span class="strong">{{ needFlow }}</span
            >流水，即可升级至 VIP<span class="ml-2 strong">{{ vipLevelData.next_vip_level }}</span>
          </span>
        </div>
      </div>
    </div>
    <v-tabs v-model="tab" color="#01AD4A" class="tabBox">
      <v-tab v-for="tab in tabNav" :class="tab.class" :key="tab.key">
        {{ tab.code }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tab in tabNav" :key="tab.key">
        <div class="vipCardBox">
          <div class="vipCardInBox">
            <span class="vipCardTitle">
              {{ tab.title }}
            </span>
            <div class="vipLevelPhotoInCard">
              <img :src="tab.img" />
            </div>
            <div class="vipsubinfo">
              <div>
                <p class="strong">{{ tab.stat1Value }}</p>
                <p>{{ tab.stat1info }}</p>
              </div>
              <div>
                <p class="strong">{{ tab.stat2Value }}</p>
                <p>{{ tab.stat2info }}</p>
              </div>
              <div>
                <p class="strong">{{ tab.stat3Value }}</p>
                <p>{{ tab.stat3info }}</p>
              </div>
            </div>
          </div>
          <div class="vipInfoBox">
            <p>{{ tab.inTitle }}</p>
            <!--暫時關閉-->
            <!-- <div class="vipInfoBoxInBox">
              <div class="inflexBox">
                <div class="vipicon1">
                  <img src="./assets/img/vipicon1.png" />
                </div>
                <div class="ml-3">
                  <span class="strong">{{ tab.stat4Value }}</span>
                  <span>{{ tab.stat4info }}</span>
                </div>
              </div>
              <div class="inflexBox">
                <div class="vipicon2">
                  <img src="./assets/img/vipicon2.png" />
                </div>
                <div class="ml-3">
                  <span class="strong">{{ tab.stat5Value }}</span>
                  <span>{{ tab.stat5info }}</span>
                </div>
              </div>
            </div> -->
            <div class="vipInfoBoxInSubBox">
              <div class="inflexBox">
                <div>
                  <img src="./assets/img/vipicon3.png" />
                </div>
                <div class="ml-3">
                  <span class="strong">{{ tab.stat6Value }}</span>
                  <span>{{ tab.stat6info }}</span>
                </div>
              </div>
            </div>
            <div class="vipDetailListBox">
              <span @click="goVipDetail()">查看VIP詳情 > ></span>
            </div>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'VipLevel',
  data() {
    return {
      tab: null,
      code: null,
      tabNav: [
        // API吐的欄位和wireframe對不起來, 暫時作假的資料
        {
          id: 0,
          code: 'Lv1',
          title: 'VIP1',
          img: require('./assets/img/vip-1.png'),
          stat1info: '累计存款',
          stat1Value: '≥1000',
          stat2info: '累计有效流水',
          stat2Value: '≥3000',
          stat3info: '保级有效流水',
          stat3Value: '≥2000',
          stat4info: '日提款次数',
          stat4Value: '5',
          stat5info: '日提款额度',
          stat5Value: '≤20万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '18元',
          inTitle: 'VIP1 尊享',
        },
        {
          id: 1,
          code: 'Lv2',
          title: 'VIP2',
          img: require('./assets/img/vip-2.png'),
          stat1info: '累计存款',
          stat1Value: '≥2000',
          stat2info: '累计有效流水',
          stat2Value: '≥1万',
          stat3info: '保级有效流水',
          stat3Value: '≥5000',
          stat4info: '日提款次数',
          stat4Value: '5',
          stat5info: '日提款额度',
          stat5Value: '≤20万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '28元',
          inTitle: 'VIP2 尊享',
        },
        {
          id: 2,
          code: 'Lv3',
          title: 'VIP3',
          img: require('./assets/img/vip-3.png'),
          stat1info: '累计存款',
          stat1Value: '≥1万',
          stat2info: '累计有效流水',
          stat2Value: '≥5万',
          stat3info: '保级有效流水',
          stat3Value: '≥1.5万',
          stat4info: '日提款次数',
          stat4Value: '5',
          stat5info: '日提款额度',
          stat5Value: '≤20万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '38元',
          inTitle: 'VIP3 尊享',
        },
        {
          id: 3,
          code: 'Lv4',
          title: 'VIP4',
          img: require('./assets/img/vip-4.png'),
          stat1info: '累计存款',
          stat1Value: '≥5万',
          stat2info: '累计有效流水',
          stat2Value: '≥30万',
          stat3info: '保级有效流水',
          stat3Value: '≥5万',
          stat4info: '日提款次数',
          stat4Value: '10',
          stat5info: '日提款额度',
          stat5Value: '≤25万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '88元',
          inTitle: 'VIP4 尊享',
        },
        {
          id: 4,
          code: 'Lv5',
          title: 'VIP5',
          img: require('./assets/img/vip-5.png'),
          stat1info: '累计存款',
          stat1Value: '≥20万',
          stat2info: '累计有效流水',
          stat2Value: '≥120万',
          stat3info: '保级有效流水',
          stat3Value: '≥25万',
          stat4info: '日提款次数',
          stat4Value: '10',
          stat5info: '日提款额度',
          stat5Value: '≤25万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '388元',
          inTitle: 'VIP5 尊享',
        },
        {
          id: 5,
          code: 'Lv6',
          title: 'VIP6',
          img: require('./assets/img/vip-6.png'),
          stat1info: '累计存款',
          stat1Value: '≥50万',
          stat2info: '累计有效流水',
          stat2Value: '≥300万',
          stat3info: '保级有效流水',
          stat3Value: '≥60万',
          stat4info: '日提款次数',
          stat4Value: '10',
          stat5info: '日提款额度',
          stat5Value: '≤25万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '688元',
          inTitle: 'VIP6 尊享',
        },
        {
          id: 6,
          code: 'Lv7',
          title: 'VIP7',
          img: require('./assets/img/vip-7.png'),
          stat1info: '累计存款',
          stat1Value: '≥120万',
          stat2info: '累计有效流水',
          stat2Value: '≥720万',
          stat3info: '保级有效流水',
          stat3Value: '≥180万',
          stat4info: '日提款次数',
          stat4Value: '20',
          stat5info: '日提款额度',
          stat5Value: '≤30万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '1088元',
          inTitle: 'VIP7 尊享',
        },
        {
          id: 7,
          code: 'Lv8',
          title: 'VIP8',
          img: require('./assets/img/vip-8.png'),
          stat1info: '累计存款',
          stat1Value: '≥300万',
          stat2info: '累计有效流水',
          stat2Value: '≥1800万',
          stat3info: '保级有效流水',
          stat3Value: '≥600万',
          stat4info: '日提款次数',
          stat4Value: '20',
          stat5info: '日提款额度',
          stat5Value: '≤30万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '3888元',
          inTitle: 'VIP8 尊享',
        },
        {
          id: 8,
          code: 'Lv9',
          title: 'VIP9',
          img: require('./assets/img/vip-9.png'),
          stat1info: '累计存款',
          stat1Value: '≥1000万',
          stat2info: '累计有效流水',
          stat2Value: '≥6000万',
          stat3info: '保级有效流水',
          stat3Value: '≥2500万',
          stat4info: '日提款次数',
          stat4Value: '20',
          stat5info: '日提款额度',
          stat5Value: '≤100万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '6888元',
          inTitle: 'VIP9 尊享',
        },
        {
          id: 9,
          code: 'Lv10',
          title: 'VIP10',
          img: require('./assets/img/vip-10.png'),
          stat1info: '累计存款',
          stat1Value: '≥3000万',
          stat2info: '累计有效流水',
          stat2Value: '≥1.8亿',
          stat3info: '保级有效流水',
          stat3Value: '≥5000万',
          stat4info: '日提款次数',
          stat4Value: '20',
          stat5info: '日提款额度',
          stat5Value: '≤300万',
          stat6info: '升级礼金(晋级自动发放)',
          stat6Value: '18888元',
          inTitle: 'VIP10 尊享',
        },
      ],
      skill: 20,
      vipLevelData: {
        list: [],
        current_vip_level: 0,
        next_vip_level: 1,
        current_deposit_amount: 0,
        next_vip_level_conditions: 0,
        vip_period: null,
        vip_mode: 0,
      },
      percentage: 0,
      currentLevel: '',
      nextLevel: '',
    };
  },
  components: {},
  created() {
    // this.$store.commit('setTitle', 'VIP等级');
    this.GET_VIP_LEVEL();
  },
  mounted() {
    this.SET_FULL_WIDTH(1);
  },
  methods: {
    ...mapActions(['GET_VIP_LEVEL']),
    ...mapMutations(['SET_FULL_WIDTH']),
    secondDecimalPlace(val) {
      return parseFloat(val.toFixed(4));
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_vipLevel_', slot) : textFilter(text, 'layout_userCentre_default_vipLevel_');
    },
    clickTabHandler(code) {
      // 頁數 資料data 按鈕 日期 回復預設
      // new Date().toISOString().substr(0, 10),
      // if (this.currentTab === code) return;
      this.currentTab = code;
      console.log(this.currentTab);
    },
    goVipDetail() {
      this.$router.push({ name: 'vipDetail' });
    },
    formatDecimal(num, decimal) {
      num = num.toString();
      let index = num.indexOf('.');
      if (index !== -1) {
        num = num.substring(0, decimal + index + 1);
      } else {
        num = num.substring(0);
      }
      return parseFloat(num).toFixed(decimal);
    },
  },
  watch: {
    vipLevel(data) {
      this.vipLevelData = data;
      this.vipLevelData.list = this.vipLevelData.list.map(item => {
        item.level = `VIP${item.vip_level}`;
        item.daily_count = item.daily_withdraw_count === null ? '-' : this.textFilter('count', { count: item.daily_withdraw_count });
        item.amount = item.daily_withdraw_amount === null ? '-' : item.daily_withdraw_amount;
        return item;
      });
      this.currentLevel = `（VIP${this.vipLevelData.current_vip_level}）`;
      this.nextLevel = `VIP${this.vipLevelData.next_vip_level}`;
      // this.needDeposit = this.vipLevelData.next_vip_level_conditions - this.vipLevelData.current_deposit_amount;
      this.percentage =
        this.vipLevelData.next_vip_level !== null
          ? this.secondDecimalPlace((this.vipLevelData.current_deposit_amount / this.vipLevelData.next_vip_level_conditions) * 100)
          : 100;
      this.percentage = parseInt(this.percentage) > 100 ? 100 : this.percentage;

      let depositPercent = this.secondDecimalPlace((this.vipLevelData.current_deposit_amount / this.vipLevelData.next_vip_level_conditions) * 100);
      depositPercent = depositPercent > 100 ? 100 : depositPercent;
      let flowPercent = this.secondDecimalPlace((this.vipLevelData.current_flow_amount / this.vipLevelData.next_vip_flow_conditions) * 100);
      flowPercent = flowPercent > 100 ? 100 : flowPercent;

      this.percentage = (depositPercent + flowPercent) * 0.5;
      this.mode = this.vipLevelData.vip_mode;
    },
  },
  computed: {
    ...mapGetters(['vipLevel', 'userInfo', 'isLoading']),
    needDeposit() {
      const { next_vip_level_conditions, current_deposit_amount } = this.vipLevelData;
      return next_vip_level_conditions > current_deposit_amount ? next_vip_level_conditions - current_deposit_amount : 0;
    },
    needFlow() {
      const { next_vip_flow_conditions, current_flow_amount } = this.vipLevelData;
      return next_vip_flow_conditions > current_flow_amount ? next_vip_flow_conditions - current_flow_amount : 0;
    },
    currentDepositAmount() {
      const { current_deposit_amount } = this.vipLevelData;
      return current_deposit_amount > 0 ? current_deposit_amount : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.vipBox {
  padding-top: 67px;
  background: rgb(246, 246, 246);
  min-height: 100vh;
  .vipCardBox {
    position: relative;
    padding: 10px 0;
    background: rgb(246, 246, 246);
    .vipCardInBox {
      margin: 10px auto;
      width: 325px;
      height: 166px;
      background: url('./assets/img/vipCardbg.png') no-repeat center center/contain;
      .vipCardTitle {
        color: #fff;
        font-size: 2em;
        display: block;
        position: absolute;
        left: 50px;
        top: 40px;
        font-weight: 600;
      }
      .vipLevelPhotoInCard {
        position: absolute;
        right: 40px;
        top: 32px;
        img {
          width: auto;
          height: 70px;
        }
      }
      .vipsubinfo {
        display: flex;
        justify-content: space-around;
        padding-top: 110px;
        font-size: 12px;
        text-align: center;
        p.strong {
          font-weight: 800;
        }
        p {
          margin-bottom: 0;
          color: rgba(0, 0, 0, 0.6);
          // text-shadow: 0 0 2px rgba(255, 255, 255, 0.2);
        }
      }
    }
    .vipInfoBox {
      background: #fff;
      padding: 15px;
      margin: 15px;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      margin-top: 20px;
      .vipDetailListBox {
        margin: 20px auto 10px;
        text-align: center;
        font-size: 14px;
        color: rgb(11, 171, 94);
      }
      p {
        font-weight: 700;
        border-left: 6px solid rgb(77, 153, 116);
        padding-left: 10px;
      }
      .vipInfoBoxInBox {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .inflexBox {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .vipicon1 {
            img {
              width: 30px;
              height: 30px;
              margin-top: 8px;
            }
          }
          .vipicon2 {
            img {
              width: 30px;
              height: 21px;
              margin-top: 8px;
            }
          }
          span {
            display: block;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
          }
          span.strong {
            font-weight: 600;
            font-size: 16px;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
      .vipInfoBoxInSubBox {
        .inflexBox {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 20px;
          img {
            width: 17px;
            height: 30px;
            margin-right: 6px;
            margin-left: 7px;
            margin-top: 4px;
          }
          span {
            display: block;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
          }
          span.strong {
            font-weight: 600;
            font-size: 16px;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
    }
  }
  .tabBox {
    flex: 1;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
  }
  .v-tab {
    position: relative;
    min-width: 35px;
    max-width: 35px;
    height: 35px;
    font-size: 12px;
    border-radius: 50%;
    background: rgb(238, 238, 238);
    border: 1px solid rgb(204, 204, 204);
    margin-right: 30px;
    margin-left: 20px;
  }
  .v-tab:after {
    content: '';
    position: absolute;
    display: block;
    width: 50px;
    height: 2px;
    right: -51px;
    background-color: rgb(204, 204, 204);
  }
  .v-tab:last-child:after {
    display: none;
  }
  .v-tab--active {
    background: -webkit-linear-gradient(top, rgb(161, 179, 161), rgb(206, 217, 207));
    background: -o-linear-gradient(top, rgb(161, 179, 161), rgb(206, 217, 207));
    background: -moz-linear-gradient(top, rgb(161, 179, 161), rgb(206, 217, 207));
    background: linear-gradient(to top, rgb(161, 179, 161), rgb(206, 217, 207));
    border: 1px solid rgb(161, 179, 161);
    color: #fff;
  }
  .profileBox {
    padding: 20px;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
    background: #fff;
    margin-bottom: 20px;
    .titleBox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      .vipLevelPhoto {
        position: absolute;
        right: -17px;
        top: -8px;
        img {
          width: 80px;
          height: 75px;
        }
      }
    }
    p {
      margin: 1px 0 0 0;
      font-weight: 400;
    }
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    sub {
      bottom: 0px;
      left: 7px;
      color: rgb(102, 102, 102);
      transform: scale(0.83);
      font-size: 10px;
      font-weight: 200;
    }
    .viplevel {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      width: 100%;
    }
    .privilegesBox {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background: #fff;
      margin: 7px;
      padding: 3px 0 0 0;
      border-radius: 10px;
      p {
        font-size: 16px;
        font-weight: 400;
      }
      sub {
        bottom: 7px;
        font-size: 10px;
        transform: scale(0.83);
      }
      img {
        width: 38px;
        height: 32px;
        margin-top: 4px;
      }
    }
    .quickChoiceBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 15px 0;
      p {
        font-size: 12px;
      }
      .quickChoiceIcon {
        height: 30px;
        position: relative;
      }

      .quickChoiceIcon.icon1::before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        margin: 2px auto;
        background: url('./assets/img/icon1.png') no-repeat center center/contain;
      }
      .quickChoiceIcon.icon2::before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        margin: 2px auto;
        background: url('./assets/img/icon2.png') no-repeat center center/contain;
      }
      .quickChoiceIcon.icon3::before {
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        margin: 2px auto;
        background: url('./assets/img/icon3.png') no-repeat center center/contain;
      }
      .quickChoiceIcon.icon4::before {
        content: '';
        display: block;
        width: 30px;
        height: 25px;
        margin: 7px auto 5px;
        background: url('./assets/img/lougout.png') no-repeat center center/contain;
      }
    }
    .vipactionBox {
      margin: 33px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .vipactionLeftBox {
        width: 45px;
        height: 20px;
        background: -webkit-linear-gradient(top, rgb(0, 173, 73), rgb(108, 219, 139));
        background: -o-linear-gradient(top, rgb(0, 173, 73), rgb(108, 219, 139));
        background: -moz-linear-gradient(top, rgb(0, 173, 73), rgb(108, 219, 139));
        background: linear-gradient(to top, rgb(0, 173, 73), rgb(108, 219, 139));
        color: #fff;
        text-align: center;
        font-size: 12px;
        border-radius: 4px;
      }
      .vipactionRightBox {
        width: 45px;
        height: 20px;
        background: -webkit-linear-gradient(bottom, rgb(233, 233, 233), rgb(204, 204, 204));
        background: -o-linear-gradient(bottom, rgb(233, 233, 233), rgb(204, 204, 204));
        background: -moz-linear-gradient(bottom, rgb(233, 233, 233), rgb(204, 204, 204));
        background: linear-gradient(to bottom, rgb(233, 233, 233), rgb(204, 204, 204));
        color: #fff;
        text-align: center;
        font-size: 12px;
        border-radius: 4px;
      }
      .vipactionmiddleBox {
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        position: relative;
        .progressBox {
          width: 100%;
        }
        .v-progress-linear {
          height: 10px !important;
          position: relative !important;
          top: 0px !important;
          border-radius: 7px !important;
        }
        span {
          display: block;
          position: absolute;
          top: -24px;
          font-size: 12px;
          color: rgb(67, 71, 85);
          width: 80px;
        }
        span:after {
          content: '';
          display: block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act- {
          left: 0;
        }
        span.act-1 {
          left: 0%;
        }
        span.act-2 {
          left: 0%;
        }
        span.act-3 {
          left: 0%;
        }
        span.act-4 {
          left: 0%;
        }
        span.act-5 {
          left: 1%;
        }
        span.act-6 {
          left: 2%;
        }
        span.act-7 {
          left: 3%;
        }
        span.act-8 {
          left: 4%;
        }
        span.act-9 {
          left: 5%;
        }
        span.act-10 {
          left: 6%;
        }
        span.act-11 {
          left: 7%;
        }
        span.act-12 {
          left: 8%;
        }
        span.act-13 {
          left: 9%;
        }
        span.act-14 {
          left: 10%;
        }
        span.act-15 {
          left: 11%;
        }
        span.act-16 {
          left: 12%;
        }
        span.act-17 {
          left: 13%;
        }
        span.act-18 {
          left: 14%;
        }
        span.act-19 {
          left: 15%;
        }
        span.act-20 {
          left: 16%;
        }
        span.act-21 {
          left: 17%;
        }
        span.act-22 {
          left: 18%;
        }
        span.act-23 {
          left: 19%;
        }
        span.act-24 {
          left: 20%;
        }
        span.act-25 {
          left: 21%;
        }
        span.act-26 {
          left: 22%;
        }
        span.act-27 {
          left: 23%;
        }
        span.act-28 {
          left: 24%;
        }
        span.act-29 {
          left: 25%;
        }
        span.act-30 {
          left: 26%;
        }
        span.act-31 {
          left: 27%;
        }
        span.act-32 {
          left: 28%;
        }
        span.act-33 {
          left: 29%;
        }
        span.act-34 {
          left: 30%;
        }
        span.act-35 {
          left: 31%;
        }
        span.act-36 {
          left: 32%;
        }
        span.act-37 {
          left: 33%;
        }
        span.act-38 {
          left: 34%;
        }
        span.act-39 {
          left: 35%;
        }
        span.act-40 {
          left: 36%;
        }
        span.act-41 {
          left: 37%;
        }
        span.act-42 {
          left: 38%;
        }
        span.act-43 {
          left: 39%;
        }
        span.act-44 {
          left: 40%;
        }
        span.act-45 {
          left: 41%;
        }
        span.act-46 {
          left: 42%;
        }
        span.act-47 {
          left: 43%;
        }
        span.act-48 {
          left: 44%;
        }
        span.act-49 {
          left: 45%;
        }
        span.act-50 {
          left: 46%;
        }
        span.act-51 {
          left: 47%;
        }
        span.act-52 {
          left: 48%;
        }
        span.act-53 {
          left: 49%;
        }
        span.act-54 {
          left: 50%;
        }
        span.act-55 {
          left: 51%;
        }
        span.act-56 {
          left: 52%;
        }
        span.act-57 {
          left: 53%;
        }
        span.act-58 {
          left: 54%;
        }
        span.act-59 {
          left: 55%;
        }
        span.act-60 {
          left: 56%;
        }
        span.act-71 {
          left: 57%;
        }
        span.act-72 {
          left: 58%;
        }
        span.act-73 {
          left: 59%;
        }
        span.act-74 {
          left: 60%;
        }
        span.act-75 {
          left: 61%;
        }
        span.act-76 {
          left: 62%;
        }
        span.act-77 {
          left: 63%;
        }
        span.act-78 {
          left: 64%;
        }
        span.act-79 {
          left: 65%;
        }
        span.act-80 {
          left: 66%;
        }
        span.act-81 {
          left: 67%;
        }
        span.act-81:after {
          content: '';
          display: none;
        }
        span.act-81::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-82 {
          left: 68%;
        }
        span.act-82:after {
          content: '';
          display: none;
        }
        span.act-82::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-83 {
          left: 69%;
        }
        span.act-83:after {
          content: '';
          display: none;
        }
        span.act-83::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-84 {
          left: 70%;
        }
        span.act-84:after {
          content: '';
          display: none;
        }
        span.act-84::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-85 {
          left: 71%;
        }
        span.act-85:after {
          content: '';
          display: none;
        }
        span.act-85::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-86 {
          left: 72%;
        }
        span.act-86:after {
          content: '';
          display: none;
        }
        span.act-86::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-87 {
          left: 73%;
        }
        span.act-87:after {
          content: '';
          display: none;
        }
        span.act-87::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-88 {
          left: 74%;
        }
        span.act-88:after {
          content: '';
          display: none;
        }
        span.act-88::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-89 {
          left: 75%;
        }
        span.act-89:after {
          content: '';
          display: none;
        }
        span.act-89::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-90 {
          left: 76%;
        }
        span.act-90:after {
          content: '';
          display: none;
        }
        span.act-90::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-91 {
          left: 77%;
        }
        span.act-91.arrow {
          content: '';
          display: none;
        }
        span.act-91::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-92 {
          left: 78%;
        }
        span.act-92:after {
          content: '';
          display: none;
        }
        span.act-92::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-93 {
          left: 79%;
        }
        span.act-93:after {
          content: '';
          display: none;
        }
        span.act-93::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-94 {
          left: 80%;
        }
        span.act-94:after {
          content: '';
          display: none;
        }
        span.act-94::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-95 {
          left: 81%;
        }
        span.act-95:after {
          content: '';
          display: none;
        }
        span.act-95::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-96 {
          left: 82%;
        }
        span.act-96:after {
          content: '';
          display: none;
        }
        span.act-96::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-97 {
          left: 83%;
        }
        span.act-97:after {
          content: '';
          display: none;
        }
        span.act-97::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-98 {
          left: 84%;
        }
        span.act-98:after {
          content: '';
          display: none;
        }
        span.act-98::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-99 {
          left: 85%;
        }
        span.act-99:after {
          content: '';
          display: none;
        }
        span.act-99::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
        span.act-100 {
          left: 86%;
        }
        span.act-100:after {
          content: '';
          display: none;
        }
        span.act-100::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 18px;
          display: inline-block;
          background: url('./assets/img/animation.png') no-repeat center center/contain;
          margin-left: 7px;
        }
      }
    }
    .depositInfiBox {
      margin-top: -20px;
    }
    .depositInfiBox span {
      font-size: 12px;
      color: rgb(102, 102, 102);
    }
    .depositInfiBox span.strong {
      font-weight: 600;
      color: #333;
    }
  }
}
.vip-wrap {
  background-color: #f5f5f9;
  .pro-wrap {
    padding: 0 !important;
  }
}

.vip-level {
  .title {
    display: flex;
    padding: 5vw 0;
    .square {
      width: 15px;
      height: 15px;
      display: inline-block;
      // margin-left: 25px;
    }
    .my-viplevel-title {
      font-size: 17px;
      margin-left: 10px;
    }
    span:last-child {
      font-size: 17px;
      font-weight: normal;
      letter-spacing: normal;
    }
  }
  .level {
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    .current-vip {
      p {
        height: auto;
        color: #000;
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        text-align: center;
      }
    }
    .next-vip {
      p {
        height: auto;
        color: #000;
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        text-align: center;
      }
    }
    .vip-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      height: 20px;
      .arrow {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 5vw;
      }
      .bar {
        width: 100%;
        padding-top: 20px;
      }
    }
  }
  .detail {
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;

    font-size: 16px;
    line-height: 1.88;
    letter-spacing: normal;
    padding: 15px 0 15px 0;
  }
  .maxLevel {
    background-color: #ffffff;
    .current-vip {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      p {
        width: 100%;
        text-align: center;
      }
    }
  }
}
.vip-benefit {
  .title {
    display: flex;
    padding: 5vw 0;
    .square {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-left: 25px;
    }
    .my-vipbenefit-title {
      font-size: 17px;
      margin-left: 10px;
    }
  }
}
.vip-tip {
  .title {
    display: flex;
    padding: 5vw 0;
    .square {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-left: 25px;
    }
    .my-viptip-title {
      font-size: 17px;
      margin-left: 10px;
    }
  }
  .tip {
    font-size: 16px;
    color: #767676;
    margin: 0 15px 0 15px;
    div {
      text-align: left;
      line-height: 2;
      background-color: #ffffff;
      padding: 0 10px 0 10px;
    }
  }
}
.customize-swiper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 4px;
  margin: 0 12px 0 12px;
  background-color: #000;
  .title {
    padding: 2.5vw;

    font-weight: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
  }
  .detail {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;
    div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding: 15px;
      span:nth-child(1) {
        font-size: 16px;
        color: #767676;
      }
      span:nth-child(2) {
        width: 100%;
        margin-top: 10px;
        text-align: center;
        border-right: 2px solid #f5f5f9;

        font-size: 16px;
        font-weight: normal;
        color: #000;
      }
    }
  }
}
</style>

<style lang="scss">
// .el-progress.is-success .el-progress-bar__inner {
//   background-image: linear-gradient(to right, #0f8dca 0%, #29bfa4 100%) !important;
// }
// .el-progress-bar__innerText {
//   color: #000 !important;
// }
// .swiper-button-prev {
//   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23dddddd'%2F%3E%3C%2Fsvg%3E");
//   height: 7vw;
//   top: 24vw;
//   left: 0px;
//   &:focus {
//     outline: none;
//   }
// }
// .swiper-button-next {
//   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23dddddd'%2F%3E%3C%2Fsvg%3E");
//   height: 7vw;
//   top: 23vw;
//   right: 0px;
//   &:focus {
//     outline: none;
//   }
// }
.vipBox {
  .tabBox {
    .v-item-group.theme--light.v-slide-group.v-slide-group--is-overflowing.v-tabs-bar.v-tabs-bar--is-mobile {
      height: auto !important;
      background-color: rgba(0, 0, 0, 0);
    }
    .v-tabs-slider-wrapper {
      display: none;
    }
    .v-slide-group__prev.v-slide-group__prev--disabled {
      display: none !important;
    }
  }
}
</style>
