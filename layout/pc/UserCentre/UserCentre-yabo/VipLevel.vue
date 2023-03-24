<template>
  <div class="vip-wrap vipBox width-940px">
    <v-divider></v-divider>
    <section>
      <div class="vipLevelPhoto">
        <div>
          <span>
            <img :src="require(`./assets/img/vip-${vipLevelData.current_vip_level}.png`)" />
          </span>
        </div>
        <div>
          <p class="strong">当前等级: VIP {{ vipLevelData.current_vip_level }}</p>
          <!-- <sub>存款：¥ {{ currentDepositAmount | money }}</sub> -->
          <sub>您共需达成 {{ needDeposit }}元存款、{{ needFlow }}流水，即可升级至 VIP{{ vipLevelData.next_vip_level }}</sub>
        </div>
      </div>
      <div class="vipactionBox">
        <div class="vipactionmiddleBox">
          <div class="progressBox">
            <div class="levelBox">
              <span v-for="(vip, k) in viplevel" :key="k" :class="'act-' + vipLevelData.current_vip_level"> VIP{{ vip.level }} </span>
            </div>
            <v-progress-linear :value="percentage2" background-color="rgb(245, 245, 245)" color="rgb(0, 173, 73)" :bottom="false" :height="10">
            </v-progress-linear>
          </div>
        </div>
      </div>
      <div class="nextVIPBox">
        <p>距离下一等级：VIP{{ vipLevelData.next_vip_level }}</p>
      </div>
    </section>
    <section v-if="vipLevelData.list[vipLevelData.current_vip_level]" class="mt-5">
      <h4>VIP{{ this.vipLevelData.current_vip_level }} 尊享</h4>
      <div v-for="(data, k) in vipdata" :key="k" class="flexBox">
        <div class="center">
          <span class="vipicon1" />
          <p>{{ vipLevelData.list[vipLevelData.current_vip_level].dailyWithdrawTimes }}</p>
          <p>{{ data.info1 }}</p>
        </div>
        <div class="center">
          <span class="vipicon2" />
          <p>{{ vipLevelData.list[vipLevelData.current_vip_level].dailyWithdraw }}</p>
          <p>{{ data.info2 }}</p>
        </div>
        <div class="center">
          <span class="vipicon3" />
          <p>{{ vipLevelData.list[vipLevelData.current_vip_level].promotionRewards }}</p>
          <p>{{ data.info3 }}</p>
        </div>
      </div>
    </section>
    <section class="mt-5">
      <h4>VIP{{ this.vipLevelData.current_vip_level }} 晋级优惠</h4>
      <div class="btnBox">
        <p v-if="vipLevelData.current_vip_level === 0">当前等级没有晋级优惠</p>
        <div @click="goVipDetail()">更多VIP特权</div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'VipLevel',
  data() {
    return {
      vipLevelData: {
        list: [],
        current_vip_level: 0,
        next_vip_level: 1,
        current_deposit_amount: 0,
        next_vip_level_conditions: 0,
        vip_period: null,
        vip_mode: 0,
      },
      viplevel: [
        { level: 1 },
        { level: 2 },
        { level: 3 },
        { level: 4 },
        { level: 5 },
        { level: 6 },
        { level: 7 },
        { level: 8 },
        { level: 9 },
        { level: 10 },
      ],
      vipdata: [
        {
          info1: '每日提款次数',
          info2: '每日提款额度',
          info3: '升级礼金(晋级自动发放)',
        },
      ],
      percentage: 0,
      percentage2: 0,
      currentLevel: '',
      nextLevel: '',
    };
  },
  created() {
    // this.$store.commit('setTitle', 'VIP等级');
    this.GET_VIP_LEVEL();
  },
  methods: {
    ...mapActions(['GET_VIP_LEVEL', 'GET_VIP_LEVEL']),
    ...mapMutations(['SET_VIP_LEVEL']),
    secondDecimalPlace(val) {
      return parseFloat(val.toFixed(2));
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_vipLevel_', slot) : textFilter(text, 'layout_userCentre_default_vipLevel_');
    },
    goVipDetail() {
      this.$router.push({ name: 'vipDetail' });
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
      // if (this.vipLevelData.current_vip_level === 0) {
      //   this.percentage2 = 0;
      // }
      if (this.vipLevelData.current_vip_level === 1) {
        this.percentage2 = 10;
      }
      if (this.vipLevelData.current_vip_level === 2) {
        this.percentage2 = 20;
      }
      if (this.vipLevelData.current_vip_level === 3) {
        this.percentage2 = 30;
      }
      if (this.vipLevelData.current_vip_level === 4) {
        this.percentage2 = 40;
      }
      if (this.vipLevelData.current_vip_level === 5) {
        this.percentage2 = 50;
      }
      if (this.vipLevelData.current_vip_level === 6) {
        this.percentage2 = 60;
      }
      if (this.vipLevelData.current_vip_level === 7) {
        this.percentage2 = 70;
      }
      if (this.vipLevelData.current_vip_level === 8) {
        this.percentage2 = 80;
      }
      if (this.vipLevelData.current_vip_level === 9) {
        this.percentage2 = 90;
      }
      if (this.vipLevelData.current_vip_level === 10) {
        this.percentage2 = 100;
      }
      this.percentage =
        this.vipLevelData.next_vip_level !== null
          ? this.secondDecimalPlace((this.vipLevelData.current_deposit_amount / this.vipLevelData.next_vip_level_conditions) * 100)
          : 100;
      this.percentage = parseInt(this.percentage) > 100 ? 100 : this.percentage;

      this.mode = this.vipLevelData.vip_mode;
    },
  },
  computed: {
    ...mapGetters(['vipLevel']),
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
.vip-wrap.vipBox {
  section {
    background: #fff;
    width: 940px;
    padding: 20px;
    h4 {
      color: #000;
    }
    .btnBox {
      width: 180px;
      margin: 20px auto;
      text-align: center;
      p {
        font-size: 14px;
        color: #656565;
      }
      div {
        background: -webkit-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
        background: -o-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
        background: -moz-linear-gradient(right, rgb(0, 173, 73), rgb(108, 219, 139));
        background: linear-gradient(to right, rgb(0, 173, 73), rgb(108, 219, 139));
        padding: 7px 15px;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .flexBox {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .center {
        margin: 10px auto;
        text-align: center;
        .vipicon1 {
          display: block;
          width: 60px;
          height: 60px;
          margin: 10px auto;
          background: url('./assets/img/vipicon1.png') no-repeat center center/contain;
        }
        .vipicon2 {
          display: block;
          width: 60px;
          height: 60px;
          margin: 10px auto;
          background: url('./assets/img/vipicon2.png') no-repeat center center/contain;
        }
        .vipicon3 {
          display: block;
          width: 60px;
          height: 60px;
          margin: 10px auto;
          background: url('./assets/img/vipicon3.png') no-repeat center center/contain;
        }
        p:nth-child(2) {
          font-size: 18px;
          margin-bottom: 7px;
          color: #000;
        }
        p:nth-child(3) {
          font-size: 12px;
          margin-bottom: 0;
          color: #656565;
        }
      }
    }
    .vipactionBox {
      margin-top: 50px;
    }
    .vipLevelPhoto {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0 0 20px -18px;
      img {
        width: 100px;
        height: 100px;
      }
      .strong {
        font-size: 22px;
        font-weight: 600;
        color: #000;
        margin-bottom: 0;
      }
    }
    .levelBox {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .act-0:nth-child(1) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-1:nth-child(2) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-2:nth-child(3) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-3:nth-child(4) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-4:nth-child(5) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-5:nth-child(6) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-6:nth-child(7) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-7:nth-child(8) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-8:nth-child(9) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-9:nth-child(10) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
      .act-10:nth-child(11) {
        width: 30px;
        height: 35px;
        color: #fff;
        background: url('./assets/img/fill.png') no-repeat center center/contain;
        margin-top: -22px;
        padding: 6px 0 0 2px;
      }
    }
    .nextVIPBox {
      margin-top: 15px;
      p {
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
}
.vip-benefit .list {
  display: block;
  // width: 770px;
  // margin: 0 auto;
}
.vip-benefit .list .row {
  width: 100%;
  margin: 0;
  color: #000;
}
.vip-levle-title {
  text-align: left;
  font-size: 24px;
  // font-family: PingFangSC, microsoft yahei, lihei pro;
  border-left: 7px solid #13805e;
  padding: 15px 12px 20px 12px;
}

.vip-level {
  .title {
    height: 35px;
    display: flex;
    .square {
      width: 15px;
      height: 15px;
      display: inline-block;
      background-color: #13805e;
      // margin-left: 25px;
    }
    .my-viplevel-title {
      font-size: 17px;
      margin-left: 10px;
    }
  }
  .level {
    display: flex;
    justify-content: center;
    .current-vip {
      p {
        color: #13805e;
        font-size: 18px;
        font-weight: bold;
        margin: 0;
      }
    }
    .next-vip {
      p {
        color: #13805e;
        font-size: 18px;
        font-weight: bold;
        margin: 0;
      }
    }
    .vip-bar {
      width: 600px;
      display: inline-block;
      .need-deposit {
        text-align: left;
        padding-bottom: 5px;
        margin: 0px;
      }
      .alreday-deposit {
        text-align: left;
        padding-top: 5px;
        margin: 0px;
      }
      .world-color {
        color: #13805e;
      }
    }
  }
}

.vip-benefit {
  padding-top: 15px;
  .title {
    height: 35px;
    display: flex;
    .square {
      width: 15px;
      height: 15px;
      display: inline-block;
      background-color: #13805e;
      // margin-left: 25px;
    }
    .my-vipbenefit-title {
      font-size: 17px;
      margin-left: 10px;
    }
  }
  .list {
    display: block;
    // width: 770px;
    .head {
      height: 43px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #13805e;
      color: #ffffff;
      span {
        font-size: 18px;
        line-height: normal;
        color: #ffffff;
        width: 20%;
      }
    }
    .row {
      height: 48px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &:nth-child(odd) {
        background-color: #ffffff;
      }
      &:nth-child(even) {
        background-color: #f5f5f5;
      }
      span {
        font-size: 18px;
        line-height: normal;
        width: 25%;
      }
    }
  }
}

.vip-tip {
  padding-top: 15px;

  .title {
    height: 35px;
    display: flex;
    .square {
      width: 15px;
      height: 15px;
      display: inline-block;
      background-color: #13805e;
      // margin-left: 25px;
    }
    .my-viptip-title {
      font-size: 17px;
      margin-left: 10px;
    }
  }
  .tip {
    display: block;
    // width: 770px;
    // margin: 0 auto;
    background-color: #f5f5f5;
    padding: 19px 10px 16px 10px;
    div {
      color: #767676;
      text-align: left;
      // font-family: PingFangSC;
      font-size: 15px;
      line-height: 2;
    }
    .red-tip {
      color: #ff5040;
      font-size: 14px;
    }
  }
}
</style>
