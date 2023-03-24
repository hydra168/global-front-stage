<template>
  <div class="notice">
    <v-card>
      <v-card-title>站內信</v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="item in tabs" :key="item.key">
          {{ item.label }}
          <v-badge v-show="hasUnreadMail(item.key)" :content="unreadCount" offset-x="-2" offset-y="-2" color="#ff3434"></v-badge>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <StationLetter @updateUnreadCount="updateUnreadCount" />
      </v-tab-item>
      <v-tab-item>
        <Announcement />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import StationLetter from './components/notice/StationLetter';
import Announcement from './components/notice/Announcement';
export default {
  name: 'Notice',
  components: {
    StationLetter,
    Announcement,
  },
  data() {
    return {
      tab: null,
      tabs: [
        { label: '个人消息', key: 'stationLetter' },
        { label: '系统消息', key: 'annoucement' },
      ],
      unreadCount: 0,
    };
  },
  computed: {
    hasUnreadMail() {
      return key => key === 'stationLetter' && this.unreadCount > 0;
    },
  },
  methods: {
    updateUnreadCount(unreadCount) {
      this.unreadCount = unreadCount;
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  flex-grow: 1;
  .v-tabs-items {
    background-color: transparent;
  }
  ::v-deep {
    .v-badge__badge {
      width: 25px;
      height: 15px;
      border-radius: 7.5px;
      padding: 1px;
    }
    .v-card {
      border-radius: 0;
    }
    .v-input__control {
      display: inline-flex;
      flex-direction: row;
      gap: 15px;
      width: auto;
      max-width: none;
      .v-text-field__details {
        display: none;
      }
    }
    .v-select .v-input__slot {
      width: 150px;
    }
    .v-date-range .v-input__slot {
      width: 300px;
    }
  }
}
</style>
