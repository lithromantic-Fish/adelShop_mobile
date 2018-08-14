<template>
  <div class="page wrap">
    <message ref="message"></message>
    <headers class="mark_head"></headers>
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <!-- SearchBar -->
        <div class="search-content">
          <Input placeholder='        请输入你想要搜索的商品' readonly='' type="text" class="search-input" @click="search">
          </input>
          <!-- <vue-loading  type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>     -->
        </div>
        <!-- Swiper -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="bannerItem in advList">
              <img :src="bannerItem.ad_image_path" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="content" v-cloak>
          <div class="productTop flex-between seckill" @click="getSeckillData()">
            <p class="productTop-text seckill_color">限时秒杀</p>
            <div style="display:flex;align-items: center">
              <p class="p_time">{{hour_time}}</p>
              <p style="color:white">:</p>
              <p class="p_time">{{minuter_time}}</p>
              <p style="color:white">:</p>
              <p class="p_time">{{seconder_time}}</p>
              <p style="color:white;font-size:.26rem;margin-left:.2rem">后结束抢购</p>
            </div>
            <div class="flex-align-center">
              <p class="productTop-text"></p>
              <img src="../../static/img/icon/arrowRight.png" class="arrowImg seckill_color" />
            </div>
          </div>
          <!-- 秒杀 -->
          <div>
            <div class="productContent">
              <div class="productBox flex recommend_forme_containe1" ref='div'>
                <div class="productItem" v-for="goodsItem in seckillList">
                  <div @click="onSeckillDetail(goodsItem,goodsItem.id)">
                    <img v-lazy="goodsItem.goods_image_path" class="itemImg" />
                    <div class="itemBox">
                      <div>
                        <div>
                          <p class="Startgoods-name text-ellipsis">{{goodsItem.gg_name}}</p>
                        </div>
                      </div>
                      <div>
                        <p class=" rebot Startgoods-name text-ellipsis">618疯狂抢购</p>
                        <p><span class="goods-price">￥ {{goodsItem.gg_price}}起</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 明星产品 -->
          <!-- <div v-for="(productItem,productIndex) in productList" class="floorItem"> -->
          <div class="start_productContainer">
            <div class="productTop flex-between " @click="getStartData()">
              <p class="productTop-text">爱迪尔明星产品</p>
              <div class="flex-align-center">
                <!-- <p class="productTop-text">{{productIndex+1}}F</p> -->
                <img src="../../static/img/icon/arrowRight.png" class="arrowImg" />
              </div>
            </div>
            <div class="productContent">
              <div class="productBox flex" ref='div'>
                <div class="productItem" v-for="goodsItem in productList">
                  <div @click="onGoodsDetail(goodsItem,goodsItem.id)">
                    <img v-lazy="goodsItem.goods_image_path" class="itemImg" />
                    <div class="itemBox">
                      <div>
                        <div>
                          <p class="Startgoods-name text-ellipsis">{{goodsItem.goods_name}}</p>
                        </div>
                      </div>
                      <div>
                        <p class=" rebot Startgoods-name text-ellipsis">618疯狂抢购</p>
                        <p><span class="goods-price">￥ {{goodsItem.goods_current_price}} 起</span></p>
                      </div>
                      <!-- <div class="addCartBox flex-between rebot">
                                                                    <img src="../../static/img/icon/shop_addCart.png" @click="onAddCart(goodsItem,goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart" />
                                                                    <img src="../../static/img/icon/shop_addCart_select.png" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart" /> -->
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 智能硬件 -->
          <div class="recommend_forme_container">
            <div class="productTop flex-between " @click="getIntellData()">
              <p class="productTop-text">智能硬件</p>
              <div class="flex-align-center">
                <!-- <p class="productTop-text">{{productIndex+1}}F</p> -->
                <img src="../../static/img/icon/arrowRight.png" class="arrowImg" />
              </div>
            </div>
            <div class="productContent">
              <div class="productBox flex" ref='div'>
                <div class="productItem" v-for="goodsItem in Intelligent_hardware_prev">
                  <div @click="onGoodsDetail(goodsItem,goodsItem.id)">
                    <img v-lazy="goodsItem.goods_image_path" class="itemImg" />
                    <div class="itemBox">
                      <div>
                        <div>
                          <p class="Startgoods-name text-ellipsis">{{goodsItem.goods_name}}</p>
                        </div>
                      </div>
                      <div>
                        <p class=" rebot Startgoods-name text-ellipsis">618疯狂抢购</p>
                        <p><span class="goods-price">￥ {{goodsItem.goods_current_price}}起</span></p>
                      </div>
                      <!-- <div class="addCartBox flex-between rebot">
                                    <img src="../../static/img/icon/shop_addCart.png" @click="onAddCart(goodsItem,goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart" />
                                    <img src="../../static/img/icon/shop_addCart_select.png" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart" /> -->
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="productBox flex" ref='div'>
                <div class="productItem" v-for="goodsItem in Intelligent_hardware_back">
                  <div @click="onGoodsDetail(goodsItem,goodsItem.id)">
                    <img v-lazy="goodsItem.goods_image_path" class="itemImg" />
                    <div class="itemBox">
                      <div>
                        <div>
                          <p class="Startgoods-name text-ellipsis">{{goodsItem.goods_name}}</p>
                        </div>
                      </div>
                      <div>
                        <p class=" rebot Startgoods-name text-ellipsis">618疯狂抢购</p>
                        <p><span class="goods-price">￥ {{goodsItem.goods_current_price}} 起</span></p>
                      </div>
                      <!-- <div class="addCartBox flex-between rebot">
                                                                <img src="../../static/img/icon/shop_addCart.png" @click="onAddCart(goodsItem,goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart" />
                                                                <img src="../../static/img/icon/shop_addCart_select.png" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart" /> -->
                      <!-- </div>  -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gap">
            <!-- <p>选购门锁</p>
                              <p>企业团购</p>
                              <p>限时特价</p>
                              <p>爱迪尔服务</p>
                              <p>以旧换新</p>
                              <p>售后政策</p> -->
          </div>
          <!-- 为你推荐 -->
          <div class="recommend_forme_containe1">
            <div class="productTop flex-between " @click="getRecommdData()">
              <p class="productTop-text">为你推荐</p>
              <div class="flex-align-center">
                <!-- <p class="productTop-text">{{productIndex+1}}F</p> -->
                <img src="../../static/img/icon/arrowRight.png" class="arrowImg" />
              </div>
            </div>
            <div class="productContent">
              <div class="productBox flex" ref='div'>
                <div class="productItem" v-for="goodsItem in recommendList_prev">
                  <div @click="onGoodsDetail(goodsItem,goodsItem.id)">
                    <img v-lazy="goodsItem.goods_image_path" class="itemImg" />
                    <div class="itemBox">
                      <div>
                        <div>
                          <p class="Startgoods-name text-ellipsis">{{goodsItem.goods_name}}</p>
                        </div>
                      </div>
                      <div>
                        <p class=" rebot Startgoods-name text-ellipsis">618疯狂抢购</p>
                        <p><span class="goods-price">￥ {{goodsItem.goods_current_price}} 起</span></p>
                      </div>
                      <!-- <div class="addCartBox flex-between rebot">
                          <img src="../../static/img/icon/shop_addCart.png" @click="onAddCart(goodsItem,goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart" />
                          <img src="../../static/img/icon/shop_addCart_select.png" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart" /> -->
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="productBox flex" ref='div'>
                <div class="productItem" v-for="goodsItem in recommendList_bac">
                  <div @click="onGoodsDetail(goodsItem,goodsItem.id)">
                    <img v-lazy="goodsItem.goods_image_path" class="itemImg" />
                    <div class="itemBox">
                      <div>
                        <div>
                          <p class="Startgoods-name text-ellipsis">{{goodsItem.goods_name}}</p>
                        </div>
                      </div>
                      <div>
                        <p class=" rebot Startgoods-name text-ellipsis">618疯狂抢购</p>
                        <p><span class="goods-price">￥ {{goodsItem.goods_current_price}} 起</span></p>
                      </div>
                      <!-- <div class="addCartBox flex-between rebot">
                                            <img src="../../static/img/icon/shop_addCart.png" @click="onAddCart(goodsItem,goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart" />
                                            <img src="../../static/img/icon/shop_addCart_select.png" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart" /> -->
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bot">
          </div>
        </div>
      </div>
    </transition>
    <footers :urlRouter="$route.path" :cartnum='cartLength' ref="footer"></footers>
  </div>
