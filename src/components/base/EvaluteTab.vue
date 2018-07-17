<template>
	<header class="msty flex-align-center">
		<div class="tab-item" :class="{active:urlRouter == '/evalute/evaluate'}">
			<router-link to='./evaluate'>
				<p class="tab-title">待评价</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter == '/evalute/evaluteDown'}">
			<router-link to='./evaluteDown'>
				<p class="tab-title">已评价</p>
			</router-link>
		</div>
 		<div class="tab-item" :class="{active:urlRouter == '/evalute/evaluteNone'}">
			<router-link to='./evaluteNone'>
				<p class="tab-title">评价失效</p>
			</router-link>
		</div>
	
	</header>
</template>

<script>
	export default {
		props: ['urlRouter'],
		data() {
			return {
				showNum: false,
		    	value1: null,
		        value2: null
			}
		},
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
		display: flex;
		align-items: flex-end;
	}
	.tab-item {
		align-items: center;
	}
	.tab-item p{
		    padding-bottom: .2rem;

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
	.msty{
		justify-content: space-around
	}
</style>