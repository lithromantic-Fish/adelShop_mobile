<template>
	<div class="page">
		<headers tabname="购物车"></headers>
		<transition :name="slidename">
			<!-- <p>温馨提示，产品购买是否成功，以最终下单为准，请尽快结算</p> -->
			<div class="container" v-show="mainarea">
				<div v-show="!havePage">
					<nopage></nopage>
				</div>
				<div v-show="havePage">
					<div>
						<div class="title_car">
							<p class="warn">温馨提示，产品购买是否成功，以最终下单为准，请尽快结算</p>
						</div>
						<div v-show="toLogin" class="toLogin">
							<p>请先登录</p>
							<p class="marleft">点击</p>
							<p @click="onLogin" style="color:red">立即登录</p>
						</div>
						<div v-show="carIsNO" class="empty_wrap">
							<p class="empty">购物车空空如也~</p>
						</div>
						<!-- 所有店铺循环 -->
						<div class="allContainer" v-for="(storeItem ,index) in carList">
							<div class="store_name">
								<div class="store">
									<div class="shopRadio" @click="onStoreSelectAll(storeItem,index)">
										<img src="../../../static/img/icon/radio.png" class="goods-radio " v-show="!storeItem.goodsStoreRadioAll" />
										<img src="../../../static/img/icon/radio_select.png" class="goods-radio " v-show="storeItem.goodsStoreRadioAll" />
									</div>
									<img src="../../../static/img/ade_shop/car_store.png" alt="">
									<p class="mar">{{storeItem.store_name}}</p>
									<img class="mar" src="../../../static/img/ade_shop/car_right.png" alt="">
								</div>
							</div>
							<!-- 单个商品循环 -->
							<div v-for="(item , idx) in storeItem.goodsCarts" class="item_bac">
								<div class="item_goodname">
									<div class="item_goodnameleft">
										<div class="img_ls" @click="selectSingleGoods(item,index,storeItem)">
											<!-- <img src="../../../static/img/icon/radio.png" class="goods-radio " /> -->
											<img src="../../../static/img/icon/radio_select.png" class="goods-radio " v-show="item.goodsRadio" />
											<img src="../../../static/img/icon/radio.png" class="goods-radio " v-show="!item.goodsRadio" />
										</div>
										<p class="p_goos_name">{{item.goods_name}}</p>
									</div>
									<div>
										<p @click="onRemove(item)">删除</p>
									</div>
								</div>
								<div class="wrap_product">
									<div class="product_left">
										<img class="item_goodsize" v-lazy='item.goods_image_path' />
										<p class="rmb">¥ {{item.price}}</p>
									</div>
									<div class="goodsOp flex">
										<img src="../../../static/img/ade_shop/shop_cut.png" @click.stop="onCutCart(item,index,idx)" />
										<!-- <input type="text" :value="item.count" /> -->
										<p class="p_itemCount">{{item.count}}</p>
										<img src="../../../static/img/ade_shop/shop_add.png" @click.stop="onAddCart(item,index,idx)" />
										<div class="d_red"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div class="cartBottom-detail flex-between" v-show="$store.state.carts" v-cloak>
			<div class="flex">
				<div class="shopRadio" @click="onSelectAll()">
					<img src="../../../static/img/icon/radio.png" class="goods-radio" v-show="!goodsRadioAll" />
					<img src="../../../static/img/icon/radio_select.png" class="goods-radio" v-show="goodsRadioAll" />
				</div>
				<div class="bottom-left">
					<p> &nbsp&nbsp&nbsp合计&nbsp&nbsp(不含运费)&nbsp:&nbsp&nbsp&nbsp<span class="shopCoach">{{allCoach.toFixed(2)}}元</span> </p>
				</div>
			</div>
			<div class="subminCart" @click="onOrder">
				<p>去结算</p>
			</div>
		</div>
		<footers :urlRouter="$route.path"></footers>
	</div>
</template>

