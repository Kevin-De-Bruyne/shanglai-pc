<template>
    <div class="content">
        <headers title="设置" />

        <div class="item-box">
            <div class="item">
                <div class="left">
                    昵称
                </div>
                <div class="right">
                    <span>{{data.nickname}}</span>
                </div>
            </div>
            <!-- <div class="item" @click="pushurl('/phone')">
                <div class="left">
                    联系人手机号码
                </div>
                <div class="right">
                    <span class="iconfont icon-iconfontjiantou3"></span>
                </div>
            </div> -->
            <div class="item" @click="pushurl('/pwd_login')">
                <div class="left">
                    登录密码
                </div>
                <div class="right">
                    <span class="iconfont icon-iconfontjiantou3"></span>
                </div>
            </div>
            <div class="item" @click="pushurl('/pwd_jiaoyi')">
                <div class="left">
                    交易密码
                </div>
                <div class="right">
                    <span class="iconfont icon-iconfontjiantou3"></span>
                </div>
            </div>
            <!-- <div class="item" @click="clear()">
                <div class="left">
                    清除缓存
                </div>
                <div class="right">
                  <span class="iconfont icon-iconfontjiantou3"></span>
                </div>
            </div> -->
            <div class="item">
                <div class="left">
                    当前版本
                </div>
                <div class="right">
                    <span>{{app_v}}</span>
                </div>
            </div>
        </div>

        <div class="butn" @click="outlogin()">
            退出登录
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{}
        }
    },
    created() {
        this.getdata()
    },
    methods: {
       getdata(){
            this.ajax({
                url:'index/my/user_info'
            }).then(res=>{
                this.data=res.user
            })
        },
        outlogin(){
            this.$dialog.confirm({
  title: '提示',
  message: '是否退出登录?',
})
  .then(() => {
      localStorage.setItem('login','')
      this.login()
      this.$router.push('/')
  })
  .catch(() => {
    // on cancel
  });
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    min-height: 100vh;
    background: rgb(239,243,245);
}
    .item-box{
        background: white;
        .item{
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            padding: 15px 10px;
            color: rgb(95,95,95);
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .item:last-child{
            border: none !important;
        }
    }
    .butn{
        margin: 30px 0 0 0;
        height: 50px;
        text-align: center;
        color: red;
        line-height: 50px;
        font-size: 16px;
        background: white;
    }
</style>