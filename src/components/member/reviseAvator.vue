<template>
	<div>
		<headersec tabname="修改头像" ref="noback"></headersec>
		<div class="container_div">
			<!-- <form name="uploadForm" id="uploadForm" method="post" enctype="multipart/form-data" action="/myapi/adel-shop/app/auth/uploadAvatar.htm" target="uploadFrame">
				<p style="margin:10px 0;">上传图片: &nbsp;&nbsp;
					<input type="file" name="imageFile" ID="fupPhoto" />
					<input type="text" name="brand" ID="brand" />
					<input type="submit" id="fileSubmit" name="Submit" @click="commit" value="上传" />
					<iframe name="uploadFrame" id="uploadFrame" style="display:none;"></iframe>
				</p>
			</form> -->
			<form class="form_contianer" method="post" enctype="multipart/form-data">
				<input class="aa" type="file" name="fileUpload" accept="image/png,image/gif,image/jpeg" @change="update" />
				<!-- <input class="bb" type="submit" value="上传文件" /> -->
			</form>
		</div>
	</div>
</template>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"/>
<script>
	import Headersec from '../base/HeaderSec.vue';
	export default {
		components: {
			Headersec,
		},
		data() {
			return {}
		},
		mounted() {},
		methods: {
			// commit() {
			// 	var formID = document.getElementById('uploadForm')
			// 	var formData = new FormData();
			// 	formData.append('avatar', uploadForm[0].files[0]); /*获取上传的图片对象*/
			// 	$.ajax({
			// 		url: '/myapi/adel-shop/app/auth/uploadAvatar.htm',
			// 		type: 'POST',
			// 		data: formData,
			// 		contentType: false,
			// 		processData: false,
			// 	})
			// },
			update(e) {
				console.log('e', e);
				let file = e.target.files[0];
				let param = new FormData(); //创建form对象
				param.append('file', file, file.name); //通过append向form对象添加数据
				param.append('chunk', '0'); //添加form表单中其他数据
				console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}; //添加请求头
				this.$http.post('/myapi/adel-shop/app/auth/uploadAvatar.htm', param, config)
					.then(function(res) {})
					.catch((error) => {
						console.error(error);
					})
				// 	$.ajax({
				// 	url: '/myapi/adel-shop/app/auth/uploadAvatar.htm',
				// 	type: 'POST',
				// 	data: param,
				// 	contentType: false,
				// 	processData: false,
				// })
			}
			// aaa() {
			// 	$("#form1").ajaxSubmit({
			// 		cache: true,
			// 		type: "POST",
			// 		url: "tYwCjyCybfhbzhzbController.do?saveJcdw",
			// 		dataType: 'json',
			// 		async: false,
			// 		success: function(data) {}
			// 		//  this.$http
			// 		// .get("/myapi/adel-shop/app/auth/uploadAvatar.htm")
			// 		// .then(function(res) {
			// 		// })
			// 		// .catch(function(error) {})
			// 	});
			// }
			// handleAvatarSuccess(res, file) {
			// 	this.imageUrl = URL.createObjectURL(file.raw);
			// },
			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isLt2M = file.size / 1024 / 1024 < 2;
			// 	if (!isJPG) {
			// 		this.$message.error('上传头像图片只能是 JPG 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB!');
			// 	}
			// 	return isJPG && isLt2M;
			// },
			// saveNickname() {
			// 	const that = this
			// 	var nickName = document.getElementById('inp_nickName').value;
			// 	this.$http.post('/myapi/adel-shop/app/auth/uploadAvatar.htm')
			// 		.then(function(res) {})
			// 		.catch((error) => {
			// 			console.error(error);
			// 		})
			// },
			// update(e) {
			// 	console.log('e', e);
			// 	let file = e.target.files[0];
			// 	let param = new FormData(); //创建form对象
			// 	param.append('file', file, file.name); //通过append向form对象添加数据
			// 	param.append('chunk', '0'); //添加form表单中其他数据
			// 	console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
			// 	let config = {
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data'
			// 		}
			// 	}; //添加请求头
			// 	this.$http.get('/myapi/adel-shop/app/auth/uploadAvatar.htm', param, config)
			// 		.then(function(res) {})
			// 		.catch((error) => {
			// 			console.error(error);
			// 		})
			// }
		}
	}
</script>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	.form_contianer {
		width: 4rem;
		margin-top: 1rem
	}
	.aa {
		font-size: .26rem;
		width: 4.5rem
	}
	.bb {
		font-size: .26rem
	}
	.container_div {
		display: flex;
		height: 2rem;
		margin-top: 1rem;
		justify-content: center;
	}
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

