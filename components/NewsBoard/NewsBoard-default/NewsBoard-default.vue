<template>
  <v-card class="news-board" :class="wrapClass" width="100%">
    <div :class="titleClass" class="position-relative">
      <span :class="titleTextClass">{{ textFilter('title') }}</span>
    </div>
    <!-- {{ list }} -->
    <v-card-text class="pa-0">
      <Vertical :height="height">
        <template #dataList>
          <template v-for="num in 10">
            <v-row
              v-for="(item, key) in list"
              :class="verticalRowClass"
              class="item align-self-center font-weight-bold"
              :key="`${num}_${key}`"
              @click="OPEN_ANNOUNCEMENT(item.Id)"
            >
              <v-col cols="4" class="text-center">
                <h4>{{ item.StartTime | formatD }}</h4>
              </v-col>
              <v-col cols="8">
                <h3>{{ item.Title }}</h3>
              </v-col>
            </v-row>
          </template>
        </template>
      </Vertical>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as customFilter from '@FILTERS/';
import Vertical from '../../LeaderBoard/Vertical';
import { textFilter } from '@UTILS/i18n';
import _ from 'lodash';

export default {
  name: 'NewsBoard',
  components: {
    Vertical,
  },
  props: {
    height: {
      type: String,
      default: '250',
    },
    wrapClass: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: 'primary d-flex justify-center align-center py-2',
    },
    titleTextClass: {
      type: String,
      default: 'white--text',
    },
    verticalRowClass: {
      type: String,
      default: 'white my-0 mx-1',
    },
  },
  computed: {
    ...mapGetters(['announcementList', 'config']),
    list() {
      return _.cloneDeep(this.announcementList)
        .sort((a, b) => (b.Id > a.Id ? 1 : -1))
        .filter(item => item.IsBulletinBoard)
        .slice(0, this.config.announcement_news_count || 10);
    },
  },
  methods: {
    ...mapActions(['OPEN_ANNOUNCEMENT']),
    textFilter(text) {
      return this.$t(`g_com_newsBoard_default_${text}`);
    },
  },
};
</script>

<style lang="scss">
.news-board {
  overflow: hidden;
  .position-relative {
    position: relative;
  }
  .item {
    &:hover {
      font-size: 13px;
      transition: all 0.2s ease-in;
      color: var(--v-primary-base);
    }
  }
}
</style>
