<template>
  <div>
    <v-divider></v-divider>
    <section class="vip-level mt-5">
      <div class="title align-center">
        <span class="square primary"></span>
        <span class="my-viplevel-title">{{ textFilter('vipLevelTitle') }}</span>
      </div>
      <div class="level">
        <div class="current-vip">
          <img :src="require(`./assets/viplevel/vip-${this.vipLevelData.current_vip_level}.png`)" />
          <p class="text-center">VIP{{ this.vipLevelData.current_vip_level }}</p>
        </div>
        <div class="vip-bar">
          <p class="need-deposit" v-if="this.vipLevelData.next_vip_level !== null">
            {{ textFilter('require') }}
            <span class="world-color">
              {{ this.needDeposit | money }}
              {{ textFilter('yuan') }}
            </span>
            {{ textFilter('upgradedTo') }}
            <span class="world-color">VIP{{ this.vipLevelData.next_vip_level }}</span>
          </p>
          <p class="need-deposit" v-else>{{ textFilter('congratulationsText') }}</p>

          <v-progress-linear
            :active="true"
            :background-opacity="0.3"
            :bottom="false"
            :buffer-value="100"
            :height="15"
            :indeterminate="false"
            :query="false"
            :rounded="true"
            :stream="false"
            :striped="false"
            :top="false"
            :value="percentage"
            color="light-blue"
          >
            <strong>{{ percentage }}%</strong>
          </v-progress-linear>
          <p class="alreday-deposit">
            {{ textFilter('as') }}
            <span class="world-color">{{ vipLevelData.up_time | formatDate }}</span>
            {{ textFilter('done') }}
            <span class="world-color">{{ currentDepositAmount | money }}{{ textFilter('yuan') }}</span>
            {{ textFilter('deposit') }}
          </p>
        </div>
        <div class="next-vip" v-if="this.vipLevelData.next_vip_level !== null">
          <img :src="require(`./assets/viplevel/vip-${this.vipLevelData.next_vip_level}.png`)" />
          <p class="text-center">VIP{{ this.vipLevelData.next_vip_level }}</p>
        </div>
      </div>
    </section>
    <!-- vip benfit -->
    <section class="vip-benefit">
      <div class="title align-center">
        <span class="square primary"></span>
        <span class="my-vipbenefit-title">{{ textFilter('vipBenefits') }}</span>
      </div>
      <div class="list">
        <v-layout class="head primary pa-5">
          <v-flex xs2 text-center>{{ textFilter('vipLevel') }}</v-flex>
          <v-flex xs2 text-center>{{ textFilter('discount') }}</v-flex>
          <v-flex xs2 text-center>{{ textFilter('promotionBonus') }}</v-flex>
          <v-flex xs2 text-center>{{ textFilter('withdrawalsNumber') }}</v-flex>
          <v-flex xs4 text-center>{{ textFilter('availableAmount') }}</v-flex>
        </v-layout>
        <v-layout class="row pa-5 text-center" v-for="(item, i) in this.vipLevelData.list" :key="i">
          <v-flex xs2 text-center>{{ item.level }}</v-flex>
          <v-flex xs2 text-center>{{ item.rechargeOffer + '%' }}</v-flex>
          <v-flex xs2 text-center>{{ item.promotionRewards ? item.promotionRewards : '-' }}</v-flex>
          <v-flex xs2 text-center>{{ item.daily_count }}</v-flex>
          <v-flex xs4 text-center>{{ item.amount | money }}</v-flex>
        </v-layout>
      </div>
    </section>
    <!-- vip tip -->
    <section class="vip-tip">
      <div class="title align-center">
        <span class="square primary"></span>
        <span class="my-viptip-title">{{ textFilter('details') }}</span>
      </div>
      <div class="tip" v-if="this.vipLevelData.vip_mode === 1">
        <div>{{ textFilter('descriptionTitle1') }}<br />{{ textFilter('descriptionContent1') }}</div>
        <div>{{ textFilter('descriptionTitle2') }}<br />{{ textFilter('descriptionContent2', { vip_period: this.vipLevelData.vip_period }) }}</div>
        <div>{{ textFilter('descriptionTitle3', { numbering: '03' }) }}<br />{{ textFilter('descriptionContent3') }}</div>
        <div>
          {{ textFilter('descriptionTitle4', { numbering: '04' }) }}
          <br />
          {{ textFilter('description4_1') }}
          <br />
          {{ textFilter('description4_2') }}
          <br />
          {{ textFilter('description4_3') }}
        </div>
        <div class="red-tip">{{ textFilter('note') }}</div>
      </div>
      <div class="tip" v-else>
        <div>{{ textFilter('descriptionTitle1') }}<br />{{ textFilter('descriptionContent1') }}</div>
        <div>{{ textFilter('descriptionTitle2') }}<br />{{ textFilter('descriptionContent3') }}</div>
        <div>
          {{ textFilter('descriptionTitle4', { numbering: '03' }) }}
          <br />
          {{ textFilter('description4_1') }}
          <br />
          {{ textFilter('description4_2') }}
          <br />
          {{ textFilter('description4_3') }}
        </div>
        <div class="red-tip">{{ textFilter('note') }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
      percentage: 0,
      currentLevel: '',
      nextLevel: '',
    };
  },
  created() {
    // this.$store.commit('setTitle', 'VIP等级');
    this.GET_VIP_LEVEL();
  },
  methods: {
    ...mapActions(['GET_VIP_LEVEL']),
    secondDecimalPlace(val) {
      return parseFloat(val.toFixed(2));
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_vipLevel_', slot) : textFilter(text, 'layout_userCentre_default_vipLevel_');
    },
  },
  watch: {
    vipLevel(data) {
      this.vipLevelData = data;
      this.vipLevelData.list = this.vipLevelData.list.map(item => {
        item.level = `VIP${item.vipLv}`;
        item.daily_count = item.dailyWithdrawTimes === null ? '-' : this.textFilter('count', { count: item.dailyWithdrawTimes });
        item.amount = item.dailyWithdraw === null ? '-' : item.dailyWithdraw;
        return item;
      });
      this.currentLevel = `（VIP${this.vipLevelData.current_vip_level}）`;
      this.nextLevel = `VIP${this.vipLevelData.next_vip_level}`;
      this.percentage =
        this.vipLevelData.next_vip_level !== null
          ? this.secondDecimalPlace((this.currentDepositAmount / this.vipLevelData.next_vip_level_conditions) * 100)
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

    currentDepositAmount() {
      const { current_deposit_amount } = this.vipLevelData;
      return current_deposit_amount > 0 ? current_deposit_amount : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
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
