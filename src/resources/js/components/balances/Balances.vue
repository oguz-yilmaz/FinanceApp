<template>
    <div class="w-100 mt-5">
        <loading :is-full-page="true" :active.sync="spinnerVisible"></loading>
        <grouped-balances
            v-for="(value, key, index) in groupBalances"
            :balanceTime="key"
            :key="index"
            :balances="value"
        ></grouped-balances>
        <v-pagination
            v-if="len"
            class="mt-3"
            v-model="current"
            :page-count="pageCount"
        ></v-pagination>
    </div>
</template>

<script>
import GroupedBalances from "./GroupedBalances";
import { mapState, mapGetters } from "vuex";
import vPagination from "vue-plain-pagination";
import { paginate } from "../../shared/utils/group";
import spinner from "../../shared/mixins/spinner";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    mixins: [spinner],
    components: {
        GroupedBalances,
        vPagination,
        Loading
    },
    data() {
        return {
            current: 2
        };
    },
    computed: {
        ...mapState({
            groupBalances: state => state.groupBalances,
            len: state => state.len
        }),
        pageCount() {
            return Math.ceil(this.len / parseInt(process.env.MIX_PAGE_SIZE));
        }
    },
    watch: {
        current: function() {
            if (this.current == 0) this.current = 1;
            this.$store.dispatch("setPage", this.current);
            this.$store.dispatch("setSlicedBalances");
        }
    }
};
</script>
