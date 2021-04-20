<template>
    <div class="content">
        <headers title="手机注册"/>

        

        <div class="ipt-box">
            <input type="number" v-model="user.phone" placeholder="请输入手机号">
        </div>

         <div class="ipt-box">
            <input type="number" v-model="user.code" placeholder="验证码">
            <div class="getcode" @click="sendCode()">
                {{codetext}}
            </div>
        </div>
        <div class="ipt-box">
            <input type="text" v-model="user.username" placeholder="请输入昵称">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password" placeholder="请输入登录密码">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password2" placeholder="请确认登录密码">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password_jy" placeholder="请输入交易密码">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password_jy2" placeholder="请重复输入交易密码">
        </div>
        <div class="ipt-box">
            <input type="number" v-model="user.yaoqin_code" placeholder="推荐人邀请码(必填)">
        </div>

        <van-popup position="bottom" v-model="tiao_show"> 
            <div class="mypopup-box" >
                <div v-html="tiaokuan">

                </div>
            </div>
        </van-popup>

        <div class="check-box">
            <van-checkbox v-model="checked"></van-checkbox>
            我已阅读并同意
            <span class="blue" @click="gettiaokuan(2)">《用户注册协议》</span>
            及
            <span class="blue" @click="gettiaokuan(1)">《隐私政策》</span>
        </div>

        <div class="butn" @click="submit()">
            注册
        </div>


    </div>
</template>

<script>
export default {
    data(){
        return{
            tiaokuan:'',
            checked:true,
            codetext:'获取验证码',
            tiao_show:false,
            user:{
                yaoqin_code:this.$route.query.p_id||''
            },
            mytoken:this.$route.query.token||''
        }
    },
    methods: {
        gettiaokuan(type){
            
            this.ajax({
                url:'index/publics/get_ag_content',
                data:{
                    type
                }
            }).then(res=>{
                this.tiaokuan=res.info.content
                this.tiao_show=true
                console.log(this.tiaokuan)  
                console.log(res)
            })
        },
        submit(){
            let {user}=this
            if(!user.phone){
                this.showtitle('请输入手机号')
                return
            }
            if(!user.username){
                this.showtitle('请输入昵称')
                return
            }
            if(!user.code){
                this.showtitle('请输入验证码')
                return
            }
            if(!user.password){
                this.showtitle('请输入密码')
                return
            }
            if(user.password!=user.password2){
                this.showtitle('两次输入密码不一致')
                return
            }
             if(!user.password_jy){
                this.showtitle('请输入交易密码')
                return
            }
            if(user.password_jy!=user.password_jy2){
                this.showtitle('两次交易密码输入不一致')
                return
            }
            if(!user.yaoqin_code){
                this.showtitle('请输入邀请码')
                return
            }
             this.ajax({
                url:'index/publics/register',
                data:{
                    mobile:user.phone,
                    code:user.code,
                    password:user.password,
                    invite_code:user.yaoqin_code,
                    nick_name:user.username,
                    trad_password:user.password_jy,
                    token:this.mytoken
                }
            }).then(res=>{
                this.showtitle('注册成功').then(()=>{
                    console.log(res)
                    if(res.data&&res.data.is_wechat){
                        console.log('你来到了首页')
                        localStorage.setItem('login',res.token)
                        this.$router.push('/')
                    }else{
                        this.$router.push('/login')
                    }
                    
                })
            })

        },
         sendCode(){
             let {user}=this
            if(this.codetext!='获取验证码'){
                return
            }
            this.ajax({
                url:'index/publics/send',
                data:{
                    mobile:user.phone
                }
            }).then(res=>{
                    this.codetext=60
            let ti=setInterval(()=>{
                if(this.codetext<=0){
                    this.codetext='获取验证码'
                    clearInterval(ti)
                    return
                }
                this.codetext--
            },1000)
            })
            
        }
    },
}
</script>

<style lang="scss" scoped>
.mypopup-box{
    height: 400px;
    overflow-y: scroll;
    padding: 15px;
}
.blue{
    color: #0a52c1 !important;
}
.check-box{
    margin: 30px 0 0 0;
    display: flex;
}
    .content{
        padding: 120px 20px 0 20px;
    }
    .ipt-box{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
            height: 60px;
        
        input{
            flex: 1;
            height: 100%;
        }
    }
     .getcode{
        color: rgb(10,82,193);
        margin: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .butn{
    margin: 80px 40px 0 40px;
    background: rgb(10,82,193);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
}
</style>