</template>

<script>
  import CountDown from 'vue2-countdown'
  import Headers from "./base/Header.vue";
  import Footers from "./base/Footer.vue";
  import Message from "./base/Message.vue";
  import "../../static/css/swiper.min.css";
  import Swiper from "../../static/js/swiper.min.js";
  import vueLoading from 'vue-loading-template'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import MeScroll from '../../static/js/mescroll.m.js';
  import {
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        bannerList: [],
        productList: [],
        cartLength: 0,
        slidename: "slide-back",
        mainarea: false,
        recommendList_prev: [],
        recommendList_bac: [],
        Intelligent_hardware_prev: [],
        Intelligent_hardware_back: [],
        seckillList: [],
        advList: [],
        zjtime: 0,
        day_time: 0,
        hour_time: 0,
        minuter_time: 0,
        needTime: 0,
        seconder_time: 0,
        colseTime: Number(new Date(this.zjtime)) / 1000,
        myTime: Math.round(new Date().getTime() / 1000),
        mescroll: null
      };
    },
    components: {
      Headers,
      Footers,
      CountDown,
      Message,
      PulseLoader,
      vueLoading
    },
    computed: {
      ...mapGetters(["this.$store.state.carts", "this.$store.state.comname"])
    },
    mounted() {
      var self = this
      console.log('selft', self);
      const UserName = this.$route.query.UserName;
      const passWord = this.$route.query.passWord;
      this.mainarea = true;
      this.getGoodsList();
      this.getrecommendList();
      this.getIntelligentList();
      this.getadvList();
      this.getSecKillList();
      console.log('that.tiee', this.hour_time, this.productList);
      /*判断动画是进还是出*/
      if (this.$store.state.comname == "category" || "cart" || "member") {
        this.slidename = "slide-back";
      } else {
        this.slidename = "slide-go";
      }
      this.setComname("index");
    },
    methods: {
      countDownS_cb: function(x) {},
      countDownE_cb: function(x) {},
      // 去明星页面
      getStartData() {
        this.$router.push('./startData')
      },
      // 去为你推荐页面
      getRecommdData() {
        this.$router.push('./recommdData')
      },
      //去智能硬件页面
      getIntellData() {
        this.$router.push('./intellData')
      },
      // 去秒杀页面
      getSeckillData() {
        this.$router.push('./SeckillData')
      },
      /*获取明星商品列表*/
      getGoodsList() {
        const that = this;
        this.$http
          .get("/myapi/adel-shop/app/starGoods.htm")
          .then(function(res) {
            res.data.data.goodsList.forEach((ele, idx) => {
              ele.isRushbuy = false;
            })
            that.productList = res.data.data.goodsList.slice(0, 4);
          })
          .catch(function(error) {});
      },
      search() {
        this.$router.push('./SearchBar');
      },
      // 获取秒杀列表
      getSecKillList() {
        var showline = 3;
        const that = this;
        this.$http
          .get("/myapi/adel-shop/app/flashSale.htm")
          .then(function(res) {
            that.seckillList = res.data.data.group_goodsList.resultList.slice(0, 4)
            console.log(" that.seckillList", that.seckillList)
            // res.data.data.group_goodsList.resultList.forEach((ele, idx) => {
            //   ele.isRushbuy = true;
            // })
            that.GetDateDiff(res.data.data.closeTime, res.data.data.currentTime)
            // that.needTime = clotime - currentTime
            // that.getMyTime(that.needTime);
            // console.log('that.needTime',that.needTime);
          })
          .catch(function(error) {});
      },
      GetDateDiff(startDiffTime, endDiffTime) {
        const that = this
        //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
        var startTime = startDiffTime.replace(/-/g, "/");
        var endTime = endDiffTime.replace(/-/g, "/");
        var clotime = Number(new Date(startTime)) / 1000;
        var currentTime = Number(new Date(endTime)) / 1000;
        that.needTime = clotime - currentTime
        that.getMyTime(that.needTime);
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
      // 进入秒杀商品详情
      onSeckillDetail(item, id) {
        this.$router.push({
          path: "/SeckillDetail",
          query: {
            id: id,
            item: item,
            gg_id: item.gg_gc_id
          }
        });
      },
      // 获取为你推荐列表
      getrecommendList() {
        var showline = 3;
        const that = this;
        this.$http
          .get("/myapi/adel-shop/app/recommend.htm")
          .then(function(res) {
            res.data.data.goodsList.forEach((ele, idx) => {
              ele.isRushbuy = false;
            })
            that.recommendList_prev = res.data.data.goodsList.slice(0, 3);
            that.recommendList_bac = res.data.data.goodsList.slice(3);
          })
          .catch(function(error) {});
      },
      // 获取智能硬件
      getIntelligentList() {
        var showline = 3;
        const that = this;
        this.$http
          .get("/myapi/adel-shop/app/floor.htm")
          .then(function(res) {
            res.data.data.result[1].goodsList.forEach((ele, idx) => {
              ele.isRushbuy = false;
            })
            that.Intelligent_hardware_prev = res.data.data.result[1].goodsList.slice(0, 3);
            that.Intelligent_hardware_back = res.data.data.result[1].goodsList.slice(3);
          })
          .catch(function(error) {});
      },
      /*获取轮播列表*/
      getBannerList() {
        const that = this;
        this.$http
          .get("/api/bannerdata")
          .then(function(res) {
            res.data.data.forEach((ele, idx) => {
              ele.isRushbuy = false;
            })
            that.bannerList = res.data.data;
          })
          .catch(function(error) {});
      },
      /*获取广告列表*/
      getadvList() {
        const that = this;
        this.$http
          .get("/myapi/adel-shop/app/advert_invoke.htm?advert_id=1")
          .then(function(res) {
            res.data.data.advert.forEach((ele, idx) => {
              ele.isRushbuy = false;
            })
            that.advList = res.data.data.advert;
            setTimeout(() => {
              const swiper = new Swiper(".swiper-container", {
                pagination: ".swiper-pagination",
                paginationClickable: true,
                spaceBetween: 30,
                autoplay: 1500,
                effect: "fade"
              });
            }, 200);
          })
          .catch(function(error) {});
      },
      /*进入商品详情*/
      onGoodsDetail(item, id) {
        this.$router.push({
          path: "/detail",
          query: {
            id: id,
            item: item
          }
        });
        this.setGoods(item);
      },
      /*添加到购物车*/
      onAddCart(item, name) {
        if (!this.$store.state.carts.includes(item)) {
          if (!this.$refs.footer.showNum) {
            this.cartLength = this.$store.state.carts.length + 1;
            this.$refs.footer.showNum = true;
            this.setCarts(item);
          }
        } else {
          this.$refs.message.messageShow = true;
        }
      },
      /*前往分类页面*/
      onCategory(index) {
        this.setTabindex(index);
        this.$router.push("./category");
      },
      onLogin() {
        this.$router.push("./login");
      },
      ...mapMutations({
        setGoods: "SET_GOODS",
        setCarts: "SET_CARTS",
        setTabindex: "SET_TABINDEX",
        setComname: "SET_COMNAME"
      })
    }
  };
