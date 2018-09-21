<template>
	<div class="page">
		<headersec tabname="确认订单" ref="noback"></headersec>
		<transition :name="slidename">
			<div class="container">
				<div class="mycontainer">
					<div>
						<div class="title_car">
							<p class="warn">温馨提示，产品购买是否成功，以最终下单为准，请尽快结算</p>
						</div>
					</div>
					<div class="marleft">
						<!-- <div class="warp_container">
												<div class="wai_warp">
													<img src="../../../static/img/ade_shop/car_store.png" alt="">
													<p class="p_mid">平台自营店</p>
													<img src="../../../static/img/ade_shop/car_right.png" alt="">
												</div>
											</div> -->
						<div class="item_container" v-for="Item in cat">
							<div>
								<img class="img_avator" :src="Item.goods_image_path" alt="">
							</div>
							<div class="div_c">
								<p class="store_name">{{Item.goods_name}}</p>
								<div style="display:flex;" class="toitem">
									<div style="display:flex">
										<p class='p_size'>{{Item.spec_info}}</p>
										<!-- <p class="store_size">36</p> -->
									</div>
									<div>
										<div style="display:flex;font-size: .25rem;">
											<p class="store_num">数量：</p>
											<p class="p_num">{{Item.count}}</p>
										</div>
										<div style="display:flex;margin-top:.2rem">
											<p style="color:red">¥</p>
											<p style="color:red" class="store_price">{{Item.price}}</p>
											<p style="    margin-left: .1rem;margin-bottom: .1rem;">元</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style="    background-color: #eee;
																																												    height: .22rem;">
					</div>
					<div class="chooseAddress" @click="onAddress()">
						<div class="flex-align-center chooseBox">
							<div class="flex-align-center flex-between" v-if="!default_address">
								<p v-show="!this.$store.state.chooseaddress">请填写地址</p>
								<p v-show="this.$store.state.chooseaddress">{{this.$store.state.chooseaddress}}</p>
								<img src="../../../static/img/icon/arrowRight.png" alt="" />
							</div>
							<div class="flex-align-center flex-between" v-if="default_address">
								<!-- <div v-show="haveDefalutAddr">
																										<p>请选择一个收货地址</p>
																									</div> -->
								<div class="p_address">
									<div class="add_up">
										<div style="display:flex">
											<p class="area_now">{{default_address.area_name}}</p>
											<p class="area_now1">{{default_address.detail_address}}</p>
										</div>
										<!-- <div>
											<p class="default_label">默认</p>
										</div> -->
										<div>
											<p class="default_label2">{{default_address.label}}</p>
										</div>
									</div>
									<div class="add_down">
										<p style="margin-right:.2rem">{{default_address.trueName}}</p> 收 |
										<p style="margin-left:.2rem;margin-right:.1rem">{{default_address.mobile}}</p> |
										<p style="margin-left:.1rem">邮编:{{default_address.post_code}}</p>
									</div>
								</div>
								<img src="../../../static/img/icon/arrowRight.png" alt="" />
							</div>
						</div>
					</div>
					<div style="    background-color: #eee;
																																												    height: .22rem;">
					</div>
					<div class="chooseAddress" @click="onBill()" v-if='invoice_type'>
						<div class="flex-align-center chooseBox">
							<div class="flex-align-center flex-between">
								<div>
									<p>发票</p>
								</div>
								<div style="display:flex">
									<p>{{invoice_type}}</p>(
									<p>{{invoice_content}}</p>-
									<p>{{invoice_title_type}}</p>)
									<img src="../../../static/img/icon/arrowRight.png" alt="" />
								</div>
							</div>
						</div>
					</div>
					<div class="chooseAddress" @click="onBill()" v-if='!invoice_type'>
						<div class="flex-align-center chooseBox">
							<div class="flex-align-center flex-between">
								<div>
									<p>发票</p>
								</div>
								<div style="display:flex">
									<img src="../../../static/img/icon/arrowRight.png" alt="" />
								</div>
							</div>
						</div>
					</div>
					<div style="    background-color: #eee;
																																												    height: .22rem;">
					</div>
					<div class="chooseAddress" @click="onCoupon()">
						<div class="flex-align-center chooseBox">
							<div class="flex-align-center flex-between">
								<p>优惠券</p>
								<img src="../../../static/img/icon/arrowRight.png" alt="" />
							</div>
						</div>
					</div>
					<div style="    background-color: #eee;
																																												    height: .22rem;">
						<div style="font-size:.25rem;     padding-left: .2rem;   padding-top: .5rem;">
							<p>商品数量：{{count}}件</p>
							<p>合计金额：{{allCoach}}元</p>
							<p>优惠券抵扣：</p>
							<p>运费：0.0元</p>
						</div>
					</div>
					<div style="height:2.5rem"></div>
					<!-- <div class="orderItem flex" v-for="orderItem in $store.state.orders">
												<img :src="orderItem.GoodsImage" class="goodsImg" />
												<div>
													<p class="goods-name">{{orderItem.GoodsName}}</p>
													<p class="goods-num">x{{orderItem.GoodsNum}}</p>
													<p class="goods-price">¥{{orderItem.GoodsPrice}}</p>
												</div>
											</div> -->
					<div class="orderBottom flex-between">
						<div class="money_all">
							<span style="margin-right: .2rem;">合计:</span>
							<span style="color:red">
												{{allCoach}}元</span>
						</div>
						<div class="getOrder">
							<span @click="onOrder">马上下单</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import Bus from '../base/bus.js'
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				allCoach: 0,
				havePage: false,
				mainarea: false,
				slidename: 'slide-go',
				message: '1',
				checkedItem: [],
				goodscart_id: [],
				count: 0,
				cat: [],
				default_address: {},
				invoice_type: '',
				invoice_content: '',
				invoice_title_type: '',
				goodscart_idList: [],
				orderIdL: null,
				haveDefalutAddr: false,
				addressList: [],
				parmCat: [],
			}
		},
		components: {
			Headersec,
			Nopage
		},
		computed: {
			...mapGetters([
				'this.$store.state.orders',
				'this.$store.state.chooseaddress',
				'this.$store.state.comname'
			])
		},
		mounted() {
			console.log('this.$store.state.chooseaddress1111111111111', this.$store.state.chooseaddress);
			var chooseAddres = JSON.stringify(this.$store.state.chooseaddress);
			console.log('chooseAddres', chooseAddres);
			var default_address1111 = JSON.parse(localStorage.getItem("default_address1"));
			console.log('default_address1111', default_address1111);
			const that = this;
			this.$refs.noback.isBack_detail = false;
			this.$refs.noback.isBack = false;
			const cat = JSON.parse(localStorage.getItem("obj"))
			console.log('cat', cat);
			if (cat.isCar == false) {
				console.log('spxq', cat.isCar);
				this.getDetail();
			} else {
				if (cat.isSeckillDetail) {
					console.log('进入orderwait', cat);
					this.getSeckillDetail();
				} else {
					console.log('cat', cat.isCar);
					this.getCatList();
				}
			}
			var default_address = JSON.parse(localStorage.getItem("default_address11111"));
			that.default_address = default_address
			console.log('that.default_address', that.default_address);
			// 判断发票
			if (that.$route.query.invoice_type == 0) {
				that.invoice_type = '普通'
			} else if (that.$route.query.invoice_type == 1) {
				that.invoice_type = '电子'
			}
			if (that.$route.query.invoice_content == 0) {
				that.invoice_content = '商品明细'
			} else if (that.$route.query.invoice_content == 1) {
				that.invoice_content = '商品类别'
			}
			if (that.$route.query.invoice_title_type == 0) {
				that.invoice_title_type = '个人'
			} else if (that.$route.query.invoice_title_type == 1) {
				that.invoice_title_type = '单位'
			}
		},
		methods: {
			// 秒杀商品详情数据
			getSeckillDetail() {
				const that = this
				let cat = JSON.parse(localStorage.getItem("obj"));
				console.log('我是秒杀商品详情结算数据', cat);
				this.$http
					.get("/myapi/adel-shop/app/auth/buyNow.htm?goodsId=" + cat.goods_id + "&count=" + cat.count + "&proIds=" + cat.specsId)
					.then(function(res) {
						console.log('res秒杀', res.data.data.result[0].goodsCarts[0]);
						res.data.data.result[0].goodsCarts[0].goods_name = cat.gg_name
						that.cat.push(res.data.data.result[0].goodsCarts[0])
						console.log('cat', that.cat);
						that.allCoach = res.data.data.result[0].goodsCarts[0].total_price
						that.count = res.data.data.result[0].goodsCarts[0].count
						that.cat.forEach((ele, idx) => {
							that.goodscart_idList.push(ele.goodscart_id)
						})
						var pice = that.allCoach;
						localStorage.setItem('pice', pice);
						that.goodscart_idList = that.goodscart_idList.join(",")
					})
					.catch(function(error) {});
			},
			//商品详情结算数据
			getDetail() {
				const that = this
				let cat = JSON.parse(localStorage.getItem("obj"));
				console.log('我是商品详情结算数据', cat.goods.goods_name);
				this.$http
					.get("/myapi/adel-shop/app/auth/buyNow.htm?goodsId=" + cat.goods.id + "&count=" + cat.count + "&proIds=" + cat.specsId)
					.then(function(res) {
						console.log('我是商品详情结算数据', cat.goods.goods_name);
						console.log('res.data.data', res.data.data);
						res.data.data.result[0].goodsCarts[0].goods_name = cat.goods.goods_name
						that.cat.push(res.data.data.result[0].goodsCarts[0])
						console.log('cat', that.cat);
						that.allCoach = res.data.data.result[0].goodsCarts[0].total_price
						that.count = res.data.data.result[0].goodsCarts[0].count
						that.cat.forEach((ele, idx) => {
							that.goodscart_idList.push(ele.goodscart_id)
						})
						var pice = that.allCoach;
						localStorage.setItem('pice', pice);
						that.goodscart_idList = that.goodscart_idList.join(",")
					})
					.catch(function(error) {});
			},
			// 购物车结算数据
			getCatList() {
				let cat = JSON.parse(localStorage.getItem("obj"));
				console.log('我是购物车结算数据', cat);
				let that = this
				console.log('cat22222222222', cat);
				that.cat = cat
				console.log('that.catr', that.cat);
				for (var i = 0; i < that.cat.length; i++) {
					this.allCoach += that.cat[i].price * that.cat[i].count
					this.count += that.cat[i].count
				}
				cat.forEach((ele, idx) => {
					that.goodscart_idList.push(ele.goodscart_id)
				})
				that.goodscart_idList = that.goodscart_idList.join(",")
				var pice = that.allCoach;
				localStorage.setItem('pice', pice);
			},
			// 获取收货地址
			getAddressList() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/getAddress.htm")
					.then(function(res) {
						that.havePage = false
						that.addressList = res.data.data
						var haveDefault = []
						that.addressList.addressList.forEach(ele => {
							if (ele.is_default == 1) {
								that.default_address = ele
								haveDefault.push(ele)
							}
							if (haveDefault.includes('1')) {
								that.haveDefalutAddr = false
							} else {
								that.haveDefalutAddr = true
							}
						})
					})
					.catch(function(error) {});
			},
			/*我的订单*/
			onOrder() {
				// this.$router.push('./order');
				// 生成订单接口
				console.log('that.default_address', this.default_address);
				this.toOrderList();
				// this.$router.push('./getOrder')
				this.setPays(this.$store.state.orders);
			},
			// 生成订单
			toOrderList() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/bulidOrder.htm?goodsCartId=" + that.goodscart_idList + "&addressId=" + that.default_address.address_id)
					.then(function(res) {
						that.orderIdL = res.data.data.pay_trade_no
						console.log('res..data.data', res.data.data.orderId);
						console.log('that', that.orderIdL);
						that.$router.push({
							path: 'getOrder',
							query: {
								orderIdL: that.orderIdL
							}
						})
					})
					.catch(function(error) {});
			},
			/*选择地址*/
			onAddress() {
				this.setIschoose(1);
				this.$router.push('./address');
				this.haveDefalutAddr = true
				console.log('this.$tourt', this.$store.state);
				var address = localStorage.getItem('default_address')
				console.log('address222222222222222222222222', address);
			},
			onBill() {
				this.$router.push({
					path: './billInfomation',
					query: {
						goodscart_id: this.goodscart_id
					}
				});
			},
			onCoupon() {
				this.$router.push({
					path: './canUserCoupon',
					query: {
						goodscart_id: this.goodscart_id
					}
				});
			},
			// 获取当前可用的优惠券
			getCanUseCoupon() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/getStoreCoupon.htm?goodsCartId=" + that.goodscart_id, )
					.then(function(res) {})
					.catch(function(error) {});
			},
			getCarList() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/cartList.htm")
					.then(function(res) {
						console.log('res.data.', res.data.code)
						if (res.data.code == -1) {
							that.toLogin = true
						} else if (res.data.code == 2) {
							that.carIsNO = true
						} else {
							const carData = res.data.data.result
							console.log('that.carList', that.carList)
							carData.forEach(ele => {
								ele.goodsStoreRadioAll = false
								ele.goodsCarts.forEach(el => {
									that.carList_item = el;
									el.goodsRadio = false;
								})
							})
							that.carList = carData
						}
						console.log('that.carList1111111111111', that.carList)
						// that.checkedItem =  that.carList
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			...mapMutations({
				setPays: 'SET_PAYS',
				setIschoose: 'SET_ISCHOOSE',
				setComname: 'SET_COMNAME'
			})
		},
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.chooseBox {
		height: 1rem;
		padding: 0 .2rem;
		font-size: .28rem;
		img {
			width: .4rem;
			height: .4rem;
			margin-right: .2rem;
		}
		p {
			text-align: center;
		}
	}
	.flex-between {
		width: 100%
	}
	.img_avator {
		width: 1.3rem;
		height: 1.4rem;
		border-radius: .1rem;
	}
	.goods-price {
		font-size: .25rem
	}
	.p_address {
		display: flex;
		align-items: center;
		flex-direction: column
	}
	.add_up {
		display: flex;
		width: 100%
	}
	.default_label {
		color: white;
		background-color: #E43448;
		display: flex;
		justify-content: center;
		width: 0.8rem;
		border-radius: .1rem;
		align-items: center;
		margin-left: .2rem
	}
	.default_label2 {
		color: white;
		background-color: #FFA500;
		display: flex;
		justify-content: center;
		width: 0.8rem;
		border-radius: .1rem;
		margin-left: .2rem;
		align-items: center
	}
	.area_now1 {
		margin-left: .2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 1rem;
	}
	.area_now {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* height: 1.2rem; */
		width: 2.5rem;
	}
	.add_down {
		width: 100%;
		display: flex;
		margin-top: .1rem;
	}
	.div_c {
		padding: 0 .2rem;
		width: 80%;
	}
	.getOrder {
		background-color: #E43448;
		flex: 1;
		display: flex;
		justify-content: center;
		color: white;
	}
	.money_all {
		flex: 2.2;
		display: flex;
		justify-content: center;
		font-size: .25rem;
		background-color: #fff
	}
	.item_container {
		display: flex;
		padding: .2rem 0;
	}
	.store_name {
		font-size: .23rem
	}
	.marleft {
		margin-left: .2rem;
		padding-top: .3rem;
	}
	.warp_container {
		height: 0.8rem;
		display: flex;
		align-items: center;
		background-color: #fff;
		font-size: .25rem;
	}
	.orderItem {
		padding: .2rem;
		border-bottom: 1px solid #ccc;
	}
	.toitem {
		align-items: center;
		justify-content: space-between;
		padding-right: .2rem
	}
	.p_mid {
		margin-left: .2rem;
		margin-right: .2rem;
	}
	.title_car {
		background-color: #eeeeee;
		width: 100%;
	}
	.wai_warp {
		display: flex;
		height: 0.3rem;
		align-items: center;
	}
	.warn {
		height: 0.8rem; // font-size: .25rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .25rem;
	}
	.goodsImg {
		width: 2rem;
		height: 2rem;
	}
	.orderBottom {
		position: fixed;
		bottom: 0;
		height: .8rem;
		width: 100%;
		font-size: .28rem;
		line-height: .8rem;
		box-sizing: border-box;
	}
</style>
