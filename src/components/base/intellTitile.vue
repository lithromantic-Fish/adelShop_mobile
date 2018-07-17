<template>
	<div class="my_wrap">
		<div class="tab-item" :class="{active:urlRouter == '/intellData'}">
			<router-link to='./intellData'>
				<p class="tab-title">价格</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter == '/startpx'}">
			<router-link to='./startpx'>
				<p class="tab-title">评论最多</p>
			</router-link>
		</div>
	</div>
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
	.my_wrap{
			margin-top: 1rem;
			width: 100%;
			display: flex;
	}
	.tab-item {
		flex: 1;
		display: flex;
		justify-content: center;
		font-size: .26rem;
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