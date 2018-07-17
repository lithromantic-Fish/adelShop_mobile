<template>
	<div>
		<headersec tabname="商品晒单" ref="noback"></headersec>
		<!-- <EvaluteTab :urlRouter="$route.path"></EvaluteTab> -->
		<div style="height: 1.6rem;margin-top: 1.5rem; padding: 0 .2rem;">
			<div class="rate_flex">
				<div>
					<div class="flex">
						<el-rate v-model="value1" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
						<p style="padding-left:1rem">包装</p>
					</div>
					<div class="flex">
						<el-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
						<p style="padding-left:1rem">师傅服务</p>
					</div>
					<div class="flex">
						<el-rate v-model="value3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
						<p style="padding-left:1rem">外观</p>
					</div>
					<div class="flex">
						<el-rate v-model="value4" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
						<p style="padding-left:1rem">送货速度</p>
					</div>
				</div>
			</div>
			<div style="     justify-content: space-around;   display: flex;
															    padding: 60px 20px;">
				<div id="querty" class="item_ev" @click="toYes('a')">
					<p>质量不错</p>
				</div>
				<div id="speed" class="item_ev" @click="toYes('b')">
					<p>送货很快</p>
				</div>
				<div id="look" class="item_ev" @click="toYes('c')">
					<p>外观精致</p>
				</div>
			</div>
		</div>
		<div class="warn_pro">
			<p>
				请从产品的质量，师傅服务质量，物流货运评价
			</p>
		</div>
		<div class="toGetconpon" @click="commitComment">
			<p>提交评论</p>
		</div>
	</div>
</template>
<script>
	import Rate from 'vue-tiny-rate';
	import Headersec from '../base/HeaderSec.vue';
	import EvaluteTab from '../base/EvaluteTab'
	export default {
		components: {
			Headersec,
			EvaluteTab,
			Rate
		},
		data() {
			return {
				evaluteList: {},
				value3: null,
				value2: null,
				value1: null,
				value4: null,
				isCilcka: false,
				isCilckb: false,
				isCilckc: false,
				goodsItem:{}
			};
		},
		mounted() {
			this.goodsItem = this.$route.query.myItem
		},
		methods: {
			getEvaluation() {
				const that = this
				console.log('thia,goodsItem',that.$route.query.myItem.goods_id);
				
				this.$http
					.get("/myapi/adel-shop/app/auth/saveEvaluate.htm?goodsId="+that.$route.query.myItem.goods_id+"&orderId="+that.$route.query.myItem.order_id
+"+&descriptionEvaluate="+that.value1+"&serviceEvaluate="+that.value2+"&shipEvaluate="+that.value4+"&packEvaluate="+that.value1)
					.then(function(res) {
						console.log('that.evaluteList', that.evaluteList);
					})
					.catch(function(error) {});
			},
			commitComment(){
				this.getEvaluation()
			},
			toYes(ier) {
				var querty = document.getElementById('querty')
				var speed = document.getElementById('speed')
				var look = document.getElementById('look')
				if (ier == 'a') {
					this.isCilcka = !this.isCilcka
					if (this.isCilcka) {
						querty.style.color = 'white'
						querty.style.backgroundColor = '#CD6839'
					} else {
						querty.style.color = '#5E5E5E'
						querty.style.backgroundColor = '#eee'
					}
				}
				if (ier == 'b') {
					this.isCilckb = !this.isCilckb
					if (this.isCilckb) {
						speed.style.color = 'white'
						speed.style.backgroundColor = '#CD6839'
					} else {
						speed.style.color = '#5E5E5E'
						speed.style.backgroundColor = '#eee'
					}
				}
				if (ier == 'c') {
					this.isCilckc = !this.isCilckc
					if (this.isCilckc) {
						look.style.color = 'white'
						look.style.backgroundColor = '#CD6839'
					} else {
						look.style.color = '#5E5E5E'
						look.style.backgroundColor = '#eee'
					}
				}
				// for (var i = 0; i < ev.length; i++) {
				// 	if (ier == 'a') {
				// 		isCilcka = !isCilcka
				// 		console.log('isCilcka',isCilcka);
				// 		if (isCilcka) {
				// 			ev[0].style.color = 'white'
				// 			ev[0].style.backgroundColor = '#CD6839'
				// 		} else {
				// 			ev[0].style.color = '#5E5E5E'
				// 			ev[0].style.backgroundColor = '#eee'
				// 		}
				// 	} else 	if (ier == 'b') {
				// 		var isCilckb = false
				// 		isCilckb = !isCilckb
				// 		if (isCilckb) {
				// 			ev[1].style.color = 'white'
				// 			ev[1].style.backgroundColor = '#CD6839'
				// 		} else {
				// 			ev[1].style.color = '#eee'
				// 			ev[1].style.backgroundColor = '#5E5E5E'
				// 		}
				// 	}
				// 	else{
				// 		var isCilckc = false
				// 		isCilckc = !isCilckc
				// 		if (isCilckc) {
				// 			ev[2].style.color = 'white'
				// 			ev[2].style.backgroundColor = '#CD6839'
				// 		} else {
				// 			ev[2].style.color = '#eee'
				// 			ev[2].style.backgroundColor = '#5E5E5E'
				// 		}
				// 	}
				// }
			}
		},
	}
</script>

<style>
	* {
		touch-action: none;
	}
	body {
		font-size: .26rem;
		background-color: #fff!important;
		height: auto!important
	}
	.warn_pro {
		height: 100px;
		margin-top: 200px;
		background-color: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #5E5E5E;
		height: 100px;
		font-size: 30px;
	}
	.toGetconpon {
		background-color: #EE2C2C;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 0.68rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 0.25rem;
	}
	.item_ev {
		background-color: #eee;
		padding: 2px 18px;
		border-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #5E5E5E;
	}
	.rate_flex {
		display: flex;
		padding-bottom: .3rem;
		flex-direction: column;
		align-items: center;
		border-bottom: 1px solid #eee;
	}
	.container_right {
		font-size: .24rem;
		margin-left: .2rem
	}
	.a {
		display: flex;
		padding: 0 .2rem;
		height: 2.3rem;
		align-items: center;
	}
	.img_goods {
		width: 1.6rem;
		height: 1.6rem;
	}
	.con_top p {
		padding-bottom: .1rem
	}
	.con_up {
		background-color: #636363;
		height: .5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: .1rem;
		color: white;
		width: 1rem
	}
</style>
