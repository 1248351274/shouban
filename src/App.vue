<template>
  <div id="app">
  <!-- <transition enter-active-class="animated slideInLeft" /> -->
	<!-- <foot v-if="$route.meta.footer"></foot> -->
      <router-view></router-view>

  </div>
</template>

<script>
import foot from './components/public/footer'
export default {
  name: 'App',
  components: {
	  foot
  }
}
</script>

<style scoped lang="scss">
@import './style/var.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height:100%; 
}
html,body{
  height:100%;
  /* width:100%; */
  margin:0px;
}
</style>

