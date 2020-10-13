<template>
    <div class="content">
        <headers title="完善资料" />

        <van-steps :active="active">
            <van-step :click-step="change_step" v-for="(item,index) in time_bar" :key="index">{{item}}</van-step>
        </van-steps>
     
      <template v-if="active==0">
           <div class="title">
          第一步:完成实名认证
      </div>
          <div class="ipt-box">
          <span>真实姓名</span>
          <input v-model="user.card_name" type="text" placeholder="请输入真实姓名">

      </div>
       
        <div class="ipt-box">
          <span>身份证</span>
          <input type="text" v-model="user.card" placeholder="请输入身份证">
      </div>
      <div class="shangchuan-box">
          请上传身份证正面照
      </div>
      <div class="upload-box">
          <van-uploader  class="card" :preview-size="'250px'" v-model="fileList_card_zheng" max-count="1"  />
      </div>
       
       <div class="shangchuan-box">
          请上传身份证反面照
      </div>
      <div class="upload-box">
          <van-uploader class="card" :preview-size="'250px'" v-model="fileList_card_fan" max-count="1"  />
      </div>
        
      </template>

      <!-- <template v-if="active==1">
        <div class="title">
          第二步:绑定交易密码
      </div>
          <div class="ipt-box">
          <input type="number" v-model="user.code" placeholder="请输入验证码">
          <div class="getcode">
              获取验证码
          </div>
      </div>
       
        <div class="ipt-box">
          <span>交易密码</span>
          <input type="text" maxlength="6" v-model="user.password_jy" placeholder="请输入6位交易密码">
      </div>
      <div class="ipt-box">
          <span>重复密码</span>
          <input type="text" maxlength="6" v-model="user.password_jy2" placeholder="请输入重复密码">
      </div>
      </template> -->

      <template v-if="active==1">
          <div class="title">
            第二步:绑定银行卡
          </div>
          <div class="ipt-box">
            <span>温馨提示:必须绑定实名认证本人的银行卡</span>
          </div>
          
       <div class="ipt-box">
          <span>所属银行</span>
          <input type="text" v-model="user.bank_for" placeholder="请输入所属银行">
      </div>
        <div class="ipt-box">
          <span>开户行</span>
          <input type="text" v-model="user.bank_name" placeholder="请输入开户银行名称">
      </div>
      <div class="ipt-box">
          <span>银行卡号</span>
          <input type="text" v-model="user.bank_card" placeholder="请输入银行卡号">
      </div>
      <div class="ipt-box">
          <span>持卡人</span>
           <input type="text" v-model="user.bank_username" placeholder="请输入收款人姓名">
      </div>
       <div class="ipt-box">
            <input type="number" v-model="user.code" placeholder="请输入验证码">
            <div class="getcode" @click="sendcode()">
                {{getcode_text}}
            </div>
          </div>
      <!-- <div class="ipt-box">
          <span>手机号码</span>
          <input type="text" v-model="user.bank_phone" placeholder="请输入持卡人手机号码">
      </div> -->
      <div class="shangchuan-box">
          请上传银行卡照片
      </div>
      <div class="upload-box">
          <van-uploader  class="card" :preview-size="'250px'" v-model="bank_card" max-count="1"  />
      </div>
      <!-- <div class="title">
          银行卡照片上传
      </div>
      <div class="upload-box">
         <van-uploader v-model="fileList_yinhang" max-count="1"  />
      </div> -->
      </template>

      <template v-if="active==2">
          <div class="title">
          第三步:绑定支付宝
      </div>
      <div class="ipt-box">
        温馨提示∶必须上传支付宝收款码，若不合格，审核失败将被限制拍卖
      </div>
      <div class="title">
          支付宝收款码
      </div>
      <div class="upload-box">
          <van-uploader v-model="fileList_zhifubao" max-count="1"  />
      </div>
          <!-- <div class="ipt-box">
          <span>支付宝账号</span>
          <input type="text" v-model="user.zhifubao" placeholder="请输入支付宝账号">
      </div>
       
        <div class="ipt-box">
          <span>支付宝姓名</span>
          <input type="text" v-model="user.zhifubao_name" placeholder="请输入支付宝姓名">
      </div> -->
     
      </template>

      <template v-if="active==3">
          <div class="title">
          第四步:绑定微信
      </div>
      <!-- <div class="ipt-box">
        温馨提示∶请严格按照提示金额进行捐助
      </div> -->
      <div class="title">
          微信收款码
      </div>
      <div class="uoload-box">
          <van-uploader v-model="fileList_wx" max-count="1"  />
      </div>
          <!-- <div class="ipt-box">
          <span>微信账号</span>
          <input type="text" v-model="user.wx" placeholder="请输入微信账号">
      </div>
       
        <div class="ipt-box">
          <span>微信姓名</span>
          <input type="text" v-model="user.wx_name" placeholder="请输入微信姓名">
      </div> -->
     
      </template>

      <template v-if="active==4">
          <div class="auto-box">
              <div class="ok-icon">
                  <span class="iconfont icon-tick"></span>
              </div>
              <div>
                  恭喜!您已成功完善资料
              </div>
          </div>
      </template>

      
    <div class="butn-box">
        <div class="butn" @click.stop="next()">
         {{active==0?'验证身份,并继续':'确认提交,下一步'}}
        </div>
        <div  class="prav-box butn" @click.stop="prav()" v-show="active!=0">
            上一步
        </div>
    </div>
     

    </div>
