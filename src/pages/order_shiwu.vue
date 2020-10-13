<template>
  <div class="content">
    <headers title="我的实物订单" />

    <div class="tabbar-box">
      <div
        class="item"
        v-for="(item,index) in tabbar"
        :key="index"
        @click="tabbar_index=index"
        :class="{'choise-style':tabbar_index==index}"
      >{{item}}</div>
    </div>

    <div class="item-box">
      <div class="item" v-for="(item,index) in seach_data" :key="index">
        <div class="top">
          <div class="left">No.{{item.order_sn}}</div>
          <div class="right" v-if="item.sta==1">待发货</div>
          <div class="right" v-if="item.sta==2">已发货</div>
          <div class="right" v-if="item.sta==3">已完成</div>
        </div>
        <div class="container">
          <div class="left">
            <div class="text1">下单时间: {{item.create_time}}</div>
            <div class="text2">商品名: {{item.goods_name}}</div>
            <div class="shop-box">
              <div class="lefts">
                <img
                  :src="item.main_graph_img"
                  alt
                />
              </div>

              <div class="rights">
                <div class="text1" v-if="item.w_num">
                  库号
                  <span class="red">{{item.w_num}}</span>
                </div>
                <div class="text2">
                    价格
              <span class="red">￥{{item.pay_money}}</span>
                </div>
              </div>
            </div>
            <div class="text3"></div>
            <div class="text4">
              
            </div>
          </div>
          <div class="bottom-div">
              <div class="rights">
                   <div class="text1">总价</div>
            <div class="text2 red">￥{{item.total_money}}</div>
              </div>
           
          </div>
        </div>
        <div class="bottom" v-if="false">
          <div class="red">倒计时00:56:33</div>
          <div class="butn">云付款</div>
        </div>
        <div class="bottom" v-else-if="true">
          <div class="butn" v-if="false">提货</div>
          <div class="right" v-else>
            <!-- <span class="text red m-r-10">当天转拍;次日转卖</span> -->
            <span class="butn2 m-r" v-if="item.sta==2" @click="shouhuo(item)">确认收货</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbar: ["全部", "待发货", "已发货", "已完成"],
      tabbar_index: 0,
      data:[]
    };
  },
  created() {
    this.getdata()
  },
  computed: {
    seach_data(){
      let data=[]
      if(this.tabbar_index==0){
        data=this.data
      }else{
        this.data.forEach(item=>{
          if(item.sta==this.tabbar_index){
            data.push(item)
          }
        })
      }
      return data
    }
  },
  methods: {
    shouhuo(item){
         this.$dialog.confirm({
  title: '提示',
  message: '是否已确定收到货品?',
})
  .then(() => {
        this.ajax({
        url:'index/auction_goods/receiving_goods',
        data:{
          order_id:item.order_id
        }
      }).then(res=>{
         this.getdata()
         this.showtitle('操作成功')
      })
  })
  .catch(() => {
    // on cancel
  });
      
    },
    getdata(){
      this.ajax({
        url:'index/my/my_pick_up_order'
      }).then(res=>{
         this.data=res.list
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.m-r{
    margin: 0 auto 0 0;
}
.bottom-div{
   display: flex;
   .rights{
       margin: 0 0 0 auto;
   }
}
.shop-box {
    display: flex;
  
  .lefts{
      height: 100px;
  width: 100px;
  margin: 0 10px 0 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.item-box {
  box-sizing: border-box;
  padding: 45px 0 0 0;
  font-size: 14px;
  .item {
    margin: 0 0 10px 0;
  }
  .top {
    display: flex;
    justify-content: space-between;
    background: white;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    .left {
      color: #000;
    }
    .right {
      color: rgb(27, 155, 210);
    }
  }
  .container {
    background: rgb(242, 247, 247);
    color: #999;
    box-sizing: border-box;
    padding: 15px;
    .red {
      color: red !important;
      font-size: 18px;
    }
    .left {
    //   width: 70%;
    }
    .right {
      width: 30%;
      display: flex;
      align-items: center;
    }
    .text3 {
      .red {
        margin: 0 20px 0 0;
      }
    }
    div {
      line-height: 25px;
    }
    .text2 {
      // line-height: 15px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    background: white;
    box-sizing: border-box;
    padding: 0 10px;
    height: 50px;
    align-items: center;
    .right{
        margin: 0 0 0 auto;
    }
    .butn2 {
      background: rgb(80, 187, 66);
      padding: 0 15px;
      color: white;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      border-radius: 20px;
    }
    .red {
      color: red;
      font-size: 14px;
    }
    .butn {
      background: rgb(27, 155, 210);
      color: white;
      padding: 0 15px;
      border-radius: 20px;
      height: 30px;
      line-height: 30px;
    }
  }
}
.choise-style {
  color: rgb(9, 146, 230) !important;
  border-bottom: 1px solid rgb(9, 146, 230) !important;
}
.content {
  background: rgb(236, 243, 243);
  min-height: 100vh;
  .tabbar-box {
    border-bottom: 1px solid #eee;
    position: fixed;
    left: 0;
    width: 100%;
    background: white;
    color: #000;
    display: flex;
    box-sizing: border-box;
    padding: 0 20px;
    height: 35px;
    justify-content: space-between;
    .item {
      display: flex;
      align-items: center;
      height: 100%;
      border-bottom: 1px solid transparent;
      
    }
  }
}
</style>