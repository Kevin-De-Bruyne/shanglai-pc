<template>
    <div class="content" v-if="data.order">
        <headers title="购买委拍商品" />
        <van-steps :active="active">
            <van-step v-for="(item,index) in time_bar" :key="index">{{item}}</van-step>
        </van-steps>
        
        <div class="white-box">
            <div class="title">
                付款给卖家以下金额
            </div>
            <div class="blue-bg" v-if="data.order">
                <div class="left">
                    <div class="text1">
                        ￥{{data.order.pay_money}}
                    </div>
                    <div class="text2" @click="copy(data.order.pay_money)">
                        <span class="iconfont icon-copy"></span>
                        点击复制转账金额
                    </div>
                    <div class="text3">
                        请在
                        <van-count-down :time="times" />
                        分钟内付款给卖家
                    </div>
                </div>
                <div class="right">
                    <div class="call">联系方式</div>
                    <!-- <span class="iconfont icon-dianhua2"></span> -->
                    <div class="m-t-10">
                       真实姓名: {{data.u_info.real_name}}
                    </div>
                    <div class="m-t-10" v-if="data.u_info.mobile">
                        手机号码:
                        {{data.u_info.mobile}}
                         <span class="iconfont icon-copy"  @click="copy(data.u_info.mobile)"></span>
                    </div>
                </div>
            </div>
            <div class="yellow-div">
                第一步:点击付款金额，自动复制到粘贴板，方便粘贴便用，或者记住此单付款金额!
            </div>
          
            
            <div class="title-box">
                请选择以下账号自行转账
                <span class="red">
                    (选择其中一种方式付款即可)
                </span>
            </div>
            <div class="choise-box">
                <div class="item" v-for="(item,index) in choise_arr" :key="index"
                :class="{'choise-style':choise_index==index}" @click="choise_index=index"
                >
                    {{item}}
                </div>
            </div>

            <div class="zhifubao-box" v-if="choise_index==0">
                <div class="title-zhifubao">
                    <img  class="title-img" src="../assets/zhifubao.png" alt="">
                支付宝
                </div>
                <div class="container">
                    <!-- <div class="left-box">
                        <div class="text1">
                           <div class="left">
                               账号类型
                           </div>
                           <div class="right">
                               支付宝
                           </div>
                        </div>
                        <div class="text2">
                            <div class="left">
                                账号姓名
                            </div>
                            <div class="right">
                                末秋的一朵海棠花
                            </div>
                        </div>
                    </div> -->
                    <div class="right-box" @click="img_show=true">
                        <img :src="data.info.zhifubao" alt="">
                    </div>
                </div>
                
            </div>

             <div class="zhifubao-box" v-if="choise_index==1">
                <div class="title-zhifubao">
                    <img class="title-img" src="../assets/yinhang.png" alt="">
                银行卡
                </div>
                <div class="container">
                    <div class="left-box w-100">
                        <div class="text1">
                           <div class="left">
                               银行类型
                           </div>
                           <div class="right">
                               {{data.info.bank_name}}
                               <span class="iconfont icon-copy" @click="copy(data.info.bank_name)"></span>
                           </div>
                           
                        </div>
                        <div class="text2">
                            <div class="left">
                                账户号码
                            </div>
                            <div class="right">
                                {{data.info.bank_num}}
                                <span class="iconfont icon-copy" @click="copy(data.info.bank_num)"></span>
                            </div>
                        </div>
                        <div class="text2">
                            <div class="left">
                                持卡人
                            </div>
                            <div class="right">
                                {{data.info.bank_username}}
                                <span class="iconfont icon-copy" @click="copy(data.info.bank_username)"></span>
                            </div>
                            
                        </div>
                        <div class="text2">
                            <div class="left">
                                银行手机号码
                            </div>
                            <div class="right">
                                {{data.info.bank_phone}}
                                 <span class="iconfont icon-copy" @click="copy(data.info.bank_phone)"></span>
                            </div>
                           
                        </div>
                    </div>
                    <!-- <div class="right-box" @click="img_show=true">
                        <img :src="data.info.zhifubao" alt="">
                    </div> -->
                </div>
                
                
            </div>

            <div class="zhifubao-box" v-if="choise_index==2">
                <div class="title-zhifubao">
                    <img class="title-img" src="../assets/weixin.png" alt="">
                微信
                </div>
                <div class="container">
                    <div class="right-box" @click="img_show2=true">
                        <img :src="data.info.wechat" alt="">
                    </div>
                </div>
              
                
            </div>
              <div class="gray-bg">
                <div class="fengxian-box">
                <div class="title1">
                    风险提示!
                </div>
                <div class="nei-box">
                    <div class="text1">
                        支付时若发现<span class="qian-red">卖家收款码姓名</span>与<span class="qian-red">收款人实名信息不符</span>
                        或者 <span class="qian-red">提示异常</span>,请及时与<span class="qian-red">卖家确认是否为本人上传的可用账号</span>,
                        或者更换与姓名相符的收款码。避免资金受损。
                    </div>
                    <div class="text2 m-b-10 m-t-10">
                        付款后，请点击&nbsp;“确认已付款”&nbsp;按钮，并上传付款凭证!
                    </div>
                    <div class="text3">
                        订单状态变为&nbsp; <span class="qian-red">已付款，等待卖家发货</span>&nbsp;后,可提醒卖家确认收款并发货。
                    </div>
                </div>
            </div>
            </div>
            <div class="yellow-div" v-if="choise_index!=3">
                    第二步:点击收款码图片放大，并保存，在支付宝"扫一扫"中打开相册选择对应图片识别付款
                </div>
        </div>
        <template v-if="choise_index==3">
             <van-coupon-cell   
  :coupons="youhui_arr"
  :chosen-coupon="chosenCoupon"
  @click="youhui_show = true"
