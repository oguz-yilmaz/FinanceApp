<template>
    <div
        class="modal fade"
        id="addEntry"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="modal-title m-title">Add Balance Entry</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.m-title {
    font-family: "SF-Heavy";
    margin-top: 17px;
    position: absolute;
    margin-left: 21px;
}
</style>
