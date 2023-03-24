<template>
  <div class="Drawer" :class="{ closed }">
    <template v-if="drawObject != null">
      <h3 class="mt-0 black--text d-flex font-weight-400 align-center">
        <v-btn class="pl-0 font-size-18" text @click="$emit('input', null)">
          <v-icon>chevron_left</v-icon>
          {{ drawObject.title }}
        </v-btn>
      </h3>
      <template v-for="(field, i) in drawObject.fields">
        <div v-if="field.type == 'select'" :key="i">
          <v-select
            solo
            outlined
            dense
            persistent-hint
            v-model="form[field.name]"
            class="my-2 align-start mt-5"
            :items="field.items"
            :hint="field.hint"
            :placeholder="field.placeholder"
            :label="field.placeholder"
            :rules="field.rules"
          >
            <template #prepend>
              <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">{{ field.text }}</label>
            </template></v-select
          >
        </div>
        <div v-else-if="field.type == 'qr'" :key="i">
          <v-text-field
            solo
            outlined
            dense
            persistent-hint
            single-line
            :required="field.required"
            v-model="form[field.name]"
            :label="field.label"
            :rules="field.rules"
            class="v-input--is-qrcode"
            type="text"
            @click.prevent="trigger(field.name)"
          >
            <template #prepend>
              <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">{{ field.text }}</label>
            </template>
            <template #append> </template>
          </v-text-field>
          <div class="ml-10 pl-10">
            <v-btn
              outlined
              @dragover.prevent
              @click.prevent="trigger(field.name)"
              class="py-10 mb-10 white width-320px mw100 height-auto border-2 grey--text"
            >
              <template #default>
                <div class="d-flex flex-column align-center justify-center">
                  <template v-if="!form[field.name]">
                    <img class="width-40px" src="../assets/qrcode.png" />
                    <h6 class="mt-1em font-size-14 font-weight-300">{{ field.uploadText }}</h6>
                  </template>
                  <template v-else>
                    <vue-qr :text="form[field.name]" :size="200" :margin="20"></vue-qr>
                  </template>
                </div>
              </template>
            </v-btn>
          </div>
          <image-barcode-reader
            v-show="false"
            :ref="field.name"
            :class="field.name"
            @decode="
              c => {
                qrDetect(c, field.name);
              }
            "
            @error="
              e => {
                qrError(e, field.name);
              }
            "
          ></image-barcode-reader>
        </div>
        <div v-else :key="i">
          <v-text-field
            v-model="form[field.name]"
            class="my-2 align-start mt-5"
            solo
            outlined
            dense
            persistent-hint
            :hint="field.hint"
            :rules="field.rules"
            :placeholder="field.placeholder"
          >
            <template #prepend>
              <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">{{ field.text }}</label>
            </template>
          </v-text-field>
        </div>
      </template>
      <div class="ml-6em font-size-14">
        <v-btn class="btn-send white--text" @click="send">{{ this.drawObject.submit.text }}</v-btn>
      </div>
    </template>
  </div>
</template>

<script>
import { ImageBarcodeReader } from 'vue-barcode-reader';
import VueQr from 'vue-qr';

export default {
  name: 'Drawer',
  components: { ImageBarcodeReader, VueQr },
  props: {
    value: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    drawObject: {
      get() {
        return this.value;
      },
      set(payload) {
        this.value = payload;
      },
    },
    form: {
      get() {
        return this.drawObject?.form;
      },
      set(payload) {
        this.drawObject.form = payload;
      },
    },
    closed() {
      return this.drawObject == null;
    },
    submit() {
      return this.drawObject.submit.action;
    },
  },
  methods: {
    async send() {
      await this.submit(this.form).then(res => {
        this.$emit('input', null);
      });
    },
    qrDetect(content, key) {
      if (content) {
        this.form[key] = content;
        this.$refs[key][0].$el.value = '';
      } else {
        this.SET_MESSAGE({ message: '格式错误', type: 'warning' });
      }
    },
    qrError(error) {
      console.log(error);
      this.SET_MESSAGE({ message: '格式错误', type: 'warning' });
    },
    trigger(key) {
      this.$refs[key][0].$el.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.Drawer {
  width: 100%;
  background: #fff;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  transition-duration: 0.6s;
  opacity: inherit;
  filter: none;
  padding: 20px;
  &.closed {
    transition-duration: 0.6s;
    left: -100%;
    opacity: 0;
    filter: blur(1px);
  }
  ::v-deep {
    .v-input__slot {
      max-width: 320px;
    }
    .v-text-field__details {
      padding: 0;
      margin-top: 5px;
    }
    .v-input__prepend-outer {
      label {
        text-align: right;
      }
    }
  }
  .btn-send {
    background-image: linear-gradient(180deg, #28c069 0%, #7fdc99 99%);
    min-width: 320px;
  }
}
</style>
