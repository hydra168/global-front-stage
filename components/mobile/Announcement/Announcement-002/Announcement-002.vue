<template>
  <div :class="`marq ${background}`">
    <v-flex>
      <v-flex justify-center text-center xs12 :class="`px-3 ${titleColor}--text`">
        <img class="pt-1" width="20" :src="icon" alt="" />
        <span class="font16 pl-2">{{ textFilter('title') }}</span>
      </v-flex>
      <v-flex
        xs12
        :class="`${textColor}--text`"
        @click="$router.push({ name: 'announcement' })"
        style="font-size: 18px; cursor: pointer; height: 2em; text-align: center"
      >
        <marquee :marqueeList="boardList" height="30px" :fontColor="marqueeFontColor" fontSize="14px" />
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import Marquee from '../components/Marquee.vue';

export default {
  name: 'Announcement-002',
  components: { Marquee },
  props: {
    icon: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: 'white',
    },
    titleColor: {
      type: String,
      default: 'black',
    },
    textColor: {
      type: String,
      default: 'black',
    },
    marqueeFontColor: {
      type: String,
      default: '#000',
    },
  },
  data() {
    return { newsList: [{ title: '公告' }], nowShow: 0, show: true };
  },
  created() {
    this.GET_BOARD_LIST();
  },
  computed: {
    ...mapGetters(['boardList', 'announcementList']),
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
      };
    },
  },
  watch: {
    boardList(data) {
      this.newsList = data;
      this.boardsHandler();
    },
  },
  methods: {
    ...mapActions(['GET_BOARD_LIST']),
    ...mapMutations(['SET_ANNOUNCEMENT_CURRENT_INDEX', 'SET_ANNOUNCEMENT_CURRENT_ITEM', 'SET_ANNOUNCEMENT_IS_OPEN']),
    showDetail() {
      this.$router.push('activity');
    },
    boardsHandler() {
      let $this = this;
      setInterval(function () {
        $this.show = false;
        if ($this.nowShow < $this.newsList.length - 1) {
          $this.nowShow++;
          setTimeout(function () {
            $this.show = true;
          }, 1000);
        } else {
          $this.nowShow = 0;
          setTimeout(function () {
            $this.show = true;
          }, 1000);
        }
      }, 3000);
    },
    viewBoards() {
      const id = this.newsList[this.nowShow]['id'];
      const index = this.announcementList.findIndex(i => i.Id === +id);
      if (index !== -1) {
        const item = this.announcementList[index];
        this.SET_ANNOUNCEMENT_CURRENT_INDEX(index);
        this.SET_ANNOUNCEMENT_CURRENT_ITEM(item);
        this.SET_ANNOUNCEMENT_IS_OPEN({ ischeck: false, status: true });
      }
    },
    textFilter(text) {
      return textFilter(text, 'com_announcement_002_');
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.01s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
