<template>
    <div>
        <headersec tabname="设置发票信息"></headersec>
        <div class="container_div">
            <div style="margin-bottom:.3rem">
                <p>发票信息</p>
            </div>
            <div class="container_bor">
                <div class="bor" @click="isClick" v-show="isClicked">
                    <p>普通发票</p>
                </div>
                <div class="bor" style="color :red; border-color:red" @click="isClick" v-show="!isClicked">
                    <p>普通发票</p>
                </div>
                <div class="bor" @click="noClick" v-show="!dzisClicked">
                    <p>电子普通发票</p>
                </div>
                <div class="bor" style="color :red; border-color:red" @click="noClick" v-show="dzisClicked">
                    <p>电子普通发票</p>
                </div>
            </div>
            <div class="fot">
                <p class="p_part">部分试点地区仅提供电子发票，具体以实际出具为准</p>
            </div>
        </div>
        <div class="fot_fff"></div>
        <div class="div_title">
            <div class="div_bill">
                <p>发票抬头</p>
            </div>
            <div style="padding-top: .2rem; display:flex;  align-items: center;" v-if="!isPersonal">
                <input id="inp_person" type="radio" class="radioButton" name="sex" checked=true /> 个人<br />
                <input id="inp_unit" type="radio" style="margin-left: .5rem;" class="radioButton" name="sex" /> 单位<br />
            </div>
            <div style="padding-top: .2rem; display:flex;  align-items: center;" v-if="isPersonal">
                <input id="inp_person" type="radio" class="radioButton" name="sex" checked=true /> 个人1<br />
                <input id="inp_unit" type="radio" style="margin-left: .5rem;" class="radioButton" name="sex" /> 单位<br />
            </div>
        </div>
        <div class="fot_fff"></div>
        <div style="padding: 0 .2rem;">
            <div class="billcontainer">
                <p style="font-size:.26rem">发票内容</p>
                <p class="fp_p">发票内容选项已根据税法调整,具体请以展示为准</p>
            </div>
            <div class="container_bor1">
                <div class="bor1" style="color :red; border-color:red" @click="goodsClick" v-show="!goodsClicked">
                    <p>商品明细</p>
                </div>
                <div class="bor1" @click="goodsClick" v-show="goodsClicked">
                    <p>商品明细</p>
                </div>
                <div class="bor1" @click="goodsClickC" v-show="isgoodsClicked">
                    <p>商品类别</p>
                </div>
                <div class="bor1" style="color :red; border-color:red" @click="goodsClickC" v-show="!isgoodsClicked">
                    <p>商品类别</p>
                </div>
            </div>
            <div style="padding-top:.2rem;">
                <p>发票内容将显示详细商品名称与价格信息</p>
            </div>
        </div>
        <div class="suer" @click="setBillInfo">
            <p>确定</p>
        </div>
    </div>
</template>

