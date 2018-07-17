<template>
	<div class="page">
		<headersec tabname="我的地址"></headersec>
		<transition :name="slidename">
			<div class="container myadress" v-show="mainarea">
				<div v-show="havePage" class="address_nopage">
					<p>暂无收货地址，请添加</p>
				</div>
				<div v-show="!havePage">
					<div class="address-item" v-for="addressItem in addressList.addressList" @click="onChooseAddress(addressItem)">
						<div class="address_wrap">
							<div class="adderss_up">
								<div class="address_child">
									<div style="display:flex">
										<p>{{addressItem.trueName}}</P>
										<p style="margin-left:.5rem">{{addressItem.mobile}}</p>
									</div>
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
								<div class="addd">
									<p>{{addressItem.area_name}}</p>
									<p style="margin-left: .2rem;">{{addressItem.detail_address}}</p>
								</div>
							</div>
							<!-- <p>{{addressItem}}</p> -->
						</div>
						<div class="flex_address">
							<div v-show="addressItem.is_default==1">
								<p>默认地址</p>
							</div>
							<div v-show="addressItem.is_default!=1">
							</div>
							<div class="flex_edio">
								<p style="    margin-right: .5rem;" @click="editAddress(addressItem)">编辑</p>
								<p @click="deleteAddress(addressItem)">删除</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div class="pageBottom" @click="onAddAddress">
			<span class="tabbar-label">新增地址</span>
		</div>
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	// import bus from '../base/bus.js'
	// import "../../../static/css/amazeui.min.css";
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				havePage: false,
				mainarea: false,
				slidename: 'slide-go',
				addressList: [],
				default_address: {}
				// message:'a1'
			}
		},
		components: {
			Headersec,
			Nopage
		},
		computed: {
			...mapGetters([
				'this.$store.state.address',
				'this.$store.state.chooseaddress',
				'this.$store.state.ischoose',
				'this.$store.state.comname'
			])
		},
		mounted() {
			const that = this;
			that.mainarea = true;
			console.log('this.$store', this.$store)
			/*判断动画是进还是出*/
			if (this.$store.state.comname === 'addressadd') {
				this.slidename = 'slide-back';
			} else {
				this.slidename = 'slide-go'
			}
			this.setComname('address');
			this.getAddressList();
		},
		methods: {
			// 编辑地址
			editAddress(item) {
				console.log('item', item);
				this.$router.push({
					path: './AddAddress',
					query: {
						item: item
					}
				})
				var myAdress = JSON.stringify(item);
				localStorage.setItem('myAdress', myAdress);
			},
			/**获取收货地址 */
			getAddressList() {
				const that = this
				this.$http
					.get("/myapi/adel-shop/app/auth/getAddress.htm")
					.then(function(res) {
						if (res.data.data == null) {
							that.havePage = true
						} else {
							that.havePage = false
							that.addressList = res.data.data
							console.log('that.addressList', that.addressList);
							that.addressList.addressList.forEach(ele => {
								if (ele.is_default == 1) {
									console.log(ele);
									that.default_address = ele
								}
							})
							var default_address = JSON.stringify(that.default_address);
							localStorage.setItem('default_address', default_address);
						}
					})
					.catch(function(error) {});
			},
			// 删除地址
			deleteAddress: function(item) {
				console.log('this.item', item.address_id);
				const that = this
				this.$http.post('/myapi/adel-shop/app/auth/delAddress.htm?addressId=' + item.address_id)
					.then(function(res) {
						that.getAddressList()
					})
					.catch(function(error) {});
			},
			/*添加地址*/
			onAddAddress() {
				this.$router.push('./addaddress')
			},
			/*选择地址*/
			onChooseAddress(item) {
				if (this.$store.state.ischoose == 1) {
					this.setChooseaddress(item);
					this.$router.push('./orderwait');
					this.setIschoose(2);
					console.log('this.$store.state.chooseaddres', this.$store.state.chooseaddress);
					var default_address1 = JSON.stringify(this.$store.state.chooseaddress);
					localStorage.setItem('default_address', default_address1);
				}
			},
			...mapMutations({
				// 选择地址
				setChooseaddress: 'SET_CHOOSEADDRESS',
				// 判断是否选择地址
				setIschoose: 'SET_ISCHOOSE',
				// 组件名字
				setComname: 'SET_COMNAME'
			})
		},
	}
</script>




<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.pageBottom {
		position: fixed;
		bottom: 0;
		background: @theme_background;
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: @base_color;
		font-size: .28rem;
		text-align: center;
	}
	.address_nopage {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2rem;
		font-size: .3rem;
		background-color: #fff
	}
	.address_child {
		display: flex;
		justify-content: space-between;
		padding-top: .2rem;
	}
	.myadress {
		background-color: #eee
	}
	.adderss_up {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.address_tab {
		width: 0.5rem;
		height: 0.4rem;
		background-color: #F3B781;
		border-radius: 0.1rem;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-ms-flex-line-pack: center;
		align-content: center;
		p {
			color: white;
		}
	}
	.address_tab1 {
		width: .8rem;
		height: 0.4rem;
		background-color: #F3B781;
		border-radius: 0.1rem;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-ms-flex-line-pack: center;
		align-items: center;
		p {
			color: white;
		}
	}
	.flex_address {
		background-color: #FAFAFA;
		display: flex;
		align-items: center;
		flex-direction: row;
		padding-left: 0.5rem;
		padding-right: 0.2rem;
		height: 1.0rem;
		justify-content: space-between;
		p {
			font-size: 0.24rem
		}
	}
	.addd {
		display: flex;
		padding: .2rem 0;
	}
	.address_wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 1.5rem;
		padding-left: 0.5rem;
		padding-right: 0.2rem;
	}
	.flex_edio {
		display: flex;
	}
	.address-item {
		height: 2.5rem;
		margin-bottom: 0.25rem;
		/* line-height: 1.5rem; */
		font-size: .24rem;
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		display: flex;
		flex-direction: column; // align-items: center;
		justify-content: center;
	}
</style>
