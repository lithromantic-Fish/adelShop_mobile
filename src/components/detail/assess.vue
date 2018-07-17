<template>
    <div>
        <headersec tabname="商品详情" ref="noback"></headersec>
        <div style="height:.8rem"></div>
        <detailTitle></detailTitle>
        <DetailTab style="margin-top: .65rem;" :urlRouter2="$route.path"></DetailTab>
        <div v-if="noData" style="    font-size: 0.26rem;
        display: flex;
        justify-content: center;
        margin-top: 2rem;font-size:.26rem">暂无数据</div>
    </div>
</template>

<script>
    import Headersec from '../base/HeaderSec.vue';
    import DetailTitle from '../base/DetailTitle.vue'
    import DetailTab from '../base/DetailTab.vue'
    export default {
        data() {
            return {
                id: null,
                noData: false
            }
        },
        components: {
            Headersec,
            DetailTitle,
            DetailTab
        },
        mounted() {
            this.$refs.noback.isBack_detail = false;
            var mitem = JSON.parse(localStorage.getItem("goodItem"));
            console.log('mitem.id', mitem.goods.id);
            const that = this;
            this.id = mitem.id
            this.$http
                .get("/myapi/adel-shop/app/goods_evaluation.htm?goods_id=" + mitem.goods.id)
                .then(function(res) {
                    if (!res.data.data) {
                        that.noData = true
                    }
                })
                .catch(function(error) {});
        }
    }
</script>

<style>

</style>

