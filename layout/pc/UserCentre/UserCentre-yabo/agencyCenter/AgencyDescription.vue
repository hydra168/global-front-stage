<template>
  <!-- 代理說明 -->
  <div class="AgencyDescription">
    <v-divider></v-divider>
    <v-row>
      <v-col class="imgArea">
        <div class="text">
          <h1>{{ textFilter('imgTitle') }}</h1>
          <h2>{{ textFilter('imgSubTitle') }}</h2>
        </div>
        <img class="img" src="../assets/agencyCenter/description-banner.jpg" :alt="textFilter('imgTitle')" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>当您能看到这个页面，说明您的账号既是玩家账号也是代理账号，既可以自己投注，也可以发展下级玩家，赚取返点佣金。</v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12" class="pb-0">
        <h3 class="red--text">{{ textFilter('item1') }}</h3>
      </v-col>
      <v-col cols="12">
        {{ textFilter('content1_1') }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h3 class="red--text">{{ textFilter('item2') }}</h3>
      </v-col>
      <v-col cols="12">
        {{ textFilter('content2_1') }}
        {{ textFilter('content2_2') }}<br />
        {{ textFilter('content2_3') }}<br />
        {{ textFilter('content2_4') }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h3 class="red--text">{{ textFilter('item3') }}</h3>
      </v-col>
      <v-col cols="12">
        {{ textFilter('content3_1') }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h4>{{ textFilter('note') }}</h4>
      </v-col>
      <ul>
        <li>{{ textFilter('note1') }}</li>
        <li>{{ textFilter('note2') }}</li>
      </ul>
    </v-row>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'AgencyDescription',
  methods: {
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_agencyDescription_');
    },
  },
};
</script>

<style lang="scss" scoped>
.AgencyDescription {
  .imgArea {
    .text {
      position: absolute;
      color: #fff;
      margin: 7% 5%;
      width: 40%;
      h1 {
        margin-bottom: 5%;
      }
    }
    .img {
      width: 100%;
    }
  }
  ul {
    list-style: none;
    padding-left: 12px;
    padding-right: 12px;
    li {
      margin-top: 6px;
      margin-bottom: 6px;
    }
  }
}
</style>
