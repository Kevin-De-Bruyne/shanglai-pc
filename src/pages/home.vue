<template>
  <div class="content-tabbar">
    
    <template>
      
    
      <headers title="首页" noback="true" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in data.slide_show" :key="index">
          <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="nav-list">
      <div class="item" v-for="(item,index) in nav_list" :key="index"
      @click="navgo(item)"
      >
        <div class="top">
          <span class="iconfont" :class="item.icon"></span>
        </div>
        <div class="bottom">
          {{item.name}}
        </div>
      </div>
    </div>
    

    <div class="item-box">
      <div class="item" v-for="(item,index) in data.time" :key="item.txt" @click="goDetail(item)">
         <img :src="item.image" alt="">
         <div class="butn">
           {{item.txt}}
         </div>
         <div class="time-title">
           <!-- {{item.start_time}}-{{item.end_time}} -->
         </div>
      </div>
    </div>
    <tabbar />
    </template>

     <popup :shows="box_show">
            <div class="white-box">
                <div class="title">
                    沪上云拍
                </div>
                <div class="neirong">
                  尊敬的会员您好：平台为增加新注册用户的交易体验，特免去首单交易服务费（仅限首单）有效期为新用户注册时

                  <span class="red">{{data.day}}</span>
                  日内。祝您交易愉快！
                </div>
                <div class="butn-box">
                    <div class="butn1" @click="queren()">
                        确认
                    </div>
                </div>
            </div>
        </popup>

    
    
    <!-- <template v-else>
      <div class="loadding-box">
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="">
      </div>
    </template> -->
  </div>
</template>

<script>
export default {
  created() {
    console.clear()
    console.log(document.baseURI)
    console.log(this.$route)
   

    this.getdata()
  },
  setup(){
    console.log('setup')
  },
data(){
  return{
    box_show:false,
    data:{},
    nav_list:[
      {
      icon:'icon-gonggao',
      name:'公告',
      url:'/gongao'
    },
    {
      icon:'icon-xingzhuang',
      name:'玩法介绍',
      url:'/wanfa'
    },
    {
      icon:'icon-shuji',
      name:'新手指南',
      url:'/xinshou'
    },  
    {
      icon:'icon-yaoqing',
      name:'邀请好友',
      url:'/haoyou'
    }
    ]
  }
},
methods: {
  queren(){
    this.box_show=false
  },
  goDetail(item){
    this.$router.push('/shop_list?id='+item.id)
  },
  getdata(){
    this.ajax({
      url:'index/auction_goods/index'
    }).then(res=>{
      this.data=res
       if(this.data.day){
         this.box_show=true
       }else{
         this.box_show=false
       }
       console.log(res)
    })
  },
  navgo(item){
    if(item.url){
      this.$router.push(item.url)
    }
  }
},
};
</script>

<style lang="scss" scoped>
.red{
  color: red !important;
}
.white-box{
    background: white;
    border-radius: 10px;
    margin: auto 20px;
    box-sizing: border-box;
    padding: 60px 25px 20px 25px;
    .title{
        border: none;
        color: #000;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        margin: 0 0 20px 0;
    }
    .neirong{
        color: #999;
        font-size: 14px;
        margin: 0 0 25px 0;
    }
    .checkbox{
        margin: 0 0 30px 0;
    }
    .butn-box{
        display: flex;
        justify-content: space-between;
        margin: 10px 0 0 0;
        div{
            flex: 1;
            color: white;
            border-radius: 20px;
            font-size: 14px;
            text-align: center;
            height: 40px;
            line-height: 40px;
        }
    }
    .butn1{
        margin: 0 10px 0 0;
        background: #4fc08d;
    }
    .butn2{
        background: rgb(83,160,80);
    }
}
.loadding-box{
  width: 500px;
  height: 500px;
  img{
    width: 100%;
    height: 100%;
  }
}
.begin-style{
  background: rgb(89,169,134) !important;
}
.item-box{
  .item{
     border-radius: 12px;
     height: 150px;
     position: relative;
     margin: 30px 0;
  }
  img{
    object-fit: cover;
    width: 100%;
    // max-width: 100%;
    height: 100%;
    border-radius: 6px;

  }
  .butn{
    background: rgb(252,183,0);
    color: white;
    height: 30px;
    line-height: 30px;
    position: absolute;
    left: 50%;
    border-radius: 12px;
    top: -15px;
    transform: translateX(-50%);
    padding: 0 10px;
    font-size: 12px;
  }
  .time-title{
    font-size: 16px;
    position: absolute;
    left: 5px;
    top: 7px;
    color: #000;
  }
}
.nav-list{
   display: flex;
   background: white;
   border-radius: 0 0 6px 6px;
   padding: 15px 0;
   text-align: center;
   .item{
     flex: 1;
    .top{
      margin: 0 auto;
      background: rgb(255,77,77);
      border-radius: 50%;
      display: flex;
      width: 40px;
      height: 40px;
      color: white;
      font-size: 20px;
      .iconfont{
        margin: auto;
      }
    }
    .bottom{
        font-size: 12px;
        color: #000;
    }
   }
}
.my-swipe{
     height: 160px;
     border-radius: 6px;
     overflow: hidden;
     img{
       width: 100%;
       height: 100%;
     }
}
.content-tabbar{
  box-sizing: border-box;
  padding: 60px 15px 50px 15px;
  background: rgb(239,243,245);
  min-height: 100vh;
}
</style>