<template>
    <div class="list-box">
        <div v-for="(item,index) in list" :key="index">
       
        <div class="item" v-if="item.shows!==false"
        :class="{'bordernone':item.border}" @click="listFn(item)"
        >
                 <div class="left">
                     <img :src="item.img||'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='" alt="">
                 </div>
                 <div class="container">
                     {{item.name}}
                 </div>
                 <div class="right">
                     <span v-if="item.name=='我的买单'">
                         <span :class="{'red':data.buy_order_num}"> 待处理 : {{data.buy_order_num}}</span>
                     </span>
                     <span v-if="item.name=='我的卖单'">
                           <span :class="{'red':data.sell_order_num}">待处理 : {{data.sell_order_num}}</span>
                     </span>
                     <span v-if="item.name=='提货订单'">
                          <span :class="{'red':data.up_order_num}">待处理 : {{data.up_order_num}}</span>
                     </span>
                     <span class="iconfont icon-iconfontjiantou3"></span>
                 </div>
        </div>
         </div>
    </div>
</template>

<script>
export default {
    props:['list','data'],
    methods: {
        listFn(item){
             this.$emit('cl',item)
        }
    },
}
</script>

<style lang="scss" scoped>
.red{
    color: red !important;
}
    .list-box{
        .item{
            border-bottom: 1px solid #eee;
            display: flex;
            box-sizing: border-box;
            padding:  10px 15px;
            background: white;
           .left{
               background: rgb(10,82,193);
               border-radius: 50%;
               display: flex;
               width: 25px;
               height: 25px;
               img{
                   margin: auto;
                   width: 20px;
                   height: 20px;
               }
           }
           .container{
               margin: 0 0 0 6px;
               flex: 1;
               font-size: 14px;
               color: #999;
               display: flex;
               align-items: center;
           }
           .right{
               font-size: 14px;
               color: rgb(103,103,103);
               display: flex;
               align-items: center;
               .iconfont{
                   font-size: 20px !important;
               }
           }
        }
    }
    .bordernone{
        border: none !important;
        margin: 0 0 20px 0;
    }
</style>