<template>
    <div>
        <div class="row mb-3 pt-3">
            <div class="col-md-6 text-left">
                <span class="converted up-text">{{ convertedTime }}</span>
            </div>
            <div class="col-md-6 text-right">
                <span
                    class="total up-text mr-4 bigger"
                    :class="{ 'sf-green': isGreaterThanZero }"
                    v-html="convertedTotal"
                ></span>
            </div>
        </div>
        <balance
            v-for="(balance, index) in balances"
            :key="index"
            :balance="balance"
        ></balance>
    </div>
</template>

<script>
import Balance from "../balance/Balance";
import { mapState, mapGetters } from "vuex";
import formatMoney from "../../shared/mixins/formatMoney";
import moment from "moment";

export default {
    mixins: [formatMoney],
    components: {
        Balance
    },
    props: {
        balanceTime: String,
        balances: Array
    },
    computed: {
        convertedTime() {
            return moment(this.balanceTime)
                .calendar({
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "ll"
                })
                .toUpperCase();
        },
        convertedTotal() {
            return this.convertLastDigits(
                this.currencyFormattedString(this.totalBalance),
                0.9
            );
        },
        totalBalance() {
            let total = 0;
            for (const balance of this.balances) {
                total += parseFloat(balance.value);
            }
            return total;
        },
        isGreaterThanZero() {
            return this.totalBalance > 0;
        }
    }
};
</script>

<style scoped>
.up-text {
    font-family: "SF-Medium";
    font-size: 0.8rem;
    color: #a4a6b1;
}
.bigger {
    font-family: "SF-Bold";
    font-size: 1.1rem;
}
</style>
