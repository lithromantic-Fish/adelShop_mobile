<template>
    <!-- content goes here -->
    <div class="wrap">
        <Headersec tabname="我的售后服务" ref="noback"></Headersec>
        <pull-to :top-load-method="refresh" :is-throttle-top-pull='false' @infinite-scroll='ggg' :is-throttle-scroll="false" :is-throttle-bottom-pull='false' :bottom-load-method='getMore'>
            <div class="myContainer">
                <div class="item" v-for="severItem in severList.resultList">
                    <div class="item_top">
                        <p>售后服务单号：{{severItem.apply_no}}</p>
                        <p class="p_color">{{severItem.mystatus}}处理中</p>
                    </div>
                    <div class="item_conatiner">
                        <img class="img_lock" :src="severItem.goods_image_path" />
                        <p class="p_container">{{severItem.goods_name}}</p>
                    </div>
                </div>
            </div>
        </pull-to>
    </div>
</template>
<script>
    import Headersec from "../base/HeaderSec.vue";
    import Vue from 'vue'
    import VueScroller from 'vue-scroller'
    import PullTo from 'vue-pull-to'
    export default {
        data() {
            return {
                severList: [],
                status: ''
            }
        },
        components: {
            Headersec,
            PullTo
        },
        mounted() {
            this.getSeverList();
        },
        methods: {
            refresh(loaded) {
                // fetchDataList()
                //     .then((res) => {
                //         this.dataList = res.data.dataList
                //         loaded('done')
                //     })
                console.log(1);
                return
            },
            getMore(loaded) {
                console.log('2');
            },
            ggg() {
                console.log('http://192.168.0.59:6108/adel-shop/app/auth/afterServiceList.htm');
            },
            getSeverList() {
                const that = this
                this.$http.get('/myapi/adel-shop/app/auth/afterServiceList.htm')
                    .then(function(res) {
                        console.log('res.data', res.data.data);
                        that.severList = res.data.data
                        that.severList.resultList.forEach(ele => {
                            if (ele.apply_type == 0) {
                                ele.mystatus = '退款'
                            } else if (ele.apply_type == 1) {
                                ele.mystatus = '换货'
                            } else {
                                ele.mystatus = '维修'
                            }
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }
    }
</script>
<style>
    .myContainer p {
        font-size: .25rem;
    }
    .p_color {
        color: red
    }
    .img_lock {
          height: 1.6rem;
    width: 2rem;
    }
    .item_conatiner {
        display: flex;
        padding-top: .1rem;
    }
    .p_container {
        flex: 1;
        display: flex;
        padding: 0 .3rem;
        align-items: center;
    }
    .wrap {
        background-color: #eee;
        height: 100%;
    }
    .item {
        background-color: white;
        width: 100%;
        padding: 0 20px;
        height: 2.4rem;
        margin-bottom: .2rem;
    }
    .item_top {
        background: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: 0 0.2rem;
        padding-top: .3rem;
    }
    .container_sale {
        background-color: red
    }
    .myContainer {
        height: 94%;
        margin-top: .8rem;
        display: flex;
        flex-direction: column;
        font-size: 0.4rem;
    }
</style>