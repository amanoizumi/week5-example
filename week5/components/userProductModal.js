import loadingStore from '../pinia/loadingStore.js';
import cartStore from '../pinia/cartStore.js';
import modalStore from '../pinia/modalStore.js';

const { mapActions, mapState } = Pinia;

export default {
  template: '#userProductModal',

  data() {
    return {
      modal: '',
      qty: 1,
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),

    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  computed: {
    ...mapState(loadingStore, ['loadings']),
    ...mapState(modalStore, ['tempProduct']),
  },
};
