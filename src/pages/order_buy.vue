<template>
  <div class="content">
    <headers  title="我的买单" />

    <div class="tabbar-box">
      <div
        class="item"
        v-for="(item, index) in tabbar"
        :key="index"
        @click="tabbar_index = index"
        :class="{ 'choise-style': tabbar_index == index }"
      >
        {{ item }}
      </div>
    </div>

    <div class="item-box">
      <div
        class="item"
        v-for="(item, index) in saixuan_data"
        :key="index"
        @click.stop="goOrder_detail(item)"
      >
        <div class="top">
          <div class="left">No.{{ item.order_sn }}</div>
          <div class="right">
            {{ check_status(item) }}
          </div>
        </div>
        <div class="container">
          <div class="left">
            <div class="text1">下单时间: {{ item.create_time }}</div>
            <div class="text2">品名: {{ item.goods_name }}</div>
            <div class="text2" v-if="item.mobile">
              卖家电话号码: {{ item.mobile }}
            </div>
            <div class="text2" v-if="item.b_real_name">
              卖家真实姓名: {{ item.b_real_name }}
            </div>
            <div class="shop-box">
              <div class="lefts">
                <img :src="item.main_graph_img" alt />
              </div>

              <div class="rights">
                <div class="text3" v-if="item.w_num">
                  库号
                  <span class="red">
                    {{ item.w_num }}
                  </span>
                </div>
                <div class="text4">
                  拍卖价
                  <span class="red"> ￥{{ item.total_money }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_text">
          <div class="text1">实付</div>
          <div class="text2 red">￥{{ item.total_money }}</div>
        </div>
        <div class="bottom" v-if="item.b_status == -2">
          <div class="left flex">
            
          </div>
          <div class="right butn2" @click.stop="tihuo(item)">提货</div>
          <div class="right butn2" @click.stop="shangjia(item)">重新提交上架</div>
        </div>
        <div class="bottom" v-else-if="item.status == 0">
          <div class="left flex">
            请在<van-count-down class="" :time="item.times" />秒内完成付款
          </div>
          <div class="right butn2" @click.stop="fukuan(item)">云付款</div>
        </div>
        <div class="bottom" v-else-if="item.status == -1">
          <div class="left">倒计时<van-count-down :time="item.times" /></div>
          <div class="right">
            <div class="right butn2 m-r-5" @click.stop="look_liyou(item)">查看拒绝理由</div>
          <div class="right butn2" @click.stop="fukuan(item)">再次提交付款</div>
          </div>
        </div>
        <div class="bottom" v-else-if="item.status == 1">
          <div class="left">
            <span v-if="item.is_lock">卖家锁单中</span>
          </div>
          <span class="text red m-r-10"> 支付审核中，请等待 </span>
        </div>
        <div class="bottom" v-else-if="item.status == 2">
          <div class="butn" @click.stop="tihuo(item)">提货</div>
          <div class="right">
            <span class="text red m-r-10"> 当天转拍;次日转卖 </span>
            <span class="butn2" @click.stop="zhuanpai(item)"> 申请转拍 </span>
          </div>
        </div>
        <div class="bottom" v-else-if="item.status == 5">
          <div class="left"></div>
          <div class="right" @click.stop="fukuan()">
            <span class="text red m-r-10"> 订单已取消,不可操作 </span>
          </div>
        </div>
        <div class="bottom" v-else>
          <div class="left"></div>
          <div class="right">
            <span class="butn2" @click.stop="goOrder_detail(item)">
              订单详情
            </span>
          </div>
        </div>
      </div>
    </div>

    <van-dialog v-model="zhuanpai_show" title="尚来拍卖"
    @confirm="zhuanpai_submit" :before-close="onbefor"
    @cancel="zhuanpai_show=false"
     show-cancel-button>
      <div class="zhuanpai_box" v-if="zhuanpai_text">
        根据《拍卖规则》，您在转拍前需支付该商品购买价的
        <span class="red"> {{zhuanpai_text.proportion}}%</span>
        作为委托拍卖手续费，支付前请确认如下信息: 您的购买价为: 
        <span class="red">{{zhuanpai_text.pay_money}}元</span>，
        
        <!-- 您的转拍单价为: <span class="red">{{zhuanpai_text.price}}元</span> -->
        您需支付的手续费为
        <span class="red">{{zhuanpai_text.fee_d}}元</span>
        (提示: 请在支付前确认您的余额大于<span class="red">{{zhuanpai_text.fee_d}}元</span>，方可转拍成功)
        <div class="tishi-text">
          {{`请输入转拍商品的拍卖价格(最高${zhuanpai_text.max}元)`}}
        </div>
      </div>
      <div class="zhuanpai_box" v-else>
        由于您是新人会员享有首单全免服务费
      </div>
      <input type="text" v-model="zhuanpai_price" class="name_ipt" :placeholder="`${zhuanpai_text.max}`" />
    </van-dialog>

  </div>
</template>

<script>
import bus from '../assets/js/bus'
export default {
  data() {
    return {
      // tabbar:['全部','待付款','付款中','已付款','已转拍','已提货','已取消'],
      tabbar: [ "三天内", "七天内", "一个月内"],
      tabbar_index: 0,
      data: [],
      hours: "",
      zhuanpai_text:{},
      zhuanpai_show:false,
      zhuanpai_show2:false,
      zhuanpai_price:'',
      zhuanpai_id:'',
      now_id:'',
      now_item:{}
    };
  },
  created() {
    this.getdata();
    bus.$on('choise_res',(id)=>{
      console.log(id,'jfiajfiajfi')
      bus.$off('choise_res')
      let url=this.now_item.b_status==-2?'index/auction_goods/apply_pick_up_goods_to_transfer':'index/auction_goods/apply_pick_up_goods'
      this.ajax({
            url: url,
            data: {
              address_id:id,
              order_id: this.now_id,
            },
          }).then((res) => {
            

            this.$dialog.alert({
                title: '提示',
                message: '提货成功',
            }).then(() => {
                this.getdata();
            });

          });
      
        })
  },
  beforeRouteLeave(to,from,next){
    console.log('啊哈哈哈',to)
    if(to.matched[0].path=='/conpay'){
      console.log('返回个人中心')
      next('/mine')
    }
    next()
  },
  computed: {
    saixuan_data() {
      let data = [];
      
      data = this.data.filter((item) => {
        
        if(this.tabbar_index==0){
          return item.time_status <= this.tabbar_index + 2;
        }else if(this.tabbar_index==1){
          return item.time_status <= this.tabbar_index + 3;
        }else{
          return item.time_status <= this.tabbar_index + 4;
        }
      });
      console.log(data)

      // let data=[]
      // if(this.tabbar_index==0){
      //     data=this.data
      // }else{
      //     this.data.forEach(item=>{
      //         if(item.status==this.tabbar_index-1){
      //             data.push(item)
      //         }
      //         if(this.tabbar_index==1&&item.status==-1){
      //             data.push(item)
      //         }
      //     })
      // }
      return data;
    },
  },
  activated(){
    console.log('这是什么什么周期')
    
  },
  methods: {
    shangjia(item){
            this.ajax({
                url:'index/auction_goods/algin_submit',
                data:{
                    id:item.id
                }
            }).then(res=>{
                this.showtitle('操作成功').then(res=>{
                    this.getdata()
                })
            })
        },
    look_liyou(item){
      this.$dialog.alert({
  title: '拒绝理由',
  message: item.reason,
}).then(() => {
  // on close
});
    },
    onbefor(active,down){
      return down(false)
    },
    zhuan_data(id) {
      return new Promise((ok, err) => {
        this.ajax({
          url: "index/auction_goods/apply_transfer_tip",
          data: {
            order_id: id,
          },
        }).then((res) => {
          ok(res);
        });
      });
    },
    goOrder_detail(item) {
      this.$router.push(
        `/order_detail?id=${item.id}&status=${this.check_status(item)}`
      );
    },
    check_status(item) {
      let str = "";
      switch (item.status) {
        case 0:
        case -1:
          str = "待付款";
          break;
        case 1:
          str = "付款中";
          break;
        case 2:
          str = "已付款";
          break;
        case 3:
          str = "已转拍";
          break;
        case 4:
          str = "已提货";
          break;
        case 5:
          str = "已取消";
      }
      return str;
    },
    daojishi(item) {},
    tihuo(item) {
      // this.$emit('choise_res','jifajifjaifjai')
      // return
      this.now_item=item
      this.now_id=item.id
      this.$router.push('/addres_list?order=true').then(res=>{
        setTimeout(() => {
           this.showtitle('请选择收货地址')
        }, 200);
      })
      // this.showtitle('请选择收货地址').then(res=>{
      //   this.$router.push('/addres_list')
      // })
      
    },
    zhuanpai(item) {
      this.zhuanpai_id=item.id
      this.zhuan_data(item.id).then((req) => {
        if (req.ss != 0) {
          this.zhuanpai_text=req
        }
         this.zhuanpai_show=true
      });
    },
    zhuanpai_submit(){
      this.$dialog.confirm({
        title: '提示',
        message: `您以${this.zhuanpai_price||this.zhuanpai_text.max}元的价格转拍此商品，是否继续?`,
      })
      .then(() => {
        this.ajax({
                url: "index/auction_goods/apply_transfer",
                data: {
                  order_id: this.zhuanpai_id,
                  goods_price:this.zhuanpai_price||this.zhuanpai_text.max
                },
              }).then((res) => {
                this.zhuanpai_show=false
                this.showtitle("转拍成功").then(res=>{
                  this.getdata();
                })
              });
      })
      .catch(() => {
        // on cancel
      })
      
    },
    getdata() {
      this.ajax({
        url: "index/my/my_buy_order",
        data:{
          arr:['jifajifjaifaij']
        }
      }).then((res) => {
        this.data = res.list;
        this.hours = res.stream_beat_time;
        this.totimes();
      });
    },
    totimes() {
      this.data.forEach((item) => {
        var t
        if(item.status==-1){
          t=item.examine_time
        }else{
          t=item.create_time1
        }
        let endtime = Number(t) + Number(this.hours);
        t = Number(endtime.toString() + "000");

        let date = new Date().getTime();
        this.$set(item, "times", t - date);
        console.log(t, item.times, date);

        // let z= s.toString()
      });
    },
    fukuan(item) {
      this.$router.push("/zhuanpai_buy?id=" + item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tishi-text{
  text-align: center;
  line-height: 30px;
  color: #999;
  margin: 10px 0 0 0;
}
.zhuanpai_box{
  box-sizing: border-box;
  padding: 15px;
  font-size: 14px;
}
.name_ipt{
    text-align: center;
    height: 60px;
    font-size: 14px;
    width: 100%;
}
.flex {
  display: flex;
}
.red{
  color: red !important;
}
.bottom_text {
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
  font-size: 18px;
  color: red;
  background: #f2f7f7;
}
.shop-box {
  display: flex;

  .lefts {
    height: 100px;
    width: 100px;
    margin: 0 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    
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
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    .red {
      color: red !important;
      font-size: 18px;
    }
    .left {
    }
    .right {
      word-break: break-all;
      text-align: center;
      width: 30%;
      // display: flex;
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
    .left {
      color: red;
      font-size: 14px;
    }
    .right {
      display: flex;
      // background: rgb(27,155,210);
      color: white;
      // padding: 0 15px;
      border-radius: 20px;
      height: 30px;
      line-height: 30px;
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