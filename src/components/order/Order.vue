<style type="text/css">
	* {
		margin: 0;
		padding: 0;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-webkit-tap-highlight-color: transparent;
	}
	body {
		background-color: white
	}
	ul {
		list-style-type: none
	}
	a {
		text-decoration: none;
		color: #18B4FE;
	}
	/*vue*/
	[v-cloak] {
		display: none;
	}
	/*模拟的标题*/
	.header {
		z-index: 9990;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		border-bottom: 1px solid #eee;
		background-color: white;
	}
	.header .btn-left {
		position: absolute;
		top: 0;
		left: 0;
		padding: 12px;
		line-height: 22px;
	}
	/*mescroll滚动的区域*/
	.mescroll {
		position: fixed;
		top: 1.8rem;
		bottom: 0;
		height: auto;
	}
	/*展示上拉加载的数据列表*/
	.data-list li {
		position: relative;
		padding: 10px 8px 10px 120px;
		border-bottom: 1px solid #eee;
	}
	.data-list .pd-img {
		position: absolute;
		left: 18px;
		top: 18px;
		width: 80px;
		height: 80px;
	}
	.data-list .pd-name {
		font-size: 16px;
		line-height: 20px;
		height: 40px;
		overflow: hidden;
	}
	.data-list .pd-price {
		margin-top: 8px;
		color: red;
	}
	.data-list .pd-sold {
		font-size: 12px;
		margin-top: 8px;
		color: gray;
	}
	header {
		top: .8rem;
		position: absolute;
		width: 100%;
		padding: 0 .2rem;
		height: .88rem;
		background: red;
		box-sizing: border-box;
		font-size: .24rem;
		display: flex;
		align-items: flex-end;
	}
	.my_wrap {
		/* margin-top: .5rem; */
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.tab-item {
		flex: 1;
		display: flex;
		justify-content: center;
		font-size: .26rem;
		align-items: center;
	}
	.tab-item p {
		padding-bottom: .2rem;
	}
	.tab-tite2 {
		color: red;
		padding-bottom: .1rem;
		box-sizing: border-box;
		border-bottom: .01rem solid red!important
	}
	.tab-tite6 {
		color: black;
		padding-bottom: .1rem;
		box-sizing: border-box;
	}
	.container_c {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		margin-left: .3rem;
		justify-content: center;
	}
	.slopingside1 {
		border: 1px solid red;
		-o-transform: rotate(125deg);
		-moz-transform: rotate(125deg);
		-webkit-transform: rotate(10deg);
		position: absolute;
		width: .8rem;
		margin-top: .16rem;
	}
	.linear {
		height: 0px;
		border: 1px solid red;
		margin-left: 30px;
		margin-top: -10px;
	}
	.seckillhaveget1 {
		display: flex;
		flex: 1;
		color: #E43448;
		background-color: #fff;
		border-bottom: .02rem solid #E43448;
	}
	.wrap_container {
		display: flex;
		justify-content: space-between;
		margin-top: .9rem;
		height: .9rem;
		margin-top: .82rem;
		position: fixed;
		width: 100%;
		z-index: 2;
	}
	.seckillBeging2 {
		display: flex;
		flex: 1;
		color: #E43448;
		background-color: #eee;
	}
	.wrap_goods {
		background-color: #fff;
	}
	.baby {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 0 .2rem;
	}
	.bor_raid {
		width: 2.5rem;
		height: .3rem;
		border-radius: .1rem;
		border: .01rem solid #E43448
	}
	.comming {
		font-size: 0.3rem;
		display: flex;
		justify-content: center;
		font-size: .3rem
	}
	.robbot {
		display: flex;
		justify-content: flex-end
	}
	.robbot1 {
		display: flex;
		border-radius: 1rem;
		color: #fff;
		width: .5rem;
		height: .5rem;
		background-color: #E43448;
		justify-content: flex-end;
		justify-content: center;
		align-items: center;
	}
	.wapr {
		width: 100%;
	}
	.img_avator {
		display: flex;
		align-items: center
	}
	.img_a {
		width: 1.2rem;
		height: 1.2rem;
	}
	.zz {
		height: .25rem;
		background-color: #eee
	}
	.items {
		display: flex;
		padding: 0 .2rem;
		font-size: .26rem;
		height: 2rem;
	}
	.time {
		font-size: .26rem;
		display: flex;
		align-items: center;
		padding: 0 .1rem;
		padding-right: .2rem;
	}
	.mescroll-upwarp {
		background-color: #fff
	}
</style>

<template>
	<div class="page orderpage1">
		<headersec tabname="我的订单" ref="noback"></headersec>
		<div>
			<ordertab :urlRouter="$route.path"></ordertab>
			<div v-show="!havePage" class="nopage">
				<nopage></nopage>
			</div>
				<div id="mescroll" class="mescroll" v-show="havePage">
					<div class="container111">
						<div class="container_order">
							<div class="item" v-for=" orderItem in ListData">
								<div class="orderDeati">
									<div style="display:flex">
										<p style="display:flex;align-item:center">订单号：{{orderItem.order_id}}</p>
										<div class="waitpay">{{orderItem.msg}}</div>
									</div>
									<div style="display:flex;align-items: center;">
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
				</div>
		</div>
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import Ordertab from '../base/OrderTab.vue';
	import MeScroll from '../../../static/js/mescroll.m.js';
	import "../../../static/css/mescroll.min.css";
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				havePage: true, //页面是否有数据
				mainarea: false,
				slidename: 'slide-go',
				orderList: [], //订单列表hl
				totalPage: null,
				currentPage: 1,
				ListData: [],
				mescroll: null,
			}
		},
		components: {
			Headersec,
			Nopage,
			Ordertab
		},
		// computed: {
		// 	...mapGetters([
		// 		'this.$store.state.pays',
		// 		'this.$store.state.ordercur',
		// 		'this.$store.state.ordertab'
		// 	])
		// },
		mounted() {
			console.log('$route.path', this.$route.path)
			var self = this;
			self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
				up: {
					callback: self.upCallback, //上拉回调
					isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
					page: {
						size: 10
					}, //可配置每页8条数据,默认10
					empty: { //配置列表无任何数据的提示
						warpId: "dataList",
						icon: "../res/img/mescroll-empty.png",
					},
				},
			});
			console.log('self.ListData', self.ListData);
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
			// this.getOrderList();
		},
		methods: {
			upCallback: function(page) {
				//联网加载数据
				var self = this;
				getListDataFromNet(page.num, page.size, function(curPageData) {
					curPageData = self.curPageData
					if (page.num == 1) {
						self.ListData = [];
					}
					console.log('curPageData', curPageData);
					//更新列表数据
					self.ListData = self.ListData.concat(curPageData)
					console.log('self.ListData', self.ListData);
					self.mescroll.endByPage(self.ListData.length, self.totalPage); //必传参数(当前页的数据个数, 总页数)
				}, function() {
					//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
					self.mescroll.endErr();
				});
				function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
					self.$http
						.get("/myapi/adel-shop/app/auth/orderList.htm?currentPage=" + page.num)
						.then(function(res) {
							console.log('res0', res.data);
							if (res.data.data != null) {
								// self.productList = res.data.data.goodsList
								self.curPageData = res.data.data.orderList //当前页的数据
								self.totalPage = res.data.data.totalPage //总页的页数
								successCallback && successCallback(self.productList); //成功回调
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
								self.orderList = res.data.data
								console.log('self,orderList', self.orderList);
							} else {
								console.log('没有数据');
								self.havePage = false
							}
						})
						.catch(function(error) {
							errorCallback && errorCallback() //失败回调
						})
				}
			},
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
							console.log('没有数据');
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
		width: 100%; // height: 12.8rem;
	}
	.nopage{
		margin-top: 2rem;
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
