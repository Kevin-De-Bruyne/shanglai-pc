<template>
    <div class="content">
        <headers title="实名认证" />

        
      
     

      

      <template v-if="active==0">
          <div class="ipt-box">
          <span>真实姓名</span>
          <input v-model="user.card_name" readonly =“readonly” type="text" placeholder="请输入真实姓名">
      </div>
       
        <div class="ipt-box">
          <span>身份证</span>
          <input type="text" v-model="user.card" placeholder="请输入身份证">
      </div>
      <div class="shangchuan-box">
          请上传身份证正面照
      </div>
      <div class="upload-box">
          <div class="img-box" v-if="fileList_card_zheng.length">
              <img   @click="zhen_upload()" :src="fileList_card_zheng[0].content" alt="">
          </div>
          
          <van-uploader v-show="!fileList_card_zheng.length"  class="card" :preview-size="'250px'" ref="card_zhen" v-model="fileList_card_zheng" max-count="1"  />
      </div>
       
       <div class="shangchuan-box">
          请上传身份证反面照
      </div>
      <div class="upload-box">
          <div class="img-box" v-if="fileList_card_fan.length">
               <img  @click="fan_upload()" :src="fileList_card_fan[0].content" alt="">
          </div>
          <van-uploader ref="card_fan" v-show="!fileList_card_fan.length" :preview-size="'250px'" class="card" v-model="fileList_card_fan" max-count="1"  />
      </div>
        
      </template>

      
    <div class="butn-box">
        <div class="butn p-l-20 p-r-20" @click.stop="next()">
         确定
        </div>
        <div class="butn m-l-10 p-l-20 p-r-20" @click.stop="xiugai()">
         修改
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
            scrollLeft:0,
            steps:null,
            user:{},
            getcode_text:'获取验证码',
            data:{}
        }
    },
    mounted () {
        this.getdata()
        token=localStorage.getItem('login')
       
        
        console.log(this.steps)
        
    },
    methods: {
        xiugai(){
            this.user.card=''
            this.fileList_card_zheng=[]
            this.fileList_card_fan=[]
        },
        zhen_upload(){
            this.fileList_card_zheng.shift()
            this.$nextTick(()=>{
                this.$refs.card_zhen.chooseFile()
            })
             
        },
        fan_upload(){
            console.log(this.$refs)
            this.fileList_card_fan.shift()
            this.$nextTick(()=>{
                this.$refs.card_fan.chooseFile() 
            })
            
        },
        getdata(){
            this.ajax({
                url:'index/my/real_name_authentication_page'
            }).then(res=>{
                this.data=res.info
                this.user.card_name=this.data.real_name
                this.user.card=this.data.id_card_no
                if(this.data.positive){
                    this.fileList_card_zheng.push({
                    content:this.data.positive
                })
                }
                if(this.data.other_side){
                    this.fileList_card_fan.push({
                    content:this.data.other_side
                })
                }
                console.log(this.fileList_card_zheng)
            })
        },
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
            let {user} = this
            console.log(user)
            
            // if(!user.card_name){
            //     this.showtitle('请输入真实姓名')
            //     return
            // }
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
           
            this.ajax({
                url:'index/my/real_name_authentication_update',
                data:{
                    token,
                    id_card_no:user.card, //身份证号码
                    positive:this.fileList_card_zheng[0].content, //身份证正面
                    other_side:this.fileList_card_fan[0].content, //身份证反面
                    id:this.data.id
                }
            }).then(res=>{
                    this.showtitle('修改成功').then(res=>{
                            this.$router.go(-1)
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
                url:'index/publics/send',
                data:{
                    // mobile:user.phone
                }
            }).then(res=>{
                 this.getcode_text=60
            let ti=setInterval(()=>{
                if(this.codetext<=0){
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
.img-box{
    display: flex;
    img{
        width: 100%;
        max-height: 200px;
        margin: auto;
    }
}
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
//     /deep/.van-uploader__upload{
//         width: 100%;
//         height: 100%;
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