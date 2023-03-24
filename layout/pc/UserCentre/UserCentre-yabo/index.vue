<template>
  <v-container id="Usercentre" class="h100 pa-0 d-flex mt-15 mb-12">
    <div class="width-240px mr-5 d-flex flex-column white">
      <div class="pa-5 d-flex align-center">
        <div class="d-flex avatar mr-3"><img class="width-60px" src="./assets/avatar.png" /></div>
        <div>
          <h5 class="black--text">{{ userInfo.Name }}</h5>
          <h6 class="d-flex align-center">
            <img class="width-26px" :src="require(`./assets/viplevel/vip-${vipLevel.current_vip_level || 0}.png`)" />
            <!-- VIP {{ vipLevel.current_vip_level }} -->
          </h6>
        </div>
      </div>
      <div class="font-size-14 px-5 d-flex align-center justify-space-between">
        <a class="black--text d-flex align-center" @click="ROUTER_PUSH('/userCentre/deposit')">
          <img class="mr-1 width-32px" src="./assets/deposit.png" />存款
        </a>
        <a class="black--text d-flex align-center" @click="ROUTER_PUSH('/userCentre/withdrawals')">
          <img class="mr-1 width-36px" src="./assets/withdraw.png" />提款
        </a>
      </div>
      <div class="grey--text mt-4 user-menu">
        <v-btn
          text
          @click="ROUTER_PUSH({ name: route.name })"
          class="d-flex align-center px-5 height-50px grey--text font-size-14 width-100 justify-start"
          :class="{ active: checkActive(route.name), 'mt-5': route.gap, 'unread-mail-notice': route.mail && hasUnreadMail }"
          primary
          v-for="(route, i) in routes"
          :key="i"
        >
          <img :src="route.icon" class="width-25px mr-4" /> {{ route.text }}
        </v-btn>
      </div>
      <v-spacer />
      <div class="justify-self-end text-center grey--text">
        <v-btn text @click="GET_LOGOUT()" class="d-flex align-center px-5 height-50px grey--text font-size-14 width-100 justify-start">
          <img :src="logOutIcon" class="width-25px mr-4" /> 立即登出
        </v-btn>
        <span class="font-size-12 mt-6 mb-7 d-inline-block">加入冠军体育第 {{ joinDays }} 天</span>
      </div>
    </div>
    <router-view> </router-view>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import routes from '@/router';

