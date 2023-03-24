<template>
  <div>
    <v-dialog v-model="show" width="600">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          {{ $te('g_com_announcement_001_title') ? $t('g_com_announcement_001_title') : $t('g_common_announcement_notice') }}
          <v-spacer></v-spacer>
          <v-btn icon @click="hide = true">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          {{ text }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatT } from '@G/filters';
export default {
  data() {
    return {
      hide: false,
      anyDay: false,
    };
  },
  computed: {
    ...mapGetters(['config']),
    isOverTime() {
      if (this.allowTime().startTime == null) {
        return true;
      }
      return new Date().getTime() < this.allowTime().startTime.getTime() || new Date().getTime() > this.allowTime().endTime.getTime();
    },
    show() {
      return this.availableDay()!=null && this.isOverTime && this.config?.Show_Withdrawal_OverTime_Content === '1' && !this.hide;
    },
    text() {
      let day = new Date().getDay();

      if (!this.allowTime().endTime || new Date().getTime() > this.allowTime().endTime.getTime()) {
        day = this.availableDay();
      }
      const today = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day];
      return (
        this.config?.Edit_Withdrawal_OverTime_Content? this.config?.Edit_Withdrawal_OverTime_Content.replace(`{day}`, today)
          .replace(`{start}`, `${formatT(this.allowTime(day).startTime)}`)
          .replace(`{end}`, `${formatT(this.allowTime(day).endTime)}`) : this.$t('g_layout_userCentre_default_withdrawals_windows_content')
      );
    },
    withdrawal_allow_time(){
      return this.config.withdrawal_allow_time ?? [];
    }
  },

  methods: {
    allowTime(day = new Date().getDay()) {
      const today = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
      const allowed = this.withdrawal_allow_time?.filter(({ checked }) => checked)?.find(({ weekDay }) => weekDay == today);
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const date = new Date().getDate();

      return {
        startTime: allowed ? new Date(`${year}/${month}/${date} ${allowed.startHour}:${allowed.startMin}:00`) : null,
        endTime: allowed ? new Date(`${year}/${month}/${date} ${allowed.endHour}:${allowed.endMin}:59`) : null,
      };
    },

    availableDay(day = new Date().getDay()) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const sorted = [
        ...days.map((theDay, index) => ({ theDay, index })).filter(({ index }) => this.allowTime().endTime?.getTime() > new Date().getTime() && index == day),
        ...days.map((theDay, index) => ({ theDay, index })).filter(({ index }) => index > day),
        ...days.map((theDay, index) => ({ theDay, index })).filter(({ index }) => index < day),
      ]
        .map(({ theDay, index }) => ({
          index,
          theDay,
          checked: this.withdrawal_allow_time?.find(({ weekDay }) => weekDay == theDay)?.checked,
        }))
        .filter(({ checked }) => checked);
      return sorted?.[0]?.index;
    },
  },
};
</script>
