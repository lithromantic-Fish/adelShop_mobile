<template>
	<div>
		<div class="page">
			<headersec :tabname="goodsDetail.gg_name" ref="noback"></headersec>
			<transition :name="slidename">
				<div class="container">
					<!-- 轮播图 -->
					<div class="swiper-container" style="margin-top:0" v-show="isHavePic">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="bannerItem in goodsDetail.picPaths">
								<img :src="bannerItem" />
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
					<div v-show="!isHavePic">
						<img style="    width: 100%; height: 5.5rem;" src="../../../static/img/github.png" />
					</div>
					<div>
						<div class="detail-content">
							<div class="wrap_pice">
								<div>
									<p class="goods-price">¥{{goodsDetail.gg_price}}</p>
								</div>
								<div style="display:flex">
									<div class="roboting">
										<p style="font-size:.28rem">抢购中</p>
									</div>
									<div class="getflex">
										<p class="p_time">{{hour_time}}</p>
										<p style="color:black">:</p>
										<p class="p_time">{{minuter_time}}</p>
										<p style="color:black">:</p>
										<p class="p_time">{{seconder_time}}</p>
										<p>后结束</p>
									</div>
								</div>
							</div>
							<div class="bot_pices">
								<div>
									<p style="font-size:.28rem">{{goodsDetail.goods_name}}</p>
								</div>
								<div class="keepshop">
									<p v-if="yesNone">仅限购100件，每用户限1件</p>
								</div>
							</div>
						</div>
					</div>
					<div class="vejfew"></div>
					<div>
						<div class="address_wrap">
							<div class="egfqgq">
								<div>
									<img class="img_address" src="../../../static/img/ade_shop/my_ico_address.png" alt="">
								</div>
								<div v-show="noDefault">
									<p>请选择一个收货地址</p>
								</div>
								<div v-show="!noDefault" class="wrap_hang" v-model="default_address">
									<p>收货人：</p>
									<p>{{default_address.trueName}}</p>&nbsp;&nbsp;
									<p>地址：</p>
									<p class="arer_aaa">{{default_address.area_name}}</p>&nbsp;
									<!-- <p class="gets">{{default_address.detail_address}}</p>&nbsp;  -->
								</div>
								<p v-show="haveMore" @click="tomore">展开</p>
								<p v-show="!haveMore" @click="tomore">收起</p>
							</div>
							<div v-show="!haveMore" class="wrap_aItem">
								<div class="address-item" v-for="addressItem in addressList.addressList" @click="onChooseAddress(addressItem)">
									<div class="address_wrap1">
										<div class="adderss_up">
											<div class="address_child">
												<div style="display:flex">
													<p>{{addressItem.trueName}}</P>
													<p style="margin-left:.5rem">{{addressItem.mobile}}</p>
												</div>
												<div>
													<div class="address_tab" v-show="addressItem.label=='家'">
														<p style="font-size:.26rem">家</p>
													</div>
													<div class="address_tab1" v-show="addressItem.label=='公司'">
														<p style="font-size:.26rem">公司</p>
													</div>
													<div class="address_tab1" v-show="addressItem.label=='其他'">
														<p style="font-size:.26rem">其他</p>
													</div>
												</div>
												<div class="flex_address">
													<div v-show="addressItem.is_default==1" class="default_add">
														<p>默认地址</p>
													</div>
													<div v-show="addressItem.is_default!=1">
													</div>
												</div>
											</div>
											<div class="addd">
												<p>{{addressItem.area_name}}</p>
												<p class="gets" style="margin-left: .2rem;">{{addressItem.detail_address}}</p>
											</div>
										</div>
										<!-- <p>{{addressItem}}</p> -->
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="vejfew"></div>
					<div class="address_wrap1">
						<p>商品规格
						</p>
						<p v-show="haveMore_gg" @click="tomore_gg">收起</p>
						<p v-show="!haveMore_gg" @click="tomore_gg">展开</p>
					</div>
					<div v-show="specIsNull&&haveMore_gg" class="noData">
						<p>没有数据可以加载</p>
					</div>
					<div v-for="(item,Oidx) in spec" v-show="haveMore_gg&&!specIsNull">
						<p class="out_class">{{item.spec_name}}</p>
						<div style="display:flex">
							<div v-for="(inItem,Iidx) in item.pros">
								<p class="pro_class" :class="inItem.active?'isSelect':''" @click="proItem(Oidx,Iidx)">{{inItem.pro_value}}</p>
							</div>
						</div>
					</div>
					<div class="vejfew"></div>
					<div class="address_wrap1">
						<p>
							相关商品
						</p>
						<p v-show="haveMore_com" @click="tomore_com">收起</p>
						<p v-show="!haveMore_com" @click="tomore_com">展开</p>
					</div>
					<div v-show="isNull&&haveMore_com" class="noData">
						<p>没有数据可以加载</p>
					</div>
					<div v-show="!isNull&&haveMore_com" v-for="complexList_item in complexList">
						<div style="    display: flex;">
							<img style="padding:.2rem" :src="complexList_item.goods_image_path">
							<div style="    display: flex;flex-direction: column;padding:0 .3rem;justify-content: center;">
								<p style="font-size:.26rem">{{complexList_item.goods_name}}</p>
								<div style="display:flex;align-items:center;padding-top:.1rem">
									<p style="font-size:.24rem;color:red">{{complexList_item.goods_price}}</p>
									<p>元起</p>
								</div>
							</div>
						</div>
						<div class="vejfew"></div>
					</div>
					<div class="vejfew"></div>
				</div>
			</transition>
			<!-- <DetailTab style="margin-top: .65rem;" :urlRouter2="$route.path"></DetailTab> -->
			<div class="detail-bottom flex-align-center flex-around">
				<div class="toCart">
					<img src="../../../static/img/icon/cart_white.png" @click="toCart" />
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
					<div class="model-content addCart-content" @click.stop="addCartModel=true">
						<div class="cartModel-box flex">
							<div class="cartModel-img">
								<!-- <img :src="$store.state.goods.GoodsImage" /> -->
							</div>
							<div class="cartModel-text">
								<div class="flex-between">
									<p class="goods-name">{{goodsDetail.goods_name}}</p>
									<img src="../../../static/img/icon/close.png" class="cartClose" @click.stop="addCartModel=false" />
								</div>
								<p class="goods-price">¥{{goodsDetail.gg_price*goodsNum}}</p>
							</div>
						</div>
						<div class="cartModel-bottom flex-between">
							<p>购买数量</p>
							<div class="goodsOp flex">
								<img src="../../../static/img/icon/shop_cut.png" @click="onCutCart()" />
								<input type="text" :value="goodsNum" readonly="" />
								<img src="../../../static/img/icon/shop_add.png" @click="onAddCart()" />
							</div>
						</div>
						<div @click.stop="onBuy(goodsDetail)">
							<p class="cartModel-addCart" v-show="!isBuy">
								加入购物车
							</p>
							<p class="cartModel-addCart" v-show="isBuy">
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
	import MeScroll from '../../../static/js/mescroll.m.js';
	import Swiper from "../../../static/js/swiper.min.js";
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				haveMore_gg: true, //商品规格是否展开
				haveMore_com: false, //相关商品是否展开
				haveMore: true, //收货地址是否展开
				goodsNum: 1, //购买数量
				addCartModel: false,
				isBuy: true, //是加入购物车还是立即购买
				havePage: false, //是否有数据
				cartLength: '',
				cartNum: false,
				slidename: 'slide-go', //滑动属性
				// goodsOut: {},//
				goodsDetail: {},
				goodMs: {},
				goodMsOut: {},
				yesNone: true, //商品是否被当前登录用户收藏过
				hour_time: 0, //倒计时小时
				minuter_time: 0, //倒计时分钟
				seconder_time: 0, //倒计时秒
				needTime: 0, //倒计时需要时间
				default_address: {}, //默认地址
				addressList: [], //地址列表
				gg_id: null, //传过来的秒杀商品的id
				isNull: false, //相关商品是否有数据
				spec: [], //商品规格
				complexList: [], //相关商品列表
				mescroll: null, //分页加载对象
				isHavePic: false, //是否有轮播图片
				specIsNull: false, //是否有规格
				haveDefault: [], //是否有默认地址（arr）
				noDefault: false, //是否有默认地址（bloon）
				haveSelectSpec: [], //选择的规格
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
			var self = this;
			this.$refs.noback.isBack_detail = false;
			this.getGoodsDetail();
			this.getAddressList();
			this.getComplexDetail();
			this.GLOBAL.token = this.$route.query.id
			if (this.$store.state.carts != undefined) {
				this.cartLength = this.$store.state.carts.length;
			}
			/*拿到路由跳转的id*/
			const id = this.$route.query.id;
			const item = this.$route.query.item
			const gg_id = this.$route.query.gg_id
			this.gg_id = gg_id
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
			proItem(Oidx, Iidx) {
				console.log('Oidx', Oidx);
				console.log('Iidx', Iidx);
				console.log(' this.goodsDetail.specs', this.goodsDetail.specs);
				console.log('goodsDetail', this.goodsDetail.specs[Oidx].pros); //当前选择的数组
				var Iitem = this.goodsDetail.specs[Oidx].pros
				//每次点击所有的按钮初始化
				for (var i = 0; i < Iitem.length; i++) {
					Iitem[i].active = false
				}
				//设置当前的选中状态
				Iitem[Iidx].active = true
				if (Iitem[Iidx].active) {
					console.log('pro_id', Iitem[Iidx].pro_id, Iitem[Iidx].pro_value);
					this.haveSelectSpec.push(Iitem[Iidx].pro_id)
				}
					console.log('this.haveSelectSpec', this.haveSelectSpec);
				
				console.log('Iitem[Iidx]', Iitem[Iidx]);
			},
			// proItem2(item, idx) {
			// 	this.theNum2 = idx
			// },
			/**获取收货地址 */
			getAddressList() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/getAddress.htm")
					.then(function(res) {
						that.havePage = false
						that.addressList = res.data.data
						that.addressList.addressList.forEach(ele => {
							if (ele.is_default == 1) {
								that.default_address = ele
							} else {
								that.haveDefault.push(ele.is_default)
								if (!that.haveDefault.includes('1')) {
									console.log('没有默认地址');
									that.noDefault = true
								} else {
									that.noDefault = false
								}
							}
						})
					})
					.catch(function(error) {});
			},
			tomore() {
				this.haveMore = !this.haveMore
			},
			tomore_gg() {
				this.haveMore_gg = !this.haveMore_gg
			},
			tomore_com() {
				this.haveMore_com = !this.haveMore_com
			},
			// 相关商品列表
			getComplexDetail() {
				const gg_id = this.$route.query.gg_id
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/search.htm?gc_id=" + gg_id)
					.then(function(res) {
						if (res.data.data == null) {
							that.isNull = true
						} else {
							that.complexList = res.data.data.goodsList
						}
					})
					.catch(function(error) {});
			},
			/*进入商品详情*/
			getGoodsDetail() {
				const that = this
				const goods_id = this.$route.query.id
				const item = this.$route.query.item
				this.$http
					.get("/myapi/adel-shop/app/flashSaleDetail.htm?id=" + goods_id)
					.then(function(res) {
						that.spec = res.data.data.specs
						that.goodsDetail = res.data.data
						setTimeout(() => {
							const swiper = new Swiper(".swiper-container", {
								pagination: ".swiper-pagination",
								paginationClickable: true,
								spaceBetween: 30,
								autoplay: 1500,
								effect: "fade"
							});
						}, 200);
						console.log('res.data.data.picPaths', res.data.data.picPaths);
						if (res.data.data.picPaths.length != 0) {
							that.isHavePic = true
							console.log('有图片');
						} else {
							that.isHavePic = false
							console.log('没有图片');
						}
						if (res.data.data.specs.length == 0) {
							that.specIsNull = true
						} else {
							that.specIsNull = false
						}
						var clotime = Number(new Date(res.data.data.closeTime)) / 1000;
						var currentTime = Number(new Date(res.data.data.currentTime)) / 1000;
						that.needTime = clotime - currentTime
						that.getMyTime(that.needTime);
						if (that.goodsDetail.is_collect == 0) {
							that.yesNone = true
						} else {
							that.yesNone = false
						}
					})
					.catch(function(error) {});
				// }
			},
			getMyTime(needTime) {
				const that = this
				function countDown(times) {
					var timer = null;
					timer = setInterval(function() {
						var day = 0,
							hour = 0,
							minute = 0,
							second = 0; //时间默认值
						if (times > 0) {
							day = Math.floor(times / (60 * 60 * 24));
							hour = Math.floor(times / (60 * 60)) - (day * 24);
							minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
							second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
						}
						if (day <= 9) day = '0' + day;
						if (hour <= 9) hour = '0' + hour;
						if (minute <= 9) minute = '0' + minute;
						if (second <= 9) second = '0' + second;
						that.day_time = day;
						that.hour_time = hour;
						that.minuter_time = minute;
						that.seconder_time = second;
						times--;
					}, 1000);
					if (times <= 0) {
						clearInterval(timer);
					}
				}
				countDown(that.needTime)
			},
			toCart() {
				this.$router.push('./cart');
			},
			onCartModel() {
				this.addCartModel = true;
				this.isBuy = false;
			},
			// onMSBuy(item) {
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
			onBuy(item) {
				const that = this;
				if (item.specs[0]) {
					// 有规格的商品添加到购物车
					that.getMoreCar(item);
				} else {
					// 无规格的商品添加到购物车
					that.getGoodsToCar(item)
				}
				if (this.isBuy) {
					let orderArr = [];
					orderArr.push(this.$store.state.goods)
					this.setOrders(orderArr);
					this.$router.push('./orderwait')
				} else {
					if (!this.cartNum) {
						this.goodsNum = 1
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
			onChooseAddress(item) {
				this.default_address = item
				this.noDefault = false
				// if (this.$store.state.ischoose == 1) {
				// 	this.setChooseaddress(item);
				// 	this.setIschoose(2);
				// 	var default_address1 = JSON.stringify(this.$store.state.chooseaddress);
				// 	localStorage.setItem('default_address', default_address1);
				// }
			},
			//添加有规格的商品到购物车
			getMoreCar(item) {
				const that = this
				 var specID = this.haveSelectSpec.join()
				this.$http
					.get("/myapi/adel-shop/app/auth/addCart.htm?goodsId=" + item.goods_id + '&count=' + that.goodsNum + '&proIds=' + specID)
					.then(function(res) {})
					.catch(function(error) {});
			},
			// 添加商品到购物车
			getGoodsToCar(item) {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/addCart.htm?goodsId=" + item.goods_id + '&count=' + that.goodsNum)
					.then(function(res) {})
					.catch(function(error) {});
			},
			//添加有规格的商品到购物车
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
	@import '../../../static/css/mescroll.min.css';
	.detial {
		padding-top: .8rem;
		padding-bottom: .88rem;
	}
	.active {
		background-color: red!important
	}
	.arer_aaa {
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		white-space: nowrap;
		width: 5.5rem;
	}
	.out_class {
		padding: 0 .2rem;
		font-size: .24rem;
	}
	.goodsImg {
		width: 100%;
		height: 5rem;
	}
	.egfqgq {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.default_add {
		color: white;
		background-color: #CD0000;
		border-radius: .08rem;
		width: 1.2rem;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.address_wrap {
		flex-direction: column;
		display: flex;
		align-items: center;
		font-size: .26rem;
		color: #7D7D7D;
		padding: .2rem;
	}
	.address_wrap1 {
		display: flex;
		align-items: center;
		font-size: .26rem;
		color: #7D7D7D;
		padding: .2rem;
		justify-content: space-between;
	}
	.wrap_hang {
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		white-space: nowrap;
		width: 5.5rem;
	}
	.img_address {
		width: .4rem;
		height: .4rem;
		padding-right: .2rem;
	}
	.item_spec {
		padding: 0 .4rem;
		font-size: .24rem;
	}
	.address_tab {
		color: white;
		background-color: #CD661D;
		border-radius: .08rem;
		width: .4rem;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.address_tab1 {
		color: white;
		background-color: #CD661D;
		border-radius: .08rem;
		width: .8rem;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.keepshop {
		font-size: 0.28rem;
		background-color: #E43448;
		color: white;
		width: 3.8rem;
		height: .45rem;
		border-radius: .1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: .2rem 0;
	}
	.pro_class {
		width: .8rem;
		background-color: #EAEAEA;
		height: .4rem;
		justify-content: center;
		align-items: center;
		display: flex;
		color: #636363;
		margin: .2rem;
	}
	.isSelect {
		background-color: #E43448;
		color: white
	}
	.noSelect {}
	.address-item {
		justify-content: center;
		display: flex;
		border-bottom: 1px solid #8B8878;
	}
	.wrap_aItem {
		border: 1px solid #515151;
		border-radius: 15px;
		width: 100%;
	}
	.getflex {
		display: flex;
		align-items: center;
		font-size: 0.24rem;
	}
	.wrap_pice {
		display: flex;
		justify-content: space-between;
		align-items: center
	}
	.addd {
		display: flex;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 5rem;
	}
	.roboting {
		background-color: #E43448;
		color: white;
		width: 1rem;
		height: .4rem;
		border-radius: .1rem;
		display: flex;
		justify-content: center; // align-items: center;
	}
	.goods-name {
		width: 6.2rem
	}
	.detail-content {
		padding: .2rem .3rem 0 .3rem;
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
	.address_child {
		display: flex;
		justify-content: space-between;
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
	.noData {
		width: 100%;
		height: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .26rem;
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
	.video {
		height: .6rem;
		display: flex;
		align-items: center;
		margin-left: .3rem;
	}
	.p_time {
		height: .35rem;
		width: .35rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: .1rem;
		margin-right: .1rem;
		border-radius: .05rem;
		background-color: #fff;
		background-color: #eee;
		padding: .05rem;
	}
	.gets {
		overflow: hidden;
		text-overflow: ellipsis;
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
		height: 5.5rem
	}
	.cartModel-text {
		width: 100%;
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
	.bot_pices {
		display: flex;
		flex-direction: column
	}
</style>
