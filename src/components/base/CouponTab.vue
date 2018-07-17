<template>
	<header class="flex-between flex-align-center">
		<div class="tab-item" :class="{active:urlRouter == '/coupon/coupon'}">
			<router-link to='./coupon'>
				<p class="tab-title">未使用</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter == '/coupon/couponRecord'}">
			<router-link to='./couponRecord'>
				<p class="tab-title">使用记录</p>
			</router-link>
		</div>
 		<div class="tab-item" :class="{active:urlRouter == '/coupon/couponDown'}">
			<router-link to='./couponDown'>
				<p class="tab-title">已失效</p>
			</router-link>
		</div>
	
	</header>
</template>

<script>
	export default {
		props: ['urlRouter'],
		data() {
			return {
				showNum: false
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
</style>