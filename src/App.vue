<template>
  <div class="container">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {Header}
}
</script>

<style scoped>
  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