</template>

<script>

import BScroll from "better-scroll";
let token=localStorage.getItem('login')
export default {
    data(){
        return{
            active:0,
            time_bar:['实名认证','绑定银行卡','绑定支付宝','绑定微信','完成'],
            fileList_yinhang:[],
            fileList_zhifubao:[],
            fileList_wx:[],
            fileList_card_zheng:[],
            fileList_card_fan:[],
            bank_card:[],
            scrollLeft:0,
            steps:null,
            user:{},
            getcode_text:'获取验证码'
        }
    },
    mounted () {
        token=localStorage.getItem('login')
        this.$nextTick(()=>{
            this.steps=document.querySelector('.van-steps')
            this.steps.onscroll=(e)=>{
            console.log(this.steps.scrollLeft)
        // this.steps.scrollLeft=0
        }
        })
        
        console.log(this.steps)
        
    },
    methods: {
        prav(){
            if(this.active==0){
                return
            }
            this.active--
            this.steps.scrollTo(150*this.active,0)
        },
        change_step(e){
            console.log(e)
        },
        next(){
            if(this.active<3){
                if(this.active==0&&this.user.card_name){
                    this.$dialog.confirm({
  title: '提示',
  message: '真实姓名无法修改，请谨慎提交',
  confirmButtonText:'知道了，下一步',
  cancelButtonText:'再检查一遍'
})
  .then(() => {
      this.active++
    this.steps.scrollTo(150*this.active,0)
                return
  })
  .catch(() => {
    // on cancel
  });
  return
                }
                this.active++
                this.steps.scrollTo(150*this.active,0)
                return
            }
            let {user} = this
            console.log(user)
            
            if(!user.card_name){
                this.showtitle('请输入真实姓名')
                return
            }
            if(!user.card){
                this.showtitle('请输入身份证')
                return
            }
            if(this.fileList_card_zheng.length==0){
                this.showtitle('请上传身份证正面照')
                return
            }
            if(this.fileList_card_fan.length==0){
                this.showtitle('请上传身份证反面照')
                return
            }
            // if(!user.code){
            //     this.showtitle('请输入验证码')
            //     return
            // }

            // if(!user.password_jy){
            //     this.showtitle('请输入交易密码')
            //     return
            // }
            // if(!user.password_jy){
            //     this.showtitle('请输入交易密码')
            //     return
            // }
            // if(!user.password_jy2!=user.password_jy){
            //     this.showtitle('两次输入密码不一致')
            //     return
            // }
             
            // if(!user.code){
            //     this.showtitle('请输入验证码')
            //     return
            // }
            if(!user.bank_for){
                this.showtitle('请输入所属银行')
                return
            }
             if(!user.bank_name){
                this.showtitle('请输入开户行')
                return
            }
             if(!user.bank_card){
                this.showtitle('请输入银行卡号')
                return
            }
             if(!user.bank_username){
                this.showtitle('请输入持卡人')
                return
            }
            //  if(!user.bank_phone){
            //     this.showtitle('请输入持卡人手机号码')
            //     return
            // }
             if(!this.fileList_zhifubao.length){
                this.showtitle('请上传支付宝收款码')
                return
            }
             if(!this.fileList_wx){
                this.showtitle('请上传微信收款码')
                return
            }
            
            this.ajax({
                url:'index/my/real_name_authentication',
                data:{
                    token,
                    id_card_no:user.card, //身份证号码
                    positive:this.fileList_card_zheng[0].content, //身份证正面
                    other_side:this.fileList_card_fan[0].content, //身份证反面
                    real_name:user.card_name, //身份证姓名
                    code:user.code, //短信验证码
                    bank_name:user.bank_for, //所属银行
                    bank_branch:user.bank_name,
                    bank_num:user.bank_card, //银行卡号码
                    bank_username:user.bank_username, // 银行持卡人
                    // bank_phone:user.bank_phone, //银行卡手机号码
                    zhifubao:this.fileList_zhifubao[0].content, //支付宝收款码
                    wechat:this.fileList_wx[0].content, //微信收款码
                    bank_img:this.bank_card[0].content,
                }
            }).then(res=>{
                this.active++
                    this.showtitle('申请成功').then(res=>{
                            // this.$router.go(-1)
                })
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
           
        }
    }
}
</script>

<style lang="scss" scoped>
.shangchuan-box{
    font-size: 16px;
    color: #000;
    margin: 0 0 10px 0;
}
.card {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 320px;
    // height: 200px;
// /deep/.van-uploader__wrapper{
//     width: 100%;
//     height: 100%;
//     // min-width: 320px;
//     // min-height: 200px;
//     // max-width: 100%;
//     //     max-height: 100%;
//     /deep/.van-uploader__upload{
//         width: 100%;
//         height: 100%;
//         // min-width: 100%;
//         // min-height: 100%;
//         // max-width: 100%;
//         // max-height: 100%;
//     }
// }
/deep/.van-uploader__preview{
    width: 100%;
    height: 100%;
    /deep/img{
        height: 100%;
    }
}
/deep/ .van-uploader__preview-image{
    width: 100%;
    height: 100%;
}
}
.upload-box{
    text-align: center;
}
.auto-box{
   margin: 100px auto 0 auto;
   text-align: center;
   font-size: 18px;
   color: #999;
   .ok-icon{
       
       background: rgb(57,181,74);
       text-align: center;
       width: 60px;
       height: 60px;
       line-height: 60px;
       color: white;
       border-radius: 50%;
       margin: 0 auto 50px auto;
       .iconfont{
       font-size: 40px;
       }
   }
}
.content{
/deep/.van-step{
   width: 150px;
   flex:  1 0 auto;
}
/deep/.van-steps{
    transition: all .2s ease;
   overflow: scroll;
}
/deep/.van-step--horizontal:last-child{
    position: static !important;
}
/deep/.van-step--horizontal:last-child .van-step__circle-container{
    right: auto;
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
        padding: 70px 15px 100px 15px;
        
    }
    .title{
        color: #000;
        font-size: 16px;
        height: 40px;
    }
    .ipt-box{
        font-size: 16px;
        background: rgb(249,249,249);
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
    background: rgb(0,129,255);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
    display: inline-block;
    padding: 0 10px;
    left: 50%;
        margin: 0 auto;
    }
    .butn-box{
        margin: 20px 0 0 0;
        text-align: center;
    }
</style>