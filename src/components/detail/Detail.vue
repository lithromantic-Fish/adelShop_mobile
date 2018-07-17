<template>
	<div>
		<div class="page" v-show="!isRush">
			<headersec tabname="商品详情" ref="noback"></headersec>
			<transition :name="slidename">
				<div class="container" v-show="mainarea">
					<!-- <div v-show="!havePage">
											<nopage></nopage>
										</div> -->
					<detailTitle :urlRouter="$route.path"></detailTitle>
					<!-- 轮播图 -->
					<div class="swiper-container" v-show="havePic">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="bannerItem in goodsOut.picPaths">
								<img style="height:5.5rem" :src="bannerItem" />
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
					<div v-show="!havePic" style="    margin-top: .8rem;">
						<!-- <img src="../../../static/github.png" alt=""/> -->
						<img style="    width: 100%;
			   					 height: 3rem;" src="../../../static/img/noPic.png" />
					</div>
					<div>
						<div class="detail-content">
							<div>
								<p class="goods-name">{{goodsDetail.goods_name}}</p>
							</div>
							<div class="bot_pices">
								<div>
									<!-- <p style="font-size:.28rem">请选择:</p> -->
									<p class="goods-price">¥{{goodsDetail.store_price}}</p>
								</div>
								<div style="font-size:.28rem;display:flex;align-items:center" @click="focus(goodsDetail)">
									<img style="width:.5rem;height:.5rem " v-if="yesNone" src="../../../static/img/icon/collect_no.png" />
									<img style="width:.5rem;height:.5rem " v-if="!yesNone" src="../../../static/img/icon/collect_yes.png" />
									<p v-if="yesNone" style="font-size: 0.24rem;">关注</p>
									<p v-if="!yesNone" style="color:#E43448;font-size: 0.24rem;">已关注</p>
								</div>
							</div>
						</div>
					</div>
					<div class="vejfew"></div>
					<div>
						<div class="video">
							<p style="font-size:.28rem"> 视频展示</p>
						</div>
						<div>
							<video style="width:100%;height:atto" src="../../../static/demo.mp4" controls='true'></video>
						</div>
					</div>
				</div>
			</transition>
			<DetailTab style="margin-top: .65rem;" :urlRouter2="$route.path"></DetailTab>
			<div class="detail-bottom flex-align-center flex-around">
				<div class="toCart">
					<img src="../../../static/img/icon/cart_white.png" @click="toCart" />
					<!-- 2222 -->
					<!-- <transition name="bullet">
											<p v-show="goodsNum">{{goodsNum}}</p>
										</transition> -->
				</div>
				<div class="addCart" @click="onCartModel()">
					<span class="tabbar-label">加入购物车</span>
				</div>
				<div class="external addPay" @click="onBuyModel()">
					<span class="tabbar-label">立即购买</span>
				</div>
			</div>
			<transition name="slide-up">
				<div class="model" v-show="addCartModel" v-cloak>
					<div class="model-content addCart-content" @click="addCartModel=true">
						<div class="cartModel-box  flex" style="flex-direction: column;">
							<div class="cartModel-img">
								<!-- <img :src="$store.state.goods.GoodsImage" /> -->
							</div>
							<div class="cartModel-text">
								<div class="flex-between">
									<p class="goods-name">{{goodsDetail.goods_name}}</p>
									<img src="../../../static/img/icon/close.png" class="cartClose" @click.stop="addCartModel=false" />
								</div>
								<p class="goods-price">¥{{goodsDetail.store_price*goodsNum}}</p>
							</div>
							<div v-for="(item,Oidx) in spec" v-show="haveSpecs">
								<p class="out_class">{{item.spec_name}}</p>
								<div class="spces_class">
									<div v-for="(inItem,Iidx) in item.pros">
										<p class="pro_class" :class="inItem.active?'isSelect':''" @click.on="proItem(inItem,Oidx,Iidx)">{{inItem.pro_value}}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="cartModel-bottom flex-between">
							<p>购买数量</p>
							<div class="goodsOp flex">
								<img src="../../../static/img/icon/shop_cut.png" @click.stop="onCutCart()" />
								<input type="text" :value="goodsNum" readonly="" />
								<img src="../../../static/img/icon/shop_add.png" @click.stop="onAddCart()" />
							</div>
						</div>
						<div>
							<p class="cartModel-addCart" v-show="!isBuy" @clic="addCar(goodsDetail,goodsOut)">
								加入购物车
							</p>
							<p class="cartModel-addCart" v-show="isBuy" @click="buyNow(goodsDetail,goodsOut)">
								立即购买
							</p>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import DetailTab from '../base/DetailTab.vue'
	import DetailTitle from '../base/DetailTitle.vue'
	import "../../../static/css/swiper.min.css";
	import Swiper from "../../../static/js/swiper.min.js";
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				goodsNum: 1, //商品数量
				addCartModel: false,
				isBuy: true, //是否添加购物车
				havePage: false, //是否有数据
				cartLength: '',
				cartNum: false,
				mainarea: false,
				slidename: 'slide-go',
				goodsOut: {}, //商品详情外部对象
				goodsDetail: {}, //商品详情内部对象
				isRush: false,
				goodMs: {},
				// goodMsOut: {},
				isLike: false, //是否点赞
				haveSpecs: false, //是否有规格
				HOUR_TIME: null,
				MINUTER_TIME: null,
				SECONDER_TIME: null,
				yesNone: true,
				havePic: false,
				spec: [],
				Iitem:[]
			}
		},
		computed: {
			...mapGetters([
				'this.$store.state.goods',
				'this.$store.state.carts',
				'this.$store.state.comname'
			])
		},
		mounted() {
			this.$refs.noback.isBack_detail = false;
			this.getGoodsDetail();
			// console.log('log', this.goodMsOut);
			this.GLOBAL.token = this.$route.query.id
			this.mainarea = true;
			if (this.$store.state.carts != undefined) {
				this.cartLength = this.$store.state.carts.length;
			}
			/*拿到路由跳转的id*/
			const id = this.$route.query.id;
			// this.isRush = this.$route.query.item.isRushbuy
			console.log('this.isRush', this.isRush);
			/*判断动画是进还是出*/
			if (this.$store.state.comname === 'orderwait' || this.$store.state.comname === 'cart') {
				this.slidename = 'slide-back';
			} else {
				this.slidename = 'slide-go'
			}
			this.setComname('goodsdetail');
		},
		components: {
			Headersec,
			Nopage,
			DetailTab,
			DetailTitle
		},
		methods: {
						// 选择规格	
			proItem(item, Oidx, Iidx) {
				const that = this
				var Iitem = that.goodsOut.specs[Oidx].pros//内循环的数组
				// item.active = true
				// console.log('item',item);
				//每次点击所有的按钮初始化
				for (var i = 0; i < Iitem.length; i++) {
					Iitem[i].active = false
				}
				//设置当前的选中状态
				Iitem[Iidx].active = true
				this.goodsNum ++;
				this.goodsNum --;
				console.log('Oidx', Oidx);//外循环的id
				console.log('Iidx', Iidx);//内循环的id
				console.log('goodsOut', that.goodsOut.specs[Oidx].pros);
			},
			getGoodsDetail() {
				const that = this
				const goods_id = this.$route.query.id
				const item = this.$route.query.item
				this.$http
					.get("/myapi/adel-shop/app/goods.htm?id=" + goods_id)
					.then(function(res) {
						console.log('res.data.data', res.data.data);
						that.goodsOut = res.data.data
						console.log('that.goodsOut', that.goodsOut);
						if (that.goodsOut.picPaths.length == 0) {
							console.log('没图片');
							that.havePic = false
						} else {
							console.log('有图片');
							that.havePic = true
						}
						if (that.goodsOut.specs.length != 0) {
							that.spec = res.data.data.specs
							console.log('有规格');
							that.haveSpecs = true
						} else {
							console.log('没规格');
							that.haveSpecs = false
						}
						that.goodsDetail = res.data.data.goods
						var goodItem = JSON.stringify(that.goodsOut);
						localStorage.setItem('goodItem', goodItem);
						console.log('that.goodsDetail.goods_property', that.goodsDetail.goods_property);
						if (that.goodsDetail.is_collect == 0) {
							that.yesNone = true
						} else {
							that.yesNone = false
						}
						setTimeout(() => {
							const swiper = new Swiper(".swiper-container", {
								pagination: ".swiper-pagination",
								paginationClickable: true,
								spaceBetween: 30,
								effect: "fade"
							});
						}, 200);
					})
					.catch(function(error) {});
				// }
			},
			// 收藏商品
			getLike() {
				const that = this
				const goods_id = this.$route.query.id
				this.$http
					.get("/myapi/adel-shop/app/auth/collectGoods.htm?type=" + 1 + '&id=' + goods_id)
					.then(function(res) {
						that.isLike = true
					})
					.catch(function(error) {});
			},
			// 取消收藏
			noLike() {
				const that = this
				const goods_id = this.$route.query.id
				this.$http
					.get("/myapi/adel-shop/app/auth/collectGoods.htm?type=" + 0 + '&id=' + goods_id)
					.then(function(res) {
						that.isLike = false
					})
					.catch(function(error) {});
			},
			buyNow(goodsDetail, goodsOut) {
				// 请求立即购买支付接口
				
				console.log('goodsDetail', goodsDetail);
				console.log('goodsOut', goodsOut);
			},
			toCart() {
				this.$router.push('./cart');
			},
			onCartModel() {
				console.log('点击加入购物车');
				
				this.addCartModel = true;
				this.isBuy = false;
			},
			// onMSBuy(item) {
			// 	console.log('item', item);
			// 	const that = this;
			// 	if (item.specs[0]) {
			// 		// 有规格的商品添加到购物车
			// 		that.getMSMoreCar(item);
			// 	} else {
			// 		// 无规格的商品添加到购物车
			// 		that.getMSGoodsToCar(item)
			// 	}
			// 	if (this.isBuy) {
			// 		let orderArr = [];
			// 		orderArr.push(this.$store.state.goods)
			// 		this.setOrders(orderArr);
			// 		this.$router.push('./orderwait')
			// 	} else {
			// 		if (!this.cartNum) {
			// 			this.setCarts(this.$store.state.goods);
			// 			this.addCartModel = false;
			// 			this.cartNum = true;
			// 			this.cartLength = this.cartLength + 1;
			// 			setTimeout(() => {
			// 				this.cartNum = false;
			// 			}, 2000)
			// 		}
			// 	}
			// },
			onBuyModel() {
				console.log('立即购买');
				
				this.addCartModel = true;
				this.isBuy = true;
			},
			onAddCart() {
				this.goodsNum++;
			},
			onCutCart() {
				if (this.goodsNum > 1) {
					this.goodsNum--;
				}
			},
			// 关注
			focus(item) {
				this.yesNone = !this.yesNone
				console.log('item', item);
				if (!this.yesNone) {
					this.$http
						.get("/myapi/adel-shop/app/auth/collectGoods.htm?id=" + item.id + '&type=1')
						.then(function(res) {})
						.catch(function(error) {});
				} else {
					this.$http
						.get("/myapi/adel-shop/app/auth/collectGoods.htm?id=" + item.id + '&type=0')
						.then(function(res) {})
						.catch(function(error) {});
				}
			},
			//添加到购物车
			addCar(item, goodsOut) {
				console.log('加入购物车');
				const that = this;
				if (goodsOut.specs[0]) {
					// 有规格的商品添加到购物车
					that.haveSpceToCar(item, goodsOut);
				} else {
					// 无规格的商品添加到购物车
					that.noHaveSpceToCar(item)
				}
				if (this.isBuy) {
					let orderArr = [];
					orderArr.push(this.$store.state.goods)
					this.setOrders(orderArr);
					this.$router.push('./orderwait')
				} else {
					if (!this.cartNum) {
						this.goodsNum = 0
						this.setCarts(this.$store.state.goods);
						this.addCartModel = false;
						this.cartNum = true;
						this.cartLength = this.goodsNum;
						setTimeout(() => {
							this.cartNum = false;
						}, 2000)
					}
				}
			},

			//添加有规格的商品到购物车
			haveSpceToCar(item, goodsOut) {
				console.log('有规格的商品');
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/addCart.htm?goodsId=" + item.id + '&count=' + that.goodsNum + '&proIds=' + goodsOut.specs[0].spec_id)
					.then(function(res) {})
					.catch(function(error) {});
			},
			// 添加无规格的商品到购物车
			noHaveSpceToCar(item) {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/addCart.htm?goodsId=" + item.id + '&count=' + that.goodsNum)
					.then(function(res) {})
					.catch(function(error) {});
			},
			// //添加有规格的商品到购物车
			// getMSMoreCar(item) {
			// 	const that = this
			// 	this.$http
			// 		.get("/myapi/adel-shop/app/auth/addCart.htm?goodsId=" + item.goods_id + '&count=' + that.goodsNum + '&proIds=' + item.specs[0].spec_id)
			// 		.then(function(res) {})
			// 		.catch(function(error) {});
			// },
			// // 添加商品到购物车
			// getMSGoodsToCar(item) {
			// 	const that = this
			// 	this.$http
			// 		.get("/myapi/adel-shop/app/auth/addCart.htm?goodsId=" + item.goods_id + '&count=' + that.goodsNum)
			// 		.then(function(res) {})
			// 		.catch(function(error) {});
			// },
			...mapMutations({
				setOrders: 'SET_ORDERS',
				setCarts: 'SET_CARTS',
				setComname: 'SET_COMNAME'
			})
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.spces_class{
		display: flex;
		flex-wrap: wrap;
	}
	.detial {
		padding-top: .8rem;
		padding-bottom: .88rem;
	}
	.goodsImg {
		width: 100%;
		height: 5rem;
	}
	.goods-name {
		width: 6.2rem
	}
	.detail-content {
		padding: .2rem .3rem 0 .3rem;
	}
	.out_class {
		padding: 0 .2rem;
		font-size: .24rem;
	}
	.pro_class {
		width: .8rem;
		background-color: #EAEAEA;
		height: .4rem;
		justify-content: center;
		align-items: center;
		display: flex;
		color: #636363;
		margin: .2rem
	}
	.detail-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: .8rem;
		background: @theme_background;
		color: @base_color;
		font-size: .28rem;
		img {
			width: .4rem;
			height: .4rem;
		}
	}
	.swiper-container {
		margin-top: .8rem;
	}
	.bot_pices {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.isSelect {
		background-color: #E43448;
		color:white
	}
	.toCart {
		position: relative;
		p {
			position: absolute;
			text-align: center;
			top: -.2rem;
			right: -.2rem;
			background: @base_color;
			color: @theme_background;
			width: .4rem;
			height: .4rem;
			line-height: .4rem;
			border-radius: .8rem;
		}
	}
	.noSelect{
		background-color: black;
		color: white
	}
	.video {
		height: .6rem;
		display: flex;
		align-items: center;
		margin-left: .3rem;
	}
	.addCart-content {
		position: absolute;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding-top: .2rem;
		background: @base_color;
	}
	.swiper-slide img {
		width: 100%;
		height: 100%;
		height: 3rem;
		display: table-cell;
	}
	.cartModel-text {
		width: 95%;
		padding: .2rem;
	}
	.cartClose {
		width: .4rem;
		height: .4rem;
	}
	.vejfew {
		background-color: #eee;
		width: 100%;
		height: .2rem;
	}
	.goodsOp {
		input {
			font-size: .24rem;
			border: none;
			width: .6rem;
			text-align: center;
		}
		img {
			width: .32rem;
			height: .32rem;
		}
	}
	.cartModel-bottom {
		padding: .2rem;
		font-size: .24rem;
		border-top: 1px solid #ccc;
		text-align: center;
	}
	.cartModel-addCart {
		background: @theme_background;
		height: .8rem;
		color: @base_color;
		line-height: .8rem;
		font-size: .28rem;
		text-align: center;
	}
</style>
