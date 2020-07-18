import VueRouter from "vue-router";
import Balances from "./components/balances/Balances";

const routes = [
    {
        path: "/",
        component: Balances,
        name: "home"
    }
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
