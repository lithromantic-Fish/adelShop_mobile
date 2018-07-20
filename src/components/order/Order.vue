<template>
	<div class="page orderpage1">
		<!-- <v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()"> -->
		<headersec tabname="我的订单" ref="noback"></headersec>
		<ordertab :urlRouter="$route.path"></ordertab>
		<transition :name="slidename">
			<div class="container111" v-show="mainarea">
				<div v-show="!havePage">
					<nopage></nopage>
				</div>
				<div class="container_order" v-show="havePage">
					<div style="height:1.8rem"></div>
					<div class="item" v-for=" orderItem in orderList.orderList">
						<div class="orderDeati">
							<div style="display:flex">
								<p style="display:flex;align-item:center">订单号：{{orderItem.order_id}}</p>
								<div class="waitpay">{{orderItem.msg}}</div>
							</div>
							<div style="display:flex;    align-items: center;">
								<p>订单详情</p>
								<img class="img_size" src="../../../static/img/icon/arrowRight.png" alt="">
							</div>
						</div>
						<div class="order_name">
							<div style="display:flex">
								<div class="img_path">
									<img style="width:1rem" :src="orderItem.goods_image_path">
								</div>
								<div>
									<div>
										<p>{{orderItem.goods_name}}</p>
									</div>
									<div>
										<p>共{{orderItem.count}}件商品</p>
									</div>
									<div>
										<p>{{orderItem.addTime}}</p>
									</div>
									<div style="display:flex">
										<p>共计：</p>
										<p style="color:red">{{orderItem.totalPrice}}</p>
										<p>元</p>
									</div>
								</div>
							</div>
							<div style="align-items:flex-end;display: flex;">
								<p class="p_red">去支付</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- </v-touch> -->
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import Ordertab from '../base/OrderTab.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				havePage: true,//页面是否有数据
				mainarea: false,
				slidename: 'slide-go',
				orderList: []//订单列表hl
			}
		},
		components: {
			Headersec,
			Nopage,
			Ordertab
		},
		computed: {
			...mapGetters([
				'this.$store.state.pays',
				'this.$store.state.ordercur',
				'this.$store.state.ordertab'
			])
		},
		mounted() {
			console.log('$route.path', this.$route.path)
			this.mainarea = true;
			this.setOrdercur(1);
			this.setOrdertab(1);
			// if(this.$store.state.pays === undefined) {
			// 	this.havePage = false;
			// } else {
			// 	this.havePage = true;
			// }
			console.log('thia,.s.$refs11111', this.$refs.noback.isBack);
			this.$refs.noback.isBack = false;
			console.log('thia,.s.$refs', this.$refs.noback.isBack);
			/*判断动画是进还是出*/
			if (this.$store.state.ordercur < this.$store.state.ordertab) {
				this.slidename = 'slide-back'
			} else {
				this.slidename = 'slide-go'
			}
			// this.getOrderDetail();
			this.getOrderList();
		},
		methods: {
			getOrderList() {
				const that = this
				this.$http.get('/myapi/adel-shop/app/auth/orderList.htm')
					.then(function(res) {
						if (res.data.data != null) {
							console.log('res.data', res.data.data);
							res.data.data.orderList.forEach(element => {
								console.log(element);
								if (element.order_status == 0) {
									element.msg = '已关闭'
								} else if (element.order_status == 10) {
									element.msg = '待支付'
								} else if (element.order_status == 20) {
									element.msg = '待发货'
								} else if (element.order_status == 30) { 
									element.msg = '待确认收货'
								} else if (element.order_status == 40) {
									element.msg = '待评价'
								} else {
									element.msg = '已完成'
								}
							});
							that.orderList = res.data.data
							console.log('that,orderList', that.orderList);
						} else {
							that.Nopage = false
						}
					})
					.catch((error) => {
						console.error(error);
					})
			},
			// onSwipeLeft() {
			// 	this.$router.push('./waitpay');
			// 	console.log('左滑');
			// },
			// onSwipeRight() {
			// 	this.$router.push('./OrderDown')
			// 	console.log('右滑');
			// },
			getOrderDetail() {
				this.$http.post('/myapi/adel-shop/app/auth/orderDetail.htm')
					.then(function(res) {
						console.log('res.data', res.data);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			...mapMutations({
				setOrdercur: 'SET_ORDERCUR',
				setOrdertab: 'SET_ORDERTAB'
			})
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.container {
		padding-top: 1.6rem;
	}
	.img_path {
		align-items: center;
		display: flex;
		padding: 0 .2rem;
	}
	.p_red {
		color: white;
		background-color: #E43448;
		width: 1rem;
		height: .45rem;
		border-radius: .1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.order-item {
		padding-bottom: .2rem;
		border-bottom: 1px solid #ccc;
		margin-bottom: .2rem;
	} // .order-top {
	// 	height: .8rem;
	// 	font-size: .28rem;
	// 	line-height: .8rem;
	// 	padding: 0 .2rem;
	// 	border-bottom: 1px solid #ccc;
	// }
	.order-content {
		padding-top: .2rem;
	}
	.container_order {
		// background-color: #eee;
		width: 100%;
		height: 12.8rem;
	}
	.item {
		display: flex;
		flex-direction: column;
		background-color: #fff; // height: 2rem!important;
		margin-bottom: .15rem;
		padding: 0 .2rem;
	}
	.orderpage1 {
		background-color: #eee
	}
	.orderDeati {
		display: flex
	}
	.orderDeatil1 {
		display: flex;
		flex-direction: row; // height: .4rem!important;
		align-items: center;
		justify-content: space-between;
		margin-top: .1rem
	}
	.img_size {
		height: .3rem
	}
	.waitpay {
		padding: 0 .15rem;
		color: #E43448;
		height: .35rem;
		border: 1px solid;
		border-radius: .1rem;
		display: flex;
		align-items: center;
		margin: 0 .2rem;
	}
	.order_name {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.orderpage1 {
		font-size: .25rem!important
	}
</style>
