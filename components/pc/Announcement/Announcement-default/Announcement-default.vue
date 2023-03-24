<template>
  <div class="Announcement">
    <v-card :tile="true" :outlined="outlined" :class="wrapClass" :style="wrapStyle">
      <v-container :fluid="fluid" class="py-0">
        <div class="d-flex align-center px-2">
          <v-icon v-if="showIcon" :color="iconColor">volume_up</v-icon>
          <span :style="`color: ${marqueeFontColor}; font-size: ${marqueeFontSize};`" :class="`px-2 ${languageClass}`">
            {{ textFilter('title') }}
          </span>
          <div class="marquee-wrap">
            <marquee @openAnnouncement="openAnnouncement" :fontSize="marqueeFontSize" :marqueeList="boardList" :fontColor="marqueeFontColor" />
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Marquee from '../components/Marquee.vue';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'Announcement-default',
  components: { Marquee },
  props: {
    wrapStyle: {
      tyep: Object,
    },
    // 自訂 (背景色, 推高)
    wrapClass: {
      type: String,
      default: 'primary',
    },
    // 全寬設定
    fluid: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    iconColor: {
      type: String,
      default: 'white',
    },
    marqueeFontColor: {
      type: String,
      default: '#ffffff',
    },
    marqueeFontSize: {
      type: String,
      default: '14px',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'boardList', 'announcementList', 'locale']),
    languageClass() {
      switch (this.locale) {
        case 'en':
          return 'newEn';
        default:
          return 'newCn';
      }
    },
  },
  created() {
    this.GET_BOARD_LIST();
    this.GET_ANNOUNCEMENT_LIST();
  },
  methods: {
    ...mapActions(['GET_BOARD_LIST', 'GET_ANNOUNCEMENT_LIST', 'OPEN_ANNOUNCEMENT']),
    ...mapMutations(['SET_ANNOUNCEMENT_CURRENT_INDEX', 'SET_ANNOUNCEMENT_CURRENT_ITEM', 'SET_ANNOUNCEMENT_IS_OPEN']),
    openAnnouncement(id) {
      if (this.isLoading || !this.announcementList.length) return;
      this.OPEN_ANNOUNCEMENT(id);
    },
    textFilter(text) {
      return textFilter(text, 'com_announcement_default_');
    },
  },
};
</script>

<style lang="scss">
.Announcement {
  .marquee-wrap {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .seamless-warp {
    height: 30px;
    overflow: hidden;
    cursor: pointer;
  }
  .hidden-sm-and-down .font18 {
    font-size: 18px;
  }
  .font18 {
    font-size: 18px;
  }
  .list-wrap {
    list-style: none;
  }
  .newCn {
    width: 110px;
  }
  .newEn {
    width: 130px;
  }
}
</style>
