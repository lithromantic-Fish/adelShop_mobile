<template>
    <div>
        <headersec tabname="优惠券中心"></headersec>
        <div v-show="!nopage">
            <div style="height:1rem"></div>
            <div class="coupon_container1" v-for="conponItem in couponList">
                <div class="top">
                    <div class="top_money">
                        <p style="font-size:.3rem;">{{conponItem.coupon_name}}</p>
                        <p style="font-size:.45rem;">¥ {{conponItem.coupon_amount}}</p>
                    </div>
                    <div class="used">
                        <p>{{conponItem.class_name}}</p>
                        <p>（满{{conponItem.coupon_order_amount}}元可用）</p>
                    </div>
                </div>
                <div class="foot">
                    <div class="foot_time">
                        <div>
                            <p>有效期：{{conponItem.coupon_begin_time}} 至 {{conponItem.coupon_end_time}}</p>
                        </div>
                        <div class="get" @click="getCopon(conponItem.id)">
                            <p style="color:white">领取</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="nopage" class="noCoupon">
            <p>没有可用的优惠券</p>
        </div>
    </div>
</template>

<script>
    import Headersec from '../base/HeaderSec.vue';
    export default {
        components: {
            Headersec
        },
        data() {
            return {
                couponList: {},
                nopage: false
            }
        },
        methods: {
            getCopon(id) {
                const that = this
                this.$http
                    .get("myapi/adel-shop/app/auth/receiveCoupon.htm?couponId=" + id)
                    .then(function(res) {
                        console.log('res', res);
                    })
                    .catch(function(error) {});
            },
            getValidCoupon() {
                const that = this
                this.$http
                    .get("/myapi/adel-shop/app/auth/couponList.htm")
                    .then(function(res) {
                        console.log('get', res.data.data)
                        if (res.data.data == null) {
                            that.nopage = true
                            console.log('aaaaaaaa', res.data.data);
                        } else {
                            that.couponList = res.data.data.couponList
                            that.nopage = false
                        }
                    })
                    .catch(function(error) {});
            }
        },
        mounted() {
            this.getValidCoupon()
        }
    }
</script>

<style>
    .used {
        font-size: .25rem;
        padding-top: .25rem;
        display: flex;
        justify-content: space-between;
    }
    .coupon_container1 {
        padding-bottom: .2rem;
    }
    .noCoupon {
        font-size: 0.3rem;
        justify-content: center;
        display: flex;
        margin-top: 3rem
    }
    .toGetconpon {
        background-color: red;
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
    .get {
        background-color: #EE7600;
        width: .9rem;
        height: .4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.1rem;
    }
    .top_money {
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
        justify-content: space-between
    }
    body {
        background-color: #eee
    }
</style>
