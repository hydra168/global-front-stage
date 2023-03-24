<template>
  <div class="Announcement" @click="$router.push({ name: 'announcement' })">
    <div class="boards">
      <marquee :marqueeList="boardList" height="20px" :fontColor="marqueeFontColor" fontSize="10px" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Marquee from '../components/Marquee.vue';
export default {
  name: 'Announcement-001',
  components: { Marquee },
  data() {
    return {
      newsList: [{ title: this.$t('g_common_announcement_notice') }],
      nowShow: 0,
      show: true,
    };
  },
  props: {
    iconColor: {
      type: String,
      default: 'primary',
    },
    marqueeFontColor: {
      type: String,
      default: 'rgba(110, 125, 169, 1)',
    },
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
  },
};
</script>
<style lang="scss" scoped>
.Announcement {
  background: #fff;
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
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 0 15px;
    color: #fff;
    background-size: 100% 40px;
    background-repeat: no-repeat;
    font-size: 10px;
  }
  .boards::before {
    content: '';
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0px;
    left: -15px;
    background: url('./img/marquee.png') no-repeat center center/contain;
  }
  .boards p {
    font-size: 10px;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .boards {
      -webkit-transform: scale(0.833);
    }
  }
}
</style>
<style lang="scss">
.Announcement {
  // margin-top: 53px;
}
</style>
