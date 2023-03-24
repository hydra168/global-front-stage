<template>
  <div class="Footer-wrap">
    <div class="msg copyRight">
      <div class="list__wrap">
        <div class="footer__list" v-for="item in copyRightList" :key="item.code" @click="ROUTER_PUSH(item.url)">
          <span>{{ textFilter(item.name) }}</span>
        </div>
      </div>
    </div>
    <div class="Footer" :style="ftBg">
      <div class="w40">
        <div class="license__img"></div>
        <div class="license__text" :style="licenseText">
          <span>{{ $t(info.first) }}</span>
          <span style="text-align: left">{{ $t(info.second) }}</span>
        </div>
        <div class="d-flex pt-10">
          <div v-for="item in markList" :key="item.id">
            <img :src="item.src" alt="" />
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="w40 pay">
        <ul>
          <div :style="`color:${fontColor}`">{{ textFilter('payment') }}</div>
          <li v-for="(item, index) in payList" :key="index" class="img__wrap">
            <v-img :src="item.src" class="pay__img"></v-img>
          </li>
        </ul>
        <ul>
          <div :style="`color:${fontColor}`">{{ textFilter('partner') }}</div>
          <li v-for="(item, index) in partnerList" :key="index" class="img__wrap">
            <v-img :src="item.src" class="pay__img"></v-img>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright" :style="crBg">{{ textFilter('copyright1', { year }) }}{{ webTitle }}{{ textFilter('copyright2') }}</div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer',
  props: {
    copyRightList: {
      type: Array,
      default: () => [
        { url: '/helpCentre/problem', name: 'faq' },
        { url: '/helpCentre/about', name: 'about_us' },
        { url: '/helpCentre/terms', name: 'terms_use' },
        { url: 'liveChat', name: 'contact_us' },
      ],
    },
    // 支付方式及合作夥伴字的顏色
    fontColor: {
      type: String,
      default: '#ffffff',
    },
    payList: {
      type: Array,
      default: () => [
        { src: require('./assets/bitmap_20.png') },
        { src: require('./assets/bitmap_19.png') },
        { src: require('./assets/bitmap_18.png') },
        { src: require('./assets/bitmap_21.png') },
        { src: require('./assets/bitmap_17.png') },
      ],
    },
    partnerList: {
      type: Array,
      default: () => [
        { src: require('./assets/bitmap_12.png') },
        { src: require('./assets/bitmap_13.png') },
        { src: require('./assets/ag.png') },
        { src: require('./assets/bitmap_11.png') },
      ],
    },
    markList: {
      type: Array,
      default: () => [
        { src: require('./assets/mark01.png') },
        { src: require('./assets/mark02.png') },
        { src: require('./assets/mark03.png') },
        { src: require('./assets/mark04.png') },
        { src: require('./assets/mark05.png') },
        { src: require('./assets/mark06.png') },
      ],
    },
    info: {
      type: Object,
      default: () => {
        return {
          first: 'g_com_footer_008_license1',
          second: 'g_com_footer_008_license2',
        };
      },
    },
    footerBg: {
      type: String,
      default: '',
    },
    licenseTextColor: {
      type: String,
      default: '#44597c',
    },
    copyrightBg: {
      type: String,
      default: '#0F2D41',
    },
    // footer margin config
    footerMg: {
      type: String,
      default: '0 0 40px 0',
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle']),
    crBg() {
      return {
        backgroundColor: this.copyrightBg,
      };
    },
    ftBg() {
      return {
        background: `url(${this.footerBg}) no-repeat`,
        backgroundSize: '100% 100%',
        margin: this.footerMg,
      };
    },
    licenseText() {
      return {
        color: this.licenseTextColor,
      };
    },
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_008_', slot) : textFilter(text, 'com_footer_008_');
    },
  },
};
</script>
<style lang="scss" scope>
.Footer-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .Footer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 20px;
    .license__img {
      width: 264px;
      height: 58px;
      background: url('./assets/license.png') no-repeat;
      background-size: 100% 100%;
      margin: 0 auto 20px auto;
    }

    .license__text {
      margin-bottom: 0px;

      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.92;
      letter-spacing: 0px;
      text-align: center;
    }

    span {
      display: flex;
      text-align: center;
      color: #fff;
      justify-content: center;
    }

    .pay {
      margin-top: 0;
      padding-top: 42px;
      ul {
        margin-bottom: 75px;
        li {
          float: left;
          margin: 10px 30px 0px 0px;
          list-style: none;
          list-style-type: none; /*沒有標誌，不使用編號*/
        }
      }
    }
  }
  .copyRight {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff;

    .list__wrap {
      display: flex;
    }

    .footer__list {
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0px;
      text-align: center;
      color: #fff;
      cursor: pointer;

      // hover 效果
      &:hover {
        font-size: 18px;
        transform: rotate(-10deg);
        transition: all 0.5s;
      }
    }
  }
}
.copyright {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
  color: #fff;
}
.line {
  width: 1px;
  height: 200px;
  background-color: #979797;
  margin-left: 40px;
  margin-right: 40px;
}

.img__wrap {
  max-width: 130px;
  max-height: 30px;
}

.pay__img {
  width: 100%;
  height: 100%;
}
.w40 {
  max-width: 40%;
}
</style>
