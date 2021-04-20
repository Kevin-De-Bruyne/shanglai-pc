<template>
    <div class="content">
        <headers title="新人体验通道"/>


        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in data.info" :key="index">
          <img :src="item||'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='" alt="">
      </van-swipe-item>
    </van-swipe>

    <div class="white-box">
        <div class="title m-b-20">
            申请体验说明
        </div>

        <div class="text-box">
            <div class="text1">
                1、新注册会员可申请体验{{data.vip_exp}}天;
            </div>
            <div class="text2">
                2、体验期间每场可提前三分钟进场，每场限拍一单;
            </div>
            <div class="text3">
                3、当日申请，次日体验!
            </div>
        </div>
        </div>

        <div class="white-box m-t-20">
            <div class="title">
                体验时间
            </div>
            <div class="notiyan">
                暂无体验记录
            </div>
            <div class="butn" @click="shenqin()">
                立即申请体验
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[]
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        shenqin(){
            this.ajax({
                url:'index/my/application_core'
            }).then(res=>{
                this.showtitle('申请成功').then(res=>{
                    this.$router.go(-1)
                })
            })
        },
        getdata(){
            this.ajax({
                url:'index/my/application_core_page'
            }).then(res=>{
                this.data=res
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .my-swipe{
        height: 200px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .content{
        background: rgb(239,243,245);
        min-height: 100vh;
    }
    .title{
        text-align: center;
        font-size: 18px;
        color: rgb(56,57,58);
        height: 50px;
        line-height: 50px;
    }
    .white-box{
        box-sizing: border-box;
        padding: 0 15px 20px 15px;
        background: white;
    }
    .text-box{
        div{
            margin: 10px 0;
            font-size: 16px;
            color: rgb(102,102,102);
        }
    }
    .notiyan{
        text-align: center;
         color: rgb(102,102,102);
         line-height: 30px;
         margin: 15px 0 0 0;
    }
    .butn{
        margin: 10px 0 0 0;
        text-align: center;
        border-radius: 30px;
        background: rgb(255,0,0);
        color: white;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
    }
</style>