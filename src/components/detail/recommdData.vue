<style type="text/css">
    * {
        margin: 0;
        padding: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
    }
    body {
        background-color: white
    }
    ul {
        list-style-type: none
    }
    a {
        text-decoration: none;
        color: #18B4FE;
    }
    /*vue*/
    [v-cloak] {
        display: none;
    }
    /*模拟的标题*/
    .header {
        z-index: 9990;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-bottom: 1px solid #eee;
        background-color: white;
    }
    .header .btn-left {
        position: absolute;
        top: 0;
        left: 0;
        padding: 12px;
        line-height: 22px;
    }
    /*mescroll滚动的区域*/
    .mescroll {
        position: fixed;
        top: 1rem;
        bottom: 0;
        height: auto;
    }
    /*展示上拉加载的数据列表*/
    .data-list li {
        position: relative;
        padding: 10px 8px 10px 120px;
        border-bottom: 1px solid #eee;
    }
    .data-list .pd-img {
        position: absolute;
        left: 18px;
        top: 18px;
        width: 80px;
        height: 80px;
    }
    .data-list .pd-name {
        font-size: 16px;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
    }
    .data-list .pd-price {
        margin-top: 8px;
        color: red;
    }
    .data-list .pd-sold {
        font-size: 12px;
        margin-top: 8px;
        color: gray;
    }
    header {
        top: .8rem;
        position: absolute;
        width: 100%;
        padding: 0 .2rem;
        height: .88rem;
        background: red;
        box-sizing: border-box;
        font-size: .24rem;
        display: flex;
        align-items: flex-end;
    }
    .my_wrap {
        /* margin-top: .5rem; */
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .tab-item {
        flex: 1;
        display: flex;
        justify-content: center;
        font-size: .26rem;
        align-items: center;
    }
    .tab-item p {
        padding-bottom: .2rem;
    }
    .tab-tite2 {
        color: red;
        padding-bottom: .1rem;
        box-sizing: border-box;
        border-bottom: .01rem solid red!important
    }
    .tab-tite6 {
        color: black;
        padding-bottom: .1rem;
        box-sizing: border-box;
    }
    .container_c {
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        margin-left: .3rem;
        justify-content: center;
    }
    .slopingside1 {
        border: 1px solid red;
        -o-transform: rotate(125deg);
        -moz-transform: rotate(125deg);
        -webkit-transform: rotate(10deg);
        position: absolute;
        width: .8rem;
        margin-top: .16rem;
    }
    .linear {
        height: 0px;
        border: 1px solid red;
        margin-left: 30px;
        margin-top: -10px;
    }
    .seckillhaveget1 {
        display: flex;
        flex: 1;
        color: #E43448;
        background-color: #fff;
        border-bottom: .02rem solid #E43448;
    }
    .wrap_container {
        display: flex;
        justify-content: space-between;
        margin-top: .9rem;
        height: .9rem;
        margin-top: .82rem;
        position: fixed;
        width: 100%;
        z-index: 2;
    }
    .seckillBeging2 {
        display: flex;
        flex: 1;
        color: #E43448;
        background-color: #eee;
    }
    .wrap_goods {
        background-color: #fff;
    }
    .baby {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem;
    }
    .bor_raid {
        width: 2.5rem;
        height: .3rem;
        border-radius: .1rem;
        border: .01rem solid #E43448
    }
    .comming {
        font-size: 0.3rem;
        display: flex;
        justify-content: center;
        font-size: .3rem
    }
    .robbot {
        display: flex;
        justify-content: flex-end
    }
    .robbot1 {
        display: flex;
        border-radius: 1rem;
        color: #fff;
        width: .5rem;
        height: .5rem;
        background-color: #E43448;
        justify-content: flex-end;
        justify-content: center;
        align-items: center;
    }
    .wapr {
        width: 100%;
    }
    .img_avator {
        display: flex;
        align-items: center
    }
    .img_a {
        width: 1.2rem;
        height: 1.2rem;
    }
    .zz {
        height: .25rem;
        background-color: #eee
    }
    .items {
        display: flex;
        padding: 0 .2rem;
        font-size: .26rem;
        height: 2rem;
    }
    .time {
        font-size: .26rem;
        display: flex;
        align-items: center;
        padding: 0 .1rem;
        padding-right: .2rem;
    }
</style>

<template>
    <div>
        <headersec tabname="为你推荐" ref="noback" @nodeEvent="heiheihei"></headersec>
        <div id="mescroll" class="mescroll">
            <!--滑动区域-->
            <div class="flex-between flex-align-center">
                <div class="wapr">
                    <div class="my_wrap">
                        <div class="tab-item">
                            <router-link to='./recommdData'>
                                <p class="tab-tite2">价格</p>
                            </router-link>
                        </div>
                        <div class="tab-item">
                            <router-link to='./recommdpx'>
                                <p class="tab-tite6">评论最多</p>
                            </router-link>
                        </div>
                    </div>
                    <!--展示上拉加载的数据列表-->
                    <div class="wrap_goods" v-for="item in  ListData" @click="toDatail(item,item.id)">
                        <div class="items">
                            <div class="img_avator">
                                <img class="img_a" :src="item.goods_image_path" alt="">
                            </div>
                            <div class="container_c">
                                <div>
                                    <p>{{item.goods_name}}</p>
                                </div>
                                <div style="    display: flex; margin-top:.1rem">
                                    <p style="color:#E43448">{{item.goods_current_price}}</p>
                                    元起
                                </div>
                            </div>
                        </div>
                        <div class="zz">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!--模拟的数据-->
<script type="text/javascript" charset="utf-8">
    import Headersec from '../base/HeaderSec.vue';
    import TitleDetail from '../base/TitleDetail.vue'
    import pdlist1 from '../../../static/js/pdlist1.js'
    import DetailTab from '../base/DetailTab.vue'
    import MeScroll from '../../../static/js/mescroll.m.js';
    import "../../../static/css/mescroll.min.css";
    import {
        mapGetters,
        mapMutations
    } from "vuex";
    //创建vue对象
    export default {
        data() {
            return {
                productList: [],
                totalPage: null,
                currentPage: 1,
                ListData: [],
                mescroll: null,
            }
        },
        components: {
            Headersec,
            TitleDetail,
            DetailTab
        },
        mounted() {
            console.log('this.$res', this.$refs);
            this.$refs.noback.isBack_detail = false;
            var self = this;
            self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
                up: {
                    callback: self.upCallback, //上拉回调
                    isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                    page: {
                        size: 6
                    }, //可配置每页8条数据,默认10
                    empty: { //配置列表无任何数据的提示
                        warpId: "dataList",
                        icon: "../res/img/mescroll-empty.png",
                    },
                },
            });
        },
        methods: {
            toDatail(item, id) {
                this.$router.push({
                    path: "/detail",
                    query: {
                        id: id,
                        item: item
                    }
                });
            },
            heiheihei(parm) {
                console.log("parm", parm);
            },
            upCallback: function(page) {
                //联网加载数据
                var self = this;
                getListDataFromNet(page.num, page.size, function(curPageData) {
                    curPageData = self.curPageData
                    if (page.num == 1) {
                        self.ListData = [];
                    }
                    console.log('curPageData', curPageData);
                    //更新列表数据
                    self.ListData = self.ListData.concat(curPageData)
                    self.mescroll.endByPage(self.ListData.length, self.totalPage); //必传参数(当前页的数据个数, 总页数)
                }, function() {
                    //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    self.mescroll.endErr();
                });
                function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
                    self.$http
                        .post("/myapi/adel-shop/app/recommend.htm?orderBy=goods_current_price&currentPage=" + page.num)
                        .then(function(res) {
                            console.log('page.num', page.num)
                            // self.productList = res.data.data.goodsList
                            self.curPageData = res.data.data.goodsList //当前页的数据
                            self.totalPage = res.data.data.totalPage //总页的页数
                            successCallback && successCallback(self.productList); //成功回调
                        })
                        .catch(function(error) {
                            errorCallback && errorCallback() //失败回调
                        })
                }
            },
        },
    }
</script>
