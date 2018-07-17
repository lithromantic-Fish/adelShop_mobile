<template>
	<header class="flex-between flex-align-center">
		<div class="tab-item" :class="{active:urlRouter2 == '/detail'}">
			<!-- <router-link to='./Detail'>
				<p class="tab-title">详情</p>
			</router-link> -->
			<router-link :to="{path:'./detail', query:{id:this.GLOBAL.token}}">  
				<p class="tab-title">详情</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter2 == '/param'}">
			<router-link to='./param'>
				<p class="tab-title">参数</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter2 == '/assess'}">
			<router-link to='./assess'>
				<p class="tab-title">用户评价</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter2 == '/complex'}">
			<router-link to='./complex'>
				<p class="tab-title">相关商品</p>
			</router-link>
		</div>
		</div>
	</header>
</template>

<script>
	export default {
		props: ['urlRouter2'],
		data() {
			return {
				showNum: false
			}
		},
		mounted(){
			console.log(',this.$route.query.id1111111111',this.$route)
		}
	}
</script>
<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	header {
		top: .8rem;
		position: absolute;
		width: 100%;
		padding: 0 .2rem;
		height: .88rem;
		background: @base_color;
		box-sizing: border-box;
		font-size: .24rem;	
	}
	.tab-item {
		text-align: center;
	}
	.tab-title {
		color: @base_textColor;
		padding-bottom: .1rem;
		box-sizing: border-box;
	}
	.active .tab-title {
		color: @theme_color;
		border-bottom: 1px solid @theme_color;
	}
</style>