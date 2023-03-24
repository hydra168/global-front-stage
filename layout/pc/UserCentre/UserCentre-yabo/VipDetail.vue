<template>
  <div class="vip-wrap vipBox">
    <section>
      <div class="goback" @click="goVip()">VIP详情</div>
      <carousel-3d>
        <slide v-for="(slide, i) in vipLevel.list" :index="i" :key="i">
          <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <div :data-index="index" :class="{ current: isCurrent, onLeft: leftIndex >= 0, onRight: rightIndex >= 0 }">
              <span class="viptitle">{{ slide.vipLvDesc }}</span>
              <span class="vipIconBox">
                <img :src="require(`./assets/img/vip-${slide.vipLv}.png`)" />
              </span>
              <div class="vipsubinfo">
                <div>
                  <p class="strong">{{ '≥' + tranNumber(slide.rechargeConditions) }}</p>
                  <p>累计存款</p>
                </div>
                <div>
                  <p class="strong">{{ '≥' + tranNumber(slide.flowConditions) }}</p>
                  <p>累计有效流水</p>
                </div>
                <div>
                  <p class="strong">{{ '≥' + tranNumber(slide.keepFlowConditions) }}</p>
                  <p>保级有效流水</p>
                </div>
              </div>
            </div>
          </template>
        </slide>
      </carousel-3d>
    </section>
    <section class="vipDetailWrap">
      <div class="titleBarBox">
        <h3>冠军体育VIP尊享福利</h3>
        <p class="strong">活动条件</p>
        <p>活动对象：冠军体育全站会员</p>
        <p class="strong">活动内容</p>
        <p>加入冠军体育，体现尊贵，彰显品位，尽享VIP专属礼遇。领取生日礼金和每月红包。</p>
      </div>
      <div class="titleBox">
        <p>VIP反水比例</p>
      </div>
      <div class="tabBox">
        <v-simple-table cellpadding="0" cellspacing="0" border="0">
          <template v-slot:default>
            <thead>
              <tr class="tableHeader">
                <th class="text-center th1">会员等级</th>
                <th class="text-center">累计存款</th>
                <th class="text-center">累计有效流水</th>
                <th class="text-center">保级有效流水</th>
                <!-- <th class="text-center">日提款次数</th> -->
                <th class="text-center">反水比例</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in vipLevel.list" :key="item.vipLv">
                <td class="strong">{{ item.vipLvDesc }}</td>
                <td>{{ tranNumber(item.rechargeConditions) }}</td>
                <td>{{ tranNumber(item.flowConditions) }}</td>
                <td>{{ tranNumber(item.keepFlowConditions) }}</td>
                <!-- <td>{{ item.state4 }}</td> -->
                <td>{{ (item.rebate_multiple * 100).toFixed(2) }}%</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div class="titleBox">
        <p>VIP每月红包</p>
      </div>
      <div class="tabBox">
        <v-simple-table cellpadding="0" cellspacing="0" border="0">
          <template v-slot:default>
            <thead>
              <tr class="tableHeader">
                <th class="text-center th1">会员等级</th>
                <th class="text-center">升级礼金</th>
                <th class="text-center">生日礼金</th>
                <th class="text-center">上半月红包</th>
                <th class="text-center">下半月红包</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in vipList2" :key="item.name">
                <td class="strong">{{ item.vip }}</td>
                <td>{{ item.state1 }}</td>
                <td>{{ item.state2 }}</td>
                <td>{{ item.state3 }}</td>
                <td>{{ item.state4 }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div class="disInfoBox">
        <p>活动规则</p>
        <ul>
          <li>1.晋升标准：会员的累计存款以及累计投注额达到相应级别的要求，即可在次日24点前晋级相应VIP等级；</li>
          <li>2.晋升顺序：VIP等级达到相应的要求可每天晋升1级，</li>
          <li>3.保级要求：会员在达到某VIP等级后，90天内投注需要完成保级要求。如果在此期间完成晋升，保级要求重新按照当前等级计算；</li>
          <li>
            4.降级标准：如果会员在1个季度（90天计算）内没有完成相应的保级要求流水，系统会自动降级1个等级，相应的返水及其它优惠也会随之调整至降级后的等级；
          </li>
          <li>5.升级礼金：升级礼金在会员达到该会员级别后系统自动派发，每个级别的升级礼金每位会员仅能获得1次（升级礼金1倍流水即可提款）；</li>
          <li>
            6.返水计算周期：前一天00:00-24:00（北京时间）的返水报表，返水于每日北京时间00:00开始陆续派发，需要找在线客服申请，返水仅需一倍有效流水即可提款，反水金额=(日总有效流水-某些特定优惠活动需要完成的有效流水)*返水比例
          </li>
          <li>
            7.生日礼金：会员在注册3个月内过生日，今年将不能领取生日礼金。另注册时间大于3个月的会员需在生日当天的VIP页面进行自助领取，每年可领取1次（生日彩金1倍流水即可提款）；
          </li>
          <li>
            8.每月红包：会员在上个月存款≥1000元，即可在本月1日和15日到VIP特权页领取相应等级的红包彩金（每月红包彩金1倍流水即可提款）。 领取时间如下：
          </li>
          <li>
            上半月红包：
            <ol>
              <li>- VIP1-VIP5（包含降级到VIP0用户）每月1日01:00:00开启-14日23:59:59截止</li>
              <li>- VIP6~VIP10每月1日13:00:00开启-14日23:59:59截止</li>
            </ol>
          </li>
          <li>
            下半月红包：
            <ol>
              <li>- VIP1-VIP5（包含降级到VIP0用户）每月15日01:00:00开启-当月最后一天的23:59:59截止</li>
              <li>- VIP6~VIP10每月15日13:00:00开启-当月最后一天的23:59:59截止；</li>
            </ol>
          </li>
          <li>
            9.晋级优惠：会员可在VIP特权页面进行申请，申请晋级优惠后开始计算活动有效流水。此优惠不与平台其他优惠共享，仅与返水优惠共享。有任何疑问请咨询7x24小时在线客服；
          </li>
          <li>10.每个等级的VIP晋级优惠仅支持指定场馆申请（只可申请符合当前等级的晋级优惠）；</li>
          <li>11.冠军体育保留对活动的修改、停止及最终解释权。</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
import { mapGetters } from 'vuex';
export default {
  name: 'VipDetail',
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      vipList: [
        // {
        //   vip: 'VIP0',
        //   state1: '≥0元',
        //   state2: '≥0元',
        //   state3: '≥0元',
        //   state4: '5',
        //   state5: '0.3%',
        // },
        {
          vip: 'VIP1',
          state1: '≥1000元',
          state2: '≥3000元',
          state3: '≥2000元',
          state4: '5',
          state5: '0.35%',
        },
        {
          vip: 'VIP2',
          state1: '≥2000元',
          state2: '≥1万',
          state3: '≥5000元',
          state4: '5',
          state5: '0.4%',
        },
        {
          vip: 'VIP3',
          state1: '≥1万',
          state2: '≥5万',
          state3: '≥1.5万',
          state4: '5',
          state5: '0.45%',
        },
        {
          vip: 'VIP4',
          state1: '≥5万',
          state2: '≥30万',
          state3: '≥5万',
          state4: '10',
          state5: '0.5%',
        },
        {
          vip: 'VIP5',
          state1: '≥20万',
          state2: '≥120万',
          state3: '≥25万',
          state4: '10',
          state5: '0.6%',
        },
        {
          vip: 'VIP6',
          state1: '≥50万',
          state2: '≥300万',
          state3: '≥60万',
          state4: '10',
          state5: '0.7%',
        },
        {
          vip: 'VIP7',
          state1: '≥120万',
          state2: '≥720万',
          state3: '≥180万',
          state4: '20',
          state5: '0.8%',
        },
        {
          vip: 'VIP8',
          state1: '≥300万',
          state2: '≥1800万',
          state3: '≥600万',
          state4: '20',
          state5: '0.9%',
        },
        {
          vip: 'VIP9',
          state1: '≥1000万',
          state2: '≥6000万',
          state3: '≥2500万',
          state4: '20',
          state5: '1%',
        },
        {
          vip: 'VIP10',
          state1: '≥3000万',
          state2: '≥1.8亿',
          state3: '≥5000万',
          state4: '20',
          state5: '1.8%',
        },
      ],
      vipList2: [
        // {
        //   vip: 'VIP0',
        //   state1: '≥0元',
        //   state2: '≥0元',
        //   state3: '≥0元',
        //   state4: '0元',
        // },
        {
          vip: 'VIP1',
          state1: '18元',
          state2: '8元',
          state3: '10元',
          state4: '10元',
        },
        {
          vip: 'VIP2',
          state1: '28元',
          state2: '18元',
          state3: '20元',
          state4: '20元',
        },
        {
          vip: 'VIP3',
          state1: '38元',
          state2: '28元',
          state3: '30元',
          state4: '30元',
        },
        {
          vip: 'VIP4',
          state1: '88元',
          state2: '68元',
          state3: '50元',
          state4: '50元',
        },
        {
          vip: 'VIP5',
          state1: '388元',
          state2: '388元',
          state3: '200元',
          state4: '200元',
        },
        {
          vip: 'VIP6',
          state1: '688元',
          state2: '688元',
          state3: '360元',
          state4: '360元',
        },
        {
          vip: 'VIP7',
          state1: '1088元',
          state2: '1088元',
          state3: '600元',
          state4: '600元',
        },
        {
          vip: 'VIP8',
          state1: '3888元',
          state2: '3888元',
          state3: '2000元',
          state4: '2000元',
        },
        {
          vip: 'VIP9',
          state1: '6888元',
          state2: '6888元',
          state3: '3000元',
          state4: '3000元',
        },
        {
          vip: 'VIP10',
          state1: '18888元',
          state2: '18888元',
          state3: '10000元',
          state4: '10000元',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['vipLevel']),
  },
  methods: {
    goVip() {
      this.$router.push({ name: 'vip' });
    },
    tranNumber(n) {
      let amount = n.toFixed(0).replace(/(\d{1,4})((\d{4})*)$/, (a, b, c) => {
        const t = ['', '万', '亿', '万亿'][c.length / 4];
        return t ? `${b}${'.'}${c.slice(0, 2)}${t}` : b;
      });
      return amount;
    },
  },
};
</script>
<style lang="scss">
.vipBox {
  width: 100%;
  section {
    background: #fff;
    padding: 20px;
    position: relative;
    .goback {
      position: relative;
      font-size: 18px;
      color: #000;
      cursor: pointer;
    }
    .goback::before {
      content: '<';
      display: inline-block;
      margin-right: 8px;
    }
    .carousel-3d-container {
      height: 200px !important;
    }
    .carousel-3d-slide {
      background: -webkit-linear-gradient(left, #989c99, #d2d7d3);
      background: -o-linear-gradient(left, #989c99, #d2d7d3);
      background: -moz-linear-gradient(left, #989c99, #d2d7d3);
      background: linear-gradient(to left, #989c99, #d2d7d3);
      height: 180px !important;
      border: 1px solid rgba(0, 0, 0, 0.2) !important;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
      border-radius: 7px;
      padding: 15px 20px;
      .viptitle {
        color: #fff;
        font-size: 30px;
      }
      .vipIconBox {
        width: 80px;
        height: 80px;
        position: absolute;
        right: 10px;
        top: 5px;
      }
      .vipsubinfo {
        display: flex;
        justify-content: space-around;
        padding-top: 50px;
        font-size: 14px;
        text-align: center;
        p.strong {
          font-weight: 800;
          margin-bottom: 2px;
        }
        p {
          margin-bottom: 0;
          color: #fff;
          // text-shadow: 0 0 2px rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
  .vipDetailWrap {
    padding-top: 17px;
    min-height: 100vh;
    background: rgb(246, 246, 246);
    padding-bottom: 67px;
    .titleBarBox {
      background: #fff;
      padding: 20px;
      h3 {
        font-size: 20px;
        color: rgb(77, 153, 116);
        text-align: center;
      }
      p.strong {
        font-size: 14px;
        font-weight: 600;
        margin: 15px 0 10px;
      }
      p {
        color: rgb(102, 102, 102);
        font-size: 12px;
        margin-bottom: 0px;
      }
    }
    .titleBox {
      background: #fff;
      padding: 20px;
      p {
        font-size: 16px;
        border-left: 6px solid rgb(65, 135, 95);
        padding-left: 20px;
        font-weight: 600;
        margin-bottom: 0;
      }
    }
    .disInfoBox {
      padding: 20px;
      background: #fff;
      p {
        font-size: 14px;
        font-weight: 600;
      }
      li {
        font-size: 12px;
        color: rgb(102, 102, 102);
        margin-bottom: 15px;
      }
    }
    .tabBox {
      th {
        font-size: 9px;
        transform: scale(0.83);
        letter-spacing: 4px;
        padding: 3px;
        text-align: center;
        padding: 7px;
        width: 44px;
        border-bottom: none !important;
      }
      .th1 {
        width: 0px;
        letter-spacing: 3px;
        color: rgb(0, 173, 73);
      }
      .tableHeader {
        background: rgb(238, 240, 237);
      }
      tbody tr,
      tbody td {
        border-spacing: 3em;
      }
      td {
        text-align: center;
        transform: scale(0.93);
        font-size: 10px;
        padding: 7px;
        border-bottom: none !important;
      }
      td.strong {
        font-weight: 600;
        color: rgb(0, 173, 73);
      }
      tr:nth-child(odd) td:nth-child(1) {
        background: rgb(238, 240, 237);
      }
      tr:nth-child(odd) td:nth-child(2),
      tr:nth-child(odd) td:nth-child(3),
      tr:nth-child(odd) td:nth-child(4),
      tr:nth-child(odd) td:nth-child(5),
      tr:nth-child(odd) td:nth-child(6) {
        background: rgb(249, 249, 249);
      }
      tr:nth-child(even) td:nth-child(1) {
        background: rgb(249, 249, 249);
      }
      tr:nth-child(even) td:nth-child(2),
      tr:nth-child(even) td:nth-child(3),
      tr:nth-child(even) td:nth-child(4),
      tr:nth-child(even) td:nth-child(5),
      tr:nth-child(even) td:nth-child(6) {
        background: rgb(238, 240, 237);
      }
    }
  }
}
</style>
