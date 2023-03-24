<template>
  <div class="Announcement-001">
    <v-card flat class="rounded-lg">
      <div class="d-flex align-center" :class="bgClass">
        <div class="rounded-l-lg pa-2" :class="iconBgClass">
          <v-icon :color="iconColor">volume_up</v-icon>
        </div>
        <span class="announcement-title px-4" :class="titleClass">{{ textFilter('title') }}</span>
        <div class="marquee-wrap pr-3">
          <marquee @openAnnouncement="openAnnouncement" :marqueeList="boardList" :fontColor="marqueeFontColor" height="30px" fontSize="14px" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import Marquee from '../components/Marquee.vue';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Announcement-001',
  props: {
    bgClass: {
      type: String,
      default: 'white',
    },
    iconBgClass: {
      type: String,
      default: 'orange darken-3',
    },
    iconColor: {
      type: String,
      default: 'grey darken-3',
    },
    titleClass: {
      type: String,
      default: 'orange--text darken-1',
    },
    marqueeFontColor: {
      type: String,
      default: '#262729',
    },
  },
  components: {
    Marquee,
  },
  computed: {
    ...mapGetters(['isLoading', 'boardList', 'announcementList']),
    classOption() {
      return {
        step: 1,
        singleHeight: 49,
        waitTime: 3000,
        limitMoveNum: 2,
      };
    },
  },
  data() {
    return {
      e6: 10,
    };
  },
  created() {
    this.GET_BOARD_LIST();
    this.GET_ANNOUNCEMENT_LIST();
  },
  methods: {
    ...mapActions(['GET_BOARD_LIST', 'GET_ANNOUNCEMENT_LIST', 'OPEN_ANNOUNCEMENT']),
    ...mapMutations(['SET_ANNOUNCEMENT_CURRENT_INDEX', 'SET_ANNOUNCEMENT_CURRENT_ITEM', 'SET_ANNOUNCEMENT_IS_OPEN', 'SET_ANNOUNCEMENT_VIEW_DATE']),
    openAnnouncement(id) {
      if (this.isLoading || !this.announcementList.length) return;
      this.OPEN_ANNOUNCEMENT(id);
    },
    textFilter(text) {
      return textFilter(text, 'com_announcement_001_');
    },
  },
};
</script>

<style lang="scss">
.Announcement-001 {
  margin: 0 auto;
  border-radius: 10px;
  .announcement-title {
    white-space: nowrap;
    font-size: 16px;
  }
  .marquee-wrap {
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