</script>

<style lang="less" scoped>
  @import "../../static/less/variable.less";
  @import '../../static/css/mescroll.min.css';
  .swiper-slide img {
    width: 100%;
    height: 100%;
  }
  .page {
    height: 400px;
    background: #eee;
    position: relative;
    /* Prevent native touch events on Windows */
    // -ms-touch-action: none;
    /* Prevent the callout on tap-hold and text selection */
    -webkit-touch-callout: none;
    user-select: none; // text-size-adjust: none;
  }
  #app {
    height: 100%;
    max-width: 400px;
    margin: 0 auto
  }
  ul {
    list-style: none;
    padding: 0px;
    margin: 0px
  }
  ul>li:nth-child(even) {
    background-color: #fff
  }
  /*scrollbar start*/
  .iScrollVerticalScrollbar {
    position: absolute;
    z-index: 9999;
    width: 2px;
    bottom: 2px;
    top: 2px;
    right: 2px;
    overflow: hidden;
  }
  .iScrollVerticalScrollbar.iScrollBothScrollbars {
    bottom: 18px;
  }
  .iScrollIndicator {
    position: absolute;
    background: #999;
    border-radius: 6px;
    opacity: .8;
  }
  .iScrollVerticalScrollbar .iScrollIndicator {
    width: 100%;
    background: #999;
  }
  .mark_head {
    background: url("../../static/img/ade_shop/top.png") no-repeat 100%;
    background-size: 100%;
  }
  .bot {
    height: 1rem;
  }
  .seckill_color {
    color: white
  }
  .gap {
    background-color: #eee;
    display: flex;
    padding: 0 0.2rem;
    justify-content: space-between;
    align-items: center;
    height: .3rem;
    p {
      font-size: 0.22rem
    }
  }
  .wrap {
    background-color: #eee
  }
  .seckkill_p span {
    font-size: 0.2rem;
    background-color: #fff;
  }
  .seckkill_p {
    margin-right: 2rem
  }
  .Startgoods-name {
    font-size: .26rem;
  }
  .content {
    background-color: #eee;
    margin-top: 0.2rem
  }
  .search-input {
    position: absolute;
    top: 1rem;
    z-index: 2;
    left: .7rem;
    margin: 0 auto;
    height: 0.5rem;
    width: 80%;
    font-size: 0.3rem;
    border-radius: 1rem;
    outline: none;
    background-color: white!important;
    background: url("../../static/img/ade_shop/search.png") no-repeat 0.2rem 50%;
  }
  .p_time {
    height: .35rem;
    width: .35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: .1rem;
    margin-right: .1rem;
    border-radius: .05rem;
    background-color: #fff;
  }
  .seckill {
    background: url("../../static/img/ade_shop/home_title_bg.png") no-repeat;
    background-size: cover;
    height: 100%;
  }
  .recommend_forme_container {
    background-color: #ffffff;
    margin-top: 0.3rem;
  }
  .recommend_forme_containe1 {
    background-color: #ffffff;
  }
  .search-content {
    text-align: center;
    margin: 0 auto;
    background-color: #eee;
  }
  .container {
    padding-bottom: 0;
  }
  .productTop {
    padding: 0 0.2rem;
    height: 1rem;
    line-height: 1rem;
    border-bottom: @base_boder;
    border-top: @base_boder;
    align-items: center
  }
  .productTop-text {
    font-size: 0.28rem;
  }
  .rebot {
    color: #969696;
  }
  .arrowImg {
    width: 0.4rem;
    height: 0.4rem;
  }
  .floorItem:nth-last-child(1) {
    margin-bottom: 0.88rem;
  }
  .productItem {
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    width: 0.8rem;
    flex: 1;
    border-right: 1px solid #ccc;
  }
  .start_productContainer {
    background-color: #ffffff;
    margin-top: 0.3rem;
  }
  .itemImg {
    height: 1rem;
    width: 1rem;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
  }
  .addCartBox {
    img {
      width: 0.4rem;
      height: 0.4rem;
      padding-right: 0.2rem;
    }
  }
</style>
