<template>
	<div class="page">
		<headersec tabname="个人信息"></headersec>
		<div class="avator" @click="toAvator">
			<p style="    font-size: 0.26rem;">头像</p>
			<img class="img_avator" :src="memberInfo.user_avatar">
			<!-- <form action="UploadFile.ashx" method="post" enctype="multipart/form-data">
					<input type="file" name="fileUpload" />
					<input type="submit" value="上传文件" />
				</form> -->
		</div>
		<div class="avator1">
			<div>
				<p style="    font-size: 0.26rem;">用户名</p>
			</div>
			<div class="getRight" @click="toUserName">
				<p style="    font-size: 0.26rem;">{{memberInfo.userName}}</p>
				<img src="../../../static/img/icon/arrowRight.png" alt="">
			</div>
		</div>
		<div class="avator1">
			<div>
				<p style="    font-size: 0.26rem;">昵称</p>
			</div>
			<div class="getRight" @click="toNickName">
				<p style="    font-size: 0.26rem;">{{memberInfo.nickname}}</p>
				<img src="../../../static/img/icon/arrowRight.png" alt="">
			</div>
		</div>
		<div class="avator1">
			<div>
				<p style="    font-size: 0.26rem;">真实姓名</p>
			</div>
			<div class="getRight" @click="toTrueName">
				<p style="    font-size: 0.26rem;">{{memberInfo.trueName}}</p>
				<img src="../../../static/img/icon/arrowRight.png" alt="">
			</div>
		</div>
		<div class="avator1">
			<div>
				<p style="    font-size: 0.26rem;">生日</p>
			</div>
			<div class="getRight" @click="toBirthDay">
				<p style="    font-size: 0.26rem;">{{memberInfo.birthday}}</p>
				<img src="../../../static/img/icon/arrowRight.png" alt="">
				<!-- <date-picker field="myDate" placeholder="选择日期" v-model="date" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker> -->
			</div>
		</div>
		<div class="avator1">
			<div>
				<p style="    font-size: 0.26rem;">电子邮件</p>
			</div>
			<div class="getRight" @click="toEMail">
				<p style="    font-size: 0.26rem;">{{memberInfo.email}}</p>
				<img src="../../../static/img/icon/arrowRight.png" alt="">
			</div>
		</div>
		<div class="avator1">
			<div>
				<p style="    font-size: 0.26rem;">性别</p>
			</div>
			<div class="getRight" @click="toSex(memberInfo.sex)">
				<p v-show="memberInfo.sex==0" style="    font-size: 0.26rem;">女</p>
				<p v-show="!memberInfo.sex==0" style="    font-size: 0.26rem;">男</p>
				<img src="../../../static/img/icon/arrowRight.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	// import 'babel-polyfill'; //因为使用了es6的一些方法，需要babel垫片，如果你项目中已有相关兼容性方案，可忽略
	import Vue from 'vue';
	// import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'; //引入对应的组件
	export default {
		data() {
			return {
				memberInfo: {},
				birthdayYes: false,
				date: ''
			}
		},
		components: {
			Headersec,
			// 'date-picker': myDatepicker
		},
		mounted() {
			this.getInfomation();
		},
		methods: {
			getInfomation() {
				const that = this
				this.$http.get('/myapi/adel-shop/app/auth/getUserInfo.htm')
					.then(function(res) {
						that.memberInfo = res.data.data
						console.log('that.memberUIngf', that.memberInfo)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			// 点击上传头像
			uploadAvator() {
				const that = this
				this.$http.post('/myapi/adel-shop/app/auth/uploadAvatar.htm')
					.then(function(res) {})
					.catch(function(error) {
						console.log(error);
					});
			},
			toAvator() {
				this.$router.push("./reviseAvator")
			},
			toUserName() {
				this.$router.push("./reviseUserName")
			},
			toNickName() {
				this.$router.push("./reviseNickName")
			},
			toTrueName() {
				this.$router.push("./reviseTrueName")
			},
			toBirthDay() {
				this.$router.push("./reviseBirthDay")
			},
			toEMail() {
				this.$router.push("./reviseEMail")
			},
			toSex(sex) {
				this.$router.push({
					path: "/reviseSex",
					query: {
						sex: sex,
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		text-align: center;
		img {
			margin-top: .3rem;
			border-radius: 1rem;
			width: 1rem;
			height: 1rem;
		}
		p {
			margin-top: .3rem;
			font-size: .28rem;
		}
	}
	.getRight {
		display: flex;
		align-items: center
	}
	.img_avator {
		width: 1rem;
		height: 1rem;
		border-radius: 1rem;
	}
	.avator {
		margin-top: .8rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.01rem solid #eee;
		height: 1.2rem;
		padding: 0 .2rem;
	}
	.avator1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.01rem solid #eee;
		height: 1.2rem;
		padding: 0 .2rem;
	}
</style>
