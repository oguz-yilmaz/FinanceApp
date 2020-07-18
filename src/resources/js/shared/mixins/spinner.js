import { eventHub } from "../../bootstrap";

export default {
    data() {
        return {
            spinnerVisible: false
        };
    },
    methods: {
        showSpinner() {
            this.spinnerVisible = true;
        },
        hideSpinner() {
            this.spinnerVisible = false;
        }
    },
    created() {
        eventHub.$on("before-request", this.showSpinner);
        eventHub.$on("request-error", this.hideSpinner);
        eventHub.$on("after-response", this.hideSpinner);
        eventHub.$on("response-error", this.hideSpinner);
    },
    beforeDestroy() {
        eventHub.$off("before-request", this.showSpinner);
        eventHub.$off("request-error", this.hideSpinner);
        eventHub.$off("after-response", this.hideSpinner);
        eventHub.$off("response-error", this.hideSpinner);
    }
};