/>
        </template>

        <div class="bottom-filex">
            <div class="butn1" @click="fukuan()">
                点我，确认已付款
            </div>
            <div class="butn2">
                最后一步:点击左侧按钮，确认已付款
            </div>
        </div>

      
<!-- 优惠券列表 -->
<van-popup
  v-model="youhui_show"
  round
  position="bottom"
  style="height: 90%; padding-top: 4px;"
>
  <van-coupon-list
    :coupons="youhui_arr"
    :chosen-coupon="chosenCoupon"
    :disabled-coupons="[]"
    @change="onChange"
    @exchange="onExchange"
    :show-exchange-bar="false"
  />
</van-popup>

        <van-image-preview v-model="img_show"  :images="[data.info.zhifubao]">
            
        </van-image-preview>
        <van-image-preview v-model="img_show2"  :images="[data.info.wechat]">
            
        </van-image-preview>

        <van-action-sheet v-model="mianban_show" :actions="actions" @select="onSelect" 
        cancel-text="取消"
  close-on-click-action
         />
    </div>
</template>

<script>

export default {
    data(){
        return{
            img_show2:false,
            chosenCoupon:-1,
            youhui_show:false,
            add_onece:false,
            actions:[{name:'保存到相册'}],
            mianban_show:false,
            img_show:false,
            img_zhifu:[require('../assets/zhifubao.png')],
            active:1,
            time_bar:['下订单','去线下付款','点击已付款','待放货'],
            choise_arr:['支付宝','银联','微信','抵用卷'],
            choise_index:1,
            data:{},
            id:this.$route.query.id,
            youhui_arr:[],
            times:''
        }
    },
    watch: {
        img_show(news,old){
            if(news){
                this.mianban_show=true
            }
            if(news&&!this.add_onece){
                console.log(123123123123)
                this.add_onece=true
                let vanImg,timer
                this.$nextTick(()=>{
                    let vanImg=document.querySelector('.van-image-preview')
                    vanImg.addEventListener('touchstart',()=>{
                        timer=setTimeout(()=>{
                            this.mianban_show=true
                        },1000)
                    })
                    vanImg.addEventListener('touchend',()=>{
                        clearTimeout(timer)
                    })
                })
            }
        },
        img_show2(news,old){
            if(news){
                this.mianban_show=true
            }
            if(news&&!this.add_onece){
                console.log(123123123123)
                this.add_onece=true
                let vanImg,timer
                this.$nextTick(()=>{
                    let vanImg=document.querySelector('.van-image-preview')
                    vanImg.addEventListener('touchstart',()=>{
                        timer=setTimeout(()=>{
                            this.mianban_show=true
                        },1000)
                    })
                    vanImg.addEventListener('touchend',()=>{
                        clearTimeout(timer)
                    })
                })
            }
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/auction_goods/pay_auction_goods_page',
                data:{
                    order_id:this.id
                }
            }).then(res=>{
                this.data=res
                let times=null
                console.log(this.data.order)
                
                let endtime=Number(this.data.order.create_time)+Number(this.data.stream_beat_time)
                
                 times=Number(endtime.toString()+'000')
                let date= new Date().getTime()
                console.log(times,date)
                this.times=times-date

                // let z= s.toString()
                console.log(this.times)
                // console.log(item.times)
                
                let obj={}
                this.data.or.forEach(item=>{
                     obj = {
                available: 1,
                condition: item.money,
                reason: '',
                value: this.data.order.pay_money*100,
                name: item.name,
                startAt: item.use_start_time,
                endAt: item.use_end_time,
                valueDesc: String(item.money),
                unitDesc: '元',
                    };
                    this.youhui_arr.push(obj)         
                })

                

            })
        },
        onChange(index){
            this.youhui_show = false;
      this.chosenCoupon = index;
        },
        onExchange(index) {
      this.youhui_show = false;
      this.chosenCoupon = index;
    },
    exchange(index){
    this.chosenCoupon = index;
    },
