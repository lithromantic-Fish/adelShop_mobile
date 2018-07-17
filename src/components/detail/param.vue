<template>
    <div>
        <headersec tabname="商品详情" ref="noback"></headersec>
        <div style="height:.8rem"></div>
        <detailTitle></detailTitle>
        <DetailTab style="margin-top: .65rem;" :urlRouter2="$route.path"></DetailTab>
        <div class="parm">
            <div v-for="item in param" class="myclass">
                <p>{{item.name}}:</p>
                <p>{{item.val}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Headersec from '../base/HeaderSec.vue';
    import DetailTitle from '../base/DetailTitle.vue'
    import DetailTab from '../base/DetailTab.vue'
    export default {
        data() {
            return {
                goodsOut: {},
                goodsDetail: {},
                param: []
            }
        },
        components: {
            Headersec,
            DetailTitle,
            DetailTab,
        },
        mounted() {
            this.$refs.noback.isBack_detail = false;
            var mitem = JSON.parse(localStorage.getItem("goodItem"));
            if (!mitem) {
                alert('暂无数据')
            } else {
                var myp = JSON.parse(mitem.goods.goods_property)
                this.param = myp
                console.log('aaaaaaaaaa', this.param);
            }
        },
        methods: {}
    }
</script>

<style>
    .parm {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        font-size: .26rem
    }
    .myclass {
        display: flex
    }
</style>
