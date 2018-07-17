<template>
	<div>
		<headersec tabname="商品晒单" ref="noback"></headersec>
		<EvaluteTab :urlRouter="$route.path"></EvaluteTab>
		<div style="height:1.6rem;background-color:#eee"></div>
		<div v-for="evaluateItem in evaluteList">
			<div class="a">
				<div class="img_left">
					<img class="img_goods" :src="evaluateItem.goods_image_path">
				</div>
				<div class="container_right">
					<div>
						<div class="con_top">
							<p>{{evaluateItem.goods_name}}</p>
							<p>{{evaluateItem.goods_current_price}}元起</p>
							<p>{{evaluateItem.goods_evaluates_size}}人已评价</p>
						</div>
						<div class="con_up1" @click="toEvalute(evaluateItem)">
							<p>去评价</p>
						</div>
					</div>
				</div>
			</div>
			<div style="height:.2rem;background-color:#eee"></div>
		</div>
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import EvaluteTab from '../base/EvaluteTab'
	export default {
		components: {
			Headersec,
			EvaluteTab
		},
		data() {
			return {
				evaluteList: {}
			};
		},
		mounted() {
			this.getEvaluation()
			this.$refs.noback.isBack = false
			console.log('this.$ref',this.$refs);
			
		},
		methods: {
			getEvaluation() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/evaluationList.htm")
					.then(function(res) {
						that.evaluteList = res.data.data.goodsList
						console.log('that.evaluteList', that.evaluteList);
					})
					.catch(function(error) {});
			},
			toEvalute(item) {
				console.log('item',item);
				this.$router.push(
					{path: './toEvalute', query: {'myItem': item}}
					
				)
			}
		}
	}
</script>

<style>
	.container_right {
		font-size: .24rem;
		margin-left: .2rem
	}
	.a {
		display: flex;
		padding: 0 .2rem;
		height: 2.3rem;
		align-items: center;
		background-color: white;
	}
	.myconta {
		margin-top: .3rem
	}
	.img_goods {
		width: 1.6rem;
		height: 1.6rem;
	}
	.con_top p {
		padding-bottom: .1rem
	}
	.con_up1 {
		background-color: #E43448;
		height: .5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: .1rem;
		color: white;
		width: 1rem
	}
</style>
