window._ = require("lodash");

try {
    window.Popper = require("popper.js").default;
    window.$ = window.jQuery = require("jquery");

    require("bootstrap");
} catch (e) {}

window.Vue = require("vue");
export const eventHub = new Vue();

window.axios = require("axios");

axios.interceptors.request.use(
    conf => {
        eventHub.$emit("before-request");
        return conf;
    },
    error => {
        eventHub.$emit("request-error");
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        eventHub.$emit("after-response");
        return response;
    },
    error => {
        eventHub.$emit("response-error");
        return Promise.reject(error);
    }
);

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
