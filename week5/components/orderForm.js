import { apiUrl, apiPath } from '../../src/api.js';
import cartStore from '../pinia/cartStore.js';

const { mapActions } = Pinia;

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('phone', value => {
  const phoneNumber = /^(09)[0-9]{8}$/
  if (phoneNumber.test(value)) {
    return true;
  } else {
    return '電話須為手機號碼格式';
  }
});


loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
);
configure({
  generateMessage: localize('zh_TW'),
  // validateOnInput: true // 輸入文字時就進行驗證
});

export default {
  // v-slot 插槽 Props，將驗證結果的回饋資料帶入區塊
  template: `
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field id="email" name="email" type="email" placeholder="請輸入 Email"
          :class="['form-control', { 'is-invalid': errors['email'] }]" rules="required|email">
        </v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field id="name" name="姓名" type="text" placeholder="請輸入姓名"
          :class="['form-control', { 'is-invalid': errors['姓名'] }]" rules="required">
        </v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field id="tel" name="電話" type="text" placeholder="請輸入電話"
          :class="['form-control', { 'is-invalid': errors['電話'] }]" rules="required|phone">
        </v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field id="address" name="地址" type="text" placeholder="請輸入地址"
          :class="['form-control', { 'is-invalid': errors['地址'] }]" rules="required">
        </v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <v-field as="textarea" id="message" name="留言" class="form-control" cols="30" rows="10"></v-field>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </v-form>`,
  methods: {
    ...mapActions(cartStore, ['getCart']),
    createOrder(values) {
      // console.log(values);
      const url = `${apiUrl}/api/${apiPath}/order`;
      axios
        .post(url, {
          data: {
            user: {
              name: values['姓名'],
              email: values['email'],
              tel: values['電話'],
              address: values['地址'],
            },
            message: values['留言'],
          },
        })
        .then((response) => {
          alert(response.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
};
