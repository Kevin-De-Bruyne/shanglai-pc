<template>
    <div class="content">
        <headers title="拍品详情" />
         <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="items" v-for="(item,index) in data.rotation_chart_img" :key="index">
          <img :src="item" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="white-box">
        <div class="text1">
           {{data.goods_name}}
        </div>
        <div class="text2">
            ￥{{data.goods_price}}
        </div>
        <div class="text3-box">
            <div class="left">
                库号: {{data.w_num}}
            </div>
            <div class="right">
                规格:{{data.spec}}
            </div>
        </div>
    </div>

    <template v-if="data.detail">
        <div class="tuwen-title">
        图文详情
    </div>
    <div class="tuwen-detail" v-html="data.detail">
        
    </div>
    </template>

    

    <div class="bottom-box">
        <div class="butn" @click="buyshop()">
            抢拍
    </div>
    </div>

    
    </div>
</template>

<script>
export default {
    created () {
      this.getdata()
    //   this.getuser()
    },
    data(){
        return{
            id:this.$route.query.id,
            data:{},
            is_p:''
        }
    },
    methods: {
        buyshop(){
            if(this.is_p==1){
                this.showtitle('余额不足')
                return 
            }
            this.ajax({
                url:'index/auction_goods/buy_auction_goods',
                data:{
                    id:this.data.id
                }
            }).then(res=>{
                this.showtitle('抢拍成功,请去我的买单查看').then(res=>{
                    // this.order_backtoTrue()
                    this.$router.replace('/order_buy')
                })
            }).catch(err=>{
               this.showtitle(err.message||err.data.message)
            })
        },
        getdata(){
            this.ajax({
                url:'index/auction_goods/auction_goods_detail',
                data:{
                    id:this.id
                }
            }).then(res=>{
                this.data=res.list
               
            }).catch(err=>{
             console.log(err)
             let msg=err.message||err.msg||err.data.message||err.data.msg
             if(msg=='你还未实名认证,请先认证后再抢拍'){
                 this.$dialog.confirm({
                    title: '提示',
                    message: '依《尚来拍卖》相关要求，会员必须实名认证才可进行购买。',
                    })
                    .then(() => {
                        this.$router.push('/wanshan')
                    })
                    .catch(() => {
                        this.$router.go(-1)
                    });
             }
            // this.showtitle(msg).then(res=>{
            //     this.$router.go(-1)
            // })
            })
        },
        getuser(){
            this.ajax({
                url:'index/my/user_info'
            }).then(res=>{
                if(res.user.is_certification){
                    return
                }
                   
            })
        }
    },
}
</script>

<style lang="scss" scoped>

.tuwen-title{
    text-align: center;
    line-height: 50px;
    background: white;
    margin: 5px 0 5px 0;
    font-size: 16px;
    color: #000;
}
.tuwen-detail{
    box-sizing: border-box;
    padding: 10px;
    background: white;
    // margin: 5px 0;
    /deep/img{
        max-width: 100%;
        max-height: 100%;
        
    }
}
.bottom-box{
   position: fixed;
   bottom: 15px;
   left: 50%;
   box-shadow: 4px 1px 10px rgba(0,0,0,.4);
   transform: translateX(-50%);
   width: 95%;
   background: rgb(255,180,1);
   color: #000;
   font-size: 18px;
   height: 50px;
   line-height: 50px;
   text-align: center;

}
.content{
    min-height: 100vh;
    background: rgb(237,243,245);
    box-sizing: border-box;
    padding: 50px 0 80px 0;
}
.white-box{
    background: white;
    box-sizing: border-box;
    padding: 15px;
    .text1{
        line-height: 25px;
        font-size: 18px;
        color: rgb(57,58,60);
        margin: 0 0 5px 0;
    }
    .text2{
        color: rgb(253,98,108);
        font-size: 18px;
        margin: 0 0 15px 0;
    }
    .text3-box{
        display: flex;
        div{
            flex: 1;
            color: rgb(164,166,171);
            font-size: 14px;
        }
    }
}

    .my-swipe{
       font-size: 0;
        /deep/.van-swipe__track{
             display: flex;
        align-items: center;
        justify-content: center;
        }
        img{
            // object-fit: contain;
            width: 100%;
            height: 100%;
            // display: none;
            // max-width: 50% !important;
            // height: auto;
            // width: 100%;
        }
    }
    .items{
        display: flex;
        background: rgb(243,243,243);
    }
</style>