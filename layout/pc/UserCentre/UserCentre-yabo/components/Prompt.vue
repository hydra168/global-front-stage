<template>
  <div class="Prompt-usdt">
    <v-card color="grey lighten-3 grey--text text--darken-3">
      <v-card-title>
        <h3 class="headline mb-0">{{ textFilter('title') }}</h3>
      </v-card-title>
      <v-card-title class="py-0">{{ textFilter('description1') }}<br /> </v-card-title>
      <v-card-title class="py-0">{{ textFilter('description2') }}</v-card-title>
      <v-card-title>
        <h3 class="headline mb-0">{{ textFilter('howToCheckText') }}</h3>
      </v-card-title>
      <v-card-text>
        <!-- 火币网存款说明 -->
        <v-layout v-if="currentUsdtAppChannel === 0">
          <v-flex xs3 px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
            <h5 class="h4em grey--text text--darken-3">{{ textFilter('huobiItem1') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div class="white rounded-lg pa-3 d-flex justify-center">
              <v-img :src="require('../assets/USDT-help-huobi/logo.png')" width="100"></v-img>
            </div>
          </v-flex>
          <v-flex xs3 px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
            <h5 class="h4em grey--text text--darken-3">{{ textFilter('huobiItem2') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-huobi/step2.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex xs3 px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
            <h5 class="h4em grey--text text--darken-3">{{ textFilter('huobiItem3') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-huobi/step3.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex xs3 px-2>
            <v-chip color="error" text-color="white">{{ textFilter('note') }}</v-chip>
            <h5 class="h4em grey--text text--darken-3">{{ textFilter('noteText') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-huobi/step4.png')" width="180"></v-img>
            </div>
          </v-flex>
        </v-layout>

        <!-- 比特派存款说明 -->
        <v-layout v-if="currentUsdtAppChannel === 1">
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
            <h5 class="mb-6 grey--text text--darken-3">{{ textFilter('bitpieItem1') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div class="white rounded-lg pa-3 d-flex justify-center">
              <v-img :src="require('../assets/USDT-help/bitpieiosLogo.png')" width="100"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
            <h5 class="grey--text text--darken-3">{{ textFilter('bitpieItem2_1') }}<br />{{ textFilter('bitpieItem2_2') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help/step2.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
            <h5 class="mb-6 grey--text text--darken-3">{{ textFilter('bitpieItem3') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help/step3.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">4</v-avatar> </v-chip>
            <h5 class="mb-6 grey--text text--darken-3">{{ textFilter('down') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help/step4.png')" width="180"></v-img>
            </div>
          </v-flex>
        </v-layout>

        <!-- ZB 存款说明 -->
        <v-layout v-if="currentUsdtAppChannel === 2">
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
            <h5 class="mb-6 grey--text text--darken-3">打開ZB APP</h5>
            <v-divider class="mb-3"></v-divider>
            <div class="white rounded-lg pa-3 d-flex justify-center">
              <v-img :src="require('../assets/USDT-help-zb/zb-logo.png')" width="100"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
            <h5 class="grey--text text--darken-3">登录账户。点击【财务】中的“提现”</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-zb/step2.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
            <h5 class="mb-6 grey--text text--darken-3">
              您需要选择“提币地址”（首次提到新地址务必要添加并认证地址，通过输入地址、地址备注、资金密码、动态密码等信息，点击“确认添加”）
            </h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-zb/step3.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">4</v-avatar> </v-chip>
            <h5 class="mb-6 grey--text text--darken-3">
              点击“确认添加”后，成功添加接受地址。您的邮箱会收到一封提币地址验证的邮件。 地址验证成功后，即可选择已验证的提币地址进行提币。
            </h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-zb/step4.png')" width="180"></v-img>
            </div>
          </v-flex>
        </v-layout>

        <!-- Imtoken 存款说明 -->
        <v-layout v-if="currentUsdtAppChannel === 3">
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">1</v-avatar></v-chip>
            <h5 class="grey--text text--darken-3">打開 imToken APP</h5>
            <v-divider class="mb-3"></v-divider>
            <div class="white rounded-lg pa-3 d-flex justify-center">
              <v-img :src="require('../assets/USDT-help-imtoken/imtoken-logo.jpg')" width="100"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">2</v-avatar> </v-chip>
            <h5 class="grey--text text--darken-3">创建钱包</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-imtoken/step4.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">3</v-avatar> </v-chip>
            <h5 class="grey--text text--darken-3">选择 USDT 向右滑即可收款</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-imtoken/step2.png')" width="180"></v-img>
            </div>
          </v-flex>
          <v-flex px-2>
            <v-chip color="green" text-color="white">{{ textFilter('step') }}<v-avatar right class="green darken-4">4</v-avatar> </v-chip>
            <h5 class="grey--text text--darken-3">{{ textFilter('down') }}</h5>
            <v-divider class="mb-3"></v-divider>
            <div>
              <v-img :src="require('../assets/USDT-help-imtoken/step3.png')" width="180"></v-img>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
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

<style>
.Prompt-usdt {
  text-align: left !important;
  background-color: #eee !important;
  border-color: #eee !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.Prompt-usdt .step-title {
  display: flex;
  align-items: center;
}
.Prompt-usdt .step-img {
  display: flex;
  justify-content: center;
}
</style>
