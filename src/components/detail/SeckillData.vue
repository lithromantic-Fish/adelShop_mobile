<template>
    <div style="height:94%;    margin-top: .8rem;    padding-bottom: .5rem;">
        <headersec tabname="限时秒杀" ref="noback">
        </headersec>
        <div id="mescroll" class="mescroll">
            <div class="wrap_container">
                <div class="seckillhaveget1">
                    <div style="display:flex">
                        <p class="time">
                            {{startTime}}
                        </p>
                    </div>
                    <div>
                        <p class="comming">正在抢购</p>
                        <div style="display:flex;">
                            <p style="font-size:.26rem">距结束</p>
                            <div style=" font-weight:bold;display:flex; margin-left:.1rem; align-items: center;">
                                <p class="p_time">{{hour_time}}</p>
                                <p>:</p>
                                <p class="p_time">{{minuter_time}}</p>
                                <p>:</p>
                                <p class="p_time">{{seconder_time}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seckillBeging2" @click="toSeckillBegin">
                    <div style="display:flex">
                        <p class="time">
                            {{closeTime}}
                        </p>
                    </div>
                    <div>
                        <p class="comming"> 即将开始</p>
                        <div v-if="!ishaveActive" style="display:flex">
                            <p style="font-size:.26rem">距开始</p>
                            <div style=" font-weight:bold;display:flex; margin-left:.1rem; align-items: center;">
                                <p class="p_time">{{hour_time1}}</p>
                                <p>:</p>
                                <p class="p_time">{{minuter_time1}}</p>
                                <p>:</p>
                                <p class="p_time">{{seconder_time1}}</p>
                            </div>
                        </div>
                        <div v-if="ishaveActive">
                            今天没有活动
                        </div>
                    </div>
                </div>
            </div>
            <div style=" padding-top:1rem;">
                <!-- <pull-to :top-load-method="refresh" :bottom-load-method="bottom_refresh" :top-config='myconfig'> -->
                <div class="wrap_goods" v-for="item in  ListData">
                    <div class="items" @click="onSeckillDetail(item,item.id)">
                        <div class="img_avator">
                            <img class="img_a" :src="item.goods_image_path" alt="">
                        </div>
                        <div class="baby">
                            <div class="goods_name">
                                <div class="myName">
                                    <div>
                                        <p>{{item.gg_name}}</p>
                                        <p style="color:#E43448">{{item.gg_def_count}}件已售</p>
                                    </div>
                                    <div class="bor_raid"></div>
                                </div>
                            </div>
                            <div class="goods_price">
                                <div class="robbot">
                                    <div class="robbot1">
                                        <p>抢</p>
                                    </div>
                                </div>
                                <div style="position:  relative">
                                    <div class="slopingside1">
                                    </div>
                                    <p class="robbot">{{item.goods_price}}元</p>
                                    <p class="robbot">{{item.gg_price}}元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="zz">
                    </div>
                </div>
                <!-- </pull-to> -->
            </div>
        </div>
    </div>
</template>
<script>
    import Headersec from '../base/HeaderSec.vue';
    import DetailTitle from '../base/DetailTitle.vue'
    import DetailTab from '../base/DetailTab.vue'
    import MeScroll from '../../../static/js/mescroll.m.js';
    import "../../../static/css/mescroll.min.css";
    // import PullTo from 'vue-pull-to'
    export default {
        components: {
            Headersec,
            DetailTitle,
            DetailTab,
            // PullTo
        },
        data() {
            return {
                seckillList: [],
                startTime: null,
                closeTime: null,
                hour_time: null,
                minuter_time: null,
                seconder_time: null,
                hour_time1: null,
                minuter_time1: null,
                seconder_time1: null,
                myconfig: {},
                totalList: [],
                pageNum: 1,
                mescroll: null,
                ListData: [],
                ishaveActive:false
            }
        },
        created() {},
        mounted() {
            this.$refs.noback.isBack_detail = false;
            var self = this;
            self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
                up: {
                    callback: self.upCallback, //上拉回调
                    //以下参数可删除,不配置
                    isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                    page: {
                        size: 10
                    }, //可配置每页8条数据,默认10
                  
                    empty: { //配置列表无任何数据的提示
                        warpId: "dataList",
                        icon: "../res/img/mescroll-empty.png",
               
                    },
                  
                },
            });
            // 正在抢购
            // this.getSecKillList();
            // 即将开始
            this.getSecKillList2();
        },
        methods: {
            upCallback: function(page) {
                //联网加载数据
                var self = this;
                getListDataFromNet(page.num, page.size, function(curPageData) {
                    curPageData = self.curPageData
                    if (page.num == 1) {
                        self.ListData = [];
                    }
                    self.ListData = self.ListData.concat(curPageData)
                    self.mescroll.endByPage(self.ListData.length, self.totalPage); //必传参数(当前页的数据个数, 总页数)
                }, function() {
                    self.mescroll.endErr();
                });
                function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
                    self.$http
                        .get("/myapi/adel-shop/app/flashSale.htm?type=start&currentPage=" +pageNum)
                        .then(function(res) {
                            self.curPageData = res.data.data.group_goodsList.resultList
                            self.totalPage =res.data.data.group_goodsList.totalPages

                            // 左上角的时间
                            self.startTime = res.data.data.startTime.substring(11)
                            self.closeTime = res.data.data.closeTime.substring(11)

                            // 格式转换ios识别时间
                            var startTime = res.data.data.currentTime.replace(/-/g, "/");
                            var closeTime = res.data.data.closeTime.replace(/-/g, "/");
                            var closeTimeT = Number(new Date(closeTime)) / 1000;
                            var startTimeT = Number(new Date(startTime)) / 1000;
                       

                            self.needTime = closeTimeT - startTimeT
                            self.getMyTime(self.needTime);
                             successCallback && successCallback(self.productList); //成功回调
                        })
                        .catch(function(error) {
                            errorCallback && errorCallback() //失败回调
                        })
                }
            },
       
    
            // 进入秒杀商品详情
            onSeckillDetail(item, id) {
                console.log('进入秒杀商品详情', id);
                this.$router.push({
                    path: "/SeckillDetail",
                    query: {
                        id: id,
                        item: item,
                        gg_id: item.gg_gc_id
                    }
                });
            },
            // 获取秒杀列表即将开始
            getSecKillList2() {
                var showline = 3;
                const that = this;
                this.$http
                    .get("/myapi/adel-shop/app/flashSale.htm?type=ready")
                    .then(function(res) {
                        if(res.data.code==0){
                            that.ishaveActive = true
                        }
                        that.startTime = res.data.data.startTime.substring(11)
                        that.closeTime = res.data.data.closeTime.substring(11)
                        console.log('res.data.data.startTime.getMinutes()', that.startTime.substring(11));
                        res.data.data.group_goodsList.resultList.forEach((ele, idx) => {})

                                var currentTime = res.data.data.currentTime.replace(/-/g, "/");
                            var closeTime = res.data.data.closeTime.replace(/-/g, "/");

                            var closeTimeT = Number(new Date(closeTime)) / 1000;
                            var currentTimeT = Number(new Date(currentTime)) / 1000;

                        // var clotime = Number(new Date(res.data.data.closeTime)) / 1000;
                        // var currentTime = Number(new Date(res.data.data.currentTime)) / 1000;
                        that.needTime = closeTimeT - currentTimeT
                        that.getMyTime1(that.needTime);
                    })
                    .catch(function(error) {});
            },
            getMyTime1(needTime) {
                const that = this
                function countDown(times) {
                    var timer = null;
                    timer = setInterval(function() {
                        var day = 0,
                            hour = 0,
                            minute = 0,
                            second = 0; //时间默认值
                        if (times > 0) {
                            day = Math.floor(times / (60 * 60 * 24));
                            hour = Math.floor(times / (60 * 60)) - (day * 24);
                            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                        }
                        if (day <= 9) day = '0' + day;
                        if (hour <= 9) hour = '0' + hour;
                        if (minute <= 9) minute = '0' + minute;
                        if (second <= 9) second = '0' + second;
                        that.day_time = day;
                        that.hour_time1 = hour;
                        that.minuter_time1 = minute;
                        that.seconder_time1 = second;
                        times--;
                    }, 1000);
                    if (times <= 0) {
                        clearInterval(timer);
                    }
                }
                countDown(that.needTime)
                loaded('done');
            },
            getMyTime(needTime) {
                const that = this
                function countDown(times) {
                    var timer = null;
                    timer = setInterval(function() {
                        var day = 0,
                            hour = 0,
                            minute = 0,
                            second = 0; //时间默认值
                        if (times > 0) {
                            day = Math.floor(times / (60 * 60 * 24));
                            hour = Math.floor(times / (60 * 60)) - (day * 24);
                            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                        }
                        if (day <= 9) day = '0' + day;
                        if (hour <= 9) hour = '0' + hour;
                        if (minute <= 9) minute = '0' + minute;
                        if (second <= 9) second = '0' + second;
                        that.day_time = day;
                        that.hour_time = hour;
                        that.minuter_time = minute;
                        that.seconder_time = second;
                        times--;
                    }, 1000);
                    if (times <= 0) {
                        clearInterval(timer);
                    }
                }
                countDown(that.needTime)
            },
            toSeckillBegin() {
                this.$router.push('./SeckillBegin');
            }
        }
    }
</script>
<style>
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
        height: .9rem;
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
        width: 6rem;
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
        height: 1.5rem;
    }
    .time {
        font-size: .26rem;
        display: flex;
        align-items: center;
        padding: 0 .1rem;
        padding-right: .2rem;
    }
</style>
