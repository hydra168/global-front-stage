<template>
  <div class="QuickBar-005">
    <section class="qb_section">
      <div class="centerContent">
        <div class="qb_section_pics_wrap">
          <aside v-for="(item, i) in quickBarList" :key="i" class="qb_section_pics">
            <a @click="ROUTER_PUSH(item.link)">
              <div class="text_img">
                <div class="text_h3">
                  <h3>{{ $t(item.name) }}</h3>
                </div>
                <img :src="item.picture" alt="" />
              </div>
            </a>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mergeArrayObjects } from '@UTILS/';
export default {
  name: 'QuickBar-005',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    imgHeight: {
      type: String,
      default: '228px',
    },
    titleClass: {
      type: String,
      default: 'white grey--text text--darken-3',
    },
    //hover效果
    titleHoverClass: {
      type: String,
      default: 'shadow-hover',
    },
  },
  data() {
    return {
      defaultList: [
        { name: 'g_common_money_withdrawals', link: '/userCentre/withdrawals', picture: require('./assets/pc_img_1.png') },
        { name: 'g_common_money_deposit', link: '/userCentre/deposit', picture: require('./assets/pc_img_2.png') },
        { name: 'g_common_btn_onlineService', link: 'liveChat', picture: require('./assets/pc_img_3.png') },
      ],
    };
  },
  computed: {
    quickBarList() {
      return mergeArrayObjects(this.list, this.defaultList);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.QuickBar-005 {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .qb_section {
    .centerContent {
      max-width: 1440px;
      margin: 0 auto;
      aside {
        h3 {
          font-size: 20px;
          text-align: center;
          padding: 14px;
        }
        &:hover {
          /* figure {
            filter: brightness(1.1);
          }
          img {
            transform: scale(1.1);
          } */
          animation: swing 1s 1;
        }
        figure {
          transition: 0.5s;
          overflow: hidden;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s;
        }
      }
    }
  }

  .qb_section_pics_wrap {
    display: flex;
    justify-content: center;
    margin-right: -20px;
    .qb_section_pics {
      margin-right: 20px;
    }
    img {
      width: 270px;
    }
  }

  .text_img {
    position: relative;
  }

  .text_h3 {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white !important;
    z-index: 999;
  }
}
</style>
