<template>
  <div class="page">
    <!-- <headers tabname="我的"></headers> -->
    <transition :name="slidename">
      <div class="me_container" v-show="mainarea">
        <div class="floor floor_one">
          <div class="charn">
            <img :src="memberInfo.user_avatar" class="avator" alt="" @click="userInfo" />
            <div class="user_id">
              <p class="my_id">家庭用户</p>
            </div>
            <div class="cjar">
              <p class="p_NickName">{{memberInfo.userName}}</p>
              <!-- <p>{{memberInfo.id}}</p> -->
            </div>
          </div>
        </div>
        <!-- <div class="floor floor_item floor_two  flex-align-center flex-between" @click="onInfo">
        					<p>个人信息</p>
        					<img src="../../../static/img/icon/arrowBack.png" alt="" />
        				</div> -->
        <div class="floor floor_item_copy floor_two  flex-align-center flex-between" @click="onOrder">
          <div class="me_order">
            <img src="../../../static/img/ade_shop/my_ico_order.png">
            <p class="p_myOrder">我的订单</p>
          </div>
          <div class="me_all">
            <p class="p_all">全部</p>
            <img src="../../../static/img/icon/arrowRight.png" alt="" />
          </div>
        </div>
        <div class="floor floor_item_normal floor_two  flex-align-center flex-between">
          <div class="order_contain">
            <div class="item_order" @click="noPay">
              <img src="../../../static/img/ade_shop/my_ico_card.png">
              <p>未支付</p>
            </div>
            <div class="item_order" @click="todeliveryNone">
              <img src="../../../static/img/ade_shop/my_ico_car.png">
              <p>未发货</p>
            </div>
            <div class="item_order" @click="sever_back">
              <img src="../../../static/img/ade_shop/my_ico_money.png">
              <p>售后</p>
            </div>
          </div>
        </div>
        <div class="floor floor_item floor_two  flex-align-center flex-between" @click="onEvalute">
          <div class="me_order">
            <img src="../../../static/img/ade_shop/my_ico_goods.png">
            <p class="p_myOrder">评价商品</p>
          </div>
          <div class="me_all">
            <p class="p_all">全部</p>
            <img src="../../../static/img/icon/arrowRight.png" alt="" />
          </div>
        </div>
        <div class="floor floor_item floor_two  flex-align-center flex-between" @click="onLikeproduct">
          <div class="me_order">
            <img src="../../../static/img/ade_shop/my_ico_like.png">
            <p class="p_myOrder">喜欢的商品</p>
          </div>
          <div class="me_all">
            <p class="p_all">全部</p>
            <img src="../../../static/img/icon/arrowRight.png" alt="" />
          </div>
        </div>
        <div class="floor floor_item floor_two  flex-align-center flex-between" @click="oncoupon">
          <div class="me_order">
            <img src="../../../static/img/ade_shop/my_ico_coupon.png">
            <p class="p_myOrder">优惠券</p>
          </div>
          <div class="me_all">
            <p class="p_all">全部</p>
            <img src="../../../static/img/icon/arrowRight.png" alt="" />
          </div>
        </div>
        <div class="floor floor_item_copy floor_two  flex-align-center flex-between " @click="onAddress">
          <div class="me_order">
            <img src="../../../static/img/ade_shop/my_ico_address.png">
            <p class="p_myOrder">收货地址</p>
          </div>
          <div class="me_all">
            <p class="p_all">编辑</p>
            <img src="../../../static/img/icon/arrowRight.png" alt="" />
          </div>
        </div>
        <div class="floor floor_item_normal floor_two  flex-align-center flex-between" @click="onAddress">
          <!-- <div class="order_contain">
            <p>默认地址：</p>
            <p>广东省 深圳市 宝安区 新安街道海汇路... 邮编：5015221</p>
            <p>黄先生 收 | 13700000000</p>
          </div> -->
        </div>
        <div class="floor floor_item floor_two  flex-align-center flex-between" @click="onCommonProblem">
          <div class="me_order">
            <img src="../../../static/img/ade_shop/my_ico_question.png">
            <p class="p_myOrder">常见问题</p>
          </div>
          <div class="me_all">
            <p class="p_all">查看</p>
            <img src="../../../static/img/icon/arrowRight.png" alt="" />
          </div>
        </div>
      </div>
    </transition>
    <footers :urlRouter="$route.path"></footers>
  </div>
</template>

