const { defineStore } = Pinia;

export default defineStore('modalStore', {
  state: () => {
    return {
      userProductModal: {},
      tempProduct: {},
    };
  },
  actions: {
    // 儲存 dom
    createUserProductModalRef(refObj) {
      this.userProductModal = refObj;
    },
    // 開啟跳窗並把產品資料暫存到 store
    openModal(product) {
      this.userProductModal.openModal();
      this.tempProduct = product;
    },
  },
  getters: {},
});
