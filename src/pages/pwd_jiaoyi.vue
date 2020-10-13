<template>
    <div class="content">
        <headers title="重置交易密码"/>

         <div class="ipt-box">
            <input type="number" v-model="user.code" placeholder="验证码">
            <div class="getcode" @click="sendCode()">
                {{codetext}}
            </div>
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password" placeholder="请输入交易密码">
        </div>
        <div class="ipt-box">
            <input type="password" v-model="user.password2" placeholder="请确认交易密码">
        </div>

        <div class="butn" @click="submit()">
            确认
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            codetext:'获取验证码',
            user:{}
        }
    },
    methods: {
        submit(){
             let {user}=this
             if(!user.code){
                this.showtitle('请输入验证码')
                return
            }
            if(!user.password){
                this.showtitle('请输入交易密码')
                return
            }
            if(user.password!=user.password2){
                this.showtitle('两次输入密码不一致')
                return
            }
            this.ajax({
                url:'index/my/edit',
                data:{
                    key:'trad_password',
                    value:user.password
                }
            }).then(res=>{
                this.showtitle('修改成功').then(res=>{
                    this.$router.go(-1)
                })
            })
        },
        sendCode(){
            let {user}=this
            if(this.codetext!='获取验证码'){
                return
            }
             this.ajax({
                url:'index/my/send',
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