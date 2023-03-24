<template>
  <div class="Footer-006 Footer-wrap">
    <div class="Footer" :style="ftBg">
      <div class="w40">
        <div class="license__img">
          <img :height="licenseImgHeight" :src="licenseImg" alt="" />
        </div>
        <div class="license__text" :style="licenseText">
          <span>{{ webTitle }} {{ $t(info.first) }}</span>
          <span style="text-align: left">{{ $t(info.second) }}</span>
        </div>
        <div>
          <div class="msg copyRight">
            <div class="list__wrap">
              <div class="footer__list" v-for="item in copyRightList" :key="item.code" @click="ROUTER_PUSH(item.url)">
                <span>{{ $t(item.name) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="w40 pay">
        <ul>
          <div :style="textColorStyle">{{ textFilter('payment') }}</div>
          <li v-for="(item, index) in payList" :key="index" class="img__wrap">
            <v-img :src="item.src" class="pay__img"></v-img>
          </li>
        </ul>
        <ul v-if="isShowPartnerList">
          <div :style="textColorStyle">{{ textFilter('partner') }}</div>
          <li v-for="(item, index) in partnerList" :key="index" class="img__wrap">
            <v-img :src="item.src" class="pay__img"></v-img>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright" :style="crBg">{{ textFilter('copyright1', { year }) }}{{ webTitle }} {{ textFilter('copyright2') }}</div>
    <div v-if="safetyIconsShow" class="text-center pa-5 safetyIcons" :style="siBg">
      <img :src="require('./assets/footer.png')" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer',
  props: {
    safetyIconsShow: {
      type: Boolean,
      default: false,
    },
    isShowPartnerList: {
      type: Boolean,
      default: true,
    },
    copyRightList: {
      type: Array,
      default: () => [
        { url: '/helpCentre/problem', name: 'g_com_footer_default_faq' },
        { url: '/helpCentre/about', name: 'g_com_footer_default_about_us' },
        { url: '/helpCentre/terms', name: 'g_com_footer_default_terms_use' },
        { url: 'liveChat', name: 'g_com_footer_default_contact_us' },
      ],
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
    info: {
      type: Object,
      default: () => {
        return {
          first: 'g_com_footer_006_license1',
          second: 'g_com_footer_006_license2',
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
      default: '#4080ff',
    },
    safetyIconsBg: {
      type: String,
      default: '#4080ff',
    },
    // footer margin config
    footerMg: {
      type: String,
      default: '0',
    },
    textColor: {
      type: String,
      default: '#8e8e8e',
    },
    licenseImg: {
      type: String,
      default: require('./assets/license.png'),
    },
    licenseImgWidth: {
      type: String,
      default: '100%',
    },
    licenseImgHeight: {
      type: String,
      default: '60px',
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle']),
    siBg() {
      return {
        backgroundColor: this.safetyIconsBg,
      };
    },
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
    textColorStyle() {
      return {
        color: this.textColor,
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
      return slot ? textFilter(text, 'com_footer_006_', slot) : textFilter(text, 'com_footer_006_');
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
    background: #fff;
    padding: 20px;
    .license__img {
      margin-top: 0px;
      background-size: 100% 100%;
      margin-bottom: 20px;
    }

    .license__text {
      margin-bottom: 0px;

      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.92;
      letter-spacing: 0px;
      text-align: left;
    }

    span {
      display: flex;
      flex-direction: column;
    }

    .pay {
      margin-top: 0;
      ul {
        margin-bottom: 75px;
        li {
          float: left;
          margin: 10px 20px 0px 0px;
          list-style: none;
          list-style-type: none; /*沒有標誌，不使用編號*/
        }
      }
    }
  }
  .copyRight {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: #fff;

    .footer__img {
      width: 625px;
      height: 30px;
      margin-top: 24px;
      background: url('./assets/game.png') no-repeat;
      background-size: 100% 100%;
    }

    .list__wrap {
      display: flex;
      margin-top: 32px;
    }

    .footer__list {
      margin-top: 25px;

      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0px;
      text-align: center;
      color: #000000;
      cursor: pointer;

      // hover 效果
      span {
        &:hover {
          display: inline-block;
          color: var(--v-primary-base);
          transform: translateY(-4px);
          transition: transform 0.3s ease;
        }
      }
    }

    p {
      margin-top: 20px;

      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0px;
      text-align: center;
      color: #000000;
    }
  }
  .w40 {
    max-width: 40%;
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
  max-width: 90px;
  max-height: 30px;
}

.pay__img {
  width: 100%;
  height: 100%;
}
.safetyIcons {
  width: 100%;
  img {
    width: 700px;
  }
}
</style>
