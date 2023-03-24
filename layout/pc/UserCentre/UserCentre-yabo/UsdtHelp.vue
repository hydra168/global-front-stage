<template>
  <v-container class="DepositUsdtHelp">
    <v-tabs centered background-color="primary" dark>
      <v-tab>{{ textFilter('huobiTab') }}</v-tab>
      <v-tab>{{ textFilter('bitpieTab') }}</v-tab>
      <v-tab>{{ textFilter('imtokenTab') }}</v-tab>
      <v-tab>{{ textFilter('zbTab') }}</v-tab>
      <v-tab>{{ textFilter('OKExTab') }}</v-tab>
      <!-- 火币钱包USDT支付使用说明 -->
      <v-tab-item class="pa-5">
        <v-card-title>{{ textFilter('huobiTable') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mb-3">
          <v-row class="mb-5">
            <v-col>
              <!-- <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip> -->
              <h2 class="my-3">{{ textFilter('newHuobiItem1') }}</h2>
              <h3 class="my-3">{{ textFilter('newHuobiContent1_1') }}<a href="http://www.huobi.fm/" target="blank"> http://www.huobi.fm/ </a></h3>
              <v-img width="50" :src="require('./assets/USDT-help-huobi/newHelp1-1-1.png')" />
              <h3 class="my-3">
                {{ textFilter('newHuobiContent1_2') }}<a href="https://www.huobiwallet.com/" target="blank"> https://www.huobiwallet.com/ </a>
              </h3>
              <v-img width="50" :src="require('./assets/USDT-help-huobi/newHelp1-1-2.png')" />
              <h3 class="my-3">
                {{ textFilter('newHuobiContent1_3') }}
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!-- <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip> -->
              <h2 class="my-3">{{ textFilter('newHuobiItem2') }}</h2>
              <h3 class="my-3">
                {{ textFilter('newHuobiContent2_1') }}
              </h3>
              <h3 class="mb-3">
                {{ textFilter('newHuobiContent2_2') }}
              </h3>
              <div class="d-flex">
                <v-layout>
                  <v-flex xs6>
                    <v-img width="300" :src="require('./assets/USDT-help-huobi/newHelp1-2-1.png')" />
                  </v-flex>
                  <v-flex xs6>
                    <v-img width="300" :src="require('./assets/USDT-help-huobi/newHelp1-2-2.png')" />
                  </v-flex>
                  <v-flex xs6>
                    <v-img width="300" :src="require('./assets/USDT-help-huobi/newHelp1-2-3.png')" />
                  </v-flex>
                  <v-flex xs6>
                    <v-img width="300" :src="require('./assets/USDT-help-huobi/newHelp1-2-4.png')" />
                  </v-flex>
                </v-layout>
              </div>
              <h2 class="my-3" style="color: red">
                {{ textFilter('newHuobiContent2_3') }}
              </h2>
              <h2 class="mb-3" style="color: red">
                {{ textFilter('newHuobiContent2_4') }}
              </h2>
            </v-col>
            <v-col>
              <!-- <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip> -->
              <h2 class="my-3">{{ textFilter('newHuobiItem3') }}</h2>
              <h3 class="my-3">{{ textFilter('newHuobiContent3_1') }}</h3>
              <div class="d-flex">
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp1-3-1.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp1-3-2.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp1-3-3.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp1-3-4.png')" />
              </div>
              <h3 class="my-3">{{ textFilter('newHuobiContent3_2') }}</h3>
              <div class="d-flex">
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp3-2-1.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp3-2-2.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp3-2-3.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp3-2-4.png')" />
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-text>
          <h2 class="my-3">{{ textFilter('newHuobiItem4') }}</h2>
          <v-row class="mb-5">
            <v-col>
              <div class="mb-2">
                <!-- <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 4 }) }}</v-chip> -->
                <h3>{{ textFilter('newHuobiContent4_1') }}</h3>
              </div>
              <div class="d-flex">
                <v-flex>
                  <v-img width="300" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp4-1-1.png')" />
                </v-flex>
                <v-flex>
                  <v-img width="300" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp4-1-2.png')" />
                </v-flex>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h2 class="my-3">{{ textFilter('newHuobiItem5') }}</h2>
              <div>
                <h3 class="my-3">{{ textFilter('newHuobiContent5_1') }}</h3>
              </div>
              <div class="d-flex">
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-1-1.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-1-2.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-1-3.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-1-4.png')" />
              </div>
              <div class="mb-3">
                <h3 class="my-3">{{ textFilter('newHuobiContent5_2') }}</h3>
              </div>
              <div class="d-flex">
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-2-1.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-2-2.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-2-3.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp5-2-4.png')" />
              </div>
              <div class="mb-3">
                <h2 class="my-3" style="color: red">{{ textFilter('newHuobiContent5_3') }}</h2>
              </div>
            </v-col>
            <v-col>
              <h2 class="my-3">{{ textFilter('newHuobiItem6') }}</h2>
              <div>
                <h3 class="my-3">{{ textFilter('newHuobiContent6_1') }}</h3>
              </div>
              <div class="d-flex">
                <v-img width="500" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp6-1-1.png')" />
              </div>
              <h2 class="my-3" style="color: red">
                {{ textFilter('newHuobiContent6_2') }}
              </h2>
              <h2 class="my-3" style="color: red">
                {{ textFilter('newHuobiContent6_3') }}
              </h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h2 class="my-3">{{ textFilter('newHuobiItem7') }}</h2>
              <div>
                <h3 class="my-3">{{ textFilter('newHuobiContent7_1') }}</h3>
              </div>
              <div class="d-flex">
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp7-1-1.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp7-1-2.png')" />
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp7-1-3.png')" />
              </div>
              <h2 class="my-3" style="color: red">
                {{ textFilter('newHuobiContent7_2') }}
              </h2>
              <h3 class="my-3">{{ textFilter('newHuobiContent7_3') }}</h3>
              <div class="d-flex">
                <v-img width="500" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp7-2-1.png')" />
              </div>
              <h3 class="my-3">{{ textFilter('newHuobiContent7_4') }}</h3>
              <div class="d-flex">
                <v-img width="500" class="mr-2" :src="require('./assets/USDT-help-huobi/newHelp7-3-1.png')" />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <!-- 比特派钱包USDT支付使用说明 -->
      <v-tab-item class="pa-5">
        <v-card-title>{{ textFilter('bitpieTable') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mb-3">
          <h2>{{ textFilter('bitpieItem1') }}</h2>
          <v-row class="mb-5">
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">{{ textFilter('bitpieContent1_1') }}<a href="https://bitpie.com/" target="blank">https://bitpie.com/</a></h3>
              <v-img width="200" :src="require('./assets/USDT-help/help1-1.png')" />
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">{{ textFilter('bitpieContent1_2') }}</h3>
              <v-img width="200" :src="require('./assets/USDT-help/help1-2.png')" />
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip>
              <h3 class="mb-3">{{ textFilter('bitpieContent1_3') }}</h3>
              <div class="d-flex">
                <v-img width="200" class="mr-2" :src="require('./assets/USDT-help/help1-3-1.png')" />
                <v-img width="200" :src="require('./assets/USDT-help/help1-3-2.png')" />
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-text>
          <h2>{{ textFilter('bitpieItem2') }}</h2>
          <v-row class="mb-5">
            <v-col>
              <div class="mb-2">
                <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
                <span class="subtitle-2 ml-1">{{ textFilter('huobiContent2_1') }}</span
                ><br />
              </div>
              <div class="mb-3">
                <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
                <span class="subtitle-2 ml-1">{{ textFilter('huobiContent2_2') }}</span>
              </div>
              <v-img width="500" :src="require('./assets/USDT-help/help2-1-1.png')" />
            </v-col>
            <v-col>
              <div class="mb-3">
                <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip>
                <span class="subtitle-2 ml-1">{{ textFilter('bitpieContent2_31') }}</span>
              </div>
              <span class="subtitle-2 ml-1">{{ textFilter('bitpieContent2_32') }}</span>
              <div class="d-flex">
                <v-img width="150" class="mr-2" :src="require('./assets/USDT-help/help2-1-2.png')" />
                <v-img width="150" :src="require('./assets/USDT-help/help2-1-3.png')" />
              </div>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              <div class="mb-2">
                <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 4 }) }}</v-chip>
                <span class="subtitle-2 ml-1">{{ textFilter('bitpieContent2_4') }}</span
                ><br />
              </div>
              <div class="d-flex">
                <v-layout>
                  <v-flex xs6>
                    <v-img :src="require('./assets/USDT-help/help2-3-1.png')" />
                  </v-flex>
                  <v-flex xs6> <v-img :src="require('./assets/USDT-help/help2-3-2.png')" /></v-flex>
                </v-layout>
              </div>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              <div class="mb-2">
                <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 5 }) }}</v-chip>
                <span class="subtitle-2 ml-1">{{ textFilter('bitpieContent2_5') }}</span
                ><br />
              </div>
              <span class="subtitle-2 ml-1">{{ textFilter('huobiContent2_72') }}</span>
              <div class="d-flex">
                <v-img width="200px" :src="require('./assets/USDT-help/help2-3-3.png')" />
                <v-img width="200px" :src="require('./assets/USDT-help/help2-3-4.png')" />
              </div>
            </v-col>
            <v-col>
              <div class="mb-2">
                <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 6 }) }}</v-chip>
                <span class="subtitle-2 ml-1">{{ textFilter('huobiContent2_81') }}</span
                ><br />
              </div>
              <span class="subtitle-2 ml-1">{{ textFilter('bitpieContent2_6') }}</span>
              <div class="d-flex">
                <v-img width="200px" :src="require('./assets/USDT-help/help2-3-5.png')" />
                <v-img width="200px" :src="require('./assets/USDT-help/help2-3-6.png')" />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <!-- Imtoken錢包USDT支付使用說明 -->
      <v-tab-item class="pa-5">
        <v-card-title>{{ textFilter('imtokenTable') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="mb-5">
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">下載網址<a href="https://token.im/?locale=zh-tw" target="blank">https://token.im/?locale=zh-tw</a></h3>
              <v-img width="600" :src="require('./assets/USDT-help-imtoken/imtoken_00.png')" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">創立錢包,並填寫錢包資訊,進行備份</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_01.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_02.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_03.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip>
              <h3 class="mb-3">可選擇幣別</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_04.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_05.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_06.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 4 }) }}</v-chip>
              <h3 class="mb-3">收款/轉帳</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_07.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_08.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_09.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_10.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 5 }) }}</v-chip>
              <h3 class="mb-3">錢包地址/二維碼</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_11.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_12.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_13.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-imtoken/imtoken_14.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <!-- ZB錢包USDT支付使用說明 -->
      <v-tab-item class="pa-5">
        <v-card-title>{{ textFilter('zbTable') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="mb-5">
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">请复制下载网址 https://www.zb.com/cn/download ，在新视窗打开连结</h3>
              <v-img width="600" :src="require('./assets/USDT-help-zb/zb_00.png')" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">在侧滑菜单栏界面，点击“注册”,輸入資料,即注册成功。（亦可使用邮箱注册）</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_02_1.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_02_2.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_02_3.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip>
              <h3 class="mb-3">登录账户。点击【财务】中的“充币”,请输入或选择您需要充值的币种名称。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_03_1.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_03_2.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_03_3.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 4 }) }}</v-chip>
              <h3 class="mb-3">
                以比特币（BTC）为例，点击“复制地址”，把中币（ZB）的“比特币（BTC）充值地址”复制到剪切板，并把该地址粘贴在对应资产转出（提现）平台的地址栏内。另外，您还可以使用对应资产转出（提现）平台的手机客户端来扫描二维码，进行充值
              </h3>
              <span class="red--text">
                <strong>提示：</strong><br />
                1.您首先需要有一个对应资产的转出（提现）平台。<br />
                2.请不要充值除比特币（BTC）之外的其他资产到比特币（BTC）充值地址，任何非比特币（BTC）资产充值将不可找回。
              </span>
              <div class="d-flex">
                <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_04_1.png')" />
              </div>
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 5 }) }}</v-chip>
              <h3 class="mb-3">
                以比特股（BTS）为例，点击
                “复制账户”和“复制备注（memo）”，并把他们粘贴在对应资产转出（提现）平台的地址栏和标签栏内。另外，您还可以使用对应资产转出（提现）平台的手机客户端来扫描二维码，进行充值。
              </h3>
              <span class="red--text"
                ><strong>提示：</strong><br />
                1.“充值地址（zbbts）” 和 “备注（MEMO）”务必填写正确，否则将导致无法到账。</span
              >
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_05_1.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 6 }) }}</v-chip>
              <h3 class="mb-3">充值成功后，在（充币记录）中找到对应的充币记录，查看该笔充值的进度。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_06_1.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_06_2.png')" />
                </div>
              </div>
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 7 }) }}</v-chip>
              <h3 class="mb-3">打开官方APP，登录账户。点击【财务】中的“提现”。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_07_1.png')" />
                </div>
              </div>
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 8 }) }}</v-chip>
              <h3 class="mb-3">进入提现界面后，请输入或选择您需要提现的币种名称。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_08_1.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_08_2.png')" />
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 9 }) }}</v-chip>
            </v-col>
            <v-col>
              <h3 class="mb-3">
                以比特币（BTC）为例，您需要选择“提币地址”（首次提到新地址务必要添加并认证地址，通过输入地址、地址备注、资金密码、动态密码等信息，点击“确认添加”）。
                另外，您还可以点击右上角扫码添加地址进行操作。然后，输入“提现数量“。系统会自动计算手续费，点击“提币”即可发起提币操作。
              </h3>
              <span class="red--text"
                ><strong>提示：</strong><br />
                1.您首先需要有一个对应资产的转入（充值）平台。<br />
                2.请不要提现到非对应币种的充值地址，任何非对应币种的充值将不可找回。</span
              >
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_09_1.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_09_2.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_09_2.png')" />
                </div>
              </div>
            </v-col>
            <v-col>
              <h3 class="mb-3">
                以比特股（BTS）为例，点击“添加地址”，把对应资产转入（充值）平台的“账户”、“备注（MEMO）”复制并粘贴上去，
                输入地址备注、资金密码、动态密码等信息，点击“确认添加”即可。另外，您还可以点击右上角扫码添加地址进行操作。
              </h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_09_1.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_09_2.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_09_2.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 10 }) }}</v-chip>
              <h3 class="mb-3">点击“确认添加”后，成功添加接受地址。您的邮箱会收到一封提币地址验证的邮件。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_10_1.png')" />
                </div>
              </div>
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 11 }) }}</v-chip>
              <h3 class="mb-3">登录邮箱打开邮件，请您仔细核对信息，确认无误后，点击邮件中的链接，若无法点击，则复制到浏览器打开即可。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_11_1.png')" />
                </div>
              </div>
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 12 }) }}</v-chip>
              <h3 class="mb-3">地址验证成功后，即可选择已验证的提币地址进行提币。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_12_1.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 13 }) }}</v-chip>
              <h3 class="mb-3">提币成功后，可在提币记录查看该笔提币的进度。</h3>
              <div class="d-flex">
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_13_1.png')" />
                </div>
                <div>
                  <img width="100%" class="img-max-width" :src="require('./assets/USDT-help-zb/zb_13_2.png')" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <!-- 歐易錢包USDT支付使用說明 -->
      <v-tab-item class="pa-5">
        <v-card-title>{{ textFilter('OKExTable') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <h2 class="mb-3">下载</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mb-3">一、 Android 版本 下载</h3>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">在浏览器环境下进入下载网址 https://www.okex.com/download ，点击下载</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_01_01.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">下载后安装打开APP即可。</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_01_02.png')" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mb-3">二、 IOS 版本 下载</h3>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">在浏览器环境下进入下载网址 https://www.okex.com/download ，选择iOS内测版</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_02_01.jpg')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">转至新页面后点击在App Store中查看</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_02_02.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip>
              <h3 class="mb-3">进入到Testlight页面，点击下载按钮</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_02_03.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 4 }) }}</v-chip>
              <h3 class="mb-3">转至新页面，下滑至底，点击开始测试</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_02_04.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 5 }) }}</v-chip>
              <h3 class="mb-3">点击安装，安装成功即可打开APP。</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_02_05.png')" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h2 class="mb-3">注册</h2>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">打开欧易OKEx手机APP，点击“注册账号”</h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_03_01.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">注册分为手机号注册和邮箱注册两种方式，您可以自由选择注册类型，然后按照要求填写完整相应信息即可完成注册。</h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_03_02.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip>
              <h3 class="mb-3">图片验证</h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_03_03.png')" />
            </v-col>
            <v-col cols="8">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 4 }) }}</v-chip>
              <h3 class="mb-3">输入收到邮箱或者手机验证码、并设置相关密码</h3>
              <v-img width="100%" :src="require('./assets/USDT-help-OKEx/OKEx_03_04.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 5 }) }}</v-chip>
              <h3 class="mb-3">注册成功，选择我想要买币</h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_03_05.png')" />
            </v-col>
            <v-col cols="4">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 6 }) }}</v-chip>
              <h3 class="mb-3">恭喜您已完成注册，输入对应的金额开启你的数字货币之旅</h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_03_06.png')" />
            </v-col>
            <v-col cols="4">
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_03_07.png')" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mb-3">三、购买教学</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mb-3">
                前置条件:首次购买数字货币的新手用户，必须先完成KYC验证，然后使用欧易OKEx的一键买币功能，简单便捷，并且即刻就能拥有自己的数字资产。这里以购买usdt为例。
              </h3>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">
                打开欧易OKExAPP，点击页面下方买卖按钮，即可进入交易区，选择快捷区 - 我要买，选择要购买的币种为USDT，输入需要购买的金额或者币种数量。
              </h3>
              <div class="d-flex align-start">
                <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_01.png')" />
                <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_02.png')" />
              </div>
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">选择想要的支付方式，例如支付宝，点击0手续费购买 - 确认购买。</h3>
              <div class="d-flex align-start">
                <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_03.png')" />
                <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_04.png')" />
              </div>
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 3 }) }}</v-chip>
              <h3 class="mb-3">下单成功后，点击去付款，页面会显示卖家的付款方式，按照卖家的付款信 息进行线下付款。</h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_05.png')" />
            </v-col>
            <v-col>
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 4 }) }}</v-chip>
              <h3 class="mb-3">打款完成后点击我已完成转账按钮，卖家确认收款并放币后，即成功买入一笔数字资产，您可点击查看资金查看。</h3>
              <div class="d-flex align-start">
                <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_06.png')" />
                <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_08.png')" />
                <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_04_09.png')" />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mb-3">四、如何充提币(APP)</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mb-3">如何充币</h3>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col cols="6">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">
                打开欧易OKEx APP，点击左下角的资产按钮，进入资金账户界面。点击充币，例如 BTC，您会得到一个充币地址，向该地址进行充值即可。
              </h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_05_01.png')" />
            </v-col>
            <v-col cols="6">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">
                某些币种需要填写标签，例如 XRP
                ，在充值地址的上方会标注需要填写的标签，通常是一串数字，充值这些币种时必须需要填写充值地址和标签，否则币会丢失。
              </h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_05_02.png')" />
              <h3 class="mb-3 rex--text">注：一定要看好地址对应的币种和链名称，例如不要向 BTC 地址充值 BTC 以外的任何币种，否则币会丢失。</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3 class="mb-3">如何提币</h3>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col cols="6">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 1 }) }}</v-chip>
              <h3 class="mb-3">
                打开 欧易OKEx APP，点击右下角资产按钮，进入资产账户页面。点击提币，选择要提币的币种，例如 BTC
                ，填写或复制要提币的地址，填写数量提交即可。
              </h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_05_03.png')" />
            </v-col>
            <v-col cols="6">
              <v-chip small color="green" text-color="white">{{ textFilter('step', { num: 2 }) }}</v-chip>
              <h3 class="mb-3">其中内部转账是指将币转至 欧易OKEx 其他账户或 欧易OKEx 开放交易平台账户，转账实时且无需手续费用。</h3>
              <v-img width="600" :src="require('./assets/USDT-help-OKEx/OKEx_05_04.png')" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'DepositUsdtHelp',
  methods: {
    textFilter(text, slot) {
      return slot ? textFilter(text, 'layout_userCentre_default_com_usdtHelp_', slot) : textFilter(text, 'layout_userCentre_default_com_usdtHelp_');
    },
  },
};
</script>
<style lang="scss">
.DepositUsdtHelp {
  .img-max-width {
    max-width: 300px;
  }
}
</style>
