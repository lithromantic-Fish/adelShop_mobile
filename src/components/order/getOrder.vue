<template>
    <div class="container_b">
        <Headersec tabname="下单"></Headersec>
        <div class="myContainer">
            <p class="p_pad">订单提交成功！</p>
            <p class="p_pad">去付款咯！</p>
            <p class="p_pad">我们将尽快为您发货！</p>
            <p class="p_pad">请在24小时0分内完成支付，超时后将取消订单！</p>
            <!-- <p>{{name}}</p> -->
        </div>
        <div class="p_info">
            <div class="p_receive">
                <p>收货信息：{{default_address.trueName}}&nbsp&nbsp{{default_address.mobile}}&nbsp&nbsp{{default_address.area_name}}&nbsp&nbsp{{default_address.detail_address}}</p>
            </div>
            <div class="pice">
                <p>应付金额：</p>
                <p style="color:#E43448">{{pice}}</p>
                <p>元</p>
            </div>
        </div>
        <div class="order_pay">
            <p class="pay_type">请选择支付方式:</p>
            <div class="fnfn pay_type">
                <input class="order_pay_input" id="wxPay" checked=true name="sex" type="radio">
                </input>
                <img class="img_pay" src="../../../static/img/ade_shop/vx_icon.png" alt="">
                <p>微信支付</p>
            </div>
            <div class="fnfn pay_type">
                <input class="order_pay_input" id="zfbPay" name="sex" type="radio">
                </input>
                <img class="img_pay" src="../../../static/img/ade_shop/zfb_icon.png" alt="">
                <p>支付宝支付</p>
            </div>
        </div>
        <div class="togetpay" @click="tozfbPay">
            <!-- <a style="color:black" :href="pay_get">去支付</a> -->
            <p style="color:white">去支付</p>
        </div>
        <!-- <div class="togetpay" @click="towxPay">
                                        <a :href="pay_get">去支付</a>
                                    </div> -->
    </div>
</template>
<script>
    import Headersec from '../base/HeaderSec.vue';
    export default {
        data() {
            return {
                default_address: '',
                pice: null,
                orderIdL: null,
                pay_get: "",
                wxPay: false,
                zfbPay: false
            }
        },
        components: {
            Headersec,
        },
        mounted() {
            this.orderIdL = this.$route.query.orderIdL
            var cat = JSON.parse(localStorage.getItem("obj"));
            var pice = localStorage.getItem('pice');
            console.log('pice', pice);
            this.pice = pice
            var default_address = JSON.parse(localStorage.getItem("default_address11111"));
			this.default_address = default_address
			console.log('this.default_address',this.default_address);
        },
        methods: {
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
                            }
                        })
                    })
                    .catch(function(error) {});
            },
            // 支付宝支付
            tozfbPay() {
                var wxpz = document.getElementById('wxPay').checked
                console.log('wx', wxpz);
                var zfbC = document.getElementById('zfbPay').checked
                console.log('zfvc', zfbC);
                if (wxpz) {
                    console.log('微信支付');
                    const that = this
                    this.$http
                        .get("/myapi/adel-shop/app/auth/paymentForWap.htm?payTradeNo=" + that.orderIdL + "&paymentId=" + '13')
                        .then(function(res) {
                            console.log('res', res.data.data);
                            that.pay_get = res.data.data
                            //  window.location.href(that.pay_get)
                            window.location.href = that.pay_get;
                        })
                        .catch(function(error) {});
                } else if (zfbC) {
                    console.log('支付宝支付');
                    this.zfbPay = true
                    const that = this
                    this.$http
                        .get("/myapi/adel-shop/app/auth/paymentForWap.htm?payTradeNo=" + that.orderIdL + "&paymentId=" + '11')
                        .then(function(res) {
                            console.log('res', res.data);
                            that.$router.push({
                                path: './topay',
                                query: {
                                    payHtml: res.data
                                }
                            })
                            // that.pay_get = res.data
                        })
                        .catch(function(error) {});
                }
            },
        }
    }
</script>
<style>
    body {
        background-color: #eee;
    }
    .container_b {
        font-size: .26rem;
    }
    .p_info {
        padding: 0 .2rem
    }
    .myContainer {
        padding-top: .8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .img_pay {
        width: .6rem;
        height: .6rem;
        padding: 0 .3rem
    }
    .p_pad {
        padding: .1rem 0;
    }
    .order_pay {
        display: flex;
        flex-direction: column;
        background-color: #fff
    }
    .pay_type {
        border-bottom: .01rem #f2f2f2 solid;
        padding: .1rem .2rem;
    }
    .order_pay_input {
        width: .3rem;
        height: .3rem;
    }
    .togetpay {
        background-color: #EE2C2C;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.68rem;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #fff;
        font-size: 0.25rem;
    }
    .pice {
        display: flex;
        justify-content: center;
        padding-bottom: .1rem
    }
    .p_receive>p {
        display: flex
    }
    .fnfn {
        display: flex;
        align-items: center
    }
</style>
