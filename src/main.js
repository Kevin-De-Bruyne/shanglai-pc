import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

window.ajaxs = axios

Vue.config.productionTip = false

import 'fastclick'

Vue.prototype.app_v = '0.00'

document.addEventListener('plusready', () => {
    console.log('pulse准备好了')
    plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
        var wgtStr = String(wgtinfo.version);
        // console.log(wgtStr,'版本号多少')
        Vue.prototype.app_v = wgtStr
    });
}, false);

import router from './router'

// export const baseUrl='http://182.92.9.210/'
// export const baseUrl='http://newa.com/'
// export const baseUrl=''
export const baseUrl = 'http://pm.shanglai.art/'
    // export const baseUrl = 'http://newa.com/'
    // export const baseUrl='http://rs.com/'
    // export const baseUrl='http://192.168.2.124/'

Vue.prototype.baseUrl = baseUrl

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    loading: require('./assets/img_loading.png'), //加载中图片，一定要有，不然会一直重复加载占位图
    error: require('./assets/default.png') //加载失败图片
});


Vue.prototype.download = null


Vue.prototype.token = localStorage.getItem('login')

Vue.prototype.login = () => {
    Vue.prototype.token = localStorage.getItem('login')
}

let ajaxs = axios.create()

Vue.prototype.$ajaxs = ajaxs

// ajaxs.defaults.timeout=5000

let lurl = null

Vue.prototype.showtitle = (msg) => {
    console.log('开启了')
    return new Promise((ok, err) => {
        // if(lurl){
        //   err('请勿重新请求了亲')
        //   return
        // }
        Toast({
            message: msg,
            duration: 1500
        })
        setTimeout(() => {
            ok()
        }, 1500);
        lurl = true
    })
}

Vue.prototype.order_back = false

Vue.prototype.order_backtoTrue = () => {
    Vue.prototype.order_back = true
}

Vue.prototype.order_backtofalse = () => {
    Vue.prototype.order_back = false
}

Vue.prototype.ajax = ({ url, data = {}, headers = {}, methods = 'post' }) => {
    data.token = data.token || localStorage.getItem('login')

    return new Promise((ok, err) => {
        // if(lurl){
        //   //避免重复请求
        //   err('请勿重新请求了')
        //   return
        // }
        Toast.loading({
            duration: 0,
            forbidClick: true
        })
        ajaxs[methods](baseUrl + url,
            methods == 'post' ? data : { params: data }, { headers }).then(res => {
            console.log(res)
            Toast.clear()
            if (res.data.status == 200 || res.data.code == 0) {
                ok(res.data)
            } else {
                console.log(res)
                if (router.history.current.path == '/shop_detail' && (res.data.message == '此场次已结束' || res.data.message == '该场次已结束' || res.data.message == '此场次还未开始')) {
                    err(res.data)
                    return
                }
                console.log(res)

                if (res.data.msg == '用户不存在') {
                    Vue.prototype.showtitle('请重新登录')
                    err(res)
                    router.push('/login')
                    return
                }
                console.log(res.data.message)
                Toast.fail(res.message || res.msg || res.data.message || res.data.msg)
                err(res)
            }
        }).catch(fill => {
            console.log(fill)
            Toast.clear()
            Toast.fail('请求失败')
        })
    })

}


import 'lib-flexible/flexible'

import 'babel-polyfill';

import Vant from 'vant';
import 'vant/lib/index.css';


import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';

NutUI.install(Vue);

import header from '@/components/header'
import tabbar from '@/components/tabbar'
import lists from '@/components/list'
import nodata from '@/components/nodata'
import popup from '@/components/popup'

import cusToast from '@/components/toast';
cusToast.install(Vue);



Vue.component('headers', header)
Vue.component('tabbar', tabbar)
Vue.component('lists', lists)
Vue.component('nodata', nodata)
Vue.component('popup', popup)

import {
    Toast,
    Dialog,
    ImagePreview,
    ActionSheet,
    CouponCell,
    CouponList,
    Circle,
    Button,
    Popover
} from 'vant';

Vue.use(Toast)
    .use(Dialog)
    .use(ImagePreview)
    .use(ActionSheet)
    .use(CouponCell)
    .use(CouponList)
    .use(Circle)
    .use(Button)
    .use(Popover)

Vue.use(Vant);

Vue.prototype.$dialog = Dialog

Vue.prototype.pushurl = (url) => {
    router.push(url)
}


function s(e) {
    console.log(123123123)
    e.preventDefault();
}

router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    next()
})

router.afterEach((to, form) => {

})


let first = null;

Vue.prototype.$toast = Toast

function plusReady() {
    // 监听“返回”按钮事件
    plus.key.addEventListener("backbutton", function() {

        console.log(router.history.current.fullPath)
        if (
            router.history.current.fullPath == '/' || router.history.current.fullPath == '/shop' || router.history.current.fullPath == '/mine' ||
            router.history.current.fullPath == '/login'
        ) {
            if (!first || new Date().getTime() - first > 1000) {
                first = new Date().getTime();
                Toast('再按一次退出')
            } else if (new Date().getTime() - first < 1000) {
                plus.runtime.quit();
            }
        } else {
            router.go(-1)
        }
        return
    }); // 在这里调用plus api
}
if (window.plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}


new Vue({
    render: h => h(App),
    router
}).$mount('#app')