saveImage(imgurl){
   if(!window.plus) return;
  		plus.gallery.save(imgurl,  ()=> {
			plus.nativeUI.alert("保存图片到相册成功");
		},function(){
			plus.nativeUI.alert("保存失败");
		}); 
},
        onSelect(e){
            if(this.img_show){
                this.saveImage(this.data.info.zhifubao)
            }else if(this.img_show2){
                this.saveImage(this.data.info.wechat)
            }
           
            console.log(e)
        },
        fukuan(){
            if(this.choise_index==4&&this.chosenCoupon==-1){
                this.showtitle('请选择抵用卷')
                return
            }
            let id=''
            try {
                 id=this.data.or[this.chosenCoupon].id
            } catch (error) {
                
            }
            
            if(this.choise_index==3){ //优惠券购买，直接请求接口，跳转订单页
                this.ajax({
                    url:'index/auction_goods/pay_auction_goods',
                    data:{
                        pay_type:4,
                        or_id:id,
                        order_id:this.id,
                    }
                }).then(res=>{
                    this.showtitle('支付成功').then(res=>{
                        this.$router.replace('/order_buy')
                    })
                })
            }else{
                this.$router.push('/conpay?id='+this.id)
            }
            
        },
         copy (text) {
    let textarea=document.createElement('textarea')
    textarea.innerHTML=text
    document.body.append(textarea)
    textarea.select();
    var show = document.execCommand("Copy");
    textarea.remove();
    // const copyInput = document.querySelector('#copy_text');
    // copyInput.value = content;
    // copyInput.select();
    // var show = document.execCommand('Copy');
    this.showtitle('复制成功')
    return show;
        }
    },
}
</script>

<style lang="scss" scoped>
.title-img{
    width: 25px;
    height: 25px;
}
.w-100{
    width: 100% !important;
}
.text3{
    /deep/ .van-count-down{
 display: inline-block;
}
}
.fengxian-box{
    background: white;
    
    color: #000;
    
    font-size: 14px;
    box-sizing: border-box;
    padding:  15px;
    .title1{
        color: red;
        margin: 0 0 40px 0;
    }
}
.gray-bg{
    background: rgb(239,243,246);
    box-sizing: border-box;
    padding: 15px 0;
}
.qian-red{
    color: red !important;
}
.call{
    font-size: 18px;
    font-weight: bold;
}
.title-zhifubao{
   color: #000;
   font-size: 14px;
   border-bottom: 1px solid #eee;
   box-sizing: border-box;
   padding: 0 10px;
   height: 40px;
   line-height: 40px;
}
.bottom-filex{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    height: 50px;
    width: 100%;
    z-index: 99;
    .butn1{
        font-size: 16px;
        flex: 1;
        height: 100%;
        background: rgb(0,127,247);
        color: white;
        text-align: center;
        line-height: 50px;
    }
    .butn2{
        font-size: 14px;
        flex: 1;
        height: 100%;
        line-height: 18px;
        box-sizing: border-box;
        padding: 10px 10px;
        background: white;
        color: rgb(0,127,247);
    }
}
.zhifubao-box{
    img{
       vertical-align: middle;
      
   }
   .container{
       display: flex;
       .left-box{
           width: 70%;
           box-sizing: border-box;
           padding: 10px 40px 0 10px;
           line-height: 30px;
           .text1{
               display: flex;
               justify-content: space-between;
               
           }
           .text2{
               display: flex;
               justify-content: space-between;
           }
           .left{
                color: #999;
           }
           .right{
               color: #000;

           }
       }
       .right-box{
           width: 100px;
           height: 130px;
           display: flex;
           img{
               margin: auto;
            //    width: 100%;
            //    height: 100%;
           }
       }
   }
}
.choise-box{
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    background: rgb(236,243,240);
    .choise-style{
        color: white !important;
        background: rgb(5,82,189) !important;
    }
    .item:first-child{
        border-radius: 6px 0 0 6px;
    }
    .item{
        height: 40px;
        line-height: 40px;
        border-right: 1px solid rgb(5,82,189);
        flex: 1;
        text-align: center;
        background: rgb(236,243,243);
        color: rgb(5,82,189);
    }
    .item:last-child{
        border-right: none !important;
        border-radius: 0 6px 6px 0;
    }
}
    .content{
        background: rgb(239,240,246);
        min-height: 100vh;
        padding: 70px 0 70px 0 !important;
    }
    .yellow-div{
        background: rgb(252,250,223);
        color: rgb(136,109,80);
        box-sizing: border-box;
        padding: 10px;
    }
    .title-box{
        box-sizing: border-box;
        padding: 0 0 0 10px;
        height: 40px;
        line-height: 40px;

    }
    .red{
        color: red !important;
    }
    .white-box{
        margin: 15px 0 0 0;
        background: white;
        .title{
            font-size: 14px;
            color: #000;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            padding: 0 10px;
        }
        .blue-bg{
            background: rgb(0,129,251);
            display: flex;
            color: white;
            box-sizing: border-box;
            padding: 30px 10px 20px 10px;
            font-size: 14px;
            .left{
                flex: 1;
                .text1{
                    font-size: 34px;
                    font-weight: bold;
                    margin: 0 0 10px 0;
                }
                .text2{
                    margin: 0 0 5px 0;
                }
            }
            .right{
                text-align: center;
                 .iconfont{
                     font-size: 24px;
                 }
            }
        }
    }
</style>