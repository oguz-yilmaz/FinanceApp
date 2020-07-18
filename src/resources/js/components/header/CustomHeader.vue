<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-white border-bottom navbar-light">
      <logo></logo>

      <ul class="navbar-nav">
        <li class="nav-item mr-3 pt-2">
          <i class="fa fa-bell fa-3 gr" aria-hidden="true"></i>
        </li>
        <li class="nav-item mr-2 pt-1">
          <img class="rounded-circle" :src="'/img/avatar.png'" />
        </li>

        <li class="nav-item" v-if="true">
          <a class="nav-link username" href="#">Molly Green</a>
        </li>
      </ul>
    </nav>
    <header-balance></header-balance>
  </div>
</template>

<script>
import Logo from "../logo/Logo";
import HeaderBalance from "./HeaderBalance";

export default {
  components: {
    Logo,
    HeaderBalance
  }
};
</script>

<style scoped>
.head-balance {
  background: #192b4e;
  height: 110px;
}
.rounded-circle {
  height: 30px;
}
.gr {
  color: #a0a5ba;
}
.username {
  font-family: "SF-Bold";
}
</style>
