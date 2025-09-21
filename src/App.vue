<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  },
}
</script>

<style>
#app {    
  max-height: 100%;
  min-height: 100vh;
  background: #1B1B1B;
  display: block;
  max-width: 100%;
}

.el-loading-mask {
  width: 100%;
  height: 100vh;
  background: #fff;
  left: 0;
  top: 0;
  position: absolute;
}
</style>
