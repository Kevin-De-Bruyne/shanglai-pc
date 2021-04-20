<template>
    <div class="content">
        <headers title="我的收款方式" />
          
          <div class="bg-box">
              <div class="choise-box">
                <div class="item" v-for="(item,index) in tabbar_arr" :key="index"
                :class="{'choise-style':choise_index==index}" @click="choise_index=index"
                >
                    {{item}}
                </div>
            </div>

        <div class="red-text">
            风险提示∶转拍属于C2C交易，资金不经过平台，平台不会自动扣款，需要您手动自行转账给对方，对方才能收到款项。（必须绑定3项收款方式方可参与委拍，资料不规范的，次日会限制抢拍）
        </div>
          </div>

          <template v-if="choise_index==0">
                 
          
         
        <div class="white-box">
            
             <div class="ipt-box">
            <span>所属银行</span>
            <input type="text" v-model="bank.bank_for" placeholder="请输入所属银行">
        </div>
         <div class="ipt-box">
            <span>开户行</span>
            <input type="text" v-model="bank.bank_name" placeholder="请输入开户支行">
        </div>
         <div class="ipt-box">
            <span>银行卡号</span>
            <input type="text" v-model="bank.bank_num" placeholder="请输入银行卡号">
        </div>
         <div class="ipt-box">
            <span>持卡人</span>
            <input type="text" v-model="bank.username" placeholder="请输入持卡人">
        </div>

       <div class="ipt-box">
            <input type="number" v-model="code" placeholder="请输入验证码">
            <div class="getcode" @click="sendcode()">
                {{getcode_text}}
            </div>
          </div>
          
        <!-- <div class="ipt-box">
            <span>手机号</span>
            <input type="number" v-model="phone" placeholder="请输入手机号">
        </div> -->

        <div class="shangchuan-box">
          请上传银行卡照片
      </div>
      <div class="upload-box">
          <div class="img-box"  v-if="bank_card.length">
              <img  :src="bank_card[0].content" @click.stop="bank_upload()" alt="">
              
          </div> 
          <van-uploader  class="card" ref="bank_card" v-else :preview-size="'250px'" v-model="bank_card" max-count="1"  />
      </div>
        </div>
        </template>

         <template v-if="choise_index==1">
         
        <div class="white-box">
             <div class="upload-box">
            <span>支付宝收款码</span>
            <div class="img-box" v-if="fileList_zf.length">
              <img   @click="zhen_upload()" :src="fileList_zf[0].content" alt="">
          </div>
           <van-uploader ref="fileList_zf" v-else v-model="fileList_zf" max-count="1"  />
        </div>
         <div class="upload-box"  >
            <span>微信收款码</span>
            <div class="img-box"  v-if="fileList_wx.length">
              <img  :src="fileList_wx[0].content" @click.stop="fan_upload()" alt="">
              
          </div> 
          <van-uploader  ref="fileList_wx" v-else v-model="fileList_wx" max-count="1"  />   
           
        </div>
        <div class="ipt-box">
            <span>微信账号</span>
            <input type="text" v-model="data.wechat_account" placeholder="请输入微信账号">
            </div>
         <!-- <div class="ipt-box">
            <span>支付宝账号</span>
            <input type="text" placeholder="请输入银行卡号">
        </div>
         <div class="ipt-box">
            <span>真实姓名</span>
            <input type="text" placeholder="请输入收款人">
        </div>
        <div class="ipt-box">
            <span>交易密码</span>
            <input type="password" placeholder="请输入交易密码">
        </div> -->
        </div>
        </template>

         <template v-if="choise_index==2">
         
        <div class="white-box">
             <div class="upload-box">
            <span>微信收款码</span>
           <van-uploader v-model="fileList_wx" max-count="1"  />
        </div>
         <div class="ipt-box">
            <span>微信账号</span>
            <input type="text" placeholder="请输入银行卡号">
        </div>
        <div class="ipt-box">
            <span>交易密码</span>
            <input type="password" placeholder="请输入交易密码">
        </div>
        </div>
        </template>
       

       <div class="butn-box" >
           <div class="butn " @click="choise_index==0?xiugai1():xiugai2()">
            修改
            </div>
        <div class="butn m-l-10" @click="submit()">
          确定
        </div>
    </div>


    </div>
</template>

