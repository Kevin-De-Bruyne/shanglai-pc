import Vue from 'vue'
import Router from 'vue-router'

import home from '../pages/home'
import shops from '../pages/shops'
import mine from '../pages/mine'
import set from '../pages/set'
import phone from '../pages/phone'
import pwd_login from '../pages/pwd_login'
import pwd_jiaoyi from '../pages/pwd_jiaoyi'
import uc_zhuan from '../pages/uc_zhuan'
import order_buy from '../pages/order_buy'
import order_sell from '../pages/order_sell'
import diyong from '../pages/diyong'
import zhuanpai_buy from '../pages/zhuanpai_buy'
import wanshan from '../pages/wanshan'
import kefu from '../pages/kefu'
import xinren from '../pages/xinren'
import shop_list from '../pages/shop_list'
import shop_detail from '../pages/shop_detail'
import shoukuan from '../pages/shoukuan'
import team from '../pages/team'
import haoyou_list from '../pages/haoyou_list'
import login from '../pages/login'
import reg from '../pages/reg'
import reg_h5 from '../pages/reg_h5'
import gongao from '../pages/gongao'
import wanfa from '../pages/wanfa'
import xinshou from '../pages/xinshou'
import haoyou from '../pages/haoyou'
import addres_list from '../pages/addres_list'
import addres_add from '../pages/addres_add'
import order_shiwu from '../pages/order_shiwu'
import order_shiwu_detail from '../pages/order_shiwu_detail'
import conpay from '../pages/conpay'
import gongao_detail from '../pages/gongao_detail'
import uc_list from '../pages/uc_list'
import shiming from '../pages/shiming'
import shenhe from '../pages/shenhe'
import xiazai from '../pages/xiazai'
import order_detail from '../pages/order_detail'
import order_detail_sell from '@/pages/order_detail_sell'
import test from '@/pages/test'
import tx from '@/pages/tx'
import bank_add from '@/pages/bank_add'
import bank_list from '@/pages/bank_list'
import lianxi from '@/pages/lianxi'
import chongzhi from '@/pages/chongzhi'
import mingxi from '@/pages/mingxi'

Vue.use(Router)

export default new Router({
    routes:[
        {
          path:'/',
          component:home,
          meta:{
            index:0
          },
        },
        {
          path:'/xiazai',
          component:xiazai,
          meta:{
            index:1
          }
        },
        {
          path:'/shops',
          component:shops,
          meta:{
            index:0
          }
        },
        {
          path:'/mingxi',
          component:mingxi,
          meta:{
            index:2
          }
        },
        {
          path:'/bank_list',
          component:bank_list,
          meta:{
            index:0
          }
        },
        {
          path:'/lianxi',
          component:lianxi,
          meta:{
            index:1
          }
        },
        {
          path:'/bank_add',
          component:bank_add,
          meta:{
            index:0
          }
        },
        {
          path:'/chongzhi',
          component:chongzhi,
          meta:{
            index:2
          }
        },
        {
          path:'/mine',
          component:mine,
          meta:{
            index:0
          }
        },
        {
          path:'/login',
          component:login,
          meta:{
            index:0
          }
        },
        {
          path:'/reg_h5',
          component:reg_h5,
          meta:{
            index:0
          }
        },
        {
          path:'/tx',
          component:tx,
          meta:{
            index:2
          }
        },
        {
          path:'/reg',
          component:reg,
          meta:{
            index:1
          }
        },
        {
          path:'/gongao_detail',
          component:gongao_detail,
          meta:{
            index:1
          }
        },
        {
          path:'/shiming',
          component:shiming,
          meta:{
            index:1
          }
        },
        {
          path:'/uc_list',
          component:uc_list,
          meta:{
            index:1
          }
        },
        
        {
          path:'/order_shiwu',
          component:order_shiwu,
          meta:{
            index:1
          }
        },
        {
          path:'/addres_list',
          component:addres_list,
          meta:{
            index:1
          }
        },
        {
          path:'/haoyou',
          component:haoyou,
          meta:{
            index:1
          }
        },
        {
          path:'/wanfa',
          component:wanfa,
          meta:{
            index:1
          }
        },
        {
          path:'/conpay',
          component:conpay,
          meta:{
            index:3
          }
        },
        {
          path:'/xinshou',
          component:xinshou,
          meta:{
            index:1
          }
        },
        {
          path:'/set',
          component:set,
          meta:{
            index:1
          }
        },
        {
          path:'/gongao',
          component:gongao,
          meta:{
            index:1
          }
        },
        {
          path:'/uc_zhuan',
          component:uc_zhuan,
          meta:{
            index:1
          }
        },
        {
          path:'/order_buy',
          component:order_buy,
          meta:{
            index:1
          }
        },
        {
          path:'/order_detail',
          component:order_detail,
          meta:{
            index:2
          }
        },
        {
          path:'/order_detail_sell',
          component:order_detail_sell,
          meta:{
            index:2
          }
        },
        {
          path:'/order_sell',
          component:order_sell,
          meta:{
            index:1
          }
        },
        {
          path:'/diyong',
          component:diyong,
          meta:{
            index:1
          }
        },
        {
          path:'/zhuanpai_buy',
          component:zhuanpai_buy,
          meta:{
            index:2
          }
        },
        {
          path:'/shenhe',
          component:shenhe,
          meta:{
            index:2
          }
        },
        {
          path:'/wanshan',
          component:wanshan,
          meta:{
            index:1
          }
        },
        {
          path:'/kefu',
          component:kefu,
          meta:{
            index:1
          }
        },
        {
          path:'/xinren',
          component:xinren,
          meta:{
            index:1
          }
        },
        {
          path:'/shop_list',
          component:shop_list,
          meta:{
            index:1
          }
        },
        {
          path:'/shoukuan',
          component:shoukuan,
          meta:{
            index:1
          }
        },
        {
          path:'/team',
          component:team,
          meta:{
            index:1
          }
        },
        {
          path:'/haoyou_list',
          component:haoyou_list,
          meta:{
            index:1
          }
        },
        {
          path:'/phone',
          component:phone,
          meta:{
            index:2
          }
        },
        {
          path:'/order_shiwu_detail',
          component:order_shiwu_detail,
          meta:{
            index:2
          }
        },
        {
          path:'/addres_add',
          component:addres_add,
          meta:{
            index:2
          }
        },
        {
          path:'/shop_detail',
          component:shop_detail,
          meta:{
            index:2
          }
        },
        {
          path:'/pwd_login',
          component:pwd_login,
          meta:{
            index:2
          }
        },
        {
          path:'/pwd_jiaoyi',
          component:pwd_jiaoyi,
          meta:{
            index:2
          }
        },
        {
          path:'/test',
          component:test,
          meta:{
            index:2
          }
        },
    ]
})