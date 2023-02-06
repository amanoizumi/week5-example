import userProducts from './components/userProducts.js';
import userProductModal from './components/userProductModal.js';
import cart from './components/cart.js';
import orderForm from './components/orderForm.js';

import modalStore from './pinia/modalStore.js';

const { createPinia, mapActions } = Pinia;
const pinia = createPinia();

const app = Vue.createApp({
  data() {
    return {};
  },
  mounted() {
    // 初始化時先將跳窗 dom 存到 store
    const modal = this.$refs.userProductModal;
    this.createUserProductModalRef(modal);
  },
  methods: {
    // 引入儲存 dom 的函式
    ...mapActions(modalStore, ['createUserProductModalRef']),
  },
});

app.use(pinia);

app.component('userProducts', userProducts);
app.component('userProductModal', userProductModal);
app.component('cart', cart);
app.component('orderForm', orderForm);
app.mount('#app');
