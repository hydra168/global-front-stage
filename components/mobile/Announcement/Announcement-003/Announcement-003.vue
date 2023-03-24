<template>
  <div class="Announcement-002" @click="$router.push({ name: 'announcement' })">
    <v-container pa-0>
      <div class="border-bottom d-flex flex-column">
        <div class="d-flex justify-center mb-2">
          <v-icon color="grey">volume_up</v-icon>
          <span class="font16 pl-2">{{ textFilter('title') }}</span>
        </div>
        <div>
          <marquee :marqueeList="boardList" :fontColor="formartedMarqueeFontColor" fontSize="18px" height="40px" />
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
  inject: ['themeObj'],
  components: { Marquee },
  props: {
    marqueeFontColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLoading', 'boardList', 'announcementList']),
    formartedMarqueeFontColor() {
      if (this.marqueeFontColor) return this.marqueeFontColor;
      return typeof this.themeObj.primary === 'string' ? this.themeObj.primary : this.themeObj.primary.base;
    },
  },
  created() {
    this.GET_BOARD_LIST();
    this.GET_ANNOUNCEMENT_LIST();
  },
  methods: {
    ...mapActions(['GET_BOARD_LIST', 'GET_ANNOUNCEMENT_LIST', 'OPEN_ANNOUNCEMENT']),
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
