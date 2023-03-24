<template>
  <v-container>
    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
    <v-row v-if="ListData[4]">
      <template v-for="(item, k) in ListData[4]">
        <v-col :key="k" :cols="6">
          <v-card class="pt-5 fill-height d-flex flex-column justify-space-between" @click="routerPush(item.link)">
            <img style="width: 100px" :src="item.picture" :alt="item.name" class="mx-auto" />
            <v-card-title class="text-subtitle-1 font-weight-black justify-center">
              {{ item.name }}
              <v-btn depressed block small color="primary" class="mt-3">{{ textFilter('enterText') }}</v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
/**
 * 彩票大廳
 */
import { mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'lotteryLobby',
  created() {
    this.GET_GAME_LINK_LIST();
  },
  data() {
    return {
      ListData: [],
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'gameLinkList']),
  },
  watch: {
    gameLinkList(data) {
      this.ListHandler(data);
    },
  },
  methods: {
    ...mapActions(['GET_GAME_LINK_LIST']),
    ListHandler(data) {
      data.forEach(el => {
        if (this.ListData[el.pid]) {
          this.ListData[el.pid].push(el);
        } else {
          this.ListData[el.pid] = [el];
        }
      });
      this.$forceUpdate();
    },
    routerPush(link) {
      this.$router.push({ name: 'play', params: { id: link } });
    },
    textFilter(text) {
      return textFilter(text, 'com_lotteryLobby_001_');
    },
  },
};
</script>

<style lang="scss" scoped></style>
