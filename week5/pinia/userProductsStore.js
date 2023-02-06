import { apiUrl, apiPath } from '../../src/api.js';

const { defineStore } = Pinia;

export default defineStore('userProducts', {
  state: () => {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
    };
  },
  actions: {
    getProducts(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/products?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      axios
        .get(url)
        .then((res) => {
          this.tempProduct = res.data.product;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  getters: {},
});
