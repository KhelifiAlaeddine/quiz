<script setup>

</script>
<template>
  <div id="app" class="max-w-screen-sm text-lg flex align-center flex-col  p-4 m-4">
    <nav class="border-b-2 border-red mb-4">
      <router-link to="/">Home</router-link>
      -------------------
      <router-link to="/quiz">Quiz</router-link>
      -------------------
      <router-link to="/books">Books</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
