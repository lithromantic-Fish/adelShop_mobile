import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/Index'
//import Category from '@/components/Category/Category'
//import Cart from '@/components/Cart/Cart'
//import Member from '@/components/Member/Member'
//import Order from '@/components/Order/Order'
//import Address from '@/components/Address/Address'w
//import AddAddress from '@/components/Address/AddAddress'
//import Detail from '@/components/Detail/Detail'
//import OrderWait from '@/components/Order/OrderWait'
Vue.use(Router)

const Index = (resolve) => {
    import ('@/components/Index').then((module) => {
        resolve(module)
    })
}
const getOrder = (resolve) => {
    import ('@/components/order/getOrder').then((module) => {
        resolve(module)
    })
}
const Coupon = (resolve) => {
    import ('@/components/coupon/coupon').then((module) => {
        resolve(module)
    })
}
const CouponDown = (resolve) => {
    import ('@/components/coupon/couponDown').then((module) => {
        resolve(module)
    })
}
const CouponRecord = (resolve) => {
    import ('@/components/coupon/couponRecord').then((module) => {
        resolve(module)
    })
}
const Login = (resolve) => {
    import ('@/components/login/Login').then((module) => {
        resolve(module)
    })
}
const Category = (resolve) => {
    import ('@/components/Category/Category').then((module) => {
        resolve(module)
    })
}
const CategoryDetailpx = (resolve) => {
    import ('@/components/Category/CategoryDetailpx').then((module) => {
        resolve(module)
    })
}
const CategoryDetail = (resolve) => {
    import ('@/components/Category/CategoryDetail').then((module) => {
        resolve(module)
    })
}
const Cart = (resolve) => {
    import ('@/components/Cart/Cart').then((module) => {
        resolve(module)
    })
}
const Member = (resolve) => {
    import ('@/components/Member/Member').then((module) => {
        resolve(module)
    })
}
const Sever = (resolve) => {
    import ('@/components/Member/Sever').then((module) => {
        resolve(module)
    })
}

// const SearchBar = (resolve) => {
//     import ('@/components/base/SearchBar').then((module) => {
//         resolve(module)
//     })
// }
const commonProblem = (resolve) => {
    import ('@/components/Member/commonProblem').then((module) => {
        resolve(module)
    })
}
const coupon = (resolve) => {
    import ('@/components/coupon/coupon').then((module) => {
        resolve(module)
    })
}
const allCoupon = (resolve) => {
    import ('@/components/coupon/allCoupon').then((module) => {
        resolve(module)
    })
}
const canUserCoupon = (resolve) => {
    import ('@/components/coupon/canUserCoupon').then((module) => {
        resolve(module)
    })
}
const likeProduct = (resolve) => {
    import ('@/components/Member/likeProduct').then((module) => {
        resolve(module)
    })
}
const Info = (resolve) => {
    import ('@/components/Member/Info').then((module) => {
        resolve(module)
    })
}
const reviseUserName = (resolve) => {
    import ('@/components/Member/reviseUserName').then((module) => {
        resolve(module)
    })
}

const reviseAvator = (resolve) => {
    import ('@/components/Member/reviseAvator').then((module) => {
        resolve(module)
    })
}
const reviseNickName = (resolve) => {
    import ('@/components/Member/reviseNickName').then((module) => {
        resolve(module)
    })
}
const reviseTrueName = (resolve) => {
    import ('@/components/Member/reviseTrueName').then((module) => {
        resolve(module)
    })
}

const billInfomation = (resolve) => {
    import ('@/components/Order/billInfomation').then((module) => {
        resolve(module)
    })
}

const reviseBirthDay = (resolve) => {
    import ('@/components/Member/reviseBirthDay').then((module) => {
        resolve(module)
    })
}
const reviseEMail = (resolve) => {
    import ('@/components/Member/reviseEMail').then((module) => {
        resolve(module)
    })
}
const reviseSex = (resolve) => {
    import ('@/components/Member/reviseSex').then((module) => {
        resolve(module)
    })
}
const evaluate = (resolve) => {
    import ('@/components/evalute/evaluate').then((module) => {
        resolve(module)
    })
}
const Order = (resolve) => {
    import ('@/components/Order/Order').then((module) => {
        resolve(module)
    })
}

