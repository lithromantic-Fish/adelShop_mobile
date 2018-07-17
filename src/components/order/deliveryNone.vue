<template>
    <div class="wrap">
        <headersec tabname="未发货" ref="noback">
        </headersec>
        <div class="container111">
            <!-- <div v-show="!havePage">
                        <nopage></nopage>
                    </div> -->
            <div class="container_order">
                <div style="height:1rem"></div>
                <div class="item1" v-for="item  in orderList">
                    <div class="orderDeatil">
                        <div style="display:flex">
                            <p style="display:flex;align-item:center">订单号：{{item.order_id}}</p>
                            <!-- <div class="waitpay">待支付</div> -->
                        </div>
                        <div style="display:flex;    align-items: center;">
                            <p>订单详情</p>
                            <img class="img_size" src="../../../static/img/icon/arrowRight.png" alt="">
                        </div>
                    </div>
                    <div class="order_name">
                        <div style="display:flex">
                            <div style="padding: 0 .2rem">
                                <img style="width:1rem" :src="item.goods_image_path">
                            </div>
                            <div>
                                <div>
                                    <p>{{item.goods_name}}</p>
                                </div>
                                <div>
                                    <p>共{{item.count}}件商品</p>
                                </div>
                                <div>
                                    <p>{{item.addTime}}</p>
                                </div>
                                <div style="display:flex">
                                    <p>共计：</p>
                                    <p style="color:red">{{item.totalPrice}}</p>
                                    <p>元</p>
                                </div>
                            </div>
                        </div>
                        <div style="align-items:flex-end;display: flex;">
                            <p class="p_red">待发货</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Headersec from '../base/HeaderSec.vue';
    import DetailTitle from '../base/DetailTitle.vue'
    import DetailTab from '../base/DetailTab.vue'
    export default {
        components: {
            Headersec,
            DetailTitle,
            DetailTab
        },
        data() {
            return {
                orderList: []
            }
        },
        mounted() {
            this.getGoodsDetail();
        },
        methods: {
            getGoodsDetail() {
                const that = this;
                this.$http
                    .get("/myapi/adel-shop/app/auth/orderList.htm?orderStatus=" + 20)
                    .then(function(res) {
                        console.log('orderList', res.data.data.orderList);
                        that.orderList = res.data.data.orderList
                    })
                    .catch(function(error) {
                    });
            }
        }
    }
</script>

<style>
    .container {
        padding-top: 1.6rem;
    }
    .p_red {
        color: orange;
        width: 1rem;
        height: .45rem;
        border-radius: .1rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        border: solid orange .02rem;
    }
    .wrap {
        height: 100%;
        background-color: #eee;
    }
    .order-item {
        padding-bottom: .2rem;
        border-bottom: 1px solid #ccc;
        margin-bottom: .2rem;
    }
    .order-content {
        padding-top: .2rem;
    }
    .container_order {
        background-color: #eee;
        width: 100%;
        height: 12.8rem;
        font-size: .25rem
    }
    .item1 {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        height: 2.5rem!important;
        margin-bottom: .2rem;
        padding: 0 .2rem;
    }
    .orderpage {
        background-color: #eee
    }
    .orderDeatil {
        display: flex;
        flex-direction: row;
        height: .4rem!important;
        align-items: center;
        justify-content: space-between;
        margin-top: .1rem
    }
    .img_size {
        height: .3rem
    }
    .waitpay {
        padding: 0 .15rem;
        color: #E43448;
        height: .35rem;
        border: 1px solid;
        border-radius: .1rem;
        display: flex;
        align-items: center;
        margin: 0 .2rem;
    }
    .order_name {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: .1rem;
        height: 2.5rem;
        align-items: center;
    }
    .orderpage {
        font-size: .25rem!important
    }
</style>

