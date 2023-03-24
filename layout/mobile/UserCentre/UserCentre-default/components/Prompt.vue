<template>
  <div class="Prompt">
    <v-row v-if="currentUsdtAppChannel === 0">
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
        <span class="ml-2 mb-3 d-inline-block">{{ textFilter('huobiStep1') }}</span>
        <div class="white rounded-lg pa-3 d-flex justify-center">
          <v-img :src="require('../assets/USDT-help-huobi/logo.png')" width="100"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
        <span class="ml-2 mb-3 d-inline-block">{{ textFilter('huobiStep2') }}</span>
        <div class="img-item">
          <v-img class="img-link" :src="require('../assets/USDT-help-huobi/step2.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
        <span class="ml-2 mb-3 d-inline-block">{{ textFilter('huobiStep3') }}</span>
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help-huobi/step3.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="error" text-color="white">{{ textFilter('note') }}</v-chip>
        <span class="ml-2 mb-3 d-inline-block">{{ textFilter('huobiStep3') }}</span>
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help-huobi/step4.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
    </v-row>
    <v-row v-if="currentUsdtAppChannel === 1">
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
        <span class="ml-2 mb-3">{{ textFilter('bitpieStep1') }}</span>
        <div class="img-item white rounded-lg pa-3 d-flex justify-center">
          <v-img class="img-link" :src="require('../assets/USDT-help/bitpieiosLogo.png')" width="100"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
        <h5 class="mb-3">{{ textFilter('bitpieStep2') }}</h5>
        <div class="img-item">
          <v-img class="img-link" :src="require('../assets/USDT-help/step2.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
        <span class="ml-2 mb-3">{{ textFilter('bitpieStep3') }}</span>
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help/step3.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">4</v-avatar> </v-chip>
        <span class="ml-2 mb-3">{{ textFilter('bitpieStep4') }}</span>
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help/step4.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
    </v-row>
    <v-row v-if="currentUsdtAppChannel === 2">
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
        <span class="ml-2 mb-3">打開 ZB APP</span>
        <div class="img-item white rounded-lg pa-3 d-flex justify-center">
          <v-img class="img-link" :src="require('../assets/USDT-help-zb/zb-logo.png')" width="100"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
        <h5 class="mb-3">登录账户。点击【财务】中的“提现”</h5>
        <div class="img-item">
          <v-img class="img-link" :src="require('../assets/USDT-help-zb/step2.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
        <span class="ml-2 mb-3"
          >您需要选择“提币地址”（首次提到新地址务必要添加并认证地址，通过输入地址、地址备注、资金密码、动态密码等信息，点击“确认添加”）</span
        >
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help-zb/step3.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">4</v-avatar> </v-chip>
        <span class="ml-2 mb-3"
          >点击“确认添加”后，成功添加接受地址。您的邮箱会收到一封提币地址验证的邮件。 地址验证成功后，即可选择已验证的提币地址进行提币。</span
        >
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help-zb/step4.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
    </v-row>
    <v-row v-if="currentUsdtAppChannel === 3">
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
        <span class="ml-2 mb-3">打開 imToken APP</span>
        <div class="img-item white rounded-lg pa-3 d-flex justify-center">
          <v-img class="img-link" :src="require('../assets/USDT-help-imtoken/imtoken-logo.jpg')" width="100"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
        <h5 class="mb-3">创建钱包</h5>
        <div class="img-item">
          <v-img class="img-link" :src="require('../assets/USDT-help-imtoken/step4.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
        <span class="ml-2 mb-3">选择USDT向右滑即可收款</span>
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help-imtoken/step2.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
      <v-col>
        <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">4</v-avatar> </v-chip>
        <span class="ml-2 mb-3">完成</span>
        <div class="img-item mt-3">
          <v-img class="img-link" :src="require('../assets/USDT-help-imtoken/step3.png')" width="180"></v-img>
        </div>
        <v-divider class="mb-3"></v-divider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Prompt',
  props: {
    currentUsdtAppChannel: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_com_prompt_');
    },
  },
};
</script>

<style lang="scss">
.img-item {
  .img-link {
    margin: auto;
    box-shadow: 0px 0px 8px 8px rgba(168, 168, 168, 0.3);
  }
}
</style>
