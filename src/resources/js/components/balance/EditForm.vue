<template>
    <div class="row w-100 border-top mt-3">
        <form>
            <div class="form-row ml-3 mt-3 p-3">
                <div class="col-md-4 mb-3">
                    <label for="label">LABEL</label>
                    <input
                        type="text"
                        class="form-control"
                        id="label"
                        v-model="input.label"
                        required
                    />
                </div>
                <div class="col-md-4 mb-3">
                    <label for="date">DATE</label>
                    <input
                        type="text"
                        class="form-control"
                        id="date"
                        v-model="input.date"
                        required
                    />
                </div>
                <div class="col-md-4 mb-3">
                    <label for="amount">AMOUNT</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="dolarSign"
                                >$</span
                            >
                        </div>
                        <input
                            type="number"
                            class="form-control"
                            id="amount"
                            v-model="input.value"
                            aria-describedby="dolarSign"
                            required
                        />
                    </div>
                </div>
            </div>
        </form>
        <div class="d-flex flex-row-reverse border-top w-100 pt-3">
            <button
                v-if="!add"
                @click="updateEntry"
                type="button"
                class="btn btn-primary btn-lg ml-2 btn-entry btn-update"
            >
                UPDATE ENTRY
            </button>
            <button
                v-else
                @click="addEntry"
                type="button"
                class="btn btn-primary btn-lg ml-2 btn-entry btn-update"
            >
                ADD ENTRY
            </button>
            <button
                @click="cancelEdit"
                type="button"
                class="btn btn-primary btn-lg btn-entry btn-cancel"
            >
                CANCEL
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        add: Boolean,
        balance: {
            id: Number,
            label: String,
            value: Number,
            date: String
        }
    },
    data() {
        return {
            input: {
                id: this.balance.id ?? null,
                label: this.balance.label ?? null,
                value: this.balance.value ?? null,
                date: this.balance.date ?? null
            }
        };
    },
    methods: {
        updateEntry() {
            this.$emit("update-balance", this.input);
        },
        addEntry() {
            this.$emit("add-balance", this.input);
        },
        cancelEdit() {
            this.$emit("cancel-edit");
        }
    }
};
</script>

<style scoped>
.btn-entry {
    font-size: 0.77rem;
    outline: none;
    box-shadow: none;
    border: none;
}
.btn-update {
    background-color: #0054fe;
}
.btn-cancel {
    font-weight: 800;
    color: #7c90b5;
    background-color: #dbe5fa;
}
</style>
