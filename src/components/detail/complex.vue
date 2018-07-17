<template>
    <div>
        <headersec tabname="商品详情" ref="noback"></headersec>
        <div style="height:.8rem"></div>
        <detailTitle></detailTitle>
        <DetailTab style="margin-top: .65rem;" :urlRouter2="$route.path"></DetailTab>
        <div style="height:.6rem"></div>
        <div v-for="evaluateItem in productList">
            <div class="a">
                <div class="img_left">
                    <img class="img_goods" :src="evaluateItem.goods_image_path">
                </div>
                <div class="container_right">
                    <div>
                        <div class="con_top">
                            <p>{{evaluateItem.goods_name}}</p>
                            <p>{{evaluateItem.goods_current_price}}元起</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:.2rem;background-color:#eee"></div>
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
        data(){
            return{
                productList: [],
                myconfig: {},
                totalList: [],
                pageNum: 1,
                gc_id:null
            }
        },
           
        mounted() {
            this.$refs.noback.isBack_detail = false;
            var mitem = JSON.parse(localStorage.getItem("goodItem"));
                this.gc_id = mitem.goods.gc_id
                console.log('this.gc_id',this.gc_id);
                this.getComplex();
                
        },
        methods: {
            getComplex() {
                const that = this
                this.$http
                    .get("/myapi/adel-shop/app/search.htm?gc_id="+that.gc_id)
                    .then(function(res) {
                        that.productList = res.data.data.goodsList
                        console.log('that.evaluteList', that.productList);
                    })
                    .catch(function(error) {});
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
        background-color: white;
    }
    .myconta {
        margin-top: .3rem
    }
    .img_goods {
        width: 1.6rem;
        height: 1.6rem;
    }
    .con_top p {
        padding-bottom: .1rem
    }
    .con_up1 {
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
