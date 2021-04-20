<template>
    <div class="content">
        <headers title="我的卖单" />

        <div class="tabbar-box">
            <div class="item" v-for="(item,index) in tabbar" :key="index"
            @click="tabbar_index=index" :class="{'choise-style':tabbar_index==index}"
            >
                {{item}}
            </div>
        </div>

        <div class="item-box">
            <div class="item" v-for="(item,index) in sreach_data" :key="item.ag_id"
            @click.stop="godetail(item)"
            >
                <div class="top">
                    <div class="left">
                        {{item.order_sn?'No.'+item.order_sn:''}}
                    </div>
                    <div class="right" >
                        {{check_status(item)}}
                    </div>
                </div>
                <div class="container">
                    <div class="left">
                        <div class="text1">
                            申请转拍时间: {{item.apply_time}}
                        </div>
                        <div class="text2">
                            品名: {{item.goods_name}}
                        </div>
                        <div class="text2" v-if="item.mobile">
                            买家电话号码: {{item.mobile}}
                        </div>
                        <div class="text2" v-if="item.b_real_name">
                            买家真实姓名: {{item.b_real_name}}
                        </div>
                        <div class="shop-box">
              <div class="lefts">
                <img
                  :src="item.main_graph_img"
                  alt
                />
              </div>

              <div class="rights">
                <div class="text3" v-if="item.w_num">
                            库号
                            <span class="red">
                                {{item.w_num}}
                            </span>
                        </div>
                        <div class="text4">
                            拍卖价
                            <span class="red">
                                ￥{{item.account_price}}
                            </span>
                        </div>
              </div>
            </div>
                        
                    </div>
                   
                </div>
                <!-- <div class="bottom" v-if="item.status==-2">
                    <div class="left">
                    </div>
                    <div class="right" @click.stop="shangjia(item)">
                        重新提交上架
                    </div>
                </div> -->
                 <div class="bottom_text" v-if="item.pay_money">
                        <div class="text1">
                            实付
                        </div>
                        <div class="text2 red">
                            ￥{{item.pay_money}}
                        </div>
                    </div>
                    <div class="bottom" v-if="item.b_sta==1">
                    <div class="left">
                        <!-- 倒计时00:56:33 -->
                        <span v-if="item.order.is_lock">已锁单</span>
                        <div class="right2 right" @click.stop="suodan(item)" v-else>
                        锁单
                    </div>
                    </div>
                    <div class="right" @click.stop="shenhe(item)">
                        去审核
                    </div>
                    
                </div>
                <div class="bottom" v-else-if="item.status==3&&item.b_sta==4&&item.sta<2">
                    <div class="left">
                        <!-- 倒计时00:56:33 -->
                    </div>
                    <div class="right" @click.stop="fahuo(item)">
                        确认发货
                    </div>
                </div>

                <div class="bottom" v-else-if="item.order_id">
                    <div class="left">
                        
                    </div>
                    <div class="rights">
                        <span class="butn2 m-r-5" v-if="item.order.status==-1" @click.stop="showjvjue(item)">
                            查看拒绝理由
                        </span>
                        <span class="butn2" @click.stop="godetail(item)">
                            订单详情
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // tabbar:[
            //     {
            //         name:'全部',
            //         id:''
            //     },
            //     {
            //         name:'待被买',
            //         id:[0,1]
            //     },
            //     {
            //         name:'待付款',
            //         id:2
            //     },
            //     {
            //         name:'付款中',
            //         id:2,
            //         b_id:1
            //     },
            //     {
            //         name:'待发货',
            //         id:3,
            //         b_id:2
            //     },
            //     {
            //         name:'待收货',
            //         id:3,
            //         b_id:2,
            //         sta:2
            //     },
            //     {
            //         name:'已完成',
            //         id:4
            //     },
            // ],
            tabbar:['三天内','七天内','一个月内'],
            tabbar_index:0,
            data:[]
        }
    },
    created () {
        this.getdata()  
    },
    computed: {
        sreach_data(){ 
            // let data=[]
            // let this_item=this.tabbar[this.tabbar_index]
            // console.log(this_item)
            //     if(this.tabbar_index==0){
            //         data=this.data
            //     }else{
            //         this.data.forEach(item=>{
            //             if(this_item.id=item.status&&this_item.b_id==item.b_sta){
            //                 data.push(item)
            //             }
            //             if(this_item.sta==item.sta){
            //                 data.push(item)
            //             }
            //             if(this_item.id.length){
            //                this_item.id.forEach(id=>{
            //                    if(id==item.status){
            //                        data.push(item)
            //                    }
            //                })
            //             }else{
            //                 if(item.status==item.id){
            //                     data.push(item)
            //                 }
            //             }
            //         })
            //     }
            let data=[]

            data=this.data.filter(item=>{
                 if(this.tabbar_index==0){
          return item.time_status <= this.tabbar_index + 2;
        }else if(this.tabbar_index==1){
          return item.time_status <= this.tabbar_index + 3;
        }else{
          return item.time_status <= this.tabbar_index + 4;
        }
            })
                return data
        }
    },
    methods: {
        shangjia(item){
            this.ajax({
                url:'index/auction_goods/algin_submit',
                data:{
                    id:item.id
                }
            }).then(res=>{
                this.showtitle('操作成功').then(res=>{
                    this.getdata()
                })
            })
        },
        godetail(item){
            if(!item.order_id){
                return
            }
            this.$router.push(`/order_detail_sell?id=${item.order_id}&status=${this.check_status(item)}`)
        },
        showjvjue(item){
            this.$dialog.alert({
                title:'尚来艺拍',
                message:item.order.reason
            })
        },
         check_status(item){
            let str=''
            if(item.b_sta==-1){
                str='审核拒绝'
            }else if(item.b_sta==-2){
                str='拒绝上架'
            }else if(item.b_sta==5){
                str='已取消'
            }else if(item.sta==2){
                str='待收货'
            }else if(item.b_sta==1){
                str='待审核'
            }else if(item.status==3&&item.b_sta==2){
                str='待发货'
            }else{
                switch (item.status) {
                    case -2:
                        str='已拒绝上架'
                        break;
                    case -1:
                        str='申请中'
                        break
                    case 0:
                        str='已通过'
                        break
                    case 1:
                        str='已上架'
                        break
                    case 2:
                        str='已拍下'
                        break
                    case 3:
                        str='已付款'
                        break
                    case 4:
                        str='已完成'
                        break
                    case 5:
                        str='已提货'
                        break
                }
            }
          return str
        },
        shenhe(item){
            this.$router.push('/shenhe?id='+item.order_id)
        },
        suodan(item){
            this.$dialog.confirm({
                    title: '提示：锁单后将阻止系统自动放货，继续等待买家付款',
                 message: '是否确认锁单?',
                    })
                    .then(() => {
                        this.ajax({
                            url:'index/my/lock_order',
                            data:{
                                id:item.order_id
                            }
                        }).then(res=>{
                            this.getdata()
                            this.showtitle('操作成功')
                        })
                    })
                    .catch(() => {
                        
                    });
        },
        fahuo(item){
                this.$dialog.confirm({
                    title: '提示',
                 message: '是否确认已发货?',
                    })
                    .then(() => {
                        this.ajax({
                            url:'index/auction_goods/deliver_goods',
                            data:{
                                id:item.pid
                            }
                        }).then(res=>{
                            this.getdata()
                            this.showtitle('操作成功')
                        })
                    })
                    .catch(() => {
                        
                    });
        },
        getdata(){
            this.ajax({
                url:'index/my/my_sell_order',
                
            }).then(res=>{
                this.data=res.list
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.bottom_text{
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
    font-size: 18px;
    color: red; 
    background: #f2f7f7;
    
}
.right2{
        background: #9a9a9a !important;
    }
.shop-box {
    display: flex;
  
  .lefts{
      height: 100px;
  width: 100px;
  margin: 0 10px 0 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.item-box{
    box-sizing: border-box;
    padding: 45px 0 0 0;
    font-size: 14px;
    .item{
        margin: 0 0 10px 0;
    }
    .top{
        display: flex;
        justify-content: space-between;
        background: white;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 15px;
        .left{
            color: #000;
        }
        .right{
            color: rgb(27,155,210);
        }
    }
    .container{
        background: rgb(242,247,247);
        color: #999;
        display: flex;
        box-sizing: border-box;
        padding: 15px;
        .red{
            color: red !important;
            font-size: 18px;
        }
        .left{
        }
        .right{
            width: 30%;
            display: flex;
            align-items: center;
        }
        .text3{
            .red{
                margin: 0 20px 0 0;
            }
        }
        div{
            line-height: 25px;
        }
        .text2{
            // line-height: 15px;
        }
    }
     .bottom{
        display: flex;
        justify-content: space-between;
        background: white;
        box-sizing: border-box;
        padding: 0 10px;
        height: 50px;
        align-items: center;
        .left{
            color: red;
            font-size: 14px;
        }
        .right{
            background: rgb(27,155,210);
            color: white;
            padding: 0 15px;
            border-radius: 20px;
            height: 30px;
            line-height: 30px;
        }
        .butn2{
            background: rgb(80,187,66);
            padding: 0 15px;
            color: white;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            border-radius: 20px;
        }
        .red{
            color: red;
            font-size: 14px;
        }
        .butn{
            background: rgb(27,155,210);
            color: white;
            padding: 0 15px;
            border-radius: 20px;
            height: 30px;
            line-height: 30px;
        }
    }
}
.choise-style{
     color: rgb(9,146,230) !important;
     border-bottom: 1px solid rgb(9,146,230) !important;
}
    .content{
        background: rgb(236,243,243);
        .tabbar-box{
            border-bottom: 1px solid #eee;
            position: fixed;
            left: 0;
            width: 100%;
            background: white;
            color: #000;
            display: flex;
            box-sizing: border-box;
            padding: 0 10px;
            height: 35px;
            justify-content: space-between;
            .item{
                display: flex;
                align-items: center;
                height: 100%;
                border-bottom: 1px solid transparent;
            }
        }
    }
</style>