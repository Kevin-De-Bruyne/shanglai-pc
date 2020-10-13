<template>
    <div class="content">
        <headers title="完善信息"/>

        <div class="ipt-box">
            <input type="number" v-model="user.phone" placeholder="请输入联系人手机号码">
        </div>

        <!-- <div class="ipt-box">
            <input type="number" v-model="user.code" placeholder="验证码">
            <div class="getcode" @click="sendCode()">
                {{codetext}}
            </div>
        </div> -->
        <div class="title-box">
            提示∶必须填写可以联系到本人的手机号码，交易中买单、卖单状态的变更会通过此手机号码接收提醒!
        </div>

        <!-- <div class="ipt-box">
            <span class="text">交易密码</span>
            <input type="text" v-model="user.password" placeholder="请设置交易密码">
        </div>
        <div class="title-box">
            提示:交易密码为后续交易中需要使用到的密码，必填!
        </div> -->

        <div class="butn" @click="submit()">
            确认提交保存
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
            if(!user.phone){
                this.showtitle('请输入手机号')
                return
            }
            // if(!user.code){
            //     this.showtitle('请输入验证码')
            //     return
            // }
            // if(!user.password){
            //     this.showtitle('请输入交易密码')
            //     return
            // }
            this.ajax({
                url:'index/my/bind_mobile',
                data:{
                    mobile:user.phone
                }
            }).then(res=>{
                this.showtitle('填写成功').then(res=>{
                    this.$router.go(-1)
                })
            })
        },
        sendCode(){
            if(this.codetext!='获取验证码'){
                return
            }
            this.codetext=60
            let ti=setInterval(()=>{
                if(this.codetext<=0){
                    this.codetext='获取验证码'
                    clearInterval(ti)
                    return
                }
                this.codetext--
            },1000)
        }
    },
}
</script>

<style lang="scss" scoped>
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
.text{
    color: rgb(101,101,101) !important;
    font-size: 18px;
    margin: 0 20px 0 0;
    height: 100%;
    display: flex;
    align-items: center;
}
.title-box{
    background: rgb(255,250,226);
    color: rgb(180,128,91);
    font-size: 16px;
    box-sizing: border-box;
    padding: 15px 10px;
}
    .ipt-box{
        box-sizing: border-box;
        padding: 0 10px;
        border-bottom: 1px solid #eee;
        display: flex;
        height: 50px;
        align-items: center;
        input{
            height: 100%;
            flex: 1;
            color: #000;
            font-size: 14px;
        }
    }
    .getcode{
        color: rgb(10,82,193);
        margin: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>