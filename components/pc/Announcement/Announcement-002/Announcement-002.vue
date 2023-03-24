<template>
  <div class="Announcement-002">
    <v-container pa-0>
      <div class="border-bottom d-flex flex-column">
        <div class="d-flex justify-center mb-4">
          <v-icon color="grey">volume_up</v-icon>
          <span class="font16 pl-2">{{ textFilter('title') }}</span>
        </div>
        <div>
          <marquee @openAnnouncement="openAnnouncement" :marqueeList="boardList" :fontColor="marqueeFontColor" fontSize="35px" height="40px" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Marquee from '../components/Marquee.vue';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Announcement-002',
  components: { Marquee },
  props: {
    marqueeFontColor: {
      type: String,
      default: 'map-get(map-get($colors,primary), base)',
    },
  },
  data() {
    return {};
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
    textFilter(text) {
      return textFilter(text, 'com_announcement_002_');
    },
  },
};
</script>

<style lang="scss">
.Announcement-002 {
  margin-bottom: 10px;
  .font16 {
    font-size: 16px;
  }
  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }
}
</style>
