<template>
	<header id="headerTab">
		<p class="p_color">{{tabname}}</p>
	</header>
</template>

<script>
	export default {
		props: ['tabname'],
		data() {
			return {
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	header {
		height: .8rem;
		text-align: center;
		background-color: #E43448;
		color: white;
		font-size: .3rem;
		line-height: .8rem;
		width: 100%;
		z-index: 10;
		position: fixed;
		top: 0;
		justify-content: center;
	}
</style>