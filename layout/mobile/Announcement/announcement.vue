<template>
  <div class="announcement wrapBox">
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="(item, i) in announcementList" :key="i">
        <v-expansion-panel-header>{{ item.Title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="promotionTimePosition == 0" class="announcement_time mb-2 font-weight-bold">
            <span class="mr-2">{{ $t('g_com_announcement_time') }}</span>
            <span>{{ item.StartTime | formatDate }}</span>
          </div>
          <div v-if="item.Content != ''">
            <div class="announcementDetail" v-html="item.Content"></div>
          </div>
          <img v-else :src="item.PictureMobile" :alt="item.Title" style="width: 100%" />
          <div v-if="promotionTimePosition == 1" class="font-weight-bold mt-1 d-flex justify-end">
            <span>{{ item.StartTime | formatDate }}</span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { MOBILE_PROMOTION_TIME_POSITION } from '@G/consts';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Announcement',
  async created() {
    await this.GET_ANNOUNCEMENT_LIST();
  },
  data() {
    return {
      promotionTimePosition: MOBILE_PROMOTION_TIME_POSITION,
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'announcementList']),
  },
  methods: {
    ...mapActions(['GET_ANNOUNCEMENT_LIST']),
  },
};
</script>
<style lang="scss">
.announcementDetail {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    background-color: transparent !important;
  }
}
</style>
