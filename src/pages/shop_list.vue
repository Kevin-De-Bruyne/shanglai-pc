<template>
    <div class="content"  ref="item-box">
        <headers title="商品列表"/>

        <div class="item-box" >
            <div class="item" v-for="(item,index) in data" :key="index" @click="shop_list(item)">
                
                <div class="top">
                    <img :src="item.main_graph_img" alt="">
                    <template v-if="item.status==2">
                        <img class="img-jiaoyi" v-if="item.status_order==0||item.status_order==1" src="../assets/jiaoyi.png" alt="">
                        <img class="img-shoujin" v-else src="../assets/shoujin.png" alt="">
                    </template>
                    <template v-if="item.status==3">
                        <img class="img-shoujin"  src="../assets/shoujin.png" alt="">
                    </template>
                    
                </div>
                <div class="bottom">
                    <div class="text1">
                        {{item.goods_name}}
                    </div>
                    <div class="text2">
                        ￥{{item.goods_price}}
                    </div>
                     <!-- <div class="text3" v-if="item.status==2">
                         
                         <template v-if="item.status_order==0||item.status_order==1">
                             交易中
                         </template>
                         <template v-else>
                             已售尽
                         </template>
                         <template v-if="item.status_order==3">
                             已转拍
                         </template>
                    </div> -->
                </div>
            </div>
            
        </div>

        <div class="page-box">
            <div class="pd-box">
                <div class="item" @click="page_up()">
               首页
            </div>
            <div class="item" v-for="(item,index) in page_arr" :key="index"
            @click="changePage(item)" :class="{'choise-class':page_index==item}"
            >
                {{item}}
            </div>
            <div class="item" @click="page_down()">
                尾页
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            page_arr:[],
            zong_arr:[],
            page_index:1,
            data:[],
            id:this.$route.query.id,
            page:0
        }
    },
    created () {
     this.getdata('init')
     this.getuser()
     console.log(this.page_arr)
    },
    watch: {
        page(news){
            console.log(news)
            this.getdata()
        }
    },
    mounted() {
    },
    methods: {
        getdata(init){
            console.log(this.$route.query.id)
            this.ajax({
                url:'index/auction_goods/auction_goods_list',
                data:{
                    tid:this.id,
                    page:this.page
                }
            }).then(res=>{
                this.data=res.list
              
                this.$nextTick(()=>{
                    document.documentElement.scrollTop=0
                })
                console.log(this.data)
                if(init){
                    this.mathPages(this.page_index,res.count)
                }
                
            }).catch(err=>{
                console.log(err)
                this.showtitle(err.message||err.data.message).then(res=>{
                    
                })
            })
        },
         getuser(){
            this.ajax({
                url:'index/my/user_info'
            }).then(res=>{
                if(res.user.is_certification){
                    return
                }
                   this.$dialog.confirm({
                    title: '提示',
                    message: '依《尚来拍卖》相关要求，会员必须实名认证才可进行购买。',
                    })
                    .then(() => {
                        this.$router.push('/wanshan')
                    })
                    .catch(() => {
                        // on cancel
                    });
            })
        },
        shop_list(item){
            if(item.status==2||item.sort_time>0){
                this.showtitle('该商品无法购买')
                return
            }
            this.$router.push('/shop_detail?id='+item.id)
        },
        page_up(){
            if(this.zong_arr.length>=5){
                this.page_arr=[1,2,3,4,5]
                
            }
            this.page_index=1
                this.page=1
        },
        page_down(){
            
            let {zong_arr,page_arr}=this
            if(this.zong_arr.length>5){
                this.page_arr=[zong_arr.length-4,zong_arr.length-3,zong_arr.length-2,zong_arr.length-1,zong_arr.length]
            }
            this.page_index=this.zong_arr.length
                this.page=this.zong_arr.length
        },
        changePage(index){

            this.page=index
            let arr=[]
            this.page_index=index
            if(this.zong_arr.length<5){
                return
            }
            else if(index==2){
               arr=[index-1,index,index+1,index+2,index+3]
            }else if(index==this.zong_arr[this.zong_arr.length-2]){
               arr=[index-3,index-2,index-1,index,index+1]
            }else if(index<3||index>this.zong_arr.length-2){
                console.log(2)
               arr=this.page_arr
            }else {
                console.log('3')
                arr=[index-2,index-1,index,index+1,index+2]
            }

            this.page_arr=arr
        },
         mathPages(index, totalpage) {
              for(let i=1;i<=totalpage;i++){
                 this.zong_arr.push(i)
                }
                if(totalpage<5){
                    for(let i=1;i<=totalpage;i++){
                 this.page_arr.push(i)
                }
                }else{
                    for(let i=1;i<=5;i++){
                 this.page_arr.push(i)
                }
                }
             
             
              //页码和一共有多少页
        }
    },
}
</script>

<style lang="scss" scoped>
.img-shoujin,.img-jiaoyi{
    max-width: 60% !important;
    max-height: 60% !important;
}
.choise-class{
   background: white !important;
   color: #1a5ec4 !important;
}
.page-box{
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    .pd-box{
        display: flex;
    }
    .item{
        background: rgb(68,68,68);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 0 3px;
        text-align: center;
        line-height: 40px;
        color: white;
        font-size: 14px;
    }
}
    .content{
        background: rgb(239,243,245);
    }
    .item-box{
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 20px 15px 60px 15px;
        justify-content: space-between;
        .item{
           width: 49%;
           height: 215px;
           margin: 0 0 10px 0;
           .top{  
               background: white;  
               display: flex;
               height: 150px;
               position: relative;
               .img-jiaoyi{
                //    min-width: 100px;
                //    min-height: 80px;
                   position: absolute;
                   left: 0;
                   top: 0;
                   right: 0;
                   bottom: 0;
               }
               .img-shoujin{
                //    min-width: 100px;
                //    min-height: 80px;
                   position: absolute;
                   left: 0;
                   top: 0;
                   right: 0;
                   bottom: 0;
               }
               img{
                   margin: auto;
                //   height: 150px;
                //  width: 150px;
                //  max-width: 100%;
                //  max-height: 100%;
               }
           }
           .bottom{
               background: white;
               box-sizing: border-box;
               height: 65px;
               padding: 5px 4px 0 5px;
               .text1{
                   font-size: 12px;
                   color: #000;
                   overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
      margin: 5px 0;
               }
               .text2{
                   color: red;
                   font-size: 18px;
               }
               .text3{
                   font-size: 14px;
                   color: #999;
               }
           }
        }
    }
</style>