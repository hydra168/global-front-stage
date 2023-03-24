<template>
  <!-- Footer -->
  <div class="Footer-001-wrap" :class="textColor">
    <div class="Footer-001" :class="bgColor">
      <v-container class="pt-2" :class="containerClass">
        <section>
          <v-container fluid grid-list-md px-0 py-1>
            <v-layout row wrap>
              <v-flex class="service" sm3 md3 lg3 left>
                <h3 class="title">{{ $t(serviceAdvantageTitleComputed) }}</h3>
                <div class="text">
                  <div class="lt">{{ $t(serviceAdvantageSubTitleOneComputed) }}</div>
                  <div class="rt">{{ $t(serviceAdvantageSubContentOneComputed) }}</div>
                </div>
                <div class="text">
                  <div class="lt">{{ $t(serviceAdvantageSubTitleTwoComputed) }}</div>
                  <div class="rt">{{ $t(serviceAdvantageSubContentTwoComputed) }}</div>
                </div>
              </v-flex>
              <v-flex v-if="isShowSafePay" class="safePay" sm3 md3 lg2 center pd10>
                <h3 class="title">{{ textFilter('title_safe') }}</h3>
                <img style="max-width: 100%" :src="safePayPic" alt="" />
              </v-flex>
              <v-flex class="administer" sm2 md2 lg2 style="margin-left: 34px !important">
                <h3 class="title">{{ textFilter('title_supervision') }}</h3>
                <div class="text02">
                  <div class="rt">
                    {{ formatedAdministerContent }}
                  </div>
                </div>
              </v-flex>
              <v-flex class="helpCentre" sm2 md2 lg2 center pd10>
                <h3 class="title">{{ textFilter('title_help') }}</h3>
                <ul class="helpCentre_wrap" style="display: flex; flex-wrap: wrap; flex-grow: 0">
                  <li class="register link_wrap">
                    <span @click="redirect({ action: 'register' })" class="hlep footer__link">{{ textFilter('help_registered') }}</span>
                  </li>
                  <li class="userCentre link_wrap">
                    <span @click="redirect({ action: 'userCenter', url: '/userCentre/wallet' })" class="hlep footer__link">
                      {{ textFilter('help_user') }}
                    </span>
                  </li>
                  <li class="withdraw withdrawalsBtn link_wrap">
                    <span @click="redirect({ action: 'withdrawals', url: '/userCentre/withdrawals' })" class="hlep footer__link">
                      {{ textFilter('help_withdrawal') }}
                    </span>
                  </li>
                  <li class="appdownload link_wrap">
                    <span @click="redirect({ action: 'appdownload', url: '/appdownload' })" class="hlep footer__link">
                      {{ textFilter('help_app') }}
                    </span>
                  </li>
                  <li class="deposit link_wrap">
                    <span @click="redirect({ action: 'deposit', url: '/userCentre/deposit' })" class="hlep footer__link">
                      {{ helpRecharge ? helpRecharge : textFilter('help_recharge') }}
                    </span>
                  </li>
                  <li class="installdownload link_wrap">
                    <span @click="redirect({ action: 'installdownload', url: '/installdownload' })" class="hlep footer__link">
                      {{ textFilter('help_pc') }}
                    </span>
                  </li>
                  <li class="helpCentre link_wrap">
                    <span @click="redirect({ action: 'help', url: '/helpCentre/about' })" class="hlep footer__link">
                      {{ textFilter('help_about') }}
                    </span>
                  </li>
                </ul>
              </v-flex>
              <v-flex class="appdownload" sm2 md2 lg2 center>
                <h3 class="title">{{ textFilter('title_app') }}</h3>
                <div class="center">
                  <vue-qr :text="(config && appDownloadPath) || ''" :size="140" :margin="10"></vue-qr>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </v-container>
      <div v-if="safetyIconsShow" class="footer text-center ma-5">
        <img :src="require('./assets/footer.png')" />
      </div>
      <!-- <v-row class="logoIconWrap justify-center ma-5" v-if="logoIconsShow">
        <v-col cols="2" v-for="(item, i) in logoIcons" :key="i" :class="`logoIconWrap-${i} d-flex align-center justify-center`">
          <img width="50" height="50" :src="item.img" />
          <p class="caption mb-0 ml-2">{{ $t(item.label) }}</p>
        </v-col>
      </v-row> -->
    </div>
    <div class="msg copyRight001" :class="copyRightClass">
      <p>{{ textFilter('copyright', { year, webTitle }) }}</p>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr';
import { textReplacer } from '@UTILS';

