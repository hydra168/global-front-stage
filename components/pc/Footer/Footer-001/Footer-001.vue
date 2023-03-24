<template>
  <!-- Footer -->
  <div class="Footer-001-wrap">
    <div class="Footer-001" :class="wrapClass">
      <v-container class="page-container pt-2 content-wrapper" v-show="showSection">
        <section>
          <v-container fluid grid-list-md px-0 py-1>
            <v-layout>
              <v-flex class="service" sm3 md3 lg3 left>
                <h3 class="title" :class="titleClass">{{ textFilter('title_service') }}</h3>
                <div class="text" :class="contentClass">
                  <div class="lt">{{ textFilter(service_title_1) }}</div>
                  <div class="rt">{{ textFilter(service_content_1) }}</div>
                </div>
                <div class="text" :class="contentClass">
                  <!-- <div class="lt">{{ textFilter('service_title_2') }}</div> -->
                  <div class="lt">{{ textFilter(service_title_2) }}</div>
                  <div class="rt">{{ textFilter(service_content_2) }}</div>
                </div>
              </v-flex>
              <v-flex v-if="isShowSafePay" class="safePay" sm3 md3 lg3 center>
                <h3 class="title" :class="titleClass">{{ textFilter(safeTitleKey) }}</h3>
                <img style="max-width: 90%" :src="payLogoImg" alt="" />
              </v-flex>
              <v-flex v-if="partnerIconsShow" class="partner" sm2 md2 lg2 center>
                <h3 class="title" :class="titleClass">{{ textFilter('title_partner') }}</h3>
                <div class="center" style="flex-direction: column">
                  <div v-for="item in partnerIcons" :key="item.img" style="text-align: center">
                    <img style="width: 50%" :src="item.img" alt="" />
                  </div>
                </div>
              </v-flex>
              <v-flex v-if="showAdminister" class="administer" sm2 md2 lg2 left>
                <h3 class="title" :class="titleClass">{{ textFilter('title_supervision') }}</h3>
                <div class="text">
                  <div class="rt" :class="contentClass">{{ textFilter(supervision_content_key, { webTitle }) }}</div>
                </div>
              </v-flex>
              <v-flex class="helpCentre" sm2 md2 lg2 center>
                <h3 class="title" :class="titleClass">{{ textFilter('title_help') }}</h3>
                <ul class="helpCentre_wrap">
                  <li class="link_wrap">
                    <span @click="redirect({ action: 'register' })" class="hlep footer__link" :class="contentClass">
                      {{ textFilter('help_registered') }}
                    </span>
                    <span @click="redirect({ action: 'userCenter', url: '/userCentre/wallet' })" class="hlep footer__link" :class="contentClass">
                      {{ textFilter('help_user') }}
                    </span>
                  </li>
                  <li class="link_wrap">
                    <span
                      @click="redirect({ action: 'withdrawals', url: '/userCentre/withdrawals' })"
                      class="withdrawalsBtn hlep footer__link"
                      :class="contentClass"
                    >
                      {{ textFilter('help_withdrawal') }}
                    </span>
                    <span @click="redirect({ action: 'appdownload', url: '/appdownload' })" class="hlep footer__link help_app" :class="contentClass">
                      {{ textFilter('help_app') }}
                    </span>
                  </li>
                  <li class="link_wrap">
                    <span @click="redirect({ action: 'deposit', url: '/userCentre/deposit' })" class="hlep footer__link" :class="contentClass">
                      {{ depositTranslation || textFilter('help_recharge') }}
                      <!-- {{ depositTranslation || textFilter('help_recharge') }} -->
                    </span>
                    <span @click="redirect({ action: 'installdownload', url: '/installdownload' })" class="hlep footer__link" :class="contentClass">
                      {{ textFilter('help_pc') }}
                    </span>
                  </li>
                  <li class="link_wrap">
                    <span @click="redirect({ action: 'help', url: '/helpCentre/about' })" class="hlep footer__link" :class="contentClass">
                      {{ textFilter('help_about') }}
                    </span>
                  </li>
                </ul>
              </v-flex>
              <v-flex class="appdownload" sm2 md2 lg2 center>
                <h3 class="title" :class="titleClass">{{ textFilter('title_app') }}</h3>
                <div class="center">
                  <vue-qr :text="(config && appDownloadPath) || ''" :size="140" :margin="10"></vue-qr>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </v-container>
      <div v-if="isShowSafePayBottom" class="footer text-center ma-5">
        <img :src="SafePayBottomImg" />
      </div>
      <div v-if="safetyIconsShow" class="footer text-center ma-5">
        <img :src="require('./assets/footer.png')" />
      </div>
      <!-- <v-row class="justify-center ma-5" v-if="logoIconsShow">
        <v-col cols="2" v-for="(item, i) in logoIcons" :key="i" class="d-flex align-center justify-center">
          <img width="50" height="50" :src="item.img" />
          <p class="mb-0 ml-2" :class="contentClass">{{ $t(item.label) }}</p>
        </v-col>
      </v-row> -->
    </div>
    <div class="msg copyRight001" :class="titleClass">
      <p>{{ textFilter('copyright', { year, webTitle }) }}</p>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer-001',
  components: {
    VueQr,
  },
  props: {
    safeTitleKey: {
      type: String,
      default: 'title_safe',
    },
    wrapClass: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: 'grey--text text--darken-4',
    },
    contentClass: {
      type: String,
      default: 'grey--text text--darken-4',
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
    isShowSafePay: {
      type: Boolean,
      default: true,
    },
    isShowSafePayBottom: {
      type: Boolean,
      default: false,
    },
    SafePayBottomImg: {
      type: String,
      default: require('./assets/pay04.png'),
    },
    safetyIconsShow: {
      type: Boolean,
      default: true,
    },
    hideAbout: {
      type: Boolean,
      default: false,
    },
    payLogoImg: {
      type: String,
      default: require('./assets/pay02.png'),
    },
    supervision_content_key: {
      type: String,
      default: 'supervision_content',
    },
    service_title_1: {
      type: String,
      default: 'service_title_1',
    },
    service_title_2: {
      type: String,
      default: 'service_title_2',
    },
    service_content_1: {
      type: String,
      default: 'service_content_1',
    },
    service_content_2: {
      type: String,
      default: 'service_content_2',
    },
    showAdminister: {
      type: Boolean,
      default: true,
    },
    partnerIconsShow: {
      type: Boolean,
      default: false,
    },
    showSection: {
      type: Boolean,
      default: true,
    },
    depositTranslation: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
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
      partnerIcons: [{ img: require('./assets/mayi.png') }, { img: require('./assets/alibaba.jpg') }],
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
        case 'liveChat':
          this.SHOW_LIVE_CHAT(0);
          break;
        default:
          this.$router.push(item.url);
      }
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_001_', slot) : textFilter(text, 'com_footer_001_');
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
    .content-wrapper {
      min-width: 1380px !important;
      .administer {
        margin-left: 10px;
        .text {
          width: 250px;
        }
      }
    }
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
        font-size: 16px;
        font-weight: bold;
      }
      .rt {
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
      .hlep {
        padding: 5px;
        font-size: 14px;
        cursor: pointer;
        min-width: 7em;
        display: inline-block;
      }
      span {
        margin-left: 2em;
      }
    }
    .msg {
      color: gray;
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
    font-size: 14px;
    p {
      margin: 0 auto !important;
    }
  }
  .helpCentre_wrap {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .link_wrap {
    width: 50%;
  }
}

// hover 效果
.footer__link {
  &:hover {
    font-weight: bold;
    font-size: 16px !important;
    background: rgba($color: #000000, $alpha: 0.2);
    transition: all 0.5s;
  }
}
</style>
