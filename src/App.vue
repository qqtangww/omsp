<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    // let that = this
    // window.resize = function (e) {
    //   let windowHeight = window.innerHeight
    //   this.$sotre.commit('windowData', {
    //     windowHeight
    //   })
    // }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  min-width: 960px;
  height: 100%;
  font-size: 12px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
.pointer{
  cursor: pointer;
}
.ws-row td, .ws-row th{
  padding: 5px 0!important;
}
  html,body{
    height: 100%;
    margin: 0;
}
</style>
