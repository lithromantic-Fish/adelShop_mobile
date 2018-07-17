<template>
	<div>
		<headersec tabname="修改昵称" ref="noback"></headersec>
		<div class="container_div">
		</div>
		<div class="btn_div">
			<div>
				<input id="input_man" class="input_i" type="radio" :checked='man' name="sex" value="male" /> 男
			</div>
			<div>
				<input id="input_woman" class="input_i" type="radio" :checked='!man' name="sex" value="female" /> 女
			</div>
		</div>
		<div class="div_tbn">
			<button class="btn_save" @click="saveNickname">保存</button>
		</div>
	</div>
</template>
<script>
	import Headersec from '../base/HeaderSec.vue';
	export default {
		data() {
			return {
				man: true,
				sex: null
			}
		},
		components: {
			Headersec,
		},
		mounted() {
			if (this.$route.query.sex == 0) {
				this.man = false
			} else {
				this.man = true
			}
		},
		methods: {
			saveNickname() {
				const that = this
				if (that.man) {
					that.sex = 1
				} else {
					that.sex = 0
				}
				this.$http.post('/myapi/adel-shop/app/auth/updateUser.htm?sex=' + that.sex)
					.then(function(res) {})
					.catch((error) => {
						console.error(error);
					})
			}
		}
	}
</script>
<style>
	.input_i {
		height: .3rem;
		width: .3rem;
	}
	.container_div {
		display: flex;
		height: 1.5rem;
		justify-content: center;
	}
	.div_tbn {
		display: flex;
		justify-content: center
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
		justify-content: space-around;
		font-size: 0.4rem;
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

