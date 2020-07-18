<template>
  <router-link class="navbar-brand mr-auto ml-4" :to="{name: 'home'}">
    <img :src="'/img/logo.svg'" alt />
    <span class="ml-1 r-logo">
      Your
      <span class="r-logo-word">Balance</span>
    </span>
  </router-link>
</template>

<style scoped>
span {
  font-family: "SF-Bold";
}
.r-logo-word {
  color: #1361fe;
}
</style>
