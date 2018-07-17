<template>
    <div style="height:100%">
        <headersec tabname="喜欢的商品"></headersec>
        <div style="height:1rem"></div>
        <pull-to :top-load-method="refresh" :bottom-load-method="bottom_refresh">
            <div v-for="evaluateItem in evaluteList">
                <div class="a">
                    <div class="img_left">
                        <img class="img_goods" :src="evaluateItem.goods_image_path">
                    </div>
                    <div class="container_right">
                        <div>
                            <div class="con_top">
                                <p>{{evaluateItem.goods_name}}</p>
                                <div style="display:flex">
                                    <p style="color:red">{{evaluateItem.goods_price}}</p>
                                    <p>元起</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height:.2rem;background-color:#eee"></div>
            </div>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">Loading...</span>
            </div>
        </pull-to>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Headersec from '../base/HeaderSec.vue';
    import EvaluteTab from '../base/EvaluteTab'
    import PullTo from 'vue-pull-to'
    import {
        Loadmore
    } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        components: {
            Headersec,
            PullTo,
            EvaluteTab,
        },
        data() {
            return {
                evaluteList: [],
                topStatus: '',
                pageSize: 1,
                totalList: []
            };
        },
        mounted() {
            this.getEvaluation()
        },
        methods: {
            timedMsg() {
                var t = setTimeout(this.topStatus = "drop", 5000)
            },
            getEvaluation() {
                const that = this
                this.$http
                    .post("/myapi/adel-shop/app/auth/goodsCollectList.htm")
                    .then(function(res) {
                        that.evaluteList = res.data.data.goodsList
                    })
                    .catch(function(error) {});
            },
            refresh(loaded) {
                setTimeout(() => {
                    this.getEvaluation();
                    loaded('done');
                }, 2000);
            },
            bottom_refresh(loaded) {
                const that = this
                setTimeout(() => {
                    that.evaluteList = that.evaluteList.concat(that.evaluteList)
                    loaded('done');
                }, 2000);
            },
        }
    }
</script>

<style>
    .container_right {
        font-size: .24rem;
        margin-left: .2rem
    }
    .a {
        display: flex;
        padding: 0 .2rem;
        height: 2.3rem;
        align-items: center;
    }
    .img_goods {
        width: 1.6rem;
        height: 1.6rem;
    }
    .con_top p {
        padding-bottom: .1rem
    }
    .con_up {
        background-color: #E43448;
        height: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .1rem;
        color: white;
        width: 1rem
    }
</style>
