<template>
  <div class="Announcement-default" :class="wrapClass" @click="$router.push({ name: 'announcement' })">
    <div class="boards" :class="boardsStyle">
      <v-icon :color="iconColor">volume_up</v-icon>
      <marquee :marqueeList="boardList" height="30px" :fontColor="marqueeFontColor" fontSize="14px" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Marquee from '../components/Marquee.vue';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'Announcement-default',
  components: { Marquee },
  props: {
    wrapClass: {
      type: String,
      default: '',
    },
    boardsStyle: {
      type: String,
      default: 'boards-style',
    },
    marqueeFontColor: {
      type: String,
      default: '#242222',
    },
    iconColor: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      newsList: [{ title: this.$t('g_common_announcement_notice') }],
      nowShow: 0,
      show: true,
    };
  },
  created() {
    this.GET_BOARD_LIST();
  },
  computed: {
    ...mapGetters(['boardList']),
  },
  watch: {
    boardList(data) {
      this.newsList = data;
      this.boardsHandler();
    },
  },
  methods: {
    ...mapActions(['GET_BOARD_LIST']),
    ...mapMutations(['SET_ANNOUNCEMENT_IS_OPEN']),
    // openAnnouncement() {
    //   this.SET_ANNOUNCEMENT_IS_OPEN({ isCheck: false, status: true });
    // },
    boardsHandler() {
      let _this = this;
      setInterval(function () {
        _this.show = false;
        if (_this.nowShow < _this.newsList.length - 1) {
          _this.nowShow++;
          setTimeout(function () {
            _this.show = true;
          }, 1000);
        } else {
          _this.nowShow = 0;
          setTimeout(function () {
            _this.show = true;
          }, 1000);
        }
      }, 3000);
    },
    textFilter(text) {
      return textFilter(text, 'com_header_001_');
    },
  },
};
</script>
<style lang="scss">
.Announcement-default {
  .boards-logo-wrapper {
    .boards-logo {
      width: 30px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transition: opacity 0.5s;
  }
  .boards {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-size: 100% 40px;
    background-repeat: no-repeat;
    &.boards-style {
      padding: 16px 10px;
      height: 16px;
      border: 1px map-get(map-get($colors, primary), base) solid;
      border-radius: 16px;
      background: #fff;
      color: #3f3f3f;
    }
    img {
      width: 50px;
    }
  }
}
</style>
