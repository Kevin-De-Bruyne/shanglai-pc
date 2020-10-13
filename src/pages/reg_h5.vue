<template>
    <div class="content">
        <headers title="极速竞拍手机注册"/>

        <div class="ipt-box">
            <input type="number" placeholder="请输入手机号">
        </div>

         <div class="ipt-box">
            <input type="number" placeholder="验证码">
            <div class="getcode">
                获取验证码
            </div>
        </div>
        <div class="ipt-box">
            <input type="password" placeholder="请输入登录密码">
        </div>
        <div class="ipt-box">
            <input type="password" placeholder="请确认登录密码">
        </div>
        <div class="ipt-box">
            <input type="password" placeholder="推荐人邀请码(必填)">
        </div>

        <div class="check-box">
            <van-checkbox v-model="checked">我已阅读并同意《****注册协议》及《服务条款》</van-checkbox>
        </div>

        <div class="butn">
            注册
        </div>

        <div class="title-box">
            已注册用户点击 <span class="m-l-5">立即下载</span>
        </div>


    </div>
</template>

<script>
export default {
    data(){
        return{
            checked:true
        }
    }
}
</script>

<style lang="scss" scoped>
.title-box{
    margin: 15px 0;
    text-align: center;
    color: #000;
    font-size: 14px;
    span{
        color: rgb(10,82,193);
        font-weight: bold;
    }
}
.check-box{
    margin: 30px 0 0 0;
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