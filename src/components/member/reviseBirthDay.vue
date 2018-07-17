<template>
	<div>
		<headersec tabname="修改生日" ref="noback"></headersec>
		<!-- <form  method="post" action="/myapi/adel-shop/app/auth/uploadAvatar.htm"  enctype="multipart/form-data" style="margin-top:1rem">
				<input type="file" name="fileUpload" class="p_f" />
				<input type="submit" id="submit" value="上传文件" class="p_f"  />
			</form> -->
		<DatePickers ></DatePickers>
		<div class="btn_div">
			<button class="btn_save" @click="saveNickname">保存</button>
		</div>
	</div>
</template>
<script>
	import Headersec from '../base/HeaderSec.vue';
	import DatePickers from '../base/DatePickers.vue'
	export default {
		components: {
			Headersec,
			DatePickers
		},
		mounted() {
			console.log('tabname',typeof(this.$store.state.birthday) );

				
		},
		methods: {
				saveNickname() {
				const that = this
				this.$http.post('/myapi/adel-shop/app/auth/updateUser.htm?birthday='+that.$store.state.birthday)
					.then(function(res) {
				
					})
					.catch((error) => {
						console.error(error);
					})
			}
		}
	}
</script>
<style>
	.container_div {
		display: flex;
		height: 2rem;
		justify-content: center;
	}
	.p_f {
		font-size: .3rem
	}
	* { touch-action: none; } 
	.input {
		margin-top: 1.2rem;
		width: 80%;
		height: .6rem;
		border-bottom: 1px solid;
		border-radius: .5rem;
		/* color: green; */
		outline: none;
		font-size: .3rem;
		border-right: 1px solid;
	}
	.btn_div {
		display: flex;
		justify-content: center;
	}
	.btn_save {
		width: 80%;
		height: .7rem;
		font-size: .3rem;
		border-radius: .5rem;
		color: white;
		background-color: #E43448;
		outline: none;
		margin-top: .5rem;
	}
</style>

