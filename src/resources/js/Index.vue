<template>
    <div>
        <custom-header></custom-header>
        <div class="container ">
            <div class="row pad-lr-large">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import CustomHeader from "./components/header/CustomHeader";

export default {
    components: {
        CustomHeader
    },
    data() {
        return {};
    }
};
</script>
