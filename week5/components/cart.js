import loadingStore from '../pinia/loadingStore.js';
import cartStore from '../pinia/cartStore.js';

const { mapActions, mapState } = Pinia;

export default {
  template: `
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="deleteCart()">清空購物車</button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm" :disabled="item.id === loadings.loadingCartId"
                @click="deleteCart(item.id)">
                <i class="fas fa-spinner fa-pulse" v-if="item.id === loadings.loadingCartId"></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input min="1" type="number" class="form-control" :disabled="item.id === loadings.loadingCartId"
                    v-model.number="item.qty" @blur="updateCart(item.id, item.qty)">
                  <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success" v-if="cart.total > cart.final_total">折扣價：</small>
              {{ item.final_total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr v-if="cart.total > cart.final_total">
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>`,
  data() {
    return {};
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'deleteCart', 'updateCart']),
  },
  computed: {
    ...mapState(loadingStore, ['loadings']),
    ...mapState(cartStore, ['cart']),
  },
  mounted() {
    this.getCart();
  },
};
