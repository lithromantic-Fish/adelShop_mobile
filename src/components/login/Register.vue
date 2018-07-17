<template>
    <div class="container_wrap">
        <input type="text" class="base_input1" placeholder="请输入电话号码" id="telNumber" value="13755793062" />
        <input type="text" class="base_input2" placeholder="请输入密码" id="passWord" value="123456" />
        <div class="flex">
            <input type="text" class="base_input2" placeholder="请输入验证码" id="icode" />
            <button @click="getTelNum" class="btn_getnum">点击获取</button>
        </div>
        <button class="btn_login" @click="getInfomation()">注册</button>
        <div v-show="loading" class="loading"></div>
        <div class="bot">
            <p class="p_base" @click="toLogin">直接登录</p>
            <p @click="tofirstPage()">游客入口</p>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                loading: false,
                message: '',
                idCode: null,
            }
        },
        mounted() {
            // this.clearAllCookie()
        },
        methods: {
            getInfomation() {
                var telNumber = document.getElementById('telNumber').value
                var pwd = document.getElementById('passWord').value
                var icode = document.getElementById('icode').value
                this.$http
                    .post("/myapi/adel-shop/app/registerUser.htm?mobile=" + telNumber + "&smsVerifyCode=" + icode + '&password=' + pwd)
                    .then(function(res) {})
                    .catch(function(error) {});
            },
            //  跳转首页
            tofirstPage() {
                this.$router.push({
                    path: '/index',
                });
            },
            getRegister() {
                alert
            },
            getTelNum() {
                const that = this
                var telNumber = document.getElementById('telNumber').value
                this.$http
                    .get("/myapi/adel-shop/app/getSmsVerifyCode.htm?mobile=" + telNumber + "&type=" + 0)
                    .then(function(res) {
                        this.idCode = telNumber
                    })
                    .catch(function(error) {});
            },
            toLogin() {
                this.$router.push('/')
            }
        }
    }
</script>
<style>
    .container_wrap {
        background: url('../../../static/img/ade_shop/login_bac.png') no-repeat 0px 0px;
        background-size: 100%
    }
    .container_wrap p {
        color: white
    }
    .bot {
        width: 80%;
        display: flex;
        justify-content: space-around;
        font-size: 0.3rem;
        padding-top: 80px;
    }
    .flex {
        display: flex
    }
    .btn_getnum {
        height: 0.66rem;
        width: 2.04rem;
        font-size: .3rem;
        color: red
    }
    .container_wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .input_up {
        display: flex;
        flex-direction: column;
        width: 83%;
        height: 1.5rem;
    }
    input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #fff;
    }
    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #fff;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #fff;
    }
    input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #fff;
    }
    .btn_login {
        width: 83%;
        height: 0.7rem;
        color: #fff;
        font-size: 0.3rem;
        background-color: red;
        border: none;
        margin-top: 70px;
        outline: none;
    }
    .base_input2 {
        width: 80%;
        height: 0.6rem;
        font-size: 0.3rem;
        background-color: #fff;
        outline: none;
        color: white;
        background-color: rgba(255, 255, 255, 0.39);
        border-top: 3px solid #fff;
        border-left: 4px solid #fff;
        border-right: 4px solid #fff;
        border-bottom: 4px solid #fff;
    }
    .base_input1 {
        width: 80%;
        border-top: 4px solid #fff;
        border-left: 4px solid #fff;
        border-right: 4px solid #fff;
        height: 0.6rem;
        color: white;
        font-size: 0.3rem;
        background-color: #fff;
        outline: none;
        background-color: rgba(255, 255, 255, 0.39);
    }
    .p_base {
        font-size: 0.3rem;
    }
</style>
