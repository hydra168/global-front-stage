<template>
  <div class="Announcement" @click="$router.push({ name: 'announcement' })">
    <div :class="wrapClass" class="boards">
      <v-icon :color="iconColor">volume_up</v-icon>
      <marquee @openAnnouncement="openAnnouncement" :marqueeList="boardList" height="40px" :fontColor="marqueeFontColor" fontSize="14px" />
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
    return {};
  },
  props: {
    wrapClass: {
      type: String,
      default: 'black',
    },
    iconColor: {
      type: String,
      default: 'primary',
    },
    marqueeFontColor: {
      type: String,
      default: '#ffffff',
    },
  },
  created() {
    this.GET_BOARD_LIST();
    this.GET_ANNOUNCEMENT_LIST();
  },
  computed: {
    ...mapGetters(['isLoading', 'boardList', 'announcementList']),
  },
  methods: {
    ...mapActions(['GET_BOARD_LIST', 'GET_ANNOUNCEMENT_LIST', 'OPEN_ANNOUNCEMENT']),
    ...mapMutations(['SET_ANNOUNCEMENT_IS_OPEN']),

    openAnnouncement(id) {
      if (this.isLoading || !this.announcementList.length) return;
      this.OPEN_ANNOUNCEMENT(id);
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    color: #fff;
    background-size: 100% 40px;
    background-repeat: no-repeat;
    img {
      width: 50px;
    }
  }
}
</style>
