<template>
	<header id="headerTab" class="flex flex-align-center">
		<img src="../../../static/img/icon/arrowBack.png" @click="onBack" />
		<p>{{tabname}}</p>
	</header>

</template>

<script>
	export default {
		props: ['tabname'],
		data() {
			return {
				isBack: true,
				isBack_detail:true
			}
		},
		methods: {
			onBack() {
				if(this.isBack&&this.isBack_detail) {
					this.$router.back();
					console.log('isback==true');
					
				} else if(!this.isBack&&this.isBack_detail) {
					this.$router.push('../member');
					console.log('isback==fales');
					
				}
				else if(!this.isBack_detail&&!this.isBack){
					this.$router.push('./cart');
					console.log('tocat');
					
				}
				else if(!this.isBack_detail&&this.isBack){
					this.$router.push('./index');
				}
					this.$emit('nodeEvent',this)
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/base.less';
	header {
		height: .8rem;
		text-align: center;
		background: @theme_background;
		color: @base_color;
		font-size: .26rem;
		line-height: .8rem;
		width: 100%;
		z-index: 10;
		position: fixed;
		top: 0;
	}

	img {
		width: .4rem;
		height: .4rem;
		margin-left: .2rem;
	}

	p {
		text-align: center;
		width: 100%;
		margin-right: .6rem;
	}
</style>