import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer-003',
  components: {
    VueQr,
  },
  props: {
    helpRecharge: {
      type: String,
      default: '',
    },
    logoIconsShow: {
      type: Boolean,
      default: true,
    },
    logoIconFuliTitle: {
      type: String,
      default: 'g_common_logoIcon_welfare_lottery',
    },
    logoIconTiYuTitle: {
      type: String,
      default: 'g_common_logoIcon_sports_lottery',
    },
    bgColor: {
      type: String,
      default: '',
    },
    containerClass: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: 'white--text',
    },
    isShowSafePay: {
      type: Boolean,
      default: true,
    },
    safePayPic: {
      type: String,
      default: require('./assets/paywhite2.png'),
    },
    safetyIconsShow: {
      type: Boolean,
      default: true,
    },
    copyRightClass: {
      type: String,
      default: 'black white--text',
    },
    serviceAdvantageTitle: {
      type: String,
      default: 'g_com_footer_003_title_service',
    },
    serviceAdvantageSubTitleOne: {
      type: String,
      default: 'g_com_footer_003_service_title_1',
    },
    serviceAdvantageSubContentOne: {
      type: String,
      default: 'g_com_footer_003_service_content_1',
    },
    serviceAdvantageSubTitleTwo: {
      type: String,
      default: 'g_com_footer_003_service_title_2',
    },
    serviceAdvantageSubContentTwo: {
      type: String,
      default: 'g_com_footer_003_service_content_2',
    },
    administerContent: {
      type: String,
      default:
        '@@{{webTitle}}@@ 由香港彩票局监管，为世界彩票协会(WLA)的Gold Contributor及亚太彩票协会(APLA)的附属会员，是受国际彩票协会认可的合法公司，注册操作时请确保已满18岁!',
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
    formatedAdministerContent() {
      return textReplacer('@@{{webTitle}}@@', this.administerContent, this.webTitle);
    },
    serviceAdvantageTitleComputed() {
      return this.serviceAdvantageTitle || this.textFilter('title_service');
    },
    serviceAdvantageSubTitleOneComputed() {
      return this.serviceAdvantageSubTitleOne || this.textFilter('service_title_1');
    },
    serviceAdvantageSubContentOneComputed() {
      return this.serviceAdvantageSubContentOne || this.textFilter('service_content_1');
    },
    serviceAdvantageSubTitleTwoComputed() {
      return this.serviceAdvantageSubTitleTwo || this.textFilter('service_title_2');
    },
    serviceAdvantageSubContentTwoComputed() {
      return this.serviceAdvantageSubContentTwo || this.textFilter('service_content_2');
    },
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  data() {
    return {
      logoIcons: [
        { img: require('./assets/welfare.png'), label: this.logoIconFuliTitle },
        { img: require('./assets/sport.png'), label: this.logoIconTiYuTitle },
      ],
    };
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    redirect(item) {
      switch (item.action) {
        case 'register':
          this.SET_GLOBAL_BOX('RegisterBox');
          break;
        // case 'app':
        //   window.open(this.appDownloadPath);
        //   break;
        case 'liveChat':
          this.SHOW_LIVE_CHAT(0);
          break;
        default:
          this.$router.push(item.url);
      }
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_003_', slot) : textFilter(text, 'com_footer_003_');
    },
  },
};
</script>

<style lang="scss">
.Footer-001-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .Footer-001 {
    width: 1500px;
    .title {
      margin-bottom: 20px;
      text-align: center;
    }
    .text {
      padding-top: 0px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      width: 310px;
      .lt {
        // color: #fff;
        font-size: 16px;
        font-weight: bold;
      }
      .rt {
        // color: #fff;
        font-size: 14px;
        margin: 5px 0;
      }
    }
    .text02 {
      width: 178px;
      margin: auto;
      .lt {
        // color: #fff;
        font-size: 16px;
        font-weight: bold;
      }
      .rt {
        // color: #fff;
        font-size: 14px;
        margin: 5px 0;
      }
    }
    .center {
      text-align: center;
      margin: 0 auto;
    }
    .pd20 {
      margin: 10px 0px !important;
    }
    li {
      list-style-type: none;
      text-align: left;
      padding-left: 0px;
      white-space: nowrap;
      .hlep {
        width: 50%;
        padding: 0;
        font-size: 14px;
        // color: #fff;
        cursor: pointer;
      }
    }
    .msg {
      // color: #fff;
      text-align: center;
      font-size: 16px;
      margin: 20px 0px 40px 0px;
    }
    .footer {
      margin: 20px 0px 10px 0px;
      img {
        width: 70%;
      }
    }
  }
  .copyRight001 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 64px;
    // color: #fff;
    font-size: 14px;
    p {
      margin: 0 auto !important;
    }
  }
  .link_wrap {
    width: 50%;
  }
  // hover 效果
  .footer__link {
    &:hover {
      display: block;
      transform: scale(1.2);
      color: var(--v-primary-base);
      transition: all 0.5s;
    }
  }
}
</style>
