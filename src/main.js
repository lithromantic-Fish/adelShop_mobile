import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import Global from '../src/components/base/Global.vue'
import VueScroller from 'vue-scroller'
import $ from 'jquery'
import vconsole from '../src/vconsole.js'
import {
    Loading,
    Icon,
    Upload,
    Button,
    Rate
} from 'element-ui';
import {
    Loadmore
} from 'mint-ui';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/icon.css'


Vue.prototype.GLOBAL = Global
axios.defaults.withCredentials = true;
var VueTouch = require('vue-touch')
fastclick.attach(document.body) //解决移动端点击事件200ms延迟
Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Rate)
Vue.use(VueScroller)
Vue.use(Upload);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$http = axios;
var isgone = false
    // 请求拦截器
axios.interceptors.request.use(function(config) {

    console.log('config', config);
    // 在发送请求之前做些什么
    showFullScreenLoading()
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);

});
console.log('thissss', this)
    // 响应拦截器
axios.interceptors.response.use((response) => {
    const that = this
    console.log('that', that)
    tryHideFullScreenLoading()
    console.log('response', response);
    return response
}, (error) => {
    if (error) {
        console.log('响应接口错误', error);
        console.log('err', error.response)
        console.log(typeof(error))
        if (error.response == undefined) {
            alert("登录状态过期")
            endLoading()
            console.log('that', that)
            console.log("window", window)
            router.push({
                path: "/Login"
            });
        } else if (error.response.status === 404) {
            alert("网络错误，请刷新重试")
        }
    }
    endLoading()

    return Promise.reject(error)
})

let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

let loading

function startLoading() {

    var style = document.getElementsByTagName('body')[0].className = 'important_style'
    loading = Loading.service({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)',
        customClass: 'myStyle'
    })
}

function endLoading() {
    document.getElementsByTagName('body')[0].className = 'important_style1'
    loading.close()
}



Vue.use(VueTouch, {
        name: 'v-touch'
    }) //滑动事件
VueTouch.config.swipe = { //配置滑动区域为左滑动，解决和滚动事件的冲突
    direction: 'horizontal',
    threshold: 200
}
Vue.config.productionTip = false //vuex开启开发环境日志
    // or with options
Vue.use(VueLazyLoad, { //懒加载声明错误图和占位图
        preLoad: 1.3,
        error: './static/img/github.png',
        loading: './static/img/github.png',
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    },
    render: h => h(App)
})