export default {
  name: 'UserCentre',
  components: {},
  props: {},
  data() {
    return {
      routeMap: [
        {
          name: 'userCentre',
          icon: require('./assets/player-info.png'),
          text: '个人资料',
        },
        {
          name: 'vip',
          icon: require('./assets/vip.png'),
          text: 'VIP特权',
        },
        {
          name: 'wallet',
          icon: require('./assets/wallet.png'),
          text: '我的钱包',
          gap: true,
        },
        {
          name: 'tradeRecord',
          icon: require('./assets/trade-logs.png'),
          text: '交易记录',
        },
        {
          name: 'betRecord',
          icon: require('./assets/bet-logs.png'),
          text: '投注记录',
        },
        {
          name: 'notice',
          icon: require('./assets/notice.png'),
          text: '站內信',
          gap: true,
          mail: true,
        },
      ],
      logOutIcon: require('./assets/signoff.png'),
    };
  },
  created() {
    if (this.config) {
      this.GET_CONFIGURE();
    }
  },
  watch: {
    formatedPath: {
      handler(val) {
        // this.currentMenuHandler(val);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['config', 'userInfo', 'isLogin', 'rememberData', 'locale', 'langItem', 'vipLevel', 'userProfileData', 'mailNumber']),
    routes() {
      return this.routeMap.map(item => {
        const route = routes.find(r => r.name === item.name) || routes.find(r => r.name === 'userCentre').children.find(r => r.name === item.name);
        return { ...item, path: route?.path };
      });
    },
    joinDays() {
      // console.log(this.userProfileData.created);
      if (this.userProfileData !== null) {
        return (Math.abs(Date.now() - new Date(this.userProfileData.created).getTime()) / (1000 * 60 * 60 * 24)).toFixed(0);
      } else {
        return '';
      }
    },
    hasUnreadMail() {
      return Number(this.mailNumber) > 0;
    },
  },
  methods: {
    ...mapActions(['GET_CONFIGURE', 'GET_LOGOUT', 'ROUTER_PUSH']),
    routerPush(sub) {
      this.$router.push({ name: sub.name });
    },
    checkActive(route) {
      route = route == 'userCentre' ? 'profile' : route;
      return route === this.$route.name;
    },
  },
};
</script>
<style lang="scss" scoped>
#Usercentre {
  max-width: 1185px;
  background-color: transparent;
  @media (min-width: 1904px) {
    max-width: 1185px;
  }
  @media (min-width: 1264px) {
    max-width: 1185px;
  }

  .user-menu {
    .v-btn {
      &.active {
        background: #f6f8f7;
      }
      &.unread-mail-notice::before {
        content: ' ';
        color: #ff3434;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        opacity: 1;
        left: calc(100% - 20px);
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }
}
:deep(*) .v-text-field {
  .v-input__slot {
    border: 0 !important;
    box-shadow: none !important;
    padding: 0 0 0 1em !important;
    fieldset {
      border: 0 !important;
      border-radius: 2px;
      box-shadow: 0 0 0 1px rgba(171, 179, 173, 0.3) !important;
    }
  }
  .v-input__prepend-outer {
    padding: 0 !important;
    margin: 0 !important;
    height: 40px;
    align-items: center;
  }
}
:deep(*) .v-input--is-readonly {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100% !important;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &.v-input--is-qrcode {
    &:before {
      display: none;
    }
    .v-input__slot {
      fieldset {
        box-shadow: 0 0 0 1px rgba(171, 179, 173, 0.3) !important;
      }
    }
  }
  .v-input__slot {
    fieldset {
      box-shadow: none !important;
    }
  }
}
:deep(*) {
  .v-date-range {
    .v-input--is-readonly:before {
      display: none;
    }
    .v-input--is-readonly .v-input__slot {
      fieldset {
        box-shadow: 0 0 0 1px rgba(171, 179, 173, 0.3) !important;
      }
    }
  }
  .field-name {
    min-width: 6em;
  }
  .btn-default {
    border-color: #666;
  }
  .v-btn.primary {
    background: linear-gradient(90deg, #28c069 0%, #7fdc99 99%) !important;
  }
  .v-btn.v-btn--outlined:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    box-shadow: 0 0 0 2px rgba(101, 101, 101, 0.3);
    border: 0;
  }
}
@font-face {
  font-family: 'fontello';
  src: url('data:application/octet-stream;base64,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')
      format('woff'),
    url('data:application/octet-stream;base64,AAEAAAAPAIAAAwBwR1NVQiCLJXoAAAD8AAAAVE9TLzI+I1JqAAABUAAAAGBjbWFwkN3UzgAAAbAAAAGGY3Z0IAAAAAAAAAg0AAAADmZwZ21iLvl6AAAIRAAADgxnYXNwAAAAEAAACCwAAAAIZ2x5ZjhOG6kAAAM4AAABXmhlYWQet5gyAAAEmAAAADZoaGVhB00DZwAABNAAAAAkaG10eAuO//0AAAT0AAAADGxvY2EASgCvAAAFAAAAAAhtYXhwAPQObgAABQgAAAAgbmFtZc2dGBkAAAUoAAACzXBvc3QEd8j0AAAH+AAAADJwcmVwfrY7tgAAFlAAAACcAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAQD2gGQAAUAAAJ6ArwAAACMAnoCvAAAAeAAMQECAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAwOgA8CUDUv9qAFoDrACWAAAAAQAAAAAAAAAAAAAAAAACAAAABQAAAAMAAAAsAAAABAAAAV4AAQAAAAAAWAADAAEAAAAsAAMACgAAAV4ABAAsAAAABgAEAAEAAugA8CX//wAA6ADwJf//AAAAAAABAAYABgAAAAEAAgAAAQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAKAAAAAAAAAACAADoAAAA6AAAAAABAADwJQAA8CUAAAACAAAAAQAA/8QDrAL4ABcAQ0BAEAUCBAERAQUEAkwCAQEDBAMBBIAGAQAAAwEAA2kABAUFBFkABAQFYQAFBAVRAQAUEg8NCgkHBgQDABcBFwcGFisBMhYXMwcnMy4BIgYUFjMyNxcGIyImEDYBmKjuBHq4uJAEtPq0tH5oTkZujqjw8AL46KbOznystP60PExY8AFU8AAAAAH//f+JA/sDMgAyADVAMgUBAAQGBAAGgAAGAwQGA34AAQAEAAEEaQADAgIDWQADAwJhAAIDAlEkIicnJyQhBwYdKxM2OwE+AzMyHgMOAgciJy4BPgEXFjMyPgE3NC4CByIGBzMyFg8BBiMiJi8BJgIFD0URVHqWVl+sgEgCTHywXaJ/GAYkPBdZb1eWVAE0VHpAa6ofKw8KCIcGCAMGAokIAbcIT4hkOEp8rr6ufkoBZBI8MAYRRViSWkF4VjQBfmQQDN4IBALgDAAAAAEAAAABAAChOG6XXw889QAPA+gAAAAA3c4qSQAAAADdzipJ//3/iQP7AzIAAAAIAAIAAAAAAAAAAQAAA1L/agAAA/r//f//A/sAAQAAAAAAAAAAAAAAAAAAAAMD6AAAA6wAAAP6//0AAAAAAEoArwABAAAAAwAzAAEAAAAAAAIADgAtAI0AAABUDgwAAAAAAAAAEgDeAAEAAAAAAAAANQAAAAEAAAAAAAEACAA1AAEAAAAAAAIABwA9AAEAAAAAAAMACABEAAEAAAAAAAQACABMAAEAAAAAAAUACwBUAAEAAAAAAAYACABfAAEAAAAAAAoAKwBnAAEAAAAAAAsAEwCSAAMAAQQJAAAAagClAAMAAQQJAAEAEAEPAAMAAQQJAAIADgEfAAMAAQQJAAMAEAEtAAMAAQQJAAQAEAE9AAMAAQQJAAUAFgFNAAMAAQQJAAYAEAFjAAMAAQQJAAoAVgFzAAMAAQQJAAsAJgHJQ29weXJpZ2h0IChDKSAyMDIxIGJ5IG9yaWdpbmFsIGF1dGhvcnMgQCBmb250ZWxsby5jb21mb250ZWxsb1JlZ3VsYXJmb250ZWxsb2ZvbnRlbGxvVmVyc2lvbiAxLjBmb250ZWxsb0dlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAEMAbwBwAHkAcgBpAGcAaAB0ACAAKABDACkAIAAyADAAMgAxACAAYgB5ACAAbwByAGkAZwBpAG4AYQBsACAAYQB1AHQAaABvAHIAcwAgAEAAIABmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQBmAG8AbgB0AGUAbABsAG8AUgBlAGcAdQBsAGEAcgBmAG8AbgB0AGUAbABsAG8AZgBvAG4AdABlAGwAbABvAFYAZQByAHMAaQBvAG4AIAAxAC4AMABmAG8AbgB0AGUAbABsAG8ARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwECAQMBBAACY3cDY2N3AAAAAAABAAH//wAPAAAAAAAAAAAAAAAAAAAAALAALCCwAFVYRVkgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbkIAAgAY2MjYhshIbAAWbAAQyNEsgABAENgQi2wASywIGBmLbACLCMhIyEtsAMsIGSzAxQVAEJDsBNDIGBgQrECFENCsSUDQ7ACQ1R4ILAMI7ACQ0NhZLAEUHiyAgICQ2BCsCFlHCGwAkNDsg4VAUIcILACQyNCshMBE0NgQiOwAFBYZVmyFgECQ2BCLbAELLADK7AVQ1gjISMhsBZDQyOwAFBYZVkbIGQgsMBQsAQmWrIoAQ1DRWNFsAZFWCGwAyVZUltYISMhG4pYILBQUFghsEBZGyCwOFBYIbA4WVkgsQENQ0VjRWFksChQWCGxAQ1DRWNFILAwUFghsDBZGyCwwFBYIGYgiophILAKUFhgGyCwIFBYIbAKYBsgsDZQWCGwNmAbYFlZWRuwAiWwDENjsABSWLAAS7AKUFghsAxDG0uwHlBYIbAeS2G4EABjsAxDY7gFAGJZWWRhWbABK1lZI7AAUFhlWVkgZLAWQyNCWS2wBSwgRSCwBCVhZCCwB0NQWLAHI0KwCCNCGyEhWbABYC2wBiwjISMhsAMrIGSxB2JCILAII0KwBkVYG7EBDUNFY7EBDUOwAGBFY7AFKiEgsAhDIIogirABK7EwBSWwBCZRWGBQG2FSWVgjWSFZILBAU1iwASsbIbBAWSOwAFBYZVktsAcssAlDK7IAAgBDYEItsAgssAkjQiMgsAAjQmGwAmJmsAFjsAFgsAcqLbAJLCAgRSCwDkNjuAQAYiCwAFBYsEBgWWawAWNgRLABYC2wCiyyCQ4AQ0VCKiGyAAEAQ2BCLbALLLAAQyNEsgABAENgQi2wDCwgIEUgsAErI7AAQ7AEJWAgRYojYSBkILAgUFghsAAbsDBQWLAgG7BAWVkjsABQWGVZsAMlI2FERLABYC2wDSwgIEUgsAErI7AAQ7AEJWAgRYojYSBksCRQWLAAG7BAWSOwAFBYZVmwAyUjYUREsAFgLbAOLCCwACNCsw0MAANFUFghGyMhWSohLbAPLLECAkWwZGFELbAQLLABYCAgsA9DSrAAUFggsA8jQlmwEENKsABSWCCwECNCWS2wESwgsBBiZrABYyC4BABjiiNhsBFDYCCKYCCwESNCIy2wEixLVFixBGREWSSwDWUjeC2wEyxLUVhLU1ixBGREWRshWSSwE2UjeC2wFCyxABJDVVixEhJDsAFhQrARK1mwAEOwAiVCsQ8CJUKxEAIlQrABFiMgsAMlUFixAQBDYLAEJUKKiiCKI2GwECohI7ABYSCKI2GwECohG7EBAENgsAIlQrACJWGwECohWbAPQ0ewEENHYLACYiCwAFBYsEBgWWawAWMgsA5DY7gEAGIgsABQWLBAYFlmsAFjYLEAABMjRLABQ7AAPrIBAQFDYEItsBUsALEAAkVUWLASI0IgRbAOI0KwDSOwAGBCIGC3GBgBABEAEwBCQkKKYCCwFCNCsAFhsRQIK7CLKxsiWS2wFiyxABUrLbAXLLEBFSstsBgssQIVKy2wGSyxAxUrLbAaLLEEFSstsBsssQUVKy2wHCyxBhUrLbAdLLEHFSstsB4ssQgVKy2wHyyxCRUrLbArLCMgsBBiZrABY7AGYEtUWCMgLrABXRshIVktsCwsIyCwEGJmsAFjsBZgS1RYIyAusAFxGyEhWS2wLSwjILAQYmawAWOwJmBLVFgjIC6wAXIbISFZLbAgLACwDyuxAAJFVFiwEiNCIEWwDiNCsA0jsABgQiBgsAFhtRgYAQARAEJCimCxFAgrsIsrGyJZLbAhLLEAICstsCIssQEgKy2wIyyxAiArLbAkLLEDICstsCUssQQgKy2wJiyxBSArLbAnLLEGICstsCgssQcgKy2wKSyxCCArLbAqLLEJICstsC4sIDywAWAtsC8sIGCwGGAgQyOwAWBDsAIlYbABYLAuKiEtsDAssC8rsC8qLbAxLCAgRyAgsA5DY7gEAGIgsABQWLBAYFlmsAFjYCNhOCMgilVYIEcgILAOQ2O4BABiILAAUFiwQGBZZrABY2AjYTgbIVktsDIsALEAAkVUWLEOBkVCsAEWsDEqsQUBFUVYMFkbIlktsDMsALAPK7EAAkVUWLEOBkVCsAEWsDEqsQUBFUVYMFkbIlktsDQsIDWwAWAtsDUsALEOBkVCsAFFY7gEAGIgsABQWLBAYFlmsAFjsAErsA5DY7gEAGIgsABQWLBAYFlmsAFjsAErsAAWtAAAAAAARD4jOLE0ARUqIS2wNiwgPCBHILAOQ2O4BABiILAAUFiwQGBZZrABY2CwAENhOC2wNywuFzwtsDgsIDwgRyCwDkNjuAQAYiCwAFBYsEBgWWawAWNgsABDYbABQ2M4LbA5LLECABYlIC4gR7AAI0KwAiVJiopHI0cjYSBYYhshWbABI0KyOAEBFRQqLbA6LLAAFrAXI0KwBCWwBCVHI0cjYbEMAEKwC0MrZYouIyAgPIo4LbA7LLAAFrAXI0KwBCWwBCUgLkcjRyNhILAGI0KxDABCsAtDKyCwYFBYILBAUVizBCAFIBuzBCYFGllCQiMgsApDIIojRyNHI2EjRmCwBkOwAmIgsABQWLBAYFlmsAFjYCCwASsgiophILAEQ2BkI7AFQ2FkUFiwBENhG7AFQ2BZsAMlsAJiILAAUFiwQGBZZrABY2EjICCwBCYjRmE4GyOwCkNGsAIlsApDRyNHI2FgILAGQ7ACYiCwAFBYsEBgWWawAWNgIyCwASsjsAZDYLABK7AFJWGwBSWwAmIgsABQWLBAYFlmsAFjsAQmYSCwBCVgZCOwAyVgZFBYIRsjIVkjICCwBCYjRmE4WS2wPCywABawFyNCICAgsAUmIC5HI0cjYSM8OC2wPSywABawFyNCILAKI0IgICBGI0ewASsjYTgtsD4ssAAWsBcjQrADJbACJUcjRyNhsABUWC4gPCMhG7ACJbACJUcjRyNhILAFJbAEJUcjRyNhsAYlsAUlSbACJWG5CAAIAGNjIyBYYhshWWO4BABiILAAUFiwQGBZZrABY2AjLiMgIDyKOCMhWS2wPyywABawFyNCILAKQyAuRyNHI2EgYLAgYGawAmIgsABQWLBAYFlmsAFjIyAgPIo4LbBALCMgLkawAiVGsBdDWFAbUllYIDxZLrEwARQrLbBBLCMgLkawAiVGsBdDWFIbUFlYIDxZLrEwARQrLbBCLCMgLkawAiVGsBdDWFAbUllYIDxZIyAuRrACJUawF0NYUhtQWVggPFkusTABFCstsEMssDorIyAuRrACJUawF0NYUBtSWVggPFkusTABFCstsEQssDsriiAgPLAGI0KKOCMgLkawAiVGsBdDWFAbUllYIDxZLrEwARQrsAZDLrAwKy2wRSywABawBCWwBCYgICBGI0dhsAwjQi5HI0cjYbALQysjIDwgLiM4sTABFCstsEYssQoEJUKwABawBCWwBCUgLkcjRyNhILAGI0KxDABCsAtDKyCwYFBYILBAUVizBCAFIBuzBCYFGllCQiMgR7AGQ7ACYiCwAFBYsEBgWWawAWNgILABKyCKimEgsARDYGQjsAVDYWRQWLAEQ2EbsAVDYFmwAyWwAmIgsABQWLBAYFlmsAFjYbACJUZhOCMgPCM4GyEgIEYjR7ABKyNhOCFZsTABFCstsEcssQA6Ky6xMAEUKy2wSCyxADsrISMgIDywBiNCIzixMAEUK7AGQy6wMCstsEkssAAVIEewACNCsgABARUUEy6wNiotsEossAAVIEewACNCsgABARUUEy6wNiotsEsssQABFBOwNyotsEwssDkqLbBNLLAAFkUjIC4gRoojYTixMAEUKy2wTiywCiNCsE0rLbBPLLIAAEYrLbBQLLIAAUYrLbBRLLIBAEYrLbBSLLIBAUYrLbBTLLIAAEcrLbBULLIAAUcrLbBVLLIBAEcrLbBWLLIBAUcrLbBXLLMAAABDKy2wWCyzAAEAQystsFksswEAAEMrLbBaLLMBAQBDKy2wWyyzAAABQystsFwsswABAUMrLbBdLLMBAAFDKy2wXiyzAQEBQystsF8ssgAARSstsGAssgABRSstsGEssgEARSstsGIssgEBRSstsGMssgAASCstsGQssgABSCstsGUssgEASCstsGYssgEBSCstsGcsswAAAEQrLbBoLLMAAQBEKy2waSyzAQAARCstsGosswEBAEQrLbBrLLMAAAFEKy2wbCyzAAEBRCstsG0sswEAAUQrLbBuLLMBAQFEKy2wbyyxADwrLrEwARQrLbBwLLEAPCuwQCstsHEssQA8K7BBKy2wciywABaxADwrsEIrLbBzLLEBPCuwQCstsHQssQE8K7BBKy2wdSywABaxATwrsEIrLbB2LLEAPSsusTABFCstsHcssQA9K7BAKy2weCyxAD0rsEErLbB5LLEAPSuwQistsHossQE9K7BAKy2weyyxAT0rsEErLbB8LLEBPSuwQistsH0ssQA+Ky6xMAEUKy2wfiyxAD4rsEArLbB/LLEAPiuwQSstsIAssQA+K7BCKy2wgSyxAT4rsEArLbCCLLEBPiuwQSstsIMssQE+K7BCKy2whCyxAD8rLrEwARQrLbCFLLEAPyuwQCstsIYssQA/K7BBKy2whyyxAD8rsEIrLbCILLEBPyuwQCstsIkssQE/K7BBKy2wiiyxAT8rsEIrLbCLLLILAANFUFiwBhuyBAIDRVgjIRshWVlCK7AIZbADJFB4sQUBFUVYMFktAEu4AMhSWLEBAY5ZsAG5CAAIAGNwsQAHQrEAACqxAAdCsQAKKrEAB0KxAAoqsQAHQrkAAAALKrEAB0K5AAAACyq5AAMAAESxJAGIUViwQIhYuQADAGREsSgBiFFYuAgAiFi5AAMAAERZG7EnAYhRWLoIgAABBECIY1RYuQADAABEWVlZWVmxAA4quAH/hbAEjbECAESzBWQGAERE')
      format('truetype');
}
/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */
/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */
/*
@media screen and (-webkit-min-device-pixel-ratio:0) {
  @font-face {
    font-family: 'fontello';
    src: url('../font/fontello.svg?90644216#fontello') format('svg');
  }
}
*/
:deep(*) {
  [class^='icon-']:before,
  [class*=' icon-']:before {
    font-family: 'fontello';
    font-style: normal;
    font-weight: normal;
    speak: never;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    /* opacity: .8; */

    /* For safety - reset parent styles, that can break glyph codes*/
    font-variant: normal;
    text-transform: none;

    /* fix buttons height, for twitter bootstrap */
    line-height: 1em;

    /* Animation center compensation - margins should be symmetric */
    /* remove if not needed */
    margin-left: 0.2em;

    /* you can be more comfortable with increased icons size */
    /* font-size: 120%; */

    /* Font smoothing. That was taken from TWBS */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Uncomment for 3D effect */
    /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
  }

  .icon-cw:before {
    content: '\e800';
  } /* '' */
  .icon-ccw:before {
    content: '\f025';
  } /* '' */
}
</style>
