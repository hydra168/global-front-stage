<template>
  <div :class="`announce-box ${wrapClass}`">
    <div class="iconfont icon-gonggao">
      <v-icon :color="iconColor">volume_up</v-icon>
      公告：
    </div>
    <div class="announce-scroll">
      <marquee @openAnnouncement="openAnnouncement" :marqueeList="boardList" :fontColor="textColor" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Marquee from '../components/Marquee.vue';
export default {
  name: 'Announcement-003',
  components: { Marquee },
  props: {
    // 自訂 (背景色, 推高)
    wrapClass: {
      type: String,
      default: 'primary',
    },
    // 文字顏色
    textColor: {
      type: String,
      default: 'white',
    },
    // icon 圖案顏色
    iconColor: {
      type: String,
      default: 'white',
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'boardList', 'announcementList']),
  },
  created() {
    this.GET_BOARD_LIST();
    this.GET_ANNOUNCEMENT_LIST();
  },
  methods: {
    ...mapActions(['GET_BOARD_LIST', 'GET_ANNOUNCEMENT_LIST', 'OPEN_ANNOUNCEMENT']),
    openAnnouncement(id) {
      if (this.isLoading || !this.announcementList.length) return;
      this.OPEN_ANNOUNCEMENT(id);
    },
  },
};
</script>
<style lang="scss">
.announce-box {
  width: 100%;
  left: 0;
  top: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  color: #fff;
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
  height: 55px;

  .iconfont {
    font-size: 18px;
    margin: 0 0;
    color: #fff;
    background: #13805e;
    padding-left: 5em;
    height: 55px;
    line-height: 55px;
    margin-top: 0;
    margin-right: 2em;
    position: relative;
    letter-spacing: 0.15em;
    &:after {
      content: '';
      // background: #13805e;
      position: absolute;
      right: -0.6em;
      top: 0;
      width: 0;
      height: 0;
      display: block;
      border-width: 55px 0em 0 0.6em;
      border-style: solid solid solid solid;
      border-color: transparent transparent #13805e #13805e;
    }
  }

  .voice-head {
    font-size: 20px;
  }

  .announce-scroll {
    flex: 1;
    border-radius: 5px;
    height: 30px;
    text-align: left;
    color: #000;

    li {
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
