<template>
  <v-main class="vip-wrap pt-0">
    <!-- vip level -->
    <section class="vip-level pa-5 white black--text">
      <v-layout class="title align-center">
        <v-flex class="square primary"></v-flex>
        <v-flex class="my-viplevel-title">{{ textFilter('vipLevel') }}</v-flex>
        <v-flex class="primary--text">{{ this.currentLevel }}</v-flex>
      </v-layout>
      <div class="level" v-if="this.vipLevelData.next_vip_level !== null">
        <div class="current-vip">
          <img :src="require(`./assets/viplevel/vip-${this.vipLevelData.current_vip_level}.png`)" />
          <p>VIP{{ this.vipLevelData.current_vip_level }}</p>
        </div>
        <div class="vip-bar">
          <div class="arrow">
            <img :src="require('./assets/viplevel/arrow-right.png')" />
          </div>
          <div class="bar">
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
          </div>
        </div>
        <div class="next-vip" v-if="this.vipLevelData.next_vip_level !== null">
          <img :src="require(`./assets/viplevel/vip-${this.vipLevelData.next_vip_level}.png`)" />
          <p>VIP{{ this.vipLevelData.next_vip_level }}</p>
        </div>
      </div>
      <v-layout class="detail" v-if="this.vipLevelData.next_vip_level !== null">
        <v-flex class="left">
          <span>{{ textFilter('require') }}</span>
          <br />
          <span>{{ textFilter('deposit') }}</span>
          <br />
          <span class="primary--text"> {{ this.needDeposit | money }}{{ textFilter('yuan') }} </span>
          <br />
          <span>
            {{ textFilter('upgradedTo') }}
            <span class="primary--text">
              {{ this.nextLevel }}
            </span>
          </span>
        </v-flex>
        <v-spacer />
        <v-flex class="right">
          <span>{{ textFilter('done') }}</span>
          <br />
          <span>{{ textFilter('deposit') }}</span>
          <br />
          <span class="primary--text">{{ currentDepositAmount | money }}{{ textFilter('yuan') }}</span>
          <br />
          <span>
            {{ textFilter('as') }}
            <span class="primary--text">{{ vipLevelData.up_time | formatDate }}</span>
          </span>
        </v-flex>
      </v-layout>
      <div class="maxLevel" v-if="this.vipLevelData.next_vip_level === null">
        <div class="current-vip">
          <img :src="require(`./assets/viplevel/vip-${this.vipLevelData.current_vip_level}.png`)" />
          <p>{{ textFilter('congratulationsText') }}</p>
        </div>
      </div>
    </section>
    <!-- vip benfit -->
    <section class="vip-benefit">
      <v-layout class="title align-center">
        <v-flex class="square primary"></v-flex>
        <v-flex class="my-vipbenefit-title black--text">{{ textFilter('vipBenefits') }}</v-flex>
      </v-layout>
      <template v-for="(item, i) in this.vipLevelData.list">
        <div class="customize-swiper" :key="i">
          <div class="title">{{ item.level }}</div>
          <div class="detail">
            <div>
              <span>{{ textFilter('discount') }}</span>
              <span>{{ item.rechargeOffer + '%' }}</span>
            </div>
            <div>
              <span>{{ textFilter('withdrawalsNumber') }}</span>
              <span>{{ item.daily_count }}</span>
            </div>
            <div>
              <span>{{ textFilter('availableAmount') }}</span>
              <span>{{ item.amount | money }}{{ textFilter('yuan') }}</span>
            </div>
          </div>
        </div>
      </template>
    </section>
    <!-- vip tip -->
    <section class="vip-tip">
      <v-layout class="title align-center">
        <v-flex class="square primary"></v-flex>
        <v-flex class="my-viptip-title black--text">{{ textFilter('details') }}</v-flex>
      </v-layout>
      <div class="tip" v-if="this.vipLevelData.vip_mode === 1">
        <div>{{ textFilter('descriptionTitle1') }}<br />{{ textFilter('descriptionContent1') }}</div>
        <div>{{ textFilter('descriptionTitle2') }}<br />{{ textFilter('descriptionContent2', { vip_period: vipLevelData.vip_period }) }}</div>
        <div>{{ textFilter('descriptionTitle3', { numbering: '03' }) }}<br />{{ textFilter('descriptionContent3') }}</div>
        <div>
          {{ textFilter('descriptionTitle4', { numbering: '04' }) }}
          <br />
          {{ textFilter('descriptionTitle4_1') }}
          <br />
          {{ textFilter('descriptionContent4_1') }}
          <br />
          {{ textFilter('descriptionTitle4_2') }}
          <br />
          {{ textFilter('descriptionContent4_2') }}
          <br />
          {{ textFilter('descriptionTitle4_3') }}
          <br />
          {{ textFilter('descriptionContent4_3') }}
        </div>
        <div>{{ textFilter('note') }}</div>
      </div>
      <div class="tip" v-else>
        <div>
          {{ textFilter('descriptionTitle1') }}
          <br />
          {{ textFilter('descriptionContent1') }}
        </div>
        <div>{{ textFilter('descriptionTitle3', { numbering: '02' }) }}<br />{{ textFilter('descriptionContent3') }}</div>
        <div>
          {{ textFilter('descriptionTitle4', { numbering: '03' }) }}
          <br />
          {{ textFilter('descriptionTitle4_1') }}
          <br />
          {{ textFilter('descriptionContent4_1') }}
          <br />
          {{ textFilter('descriptionTitle4_2') }}
          <br />
          {{ textFilter('descriptionContent4_2') }}
          <br />
          {{ textFilter('descriptionTitle4_3') }}
          <br />
          {{ textFilter('descriptionContent4_3') }}
        </div>
        <div>{{ textFilter('note') }}</div>
      </div>
    </section>
  </v-main>
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
      height: 100%;
      .arrow {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 5vw;
      }
      .bar {
        width: 100%;
        padding-top: 5vw;
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
.el-progress.is-success .el-progress-bar__inner {
  background-image: linear-gradient(to right, #0f8dca 0%, #29bfa4 100%) !important;
}
.el-progress-bar__innerText {
  color: #000 !important;
}
.swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23dddddd'%2F%3E%3C%2Fsvg%3E");
  height: 7vw;
  top: 24vw;
  left: 0px;
  &:focus {
    outline: none;
  }
}
.swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23dddddd'%2F%3E%3C%2Fsvg%3E");
  height: 7vw;
  top: 23vw;
  right: 0px;
  &:focus {
    outline: none;
  }
}
</style>
