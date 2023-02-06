import { apiUrl, apiPath } from '../../src/api.js';
import loadingStore from './loadingStore.js';

const { defineStore } = Pinia;

export default defineStore('cartItems', {
  state: () => {
    return {
      cart: {},
    };
  },
  actions: {
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(id, qty = 1) {
      const { loadings } = loadingStore();
      const url = `${apiUrl}/api/${apiPath}/cart`;
      loadings.loadingId = id;
      loadings.loadingBtn = 'addToCart';
      axios
        .post(url, {
          data: {
            product_id: id,
            qty: qty,
          },
        })
        .then((res) => {
          // console.log(res.data);
          loadings.loadingId = '';
          loadings.loadingBtn = '';
          this.getCart();
          alert('已加入購物車');
        })
        .catch((err) => {
          loadings.loadingId = '';
          loadings.loadingBtn = '';
          alert(err.response.data.message);
        });
    },
    deleteCart(id) {
      const { loadings } = loadingStore();
      const url = id
        ? `${apiUrl}/api/${apiPath}/cart/${id}`
        : `${apiUrl}/api/${apiPath}/carts`;
      loadings.loadingCartId = id;
      axios
        .delete(url)
        .then((res) => {
          // console.log(res.data);
          loadings.loadingCartId = '';
          this.getCart();
          if(id){
            alert('已從購物車移除商品');
          }else{
            alert('已清空購物車');
          }
        })
        .catch((err) => {
          loadings.loadingCartId = '';
          alert(err.response.data.message);
        });
    },
    updateCart(id, qty) {
      const { loadings } = loadingStore();
      const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
      loadings.loadingCartId = id;
      axios
        .put(url, {
          data: {
            product_id: id,
            qty: qty,
          },
        })
        .then((res) => {
          // console.log(res.data);
          loadings.loadingCartId = '';
          this.getCart();
          alert('已更新商品數量');
        })
        .catch((err) => {
          loadings.loadingCartId = '';
          alert(err.response.data.message);
        });
    }
  },
  getters: {},
});
