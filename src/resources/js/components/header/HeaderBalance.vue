<template>
  <div class="navbar navbar-expand-lg head-balance">
    <div class="container">
      <div class="row pad-lr-large w-100 d-flex align-items-center">
        <span class="balance-span">Your Balance</span>
        <a
          @click="openNewEntryModal"
          class="btn btn-secondary ml-4 btn-blue text-center"
          href="#"
          role="button"
        >
          <img class="pl-1" :src="'/img/add.svg'" height="10" /> Add
        </a>
        <a class="btn btn-primary ml-4 btn-blue text-center" href="#" role="button">
          <img class="pl-1" :src="'/img/import.svg'" height="25" />
          Import CSV
        </a>
        <div class="d-flex flex-column text-right ml-auto">
          <span class="total-text">TOTAL BALANCE</span>
          <span class="total" v-html="convertedTotal"></span>
        </div>
      </div>
    </div>
    <add-balance-modal>
      <edit-form
        :key="renderKey"
        :balance="balance"
        :showButtons="true"
        :add="true"
        @cancel-edit="closeModal"
        @add-balance="addBalance($event)"
      ></edit-form>
    </add-balance-modal>
  </div>
</template>

<script>
import moment from "moment";
import EditForm from "../balance/EditForm";
import AddBalanceModal from "../balance/AddBalanceModal";
import formatMoney from "../../shared/mixins/formatMoney";
import { mapState, mapGetters } from "vuex";

export default {
  mixins: [formatMoney],
  components: {
    EditForm,
    AddBalanceModal
  },
  data() {
    return {
      renderKey: 1,
      balance: {
        date: moment().format("lll"),
        value: null,
        label: null
      }
    };
  },
  methods: {
    openNewEntryModal() {
      this.renderKey = Math.random();
      $("#addEntry").modal("show");
    },
    addBalance(event) {
      this.$store.dispatch("addBalance", { ...event });
      this.closeModal();
    },
    closeModal() {
      this.balance = {
        label: null,
        value: null,
        date: moment().format("lll")
      };
      $("#addEntry").modal("hide");
    }
  },
  computed: {
    ...mapState({
      total: state => state.total
    }),
    convertedTotal() {
      return this.lastDigitsMoneyFormat(this.total);
    }
  }
};
</script>

<style scoped>
.balance-span {
  font-family: "SF-Medium";
  font-size: 1.3rem;
  color: #fff;
}

.total-text {
  font-family: "SF-Bold";
  font-size: 0.8rem;
  color: #717b8e;
}
.total {
  font-size: 1.4rem;
  color: #039f55;
}
</style>