<script>
    import Headersec from '../base/HeaderSec.vue';
    import CouponTab from '../base/CouponTab.vue'
    import {
        version
    } from 'element-ui';
    export default {
        components: {
            Headersec,
            CouponTab
        },
        data() {
            return {
                status: 0,
                CouponList: {},
                noshow: false,
                goodscart_id: [],
                isClicked: false,
                noClicked: true,
                dzisClicked: false,
                goodsClicked: false,
                isgoodsClicked: true,
                invoice_type: null,
                invoice_title_type: null,
                invoice_title: '',
                isPersonal: false
            }
        },
        mounted() {
            const that = this
            that.goodscart_id = that.$route.query.goodscart_id;
            this.getCanUseCoupon();
            var a = document.getElementById("inp_person").checked;
            var b = document.getElementById("inp_unit").checked;
            if (a) {
                console.log('选择了个人')
                that.isPersonal = true
            } else {
                console.log('选择了单位')
                that.isPersonal = false
                
            }
            console.log('res.data.data.couponList', this.CouponList);
        },
        methods: {
            isClick() {
                if (this.isClicked) {
                    this.isClicked = false
                    this.dzisClicked = false
                }
            },
            noClick() {
                if (!this.dzisClicked) {
                    this.dzisClicked = true
                    this.isClicked = true
                }
            },
            goodsClick() {
                if (this.goodsClicked) {
                    this.goodsClicked = false
                    this.isgoodsClicked = true
                }
            },
            goodsClickC() {
                if (this.isgoodsClicked) {
                    this.goodsClicked = true
                    this.isgoodsClicked = false
                }
            },
            setBillInfo() {
                const that = this
                if (!that.isClicked) {
                    console.log('选择了普通发票');
                    that.invoice_type = 0
                } else if (that.isClicked) {
                    console.log('电子发票');
                    that.invoice_type = 1
                }
                if (that.goodsClicked) {
                    console.log('选择了商品类别');
                    that.invoice_content = 1
                } else if (!that.goodsClicked) {
                    console.log('选择了商品明细');
                    that.invoice_content = 0
                }
                var a = document.getElementById("inp_person").checked;
                var b = document.getElementById("inp_unit").checked;
                if (a) {
                    console.log('选择了个人')
                    that.invoice_title_type = 0
                } else {
                    console.log('选择了单位')
                    that.invoice_title_type = 1
                }
                var a = [];
                if (that.invoice_title_type == 0) {
                    this.$http
                        .get("/myapi/adel-shop/app/auth/saveInvoice.htm?invoice_type=" + that.invoice_type + "&invoice_content=" + that.invoice_content + '&invoice_title_type=' + that.invoice_title_type)
                        .then(function(res) {})
                        .catch(function(error) {});
                }
                this.$router.push({
                    path: 'OrderWait',
                    query: {
                        invoice_type: that.invoice_type,
                        invoice_content: that.invoice_content,
                        invoice_title_type: that.invoice_title_type
                    }
                })
                // this.$router.push('./OrderWait')
            },
            // 获取当前可用的优惠券
            getCanUseCoupon() {
                const that = this
                this.$http
                    .get("/myapi/adel-shop/app/auth/getInvoice.htm?goodsId=" + this.goodscart_id, )
                    .then(function(res) {
                        if (res.data.data == 'null') {
                            this.noshow = true
                        } else {
                            this.noshow = false
                            that.CouponList = res.data.data.couponList
                        }
                    })
                    .catch(function(error) {});
            },
            getconponList() {
                const that = this;
                this.$http
                    .get("/myapi/adel-shop/app/auth/getUserCoupon.htm?status=" + this.status)
                    .then(function(res) {
                        if (res.data.data == 'null') {
                            this.noshow = true
                        } else {
                            this.noshow = false
                            that.CouponList = res.data.data.couponList
                        }
                    })
                    .catch(function(error) {});
            },
            toAllCoupon() {
                this.$router.push("./allCoupon");
                //   this.$router.push("../coupon/allCoupon");
            }
        }
    }
</script>

<style>
    .suer {
        position: absolute;
        bottom: 0.3rem;
        left: 45%;
        background-color: #E43448;
        color: white;
        width: 1.2rem;
        display: flex;
        height: .55rem;
        justify-content: center;
        align-items: center;
        border-radius: .1rem;
        font-size: .26rem;
    }
    .fot {
        font-size: .22rem;
        padding: .3rem 0;
    }
    .container_bor1 {
        display: flex;
    }
    .p_part {
        color: #454545;
    }
    .fp_p {
        margin-left: .2rem;
        color: #454545;
        font-size: .22rem;
    }
    .fot_fff {
        background-color: #eee;
        height: .2rem;
    }
    .div_bill {
        padding-top: .2rem;
        display: flex;
        align-items: center;
    }
    .bor {
        border: 1px solid #000;
        width: 2.5rem;
        display: flex;
        justify-content: center;
        padding: .02rem;
        margin-right: .3rem;
    }
    .bor1 {
        border: 1px solid #000;
        width: 1rem;
        display: flex;
        justify-content: center;
        padding: .02rem;
        margin-right: .3rem;
    }
    .container_bor {
        display: flex;
    }
    .billcontainer {
        display: flex;
        align-items: center;
        padding: .2rem 0 .3rem 0;
    }
    .container_div {
        padding: 1rem .3rem 0 .3rem;
        font-size: .26rem;
        height: 2rem;
    }
    .used {
        font-size: .25rem;
        padding-top: .25rem;
        display: flex;
        justify-content: space-between;
    }
    .coupon_container {
        padding-bottom: .3rem
    }
    .div_title {
        font-size: .26rem;
        padding: 0 .2rem .2rem .2rem;
    }
    .toGetconpon {
        background-color: #EE2C2C;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.68rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 0.25rem;
    }
    .top {
        background-color: #EE2C2C;
        height: 1.5rem;
        padding: 0 .3rem;
        color: #fff;
    }
    .top_money {
        padding-top: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .foot_time {
        background-color: #fff;
        height: .7rem;
        display: flex;
        align-items: center;
        padding: 0 .3rem;
        font-size: .25rem;
    }
    .radioButton {
        width: .3rem;
        height: .3rem;
    }
    .nopage {
        font-size: .3rem;
        justify-content: center;
        display: flex;
        height: 4rem;
        align-items: center;
    }
    body {
        background-color: #fff
    }
</style>
