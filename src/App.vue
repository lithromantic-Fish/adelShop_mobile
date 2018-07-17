<template>
  <div id="app">
<!-- <Loading v-show="showLoading"></Loading>   -->
    <router-view/>
  </div>
</template>

<script>
// import Loading from './components/base/Loading.vue'  
import '../static/js/rem.js';
export default {
  name: 'app',
  components:{  
    // Loading  
  },  
}
</script>

<style lang="less">
@import '../static/less/base.less';
	#app{
		height: 100%;
	}
</style>
