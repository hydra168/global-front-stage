<template>
  <div class="Dialog">
    <v-dialog v-model="show" v-if="show" width="500px">
      <div class="white pa-7">
        <h3 class="mt-0 mb-7 black--text d-flex font-weight-400 align-center justify-space-between">
          {{ dialogObject.title }}
          <v-btn class="btn-close" text @click="$emit('input', null)">close</v-btn>
        </h3>
        <template v-for="(field, i) in dialogObject.fields">
          <div v-if="field.type == 'select'" :key="i">
            <v-select
              solo
              outlined
              dense
              persistent-hint
              v-model="form[field.name]"
              class="my-2 align-start mt-5 font-size-14"
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
          <div v-else-if="field.type == 'password'" :key="i">
            <v-text-field
              v-model="form[field.name]"
              class="my-2 align-start mt-1 font-size-14"
              solo
              outlined
              dense
              persistent-hint
              :hint="field.hint"
              :rules="field.rules"
              :placeholder="field.placeholder"
              :append-icon="field.visible ? 'visibility' : 'visibility_off'"
              :type="field.visible ? 'text' : 'password'"
              @click:append="field.visible = !field.visible"
              :ref="field.name"
            >
              <template #prepend>
                <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">{{ field.text }}</label>
              </template>
            </v-text-field>
          </div>
          <div v-else-if="field.type == 'copy'" :key="i">
            <v-text-field
              :value="form[field.name]"
              class="my-2 align-start mt-1 font-size-14"
              solo
              outlined
              dense
              readonly
              persistent-hint
              :hint="field.hint"
              :rules="field.rules"
              @click="copy($event)"
            >
              <template #prepend>
                <label class="field-name mb-0 text-no-wrap font-size-14 grey--text">{{ field.text }}</label>
              </template>
            </v-text-field>
          </div>
          <div v-else :key="i">
            <v-text-field
              v-model="form[field.name]"
              class="my-2 align-start mt-1 font-size-14"
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
          <v-btn class="btn-send white--text" @click="send">{{ this.dialogObject.submit.text }}</v-btn>
        </div>
        <div v-if="dialogObject.hint" class="mt-6em line-height-18 letter-spacing-1px">
          <h4 class="black--text font-weight-400 font-size-14">{{ dialogObject.hint.title }}</h4>
          <p class="grey--text font-size-12" :inner-html.prop="dialogObject.hint.text"></p>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'Dialog',
  components: {},
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
    dialogObject: {
      get() {
        return this.value;
      },
      set(payload) {
        this.value = payload;
      },
    },
    form: {
      get() {
        return this.dialogObject?.form;
      },
      set(payload) {
        this.dialogObject.form = payload;
      },
    },
    show: {
      get() {
        return this.dialogObject != null;
      },
      set(val) {
        if (!val) {
          this.$emit('input', null);
        }
      },
    },
    submit() {
      return this.dialogObject.submit.action;
    },
  },
  methods: {
    ...mapMutations(['SET_MESSAGE']),
    async send() {
      await this.submit(this.form)?.then(res => {
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
    log: message => console.log(message),
    copy($event) {
      const input = $event.target;
      input.select();
      document.execCommand('copy');
      input.setSelectionRange(0, 0); // unselect
      this.SET_MESSAGE({ message: `已复制好友推荐码: ${input.value}`, type: 'warning' });
    },
  },
};
</script>

<style lang="scss">
.v-dialog {
  border-radius: 0;

  .field-name {
    min-width: 6em;
  }
  .btn-send {
    background-image: linear-gradient(180deg, #28c069 0%, #7fdc99 99%);
    min-width: 320px !important;
  }
  .btn-close {
    min-width: 20px !important;
    width: 25px !important;
    height: 25px !important;
    // box-shadow: 0 0 0 5px red;
    margin: 0 !important;
    padding: 0 !important;
    display: block !important;
    text-indent: -999em;
    position: relative;
    color: #666;
    opacity: 0.8;
    transform: rotateZ(-720deg);
    transition-duration: 0.25s;
    &:hover {
      transform: none;
      opacity: 1;
    }

    &:after,
    &:before {
      content: '';
      width: 1px;
      height: 100%;
      background-color: currentColor;
      position: absolute;
      top: 0;
      opacity: 1 !important;
      left: 50%;
    }
    &:before {
      transform: rotateZ(45deg);
    }
    &:after {
      transform: rotateZ(-45deg);
    }
  }
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
      padding-right: 10px;
    }
  }
  .v-text-field {
    .v-input__slot {
      border: 0 !important;
      box-shadow: none !important;
      padding: 0 0 0 1em !important;
      fieldset {
        border: 0 !important;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(171, 179, 173, 0.3) !important;
      }
    }
    .v-input__prepend-outer {
      padding: 0 !important;
      margin: 0 !important;
      height: 40px;
      align-items: center;
    }
  }
  .v-input__icon .v-icon {
    font-size: 15px;
    padding-right: 5px;
  }
}
</style>