const Address = (resolve) => {
    import ('@/components/Address/Address').then((module) => {
        resolve(module)
    })
}
const AddAddress = (resolve) => {
    import ('@/components/Address/AddAddress').then((module) => {
        resolve(module)
    })
}
const Detail = (resolve) => {
    import ('@/components/Detail/Detail').then((module) => {
        resolve(module)
    })
}
const startpx = (resolve) => {
    import ('@/components/Detail/startpx').then((module) => {
        resolve(module)
    })
}
const SeckillDetail = (resolve) => {
    import ('@/components/Detail/SeckillDetail').then((module) => {
        resolve(module)
    })
}
const intellData = (resolve) => {
    import ('@/components/Detail/intellData').then((module) => {
        resolve(module)
    })
}
const recommdData = (resolve) => {
    import ('@/components/Detail/recommdData').then((module) => {
        resolve(module)
    })
}

const intellpx = (resolve) => {
    import ('@/components/Detail/intellpx').then((module) => {
        resolve(module)
    })
}
const SeckillBegin = (resolve) => {
    import ('@/components/Detail/SeckillBegin').then((module) => {
        resolve(module)
    })
}
const SeckillData = (resolve) => {
    import ('@/components/Detail/SeckillData').then((module) => {
        resolve(module)
    })
}
const startData = (resolve) => {
    import ('@/components/Detail/startData').then((module) => {
        resolve(module)
    })
}

const OrderWait = (resolve) => {
    import ('@/components/Order/OrderWait').then((module) => {
        resolve(module)
    })
}
const evaluteDown = (resolve) => {
    import ('@/components/evalute/evaluteDown').then((module) => {
        resolve(module)
    })
}
const toEvalute = (resolve) => {
    import ('@/components/evalute/toEvalute').then((module) => {
        resolve(module)
    })
}
const evaluteNone = (resolve) => {
        import ('@/components/evalute/evaluteNone').then((module) => {
            resolve(module)
        })
    }
    // const waitEvalute = (resolve) => {
    //     import ('@/components/evalute/waitEvalute').then((module) => {
    //         resolve(module)
    //     })
    // }
const SearchPage = (resolve) => {
    import ('@/components/base/SearchPage').then((module) => {
        resolve(module)
    })
}

const SearchReslutpx = (resolve) => {
    import ('@/components/base/SearchReslutpx').then((module) => {
        resolve(module)
    })
}
const SearchBar = (resolve) => {
    import ('@/components/base/SearchBar').then((module) => {
        resolve(module)
    })
}
const SearchReslut = (resolve) => {
    import ('@/components/base/SearchReslut').then((module) => {
        resolve(module)
    })
}
const WaitPay = (resolve) => {
    import ('@/components/Order/WaitPay').then((module) => {
        resolve(module)
    })
}
const Register = (resolve) => {
    import ('@/components/login/Register').then((module) => {
        resolve(module)
    })
}
const WaitDeliver = (resolve) => {
    import ('@/components/Order/WaitDeliver').then((module) => {
        resolve(module)
    })
}
const WaitReceive = (resolve) => {
    import ('@/components/Order/WaitReceive').then((module) => {
        resolve(module)
    })
}
const topay = (resolve) => {
    import ('@/components/Order/topay').then((module) => {
        resolve(module)
    })
}
const deliveryNone = (resolve) => {
    import ('@/components/Order/deliveryNone').then((module) => {
        resolve(module)
    })
}

