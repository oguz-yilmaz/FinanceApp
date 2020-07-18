require("./bootstrap");

import VueRouter from "vue-router";
import Vuex from "vuex";
import storeDefinitions from "./store";
import Index from "./Index";
import router from "./routes";

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(storeDefinitions);

store.subscribeAction({
    after: action => {
        if (
            !["sortBalances", "calculateTotal", "setSlicedBalances"].includes(
                action.type
            )
        ) {
            store.dispatch("sortBalances");
            store.dispatch("calculateTotal");
            store.dispatch("setSlicedBalances");
        }
    }
});

import SyncLoader from "vue-spinner/src/SyncLoader.vue";

Vue.component("sync-loader", SyncLoader);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        Index
    },
    async beforeCreate() {
        this.$store.dispatch("loadBalances");
    }
});
