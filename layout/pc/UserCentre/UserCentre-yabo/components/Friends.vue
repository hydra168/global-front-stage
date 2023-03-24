<template>
  <div class="Friends white pa-5">
    <h3 class="mt-0 black--text text-center font-size-18 font-weight-400">好友资讯</h3>
    <div class="d-flex flex-wrap">
      <div class="grid d-flex flex-column text-center align-center" v-for="(item, i) in info" :key="i">
        <span class="number font-size-46 font-weight-500 max-width-60px d-inline-flex justify-center" :class="item.number == 0 ? 'lighten' : ''">{{
          formatNumber(item.number)
        }}</span>
        <span class="font-size-14 grey--text">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';
import { map } from 'lodash';

export default {
  name: 'Friends',
  props: {},
  created() {
    const { name } = this.userProfileData;
    this.GET_GRANDTOTAL({ name }).then(res => {
      // console.log(this.grandtotal);
    });
  },
  watch: {},
  data() {
    return {
      fields: {
        friend: '今日好友',
        redEnvelope: '今日红包',
        friendGrandTotal: '累计好友',
        redEnvelopeGrandTotal: '累计红包',
      },
    };
  },

  computed: {
    ...mapGetters(['grandtotal', 'getInviteCodeInfo', 'userProfileData']),
    info() {
      // return [
      //   {
      //     number: 0,
      //     label: '今日好友',
      //   },
      //   {
      //     number: 0,
      //     label: '今日紅包',
      //   },
      //   {
      //     number: 10,
      //     label: '累計好友',
      //   },
      //   {
      //     number: 1,
      //     label: '累計紅包',
      //   },
      // ];
      const { grandtotal } = this;
      return map(this.fields, (label, key) => ({ number: Number(grandtotal[key] || 0), label }));
    },
  },
  methods: {
    ...mapActions(['GET_GRANDTOTAL']),
    formatNumber(n) {
      return n.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Friends {
  .grid {
    min-width: calc(50% - 30px);
    margin: 15px;
    position: relative;
    &:nth-child(2n) {
      &:before {
        background: #e6e6e6;
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        left: -15px;
      }

      & ~ .grid {
        &:after {
          background: #e6e6e6;
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          top: -15px;
        }
      }
    }
    .number {
      line-height: 1;
      margin-bottom: 0.5em;
    }
    .lighten {
      opacity: 0.3;
    }
  }
}
</style>
