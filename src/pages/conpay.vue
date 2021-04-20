<template>
    <div class="content">
        <headers title="确认已付款"/>

        <div class="yellow-title">
            恶意上传假的付款凭证，将做封号处理!!!
        </div>

        <div class="white-box">
            <div class="title">
                选择您的打款方式
            </div>
            <div class="container">

            
            <van-radio-group v-model="radio">
  <van-cell-group>
      <van-cell title="支付宝打款" clickable @click="radio = '1'">
      <template #right-icon>
        <van-radio name="1" />
      </template>
    </van-cell>

    <van-cell title="微信打款" clickable @click="radio = '2'">
      <template #right-icon>
        <van-radio name="2" />
      </template>
    </van-cell>
    
    <van-cell title="银行卡打款" clickable @click="radio = '3'">
      <template #right-icon>
        <van-radio name="3" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
</div>
        </div>
        <div class="white-box">
            <div class="title">
                上传付款凭证
            </div>
            <div class="upload-box">
                <div class="left">
                    付款凭证
                </div>
                <div class="right">
                     <van-uploader v-model="fileList" max-count="1"  />
                </div>
            </div>
        </div>
        <div class="butn" @click="submit()">
            提交
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            fileList:[],
            radio:'1',
            id:this.$route.query.id
        }
    },
    created() {

    },
    methods: {
        submit(){
            if(!this.fileList.length){
                this.showtitle('请先上传支付凭证')
                return
            }
            this.z=true
            this.order_back=true
            console.log(this)
            this.ajax({
                url:'index/auction_goods/pay_auction_goods',
                data:{
                    pay_type:this.radio,
                    order_id:this.id,
                    pay_img:this.fileList[0].content
                }
            }).then(res=>{
                this.showtitle('提交成功，请等待卖家审核').then(res=>{
                    this.$router.push('/order_buy')
                })
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.upload-box{
   display: flex;
   justify-content: space-between;
   box-sizing: border-box;
   padding: 15px;
   .left{
       display: flex;
       align-items: center;
   }
}
 .butn{
    background: rgb(05,82,189);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
    padding: 0 10px;
        margin: 50px 50px;
    }
    /deep/ .van-cell{
        line-height: 50px;
    }
.content{
    background: rgb(237,243,243);
}
    .yellow-title{
        background: rgb(252,250,223);
        color: #886d50;
        box-sizing: border-box;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
    }
    .white-box{
        margin: 10px 0 0 0;
        background: white;
        border-radius: 6px;
        .title{
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            color: #886d50;
        }
        .container{
            box-sizing: border-box;
            padding: 0 20px;
        }
    }

</style>