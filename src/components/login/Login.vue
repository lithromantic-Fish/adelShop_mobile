<template>
    <div class="container_wrap">
        <div class="input_up1">
            <input type="text" class="base_input3" placeholder="请输入用户名" id="userName" value="test" />
            <input type="text" class="base_input4" placeholder="请输入密码" id="passWord"  value="123456"/>
        </div>
        <button class="btn_login" @click="getInfomation()" >登录</button>
        <div v-show="loading" class="loading"></div>
        <div class="bot">
            <p class="p_base" @click="toRegister">注册</p>
            <p class="p_base">忘记密码?</p>
            <p @click="tofirstPage()">游客入口</p>
        </div>  
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                loading: false,
                message: ''
            }
        },
        mounted(){
            this.clearAllCookie()
        },
        methods: {
            //  跳转首页
            tofirstPage() {
                this.$router.push({
                    path: '/index',
                });
            },
               clearAllCookie() {  
                   console.log('cokkote')
                var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
                if(keys) {  
                    for(var i = keys.length; i--;)  
                        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
                }  
            }  ,
            setCookie(c_name, value, expiredays) {
                var exdate = new Date()
                exdate.setDate(exdate.getDate() + expiredays)
                document.cookie = c_name + "=" + escape(value) +
                    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
            },
            getCookie(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            },
            toRegister(){
                this.$router.push('./Register')
            },
            // 登录接口
            getInfomation() {
                var userName = document.getElementById('userName').value
                var passWord = document.getElementById('passWord').value
                const that = this
                var getPersonUrl = '/myapi/adel-shop/app/login.htm?userName=' + userName + '&password=' + passWord
                this.$http.post(getPersonUrl)
                    .then(function(res) {
                        console.log(res.data.message)
                        if (res.data.message == null) {
                            // that.setCookie('UserName', userName, 365)
                            // that.setCookie('password', passWord, 365)
                            // that.getCookie(userName)
                            that.tofirstPage();
                        } else {}
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
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
    .container_wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .input_up1 {
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
    .btn_login{
            width: 83%;
    height: 0.7rem;
    color: #fff;
    font-size: 0.3rem;
    background-color: red;
    border: none;
    margin-top: 70px;
    outline: none;
    }
    .base_input4 {
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
    .base_input3 {
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