<script>
  import Headers from "../base/Header.vue";
  import Footers from "../base/Footer.vue";
  import login from "../login/Login.vue";
  import {
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        slidename: "slide-go",
        mainarea: false,
        memberInfo: {}
      };
    },
    components: {
      Headers,
      Footers
    },
    computed: {
      ...mapGetters(["this.$store.state.comname"])
    },
    mounted() {
      console.log('this11111', this)
      this.mainarea = true;
      /*判断动画是进还是出*/
      if (
        this.$store.state.comname == "index" ||
        this.$store.state.comname == "category" ||
        this.$store.state.comname == "cart"
      ) {
        this.slidename = "slide-go";
      } else {
        this.slidename = "slide-back";
      }
      this.setComname("member");
      this.getInfomation();
    },
    methods: {
      /*个人信息*/
      onInfo() {
        this.$router.push("./info");
      },
      todeliveryNone(){
        this.$router.push("./deliveryNone");
      },
      onEvalute() {
        this.$router.push("./evalute/evaluate");
      },
      oncoupon() {
        this.$router.push("./coupon/coupon");
      },
      noPay(){
        this.$router.push("./waitpay");
      },
      onLikeproduct() {
        this.$router.push("./likeProduct");
      },
      onCommonProblem() {
        this.$router.push("./commonProblem");
      },
      /*我的订单*/
      onOrder() {
        this.$router.push("./order");
      },
      /*我的地址*/
      onAddress() {
        this.$router.push("./address");
      },
      ...mapMutations({
        setComname: "SET_COMNAME"
      }),
      userInfo(){
        this.$router.push("./info");
      },
      getInfomation() {
        const that = this
        this.$http.get('/myapi/adel-shop/app/auth/getUserInfo.htm')
          .then(function(res) {
            that.memberInfo=res.data.data
            console.log('that.memberUIngf',that.memberInfo)
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      // loginOut() {
      //   console.log('aaaaaaaa')
      //   const that = this
      //   this.$http.post('/myapi/adel-shop/app/auth/logout.htm')
      //     .then(function(res) {
      //       console.log(res.data.data);
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // },
      // 跳转售后页面
      sever_back() {
        console.log('售后')
        this.$router.push('./member/Sever')
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../../static/less/variable.less";
  .page {
    background: rgb(245, 245, 245);
  }
  .p_myOrder {
    margin-left: 0.2rem;
  }
  .floor_one {
    display: flex;
    width: 100%;
    height: 2.8rem; // background: @theme_background;
    background: url("../../../static/img/ade_shop/my_banner.png") no-repeat;
    background-size: 100%;
    position: relative;
  }
  .avator{
          width: 1.2rem;
    height: 1.2rem;
    border-radius: 1rem
  }
  .charn {
    display: flex;
    align-items: center;
    height: 2.5rem;
    margin-left: .26rem;
  }
  .cjar {
    height: 0.5rem;
    margin-left: 0.3rem;
    p {
      color: white;
    }
  }
  .p_all {
    font-size: 0.24rem;
    margin-right: 0.1rem;
  }
  .user_id{
         background-color: #fff;
    position: absolute;
    top: 1.6rem;
    left: .32rem;
    border-radius: .08rem;
  }
  .deltail {
    background-color: white;
  }
  .p_NickName {
    font-size: 0.3rem;
  }
  .my_id{
    color: red;
    font-size: .26rem;
  }
  .up_order {
    display: flex;
    width: 100%;
    justify-content: space-between
  }
  .order_item {
    width: 1.8rem;
    height: 1rem;
    align-items: center;
    flex-direction: column;
    display: flex;
  }
  .item_order {
    text-align: center;
    width: 1.6rem;
    flex: 1;
    p {
      font-size: 0.24rem;
    }
  }
  .me_order {
    display: flex;
    align-items: center;
  }
  .me_all {
    display: flex;
    align-items: center;
  }
  .floor_item_copy {
    padding: 0 0.2rem;
    height: 0.9rem;
    margin-bottom: 0.05rem;
    font-size: 0.28rem;
    background: @base_color;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .order_contain {
    width: 94%;
    height: 1.5rem;
    display: flex;
    align-items: center;
  }
  .me_container {
    flex: 1;
    padding-bottom: .88rem;
  }
  .floor_item_normal {
    margin-bottom: 0.2rem;
    font-size: 0.28rem;
    justify-content: center;
    background: @base_color;
    width: 100%;
    img {
      width: 0.8rem;
      height: 0.58rem;
    }
  }
  .floor_item {
    padding: 0 0.2rem;
    height: 0.9rem; // line-height: 0.8rem;
    font-size: 0.28rem;
    background: @base_color;
    margin-bottom: 0.2rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
</style>
