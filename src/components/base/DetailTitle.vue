<template>
	<div class="warn_login">
		<div style="display: flex">
			<p>为方便你购买请提前登陆.</p>
			<p style="color:red;margin-left:.2rem;" @click="tologin">立即登录</p>
		</div>
		<div style="display:flex; align-items:center">
			<img src="../../../static/img/icon/arrowRight.png" />
		</div>
	</div>
</template>
<script>
	export default {
		mounted(){
		},
		methods: {
			tologin(){
					this.$router.push('./');
				
			}
		}
	}
</script>
<style>
	.warn_login {
		background-color: #eee;
		display: flex;
		font-size: .25rem;
		justify-content: center;
		align-items: center;
		height: 0.65rem;
		display: flex;
		justify-content: space-between;
		padding: 0 .3rem 0 .5rem;
	}
</style>


