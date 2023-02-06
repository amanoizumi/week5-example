export default {
  template: `
    <nav aria-label="Page">
      <ul class="pagination">
        <li :class="['page-item', {disabled: !pageObj.has_pre}]">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pageObj.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pageObj.total_pages" :key="page">
          <span :class="['page-link', {'active': page === pageObj.current_page}]" v-if="page === pageObj.current_page">{{page}}</span>
          <a href="#" class='page-link' @click.prevent="changePage(page)" v-else>{{page}}</a>
        </li>
        <li :class="['page-item', {disabled: !pageObj.has_next}]">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pageObj.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>`,
  props: { pageObj: Object },
  emits: ['emitPage'],
  methods: {
    changePage(page) {
      this.$emit('emitPage', page);
    },
  },
};
