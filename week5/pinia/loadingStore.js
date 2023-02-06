const { defineStore } = Pinia;

export default defineStore('loading', {
  state: () => {
    return {
      loadings: {
        loadingId: '',
        loadingBtn: '',
        loadingCartId: '',
      },
    };
  },
  actions: {},
  getters: {},
});