<script>
	import Headers from '../base/Header.vue';
	import Footers from '../base/Footer.vue';
	import Nopage from '../base/NoPage.vue';
	import Bus from '../base/bus.js'
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import index from 'vue';
	export default {
		data() {
			return {
				goodsRadioAll: false,
				allCoach: 0.00,
				havePage: true,
				itemIndex: '',
				slidename: 'slide-go',
				mainarea: false,
				carList: [],
				carList_item: [],
				noSelect: false,
				isSingGoods: false,
				isStoreGoods: false,
				isAllGoods: false,
				allCount: 0,
				radioArr: [],
				radioStoreArr: [],
				toLogin: false,
				carIsNO: false,
				checkedItem: []
			}
		},
		components: {
			Headers,
			Footers,
			Nopage
		},
		computed: {
			...mapGetters([
				'this.$store.state.carts',
				'this.$store.state.comname'
			])
		},
		mounted() {
			const that = this;
			that.mainarea = true;
			// if (that.$store.state.carts.length == 0) {
			// 	that.havePage = false;
			// } else {
			// 	that.havePage = true;
			// 	that.$store.state.carts.forEach(function(item) {
			// 		if (typeof item.goodsRadio == 'undefined') {
			// 			that.$set(item, "goodsRadio", false);
			// 			that.$set(item,'that.checkedItem',that.checkedItem)
			// 		}
			// 	})
			// }
			/*判断动画是进还是出*/
			if (this.$store.state.comname === 'index' || this.$store.state.comname === 'category' || this.$store.state.comname === 'goodsdetail') {
				this.slidename = 'slide-go';
			} else {
				this.slidename = 'slide-back'
			}
			this.setComname('cart');
			this.getCarList();
			// that.$set(item, "goodsRadio", false);
			console.log('this.$store.carts', this.$store.state.carts);
		},
		methods: {
			// 选择单个商品
			selectSingleGoods(item, idx, storeItem) {
				const that = this
				that.radioArr = []
				that.isSingGoods = true
				item.goodsRadio = !item.goodsRadio;
				that.carList[idx].goodsCarts.forEach((el, id) => {
					that.radioArr.push(el.goodsRadio)
				})
				if (that.radioArr.indexOf(false) == -1) {
					storeItem.goodsStoreRadioAll = true;
					that.goodsRadioAll = true;
				} else {
					storeItem.goodsStoreRadioAll = false;
					that.goodsRadioAll = false;
				}
				// 合计单个商品的价格
				if (item.goodsRadio) {
					that.allCoach += parseInt(item.count * item.price)
				} else {
					that.allCoach -= parseInt(item.count * item.price)
				}
				// that.getGoodsCount();
			},
			onLogin() {
				this.$router.push("./");
			},
			// 获取购物车列表
			getCarList() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/cartList.htm")
					.then(function(res) {
						if (res.data.code == -1) {
							that.toLogin = true
						} else if (res.data.code == 2) {
							that.carIsNO = true
						} else {
							const carData = res.data.data.result
							carData.forEach(ele => {
								ele.goodsStoreRadioAll = false
								ele.goodsCarts.forEach(el => {
									that.carList_item = el;
									el.goodsRadio = false;
								})
							})
							that.carList = carData
						}
					})
					.catch(function(error) {});
			},
			getCarList1() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/cartList.htm")
					.then(function(res) {
						if (res.data.data) {
							const carData = res.data.data.result
							that.carList = carData
						} else {
							that.carList = []
							that.carIsNO = true
						}
					})
					.catch(function(error) {});
			},
			/*选择全部商品*/
			onSelectAll() {
				const that = this
				that.goodsRadioAll = !that.goodsRadioAll;
				if (that.goodsRadioAll) {
					that.carList.forEach(function(ele, idx) {
						ele.goodsStoreRadioAll = true
						ele.goodsCarts.forEach((el) => {
							el.goodsRadio = true;
							that.allCoach += el.price * el.count
						})
					})
					that.noSelect = false
				} else {
					that.carList.forEach(function(ele, idx) {
						ele.goodsStoreRadioAll = false
						ele.goodsCarts.forEach((el) => {
							el.goodsRadio = false;
						})
					})
					that.allCoach = 0.00
					that.noSelect = true
				}
				that.getGoodsCount();
			},
			/*计算价格*/
			onCalAllCoach() {
				const that = this;
				that.carList.forEach((ele, idx) => {
					that.allCoach += ele.total_price
				})
				if (that.noSelect == true) {
					that.allCoach = 0.00
				}
			},
			// 选择店铺内的商品
			onStoreSelectAll(storeItem, index) {
				const that = this
				that.radioStoreArr = []
				storeItem.goodsStoreRadioAll = !storeItem.goodsStoreRadioAll
				if (storeItem.goodsStoreRadioAll) {
					that.carList[index].goodsCarts.forEach((el, id) => {
						el.goodsRadio = true
						that.allCoach += parseInt(el.price * el.count)
					})
				} else {
					that.carList[index].goodsCarts.forEach((el, id) => {
						el.goodsRadio = false
						that.allCoach -= parseInt(el.price * el.count)
					})
				}
				that.carList.forEach(ele => {
					that.radioStoreArr.push(ele.goodsStoreRadioAll)
				})
				if (that.radioStoreArr.indexOf(false) == -1) {
					that.goodsRadioAll = true;
				} else {
					that.goodsRadioAll = false;
				}
				that.isSingGoods = true
			},
			/*添加商品数量*/
			onAddCart(item, index, idx) {
				const that = this
				item.count++;
				this.$http
					.get("/myapi/adel-shop/app/auth/addCartCount.htm?goodsCartId=" + item.goodscart_id + '&count=' + item.count)
					.then(function(res) {
						that.carList[index].goodsCarts[idx].count = item.count
						if (item.goodsRadio) {
							that.allCoach += item.price
						}
					})
					.catch(function(error) {});
			},
			// 获取选中的商品总数
			getGoodsCount() {
				const that = this
				this.carList.forEach((ele, idx) => {
					ele.goodsCarts.forEach((el) => {
						if (el.goodsRadio) {
							this.allCount++
						} else {
							if (this.allCount > 0)
								this.allCount--
						}
					})
				})
				that.carList.forEach(function(ele, idx) {
					if (ele.goodsStoreRadioAll) {
						ele.goodsCarts.forEach((el) => {
							that.goodsRadioAll = true
						})
					} else {
						that.goodsRadioAll = false
					}
				})
				that.noSelect = false
			},
			/*减少商品数量*/
			onCutCart(item, index, idx) {
				const that = this
				if (item.count > 1) {
					item.count--;
					this.$http
						.get("/myapi/adel-shop/app/auth/addCartCount.htm?goodsCartId=" + item.goodscart_id + '&count=' + item.count)
						.then(function(res) {
							that.carList[index].goodsCarts[idx].count = item.count
							if (item.goodsRadio) {
								that.allCoach -= item.price
							}
						})
						.catch(function(error) {});
				}
			},
			/*删除商品*/
			onRemove(item) {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/removeCart.htm?goodsCartId=" + item.goodscart_id)
					.then(function(res) {
						that.getCarList1()
					})
					.catch(function(error) {});
			},
			/*提交订单*/
			onOrder() {
				this.carList.forEach((ele, idx) => {
					ele.goodsCarts.forEach((el, id) => {
						// 选中的商品
						if (el.goodsRadio && this.checkedItem.indexOf(el) == -1) {
							this.checkedItem.push(el);
							this.setOrders(this.checkedItem)
							console.log('this.checkItem22222222222',this.checkedItem);
							var obj = JSON.stringify(this.checkedItem);
							localStorage.setItem('obj', obj);
							this.$router.push({
								path: 'orderwait',
								query: {
									checkedItem: this.checkedItem
								}
							})
						} else {
							return this.checkedItem
						}
					})
				})
				// if (this.checkedItem.length != 0) {
				
				// }
			},
			/*向左滑出现删除*/
			onSwipeLeft(index) {
				this.itemIndex = index;
			},
			/*向右滑隐藏删除*/
			onSwipeRight() {
				this.itemIndex = '';
			},
			/*进入商品详情*/
			onDetail(item) {
				this.$router.push('/detail');
				this.setGoods(item)
			},
			...mapMutations({
				setOrders: 'SET_ORDERS',
				setGoods: 'SET_GOODS',
				setComname: 'SET_COMNAME'
			})
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.container {
		// padding-bottom: 1.6rem;
		overflow-x: hidden;
		background-color: #fff;
	}
	.empty_wrap {
		justify-content: center;
		justify-items: center;
		display: flex;
		margin-top: 2rem;
	}
	.empty {
		font-size: .4rem;
	}
	.mar {
		margin-left: 0.2rem
	}
	.img_ls {
		width: 1rem;
		height: .3rem;
	}
	.marleft {
		margin-left: 1rem
	}
	.p_goos_name {
		font-size: .25rem
	}
	.allContainer {
		padding-bottom: 1rem
	}
	.item_goodname {
		display: flex;
		justify-content: space-between;
		font-size: .28rem;
		/* padding: 0 10rem 0 0.5rem; */
		padding-left: 0.5rem;
		padding-right: 0.2rem;
		align-items: center;
	}
	.item_goodsize {
		width: 1rem;
		height: 1rem;
	}
	.store {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.item_goodnameleft {
		display: flex;
		align-items: center;
		width: 5rem;
		height: .55rem;
	}
	.title_car {
		background-color: #eeeeee;
		width: 100%;
	}
	.cart-item {
		border-bottom: 1px solid #CCCCCC;
		padding-top: .2rem;
		height: 2.4rem;
		-webkit-transition: all 0.3s linear;
		-webkit-user-select: none;
		position: relative;
		background-color: white;
		margin-top: 0.01rem;
	}
	.item_bac {
		background-color: #FCFCFC;
		padding-top: 0.2rem;
	}
	.toLogin {
		display: flex;
		height: 1rem;
		align-items: center;
		justify-content: center;
		p {
			font-size: .3rem;
		}
	}
	.remove {
		background: linear-gradient(90deg, #9bbeff 0%, #6495ED 100%);
		width: 18%;
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: center;
		text-decoration: none;
		position: absolute;
		right: -18%;
		top: 0;
		img {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			left: 20%;
			width: .4rem;
			height: .4rem;
		}
	}
	.p_itemCount {
		width: 0.5rem;
		display: flex;
		justify-content: center;
		border: 1px solid #000;
		border-radius: 6px;
		margin: 0 .2rem;
	}
	.wrap_product {
		padding-left: 0.5rem;
		padding-top: 0.3rem;
		display: flex;
		padding-bottom: 0.2rem;
		border-bottom: 1px solid #C2C2C2;
		justify-content: space-between;
	}
	.warn {
		height: 0.8rem;
		font-size: .25rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.store_name {
		height: 0.8rem;
		display: flex;
		align-items: center;
		background-color: #fff;
		font-size: .25rem;
	}
	.cart-content {
		width: 100%;
	}
	.selected {
		-webkit-transform: translate(-12%, 0);
		-webkit-transition: all 0.3s linear;
	}
	.shopCoach {
		color: red;
		font-size: 0.25rem;
	}
	.goods-radio {
		margin: 0 .2rem;
		width: .3rem;
		height: .3rem;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.goods-img {
		margin-right: .2rem;
		width: 2rem;
		height: 2rem;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.all_c {
		display: flex;
		align-items: center;
	}
	.bottom-left {
		color: #000
	}
	.goods-name {
		font-size: .28rem;
	}
	.goods-coach {
		font-size: .24rem;
		color: red;
		align-self: flex-end;
	}
	.rmb {
		color: red;
		/* position: absolute; */
		display: flex;
		padding-bottom: 0.2rem;
		align-items: flex-end;
		padding-left: 0.2rem;
	}
	.product_left {
		display: flex
	}
	.goodsOp {
		// margin: .4rem 0;
		display: flex;
		align-items: center;
		padding-right: .2rem;
		img {
			width: .34rem;
			height: .34rem;
		}
		input {
			border: none;
			font-size: .28rem;
			text-align: center;
			width: .6rem;
		}
	}
	.cart-common {
		padding: 0 0.2rem;
		height: 0.9rem;
		font-size: 0.28rem;
		background: white;
		margin-top: 0.2rem;
		display: flex;
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
	.cart-adr {
		width: 6rem
	}
	.cart-address {
		padding: 0 0.2rem;
		height: 1.2rem;
		font-size: 0.23rem;
		background: white;
		margin-top: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: space-between
	}
	.cart-count {
		padding: 0.1rem 0.2rem;
		height: 1.8rem;
		font-size: 0.23rem;
		background: white;
		margin-top: 0.2rem;
		p {
			margin-top: 0.12rem
		}
	}
	.cartBottom-detail {
		height: 1rem;
		line-height: 1rem;
		font-size: .25rem;
		width: 100%;
		position: absolute;
		bottom: 0.9rem;
		color: white;
		background-color: white;
		border-top: 0.1px solid #eee; // background: @theme_background;
		/*background:red;*/
		border-top: 0.001rem solid #C2C2C2;
		img {
			vertical-align: middle;
			margin: 0 .2rem;
			width: .3rem;
			height: .3rem;
		}
	}
	.subminCart {
		background-color: #E43448;
		width: 2.4rem;
		display: flex;
		justify-content: center;
	}
</style>