<script>
export default {
    data(){
        return{
            wxname:'',
            code:'',
            phone:'',
            bank:{},
            fileList_wx:[],
            fileList_zf:[],
            bank_card:[],
            tabbar_arr:['银联','支付宝/微信'],
            choise_index:0,
            getcode_text:'获取验证码',
            data:{}
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        xiugai1(){
            this.bank={}
            this.bank_card=[]
            this.phone=''
        },
         xiugai2(){
           this.fileList_wx=[]
            this.fileList_zf=[]
        },
        zhen_upload(){
            console.log(this.$refs)
            this.fileList_zf.shift()
            this.$nextTick(()=>{
                console.log(this.$refs)
                this.$refs.fileList_zf.chooseFile()
            })
             
        },
        fan_upload(){

                this.fileList_wx.shift()
                console.log(this.$refs)
                try {
                    this.$refs.fileList_wx.chooseFile()
                } catch (error) {
                     this.$nextTick(()=>{
                console.log(this.$refs)
                this.$refs.fileList_wx.chooseFile()
            })
                }
        },
         bank_upload(){

                this.bank_card.shift()
                try {
                    this.$refs.bank_card.chooseFile()
                } catch (error) {
                     this.$nextTick(()=>{
                this.$refs.bank_card.chooseFile()
            })
                }
        },
        getdata(){
            this.ajax({
                url:'index/my/addbank',
                methods:'get'
            }).then(res=>{
                this.data=res.bank
                this.bank.bank_name=this.data.bank_branch
                this.bank.bank_for=this.data.bank_name
                this.bank.bank_num=this.data.bank_num
                this.bank.username=this.data.bank_username
                // this.phone=this.data.bank_phone
                if(this.data.wechat){
                    this.fileList_wx.push({
                    content:this.data.wechat
                })
                }
                if(this.data.bank_img){
                    this.bank_card.push({
                        content:this.data.bank_img
                    })
                }
                if(this.data.zhifubao){
                    this.fileList_zf.push({
                    content:this.data.zhifubao
                })
                }
                
                
            })
        },
         sendcode(){
            let {user}=this
            if(this.getcode_text!='获取验证码'){
                console.log('返回')
                return
            }
             this.ajax({
                url:'index/my/send',
                data:{
                    // mobile:user.phone
                }
            }).then(res=>{
                 this.getcode_text=60
            let ti=setInterval(()=>{
                if(this.getcode_text<=0){
                    this.getcode_text='获取验证码'
                    clearInterval(ti)
                    return
                }
                this.getcode_text--
            },1000)
            })
           
        },
        submit(){
            if(this.choise_index==1){
                this.ajax({
                url:'index/my/bind_qrcode',
                data:{
                    zhifubao:this.fileList_zf[0].content,
                    wechat:this.fileList_wx[0].content,
                     bank_id:this.data.bank_id,
                    wechat_account:this.data.wechat_account,
                }
                }).then(res=>{
                    this.showtitle('修改成功').then(res=>{
                        this.$router.go(-1)
                    })
                })
            }else if(this.choise_index==0){
                let {bank}=this
                this.ajax({
                    url:'index/my/addbank',
                    data:{
                        code:this.code,
                        bank_name:bank.bank_for,
                        bank_branch:bank.bank_name,
                        bank_num:bank.bank_num,
                        bank_username:bank.username,
                        // bank_phone:this.phone,
                        bank_id:this.data.bank_id,
                         bank_img:this.bank_card[0].content
                    }
                }).then(res=>{
                    this.showtitle('添加成功').then(res=>{
                        this.$router.go(-1)
                    })
                })
            }
            
        }
    },
}
</script>

<style lang="scss" scoped>
.shangchuan-box{
    font-size: 16px;
    color: #000;
    margin: 0 0 10px 0;
}
.bg-box{
    background: rgb(246,246,246);
}
.img-box{
    display: flex;
    width: 100px;
    height: 100px;
    img{
        width: 100%;
        max-height: 100%;
        margin: auto;
    }
}
.upload-box{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 15px;
     color: #999;
     font-size: 16px;
     align-items: center;
}
.red-text{
    box-sizing: border-box;
    padding: 0 15px;
    color: red;
    font-size: 16px;
    margin: 0 0 15px 0;
}
.white-box{
    box-sizing: border-box;
    background: white;
    box-sizing: border-box;
    padding: 15px 15px 0 15px;
}
.choise-box{
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    background: rgb(246,246,246);
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
        background: rgb(246,246,246);
        color: rgb(5,82,189);
    }
    .item:last-child{
        border-right: none !important;
        border-radius: 0 6px 6px 0;
    }
}
    .getcode{
        color: rgb(10,82,193);
        margin: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .content{
        min-height: 100vh;
        background: white;
        padding: 70px 0 0 0;
        background: rgb(246,246,246);
    }
    .title{
        color: #000;
        font-size: 16px;
        height: 40px;
    }
    .ipt-box{
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 15px;
        border-radius: 6px;
        
        display: flex;
        height: 60px;
        margin: 0 0 15px 0;
        align-items: center;
        span{
            color: #999;
            margin: 0 20px 0 0;
            min-width: 70px;
        }
        input{
            font-size: 16px;
            flex: 1;
            height: 100%;
            min-width: 100px;
        }
    }
    .butn{
    background: rgb(10,82,193);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
    display: inline-block;
    padding: 0 30px;
    // width: 80%;
    
        margin: 0 auto;
    }
    .butn-box{
        margin: 20px 0 0 0;
        text-align: center;
    }
</style>