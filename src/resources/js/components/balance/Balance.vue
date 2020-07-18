<template>
  <div class="shadow-sm pl-3 pt-2 pb-2 mb-3 bg-white rounded">
    <div class="row" @mouseover="hover = true" @mouseleave="hover = false">
      <div class="col-md-7 d-flex flex-start">
        <div class="d-flex flex-column">
          <span class="sf-text-bold">{{ balance.label }}</span>
          <span class="date">{{ formattedDate }}</span>
        </div>
      </div>
      <div class="col-md-5 d-flex flex-row">
        <div v-if="isHovered" class="d-flex flex-row align-items-center ml-auto mr-4">
          <a class="edit-button mr-3" href="javascript:void(0)" @click="edit">EDIT</a>
          <a class="edit-button" href="javascript:void(0)" @click="deleteBalance">DELETE</a>
        </div>

        <div class="d-flex justify-content-center align-items-center ml-auto mr-4">
          <span
            class="sf-text-bold"
            :class="{ 'sf-green': isGreaterThanZero }"
            v-html="formattedAmount"
          ></span>
        </div>
      </div>
    </div>
    <edit-form
      :balance="balance"
      v-if="expanded"
      @update-balance="updateBalance($event)"
      @cancel-edit="expanded = false"
    ></edit-form>
  </div>
</template>

<script>
import formatMoney from "../../shared/mixins/formatMoney";
import EditForm from "./EditForm";
import moment from "moment";
import { mapState, mapGetters } from "vuex";

export default {
  mixins: [formatMoney],
  components: {
    EditForm
  },
  props: {
    balance: {
      id: Number,
      label: String,
      value: Number,
      date: String
    }
  },
  data() {
    return {
      hover: false,
      expanded: false
    };
  },
  computed: {
    ...mapState({
      selectedBalance: "selectedBalance"
    }),
    isHovered() {
      return this.hover && !this.expanded;
    },
    isGreaterThanZero() {
      return this.balance.value > 0;
    },
    formattedAmount() {
      return this.convertLastDigits(
        this.currencyFormattedString(this.balance.value),
        0.8
      );
    },
    formattedDate() {
      return moment(this.balance.date).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  methods: {
    edit() {
      this.expanded = true;
      this.$store.commit("SET_SELECTED_BALANCE", this.balance.id);
    },
    deleteBalance() {
      this.$store.dispatch("removeFromBalances", this.balance);
    },
    updateBalance(balance) {
      this.expanded = false;
      this.$store.dispatch("updateBalance", balance);
    }
  }
};
</script>

<style scoped>
.edit-button {
  color: #0054fe;
}
.sf-text-bold {
  font-family: "SF-Bold";
  font-weight: 800;
  font-size: 1.1rem;
}
.date {
  font-family: "SF-Light";
  font-size: 0.9rem;
  color: #c0c0c0;
}
</style>
