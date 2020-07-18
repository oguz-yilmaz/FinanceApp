import { makeRequest } from "./shared/utils/req";
import { groupBalances, paginate } from "./shared/utils/group";
import moment from "moment";

export default {
    state: {
        balances: [],
        slicedBalances: [],
        page: 1,
        len: 0,
        groupBalances: {},
        selectedBalance: null,
        total: 0
    },
    mutations: {
        SET_TOTAL(state, payload) {
            state.total = payload;
        },
        SET_PAGE(state, payload) {
            state.page = payload;
        },
        SET_LEN(state, payload) {
            state.len = payload;
        },
        SET_SELECTED_BALANCE(state, payload) {
            state.selectedBalance = payload;
        },
        REMOVE_FROM_BALANCES(state, payload) {
            state.balances = state.balances.filter(
                balance => balance.id !== payload
            );
        },
        SET_BALANCES(state, payload) {
            state.balances = payload;
        },
        SET_SLICED_BALANCES(state, payload) {
            state.slicedBalances = payload;
        },
        SET_GROUPED_BALANCES(state) {
            state.groupBalances = { ...groupBalances(state.slicedBalances) };
        },
        SET_BALANCE(state, payload) {
            let balanceIndex = state.balances.findIndex(
                obj => obj.id == payload.id
            );

            Object.assign(state.balances[balanceIndex], { ...payload });
        },
        ADD_NEW_BALANCE(state, payload) {
            let balances = [...state.balances];
            balances.unshift({ ...payload.data });
            Object.assign(state.balances, balances);
        }
    },
    actions: {
        async loadBalances({ commit, state }) {
            await makeRequest({
                method: "get",
                url: `${process.env.MIX_API_URL}/api/balances`,
                success: function(res) {
                    commit("SET_BALANCES", res.data.data);
                }
            });
        },
        async removeFromBalances({ commit, state }, payload) {
            await makeRequest({
                method: "delete",
                url: `${process.env.MIX_API_URL}/api/balances/${payload.id}`,
                success: function(res) {
                    commit("REMOVE_FROM_BALANCES", payload.id);
                }
            });
        },
        async updateBalance({ commit, state }, payload) {
            await makeRequest({
                method: "put",
                url: `${process.env.MIX_API_URL}/api/balances/${payload.id}`,
                payload,
                success: function(res) {
                    commit("SET_BALANCE", payload);
                }
            });
        },
        async addBalance({ commit, state }, payload) {
            let balance = { ...payload };
            balance.date = moment(balance.date).format("YYYY-MM-DD HH:mm:ss");
            balance.amount = balance.value;
            await makeRequest({
                method: "post",
                url: `${process.env.MIX_API_URL}/api/balances`,
                payload: balance,
                success: function(res) {
                    commit("ADD_NEW_BALANCE", res.data);
                }
            });
        },
        calculateTotal({ commit, state }) {
            let total = 0;
            for (const balance of state.balances) {
                total += parseFloat(balance.value);
            }
            commit("SET_TOTAL", total);
        },
        sortBalances({ commit, state }) {
            let balances = [...state.balances];
            balances.sort(function(a, b) {
                return moment(a.date, "YYYY-MM-DD").toDate() >
                    moment(b.date, "YYYY-MM-DD").toDate()
                    ? -1
                    : 1;
            });
            commit("SET_BALANCES", balances);
            commit("SET_LEN", balances.length);
        },
        setSlicedBalances({ commit, state }) {
            commit(
                "SET_SLICED_BALANCES",
                paginate(state.balances, process.env.MIX_PAGE_SIZE, state.page)
            );
            commit("SET_GROUPED_BALANCES");
        },
        setPage({ commit, state }, page) {
            commit("SET_PAGE", page);
        }
    }
};
