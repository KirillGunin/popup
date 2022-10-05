<template>
  <div>
    <div class="py-10 p-20 sm:p-1">
      <HomeView/>
    </div>
  </div>
</template>

<script>
  import HomeView from "./views/HomeView.vue";
  export default {
  components: { HomeView },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
