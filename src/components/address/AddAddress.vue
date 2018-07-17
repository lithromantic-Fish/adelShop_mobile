<template>
	<div class="page">
		<headersec tabname="增加收货地址"></headersec>
		<transition :name="slidename">
			<div class="container" v-show="mainarea">
				<div style="display:flex ;" class="item_address">
					<p class="p_shr">收货人：</p> <input v-model="name" class="input_shr" />
				</div>
				<div style="display:flex" class="item_address">
					<p class="p_shr">手机号码：</p> <input v-model="telNum" class="input_shr" />
				</div>
				<div style="display:flex" class="item_address">
					<p class="p_shr">所在地区</p>
					<input class="input_shr" id="area" type="text" placeholder="选择地区" :value="addressText" readonly="" @click="addressModel = true" />
				</div>
				<div style="display:flex" class="item_address">
					<p class="p_shr">详细地址：</p> <input v-model='address' type="text" placeholder="街道，楼牌号" class="input_shr" />
				</div>
				<!-- <div style="display:flex" class="item_address">
					<p class="p_shr">{{myname}}</p> <input v-model="aa" class="input_shr" />
				</div>
				<div>
					<button class="btn_code" @click="input_txt">邮编</button>
				</div> -->
				<div style="display:flex;height: 1rem; " class="item_address">
					<p class="p_shr2">标签：</p>
					<div class="tab_address">
						<p class="p_shr1" v-show="home" @click="tohome">家</p>
						<p class="p_shr_activity" v-show="!home" @click="backhome">家</p>
						<p class="p_shr1" v-show="company" @click="tocompany">公司</p>
						<p class="p_shr_activity" v-show="!company" @click="backcompany">公司</p>
						<p class="p_shr1" v-show="other" @click="toother">其他</p>
						<p class="p_shr_activity" v-show="!other" @click="backother">其他</p>
					</div>
				</div>
				<div class="address item_address" style="display:flex">
					<input class="input_adress" type="checkbox" v-model="default_address" />
					<p style=" margin-left: .2rem;">设为默认地址</p>
				</div>
				<div class="model" v-show="addressModel" @click="addressModel = false">
					<div class="model-content" @click.stop="addressModel = true">
						<div class="addressBox">
							<ul>
								<li v-for="(provinceItem,provinceIndex) in addressList" @click.stop="onProvinceSelect(provinceIndex,provinceItem.area_name)" :class="{active: provinceIndex === activeProvince}">
									<span>{{provinceItem.area_name}}</span>
									<div class="cityBox">
										<ul>
											<li v-for="(cityItem,cityIndex) in provinceItem.children" @click.stop="onCitySelect(cityIndex,cityItem.area_name)" :class="{active: cityIndex === activeCity}">
												<span>{{cityItem.area_name}}</span>
												<div class="areaBox">
													<ul>
														<li v-for="(areaItem,areaIndex) in cityItem.children" @click.stop="onAreaSelect(areaIndex,areaItem.area_name)" :class="{active: areaIndex == activeArea}">
															<span>{{areaItem.area_name}}</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<div class="pageBottom" @click="onSave(allAddressInfo)">
			<span class="tabbar-label">保存</span>
		</div>
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import init_city_picker from '../../../static/js/data.city.js';
	import bus from '../base/bus.js'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				addressModel: false,
				addressList: [],
				province: '',
				city: '',
				area: '',
				addressText: '',
				activeProvince: 0,
				activeCity: 0,
				activeArea: 0,
				mainarea: false,
				slidename: 'slide-go',
				test: '测试数据',
				home: true,
				company: true,
				other: true,
				name: '',
				telNum: '',
				code: '',
				address: '',
				province_obj: {},
				city_obj: {},
				area_obj: {},
				label: "",
				default_address: false,
				isDefault: null,
				allAddressInfo: {},
				getArea: 0,
				aa: '',
				cat:{}
			}
		},
		components: {
			Headersec
		},
		computed: {
			...mapGetters([
				'this.$store.state.comname'
			]),
			myname() {
				return this.$store.state.address
			}
		},
		mounted() {
			const that = this;
			this.getAddressInfo();
			that.mainarea = true;
			this.setComname('addressadd');
				console.log('localStorage.getItem("myAdress")',localStorage.getItem("myAdress"));
				that.cat = 	JSON.parse(localStorage.getItem("myAdress"));
			if (that.cat) {
				this.editAddr(that.cat);
			}
		},
		methods: {
			tohome() {
				this.home = false
				if (!this.home) {
					this.company = true
					this.other = true
				}
			},
			editAddr(item) {
				// 点击编辑按钮时将页面中的值弄出来
				console.log('id', item);
				this.name = item.trueName
				this.telNum = item.mobile
				this.addressText = item.area_name
				this.address = item.detail_address
				if (item.is_default == 1) {
					this.default_address = true
				} else {
					this.default_address = false
				}
				this.label = item.label
				if (item.label == '家') {
					this.home = false
				} else if (item.label == '公司') {
					this.company = false
				} else if (item.label == '其他') {
					this.other = false
				}
				console.log('id', item);
				const areaId = item.area_id.split(',')[2]
				this.allAddressInfo = {
					name: item.trueName,
					telNum: item.mobile,
					addressArea: item.area_name,
					address: item.detail_address,
					addressId: item.address_id,
					areaId: areaId,
					isDefault: item.is_default,
					label: item.label
				}
				// this.editAddress(item);
				// this.$http.post('/myapi/adel-shop/app/auth/saveAddress.htm?addressId='+item.address_id)
				// 	.then(function(res) {})
				// 	.catch(function(error) {});
			},
			backhome() {
				this.home = true
			},
			tocompany() {
				this.company = false
				if (!this.company) {
					this.home = true
					this.other = true
				}
			},
			backcompany() {
				this.company = true
			},
			toother() {
				this.other = false
				if (!this.other) {
					this.home = true
					this.company = true
				}
			},
			backother() {
				this.other = true
			},
			input_txt() {
				this.$store.state.address = this.aa
				// console.log('this.$store.state.address',this.$store.state.address);
			},
			// 添加地址
			addAddress: function() {
				console.log('请求新增的api');
				this.$http.post('/myapi/adel-shop/app/auth/saveAddress.htm?trueName=' + this.name + '&areaId=' + this.area_obj.id + '&detailAddress=' + this.address + '&mobile=' + this.telNum + '&label=' + this.label + '&isDefault=' + this.isDefault)
					.then(function(res) {})
					.catch(function(error) {});
			},
			// 编辑地址
			editAddress: function(item) {
				// console.log('new',that.addressText,that.name, item.areaId, that.address , that.telNum + '&label=' + that.label + '&isDefault=' + that.isDefault);
				console.log('that.getArea', this.area_obj);
				if (this.area_obj.id) {
					this.$http.post('/myapi/adel-shop/app/auth/saveAddress.htm?trueName=' + this.name + '&areaId=' + this.area_obj.id + '&detailAddress=' + this.address + '&mobile=' + this.telNum + '&label=' + this.label + '&isDefault=' + this.isDefault + '&addressId=' + item.addressId)
						.then(function(res) {
							console.log('this.addressText', this.addressText);
						})
						.catch(function(error) {});
				} else {
					this.$http.post('/myapi/adel-shop/app/auth/saveAddress.htm?trueName=' + this.name + '&areaId=' + item.areaId + '&detailAddress=' + this.address + '&mobile=' + this.telNum + '&label=' + this.label + '&isDefault=' + this.isDefault + '&addressId=' + item.addressId)
						.then(function(res) {
							console.log('this.addressText', this.addressText);
						})
						.catch(function(error) {});
				}
				// this.$http.post('/myapi/adel-shop/app/auth/saveAddress.htm?trueName=' + this.name + '&areaId=' +  item.areaId + '&detailAddress=' + this.address + '&mobile=' + this.telNum + '&label=' + this.label + '&isDefault=' + this.isDefault + '&addressId=' + item.addressId)
				// 	.then(function(res) {
				// 		console.log(this.addressText);
				// 	})
				// 	.catch(function(error) {});
			},
			// 获取所有省份的地址
			getAddressInfo: function() {
				const that = this
				this.$http.post('/myapi/adel-shop/app/getAllArea.htm')
					.then(function(res) {
						that.addressList = res.data.data.result;
					})
					.catch(function(error) {});
			},
			/*选择省份*/
			onProvinceSelect: function(index, item) {
				var that = this;
				that.activeProvince = index;
				that.province = item;
				that.addressText = that.province;
				that.province_obj = that.addressList[index]
				that.getArea += that.getArea
			},
			/*选择城市*/
			onCitySelect: function(index, item) {
				var that = this;
				that.activeCity = index;
				that.city = item
				that.addressText = that.province + " " + that.city;
				that.city_obj = that.province_obj.children[index]
				that.getArea += that.getArea
			},
			/*选择区域*/
			onAreaSelect: function(index, item) {
				var that = this;
				that.activeArea = index;
				that.area = item
				that.area_obj = that.city_obj.children[index]
				that.addressText = that.province + " " + that.city + " " + that.area;
				that.addressModel = false;
				that.getArea += that.getArea
			},
			changeActivity() {
				this.isActive = true
			},
			/*保存地址*/
			onSave(item) {
				// 如果是编辑过来跳转过来的
				if (this.cat) {
					if (this.default_address) {
						this.isDefault = 1
					} else {
						this.isDefault = 0
					}
						if (!this.home) {
						this.label = '家'
					} else if (!this.company) {
						this.label = '公司'
					} else if (!this.other) {
						this.label = '其他'
					}
					this.editAddress(item);
					this.$router.back();
				} else {
					if (this.default_address) {
						this.isDefault = 1
					} else {
						this.isDefault = 0
					}
					if (!this.home) {
						this.label = '家'
					} else if (!this.company) {
						this.label = '公司'
					} else if (!this.other) {
						this.label = '其他'
					}
					this.addAddress()
					this.$router.back();
				}
			},
			...mapMutations({
				setAddress: 'SET_ADDRESS',
				setComname: 'SET_COMNAME',
			})
		},
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.addressBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5.1rem;
		z-index: 9;
		background: #f5f5f5;
		display: block!important;
	}
	.address {
		display: flex;
		align-items: center;
		font-size: 0.32rem;
	}
	.input_adress {
		width: .3rem;
		height: .25rem;
	}
	.p_shr_activity {
		display: flex;
		align-items: center;
		height: .4rem;
		font-size: 0.22rem;
		width: .8rem;
		justify-content: center;
		border-radius: 10px;
		background-color: brown;
		color: #fff
	}
	.addressBox ul {
		width: 33%;
		height: 5.1rem;
		background: @base_color;
		overflow-y: scroll;
		overflow-x: auto;
	}
	.addressBox li {
		font-size: .24rem;
		height: 0.62rem;
		line-height: 0.62rem;
		color: @base_textColor;
		text-align: left;
		padding-left: .5rem;
	}
	.p_shr2 {
		font-size: .32rem;
		width: 1.83rem;
	}
	.btn_code {
		width: 1rem;
		height: .5rem;
		font-size: .26rem
	}
	.cityBox {
		position: absolute;
		top: 0;
		left: 33%;
		width: 100%;
		height: 5.1rem;
		display: none;
		overflow-y: scroll;
		z-index: 19;
		-webkit-overflow-scrolling: touch;
		overflow-x: auto;
	}
	.p_shr {
		font-size: .32rem;
		width: 3rem;
	}
	.tab_address {
		display: flex;
		width: 4rem;
		align-items: center;
		justify-content: space-around;
	}
	.cityBox ul {
		width: 100%;
		height: 5.1rem;
	}
	.cityBox li {
		padding-left: 0.17rem;
		text-align: left;
		border-bottom: 0.01rem solid #e6e6e6;
	}
	.areaBox {
		position: absolute;
		top: 0;
		left: 33%;
		width: 33%;
		height: 5.1rem;
		display: none;
		overflow-y: scroll;
		z-index: 9999;
		-webkit-overflow-scrolling: touch;
	}
	.p_shr1 {
		display: flex;
		align-items: center;
		height: .4rem;
		font-size: 0.22rem;
		width: .8rem;
		justify-content: center;
		border-radius: 10px;
		background-color: #eee;
	}
	.item_address {
		margin-top: .3rem
	}
	.model-content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: .15rem;
		margin: auto;
		background-color: #ffffff;
		text-align: center;
	}
	.input_shr {
		width: 100%;
		font-size: 0.32rem;
		border: 1px solid #ccc;
		outline: none;
	}
	.input_address {
		font-size: 0.32rem;
		width: 100%;
		text-align: center;
		margin-top: .3rem;
		border: 1px solid #ccc;
	}
	/*点击省份，出现城市*/
	.addressBox .active {
		background: @theme_background;
		color: @base_color;
	}
	.addressBox .active .cityBox {
		display: block;
	}
	.container {
		margin-left: .2rem;
		margin-top: .2rem;
	}
	/*点击城市，出现区域*/
	.cityBox .active {
		background: @theme_background;
	}
	.cityBox .active .areaBox {
		display: block;
	}
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
</style>
