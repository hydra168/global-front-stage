<template>
  <div class="LotteryPopular-010">
    <v-row dense v-if="lotterHead && lotterHead.show" class="headRow">
      <!-- <v-img contain class="group-btn-image" :src="lotterHead.icon" /> -->
      <div class="group-btn-wrap" @click="ROUTER_PUSH(lotterHead.link)">
        <img :src="lotterHead.icon" />
        <div class="group-btn-title" :class="lotterHead.titleClass">{{ $t(lotterHead.title) }}</div>
        <div class="group-btn-text" :class="lotterHead.textClass">{{ lotterHead.text }}</div>
        <v-btn class="group-btn-btn"> {{ lotterHead.buttonText }} </v-btn>
      </div>
    </v-row>
    <v-row dense class="listRow">
      <template v-for="(item, i) in lotteryList">
        <v-col :key="i">
          <div class="group-btn-wrap" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
            <img :src="item.icon" />
            <div class="group-btn-title" :class="item.titleClass">{{ $t(item.title) }}</div>
            <div class="group-btn-text" :class="item.textClass">{{ item.text }}</div>
            <v-btn class="group-btn-btn"> {{ item.buttonText }} </v-btn>
          </div>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';
export default {
  name: 'LotteryPopular-010',
  props: {
    titleColor: {
      type: String,
      default: 'text-subtitle-2',
    },
    optionsLotteryList: {
      type: Array,
      default: () => [],
    },
    lotterHeadOption: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      lotterHeadData: {
        show: true,
        title: '数字定投①号',
        text: '5.19%',
        buttonText: '立即操作',
        icon: require('./assets/img/lotteryPopular-010-01.png'),
        link: 'play/BxkZVPiJb63a',
      },
      defaultLotteryList: [
        {
          show: true,
          code: 'blue-js-ft',
          title: '数字定投②号',
          text: '4.99%',
          buttonText: '立即操作',
          icon: require('./assets/img/lotteryPopular-010-02.png'),
          link: 'play/7043222726362',
        },
        {
          show: true,
          code: 'blue-js-fc',
          title: '数字定投③号',
          text: '4.86%',
          buttonText: '立即操作',
          icon: require('./assets/img/lotteryPopular-010-03.png'),
          link: 'play/2147212049129',
        },
        {
          show: true,
          code: 'blue-js-ff',
          title: '数字定投④号',
          text: '4.72%',
          buttonText: '立即操作',
          icon: require('./assets/img/lotteryPopular-010-04.png'),
          link: 'play/6681474621111',
        },
      ],
    };
  },
  computed: {
    lotteryList() {
      return mergeArrayObjectsCode(this.optionsLotteryList, this.defaultLotteryList);
    },
    lotterHead() {
      return {
        ...this.lotterHeadData,
        ...this.lotterHeadOption,
      };
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>
<style lang="scss" scoped>
.LotteryPopular-010 {
  .col {
    padding: 0;
  }
}
.headRow {
  .group-btn-title,
  .group-btn-text {
    font-size: 20px !important;
    left: 5% !important;
  }
  .group-btn-btn {
    font-size: 15px !important;
    left: 70% !important;
  }
}
.listRow {
  .col:not(:first-child):not(:last-child) {
    margin: 0 5px;
  }
}
.group-btn-wrap {
  img {
    width: 100%;
  }
  font-size: 15px;
  .group-btn-title {
    position: absolute;
    font-weight: 600;
    top: 12%;
    left: 15%;
  }
  .group-btn-text {
    position: absolute;
    // font-size: 10px;
    top: 45%;
    left: 17%;
    color: #0090da;
  }
  .group-btn-btn {
    position: absolute;
    bottom: 15%;
    left: 10%;
    font-size: 8px;
    height: 20px;
    border-radius: 50px;
    color: white;
    background-color: #0090da;
  }
}
</style>