const OrderDown = (resolve) => {
    import ('@/components/Order/OrderDown').then((module) => {
        resolve(module)
    })
}
const assess = (resolve) => {
    import ('@/components/detail/assess').then((module) => {
        resolve(module)
    })
}
const complex = (resolve) => {
    import ('@/components/detail/complex').then((module) => {
        resolve(module)
    })
}
const recommdpx = (resolve) => {
    import ('@/components/detail/recommdpx').then((module) => {
        resolve(module)
    })
}
const param = (resolve) => {
    import ('@/components/detail/param').then((module) => {
        resolve(module)
    })
}
export default new Router({
    //	 mode: 'history',
    routes: [{
            path: '/',
            component: Login
        },
        {
            path: '/Register',
            component: Register

        },

        {
            path: '/index',
            component: Index
        },

        {
            path: '/category',
            component: Category
        },
        {
            path: '/CategoryDetail',
            component: CategoryDetail
        },
        {
            path: '/CategoryDetailpx',
            component: CategoryDetailpx
        },
        // 路径要写全
        {
            path: '/member/Sever',
            component: Sever
        },
        {
            path: '/evalute/evaluteDown',
            component: evaluteDown
        },
        {
            path: '/evalute/evaluteNone',
            component: evaluteNone
        },

        {
            path: '/evalute/toEvalute',
            component: toEvalute
        },
        {
            path: '/SeckillDetail',
            component: SeckillDetail
        },
        {
            path: '/cart',
            component: Cart
        },
        {
            path: '/Info',
            component: Info
        },
        {
            path: '/member',
            component: Member
        },
        {
            path: '/coupon/coupon',
            component: coupon
        },

        {
            path: '/intellpx',
            component: intellpx
        },
        {
            path: '/billInfomation',
            component: billInfomation
        },
        {
            path: '/coupon/CouponDown',
            component: CouponDown
        },
        {
            path: '/getOrder',
            component: getOrder
        },
        {
            path: '/reviseAvator',
            component: reviseAvator
        },
        {
            path: '/canUserCoupon',
            component: canUserCoupon
        },
        {
            path: '/SearchPage',
            component: SearchPage
        },
        {
            path: '/SearchBar',
            component: SearchBar
        },
        {
            path: '/startpx',
            component: startpx
        },
        {
            path: '/SearchReslut',
            component: SearchReslut
        },
        {
            path: '/coupon/allCoupon',
            component: allCoupon
        },

        {
            path: '/coupon/couponRecord',
            component: CouponRecord
        },
        {
            path: '/reviseUserName',
            component: reviseUserName
        },
        {
            path: '/reviseNickName',
            component: reviseNickName
        }, {
            path: '/reviseTrueName',
            component: reviseTrueName
        }, {
            path: '/reviseBirthDay',
            component: reviseBirthDay
        }, {
            path: '/reviseEMail',
            component: reviseEMail
        }, {
            path: '/reviseSex',
            component: reviseSex
        },
        {
            path: '/commonProblem',
            component: commonProblem
        },
        {
            path: '/likeProduct',
            component: likeProduct
        },
        {
            path: '/evalute/evaluate',
            component: evaluate
        },

        {
            path: '/SearchReslutpx',
            component: SearchReslutpx
        },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/address',
            component: Address
        },
        {
            path: '/addaddress',
            component: AddAddress
        },
        {
            path: '/detail',
            component: Detail
        },
        {
            path: '/startData',
            component: startData
        },
        {
            path: '/SeckillBegin',
            component: SeckillBegin
        },

        {
            path: '/intellData',
            component: intellData
        },
        {
            path: '/recommdpx',
            component: recommdpx
        },
        {
            path: '/recommdData',
            component: recommdData
        },
        {
            path: '/deliveryNone',
            component: deliveryNone
        },
        {
            path: '/SeckillData',
            component: SeckillData
        },
        {
            path: '/assess',
            component: assess
        },
        {
            path: '/complex',
            component: complex
        },
        {
            path: '/param',
            component: param
        },
        {
            path: '/orderwait',
            component: OrderWait
        },
        {
            path: '/waitpay',
            component: WaitPay
        },
        {
            path: '/waitdeliver',
            component: WaitDeliver
        },
        {
            path: '/waitreceive',
            component: WaitReceive
        },
        {
            path: '/topay',
            component: topay
        },
        {
            path: '/orderdown',
            component: OrderDown
        },
    ]
})