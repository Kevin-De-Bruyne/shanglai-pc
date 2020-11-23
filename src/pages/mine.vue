<template>
    <div class="content-tabbar">
        <headers title="我的" noback="true" />
         
         <div class="user-box">
             <div class="user">
                 <div class="left" @click="choise_img()">
                     <img :src="url+data.avatar+'?'+new Date().getTime().toString()" alt="">
                 </div>
                 <div class="container">
                     <div class="top">
                         {{data.nickname}}
                     </div>
                     <!-- <div class="bottom">
                         <span>18577777777</span>
                     </div> -->
                     <div class="bottom">
                         <span>{{data.user_level}}</span>
                     </div>
                 </div>
                 <div class="right" @click="$router.push('/set')">
                    <span class="iconfont icon-shezhi"></span>
                 </div>
             </div>
         </div>
         <div class="uc-box">
             <div class="item border" @click="$router.push('/uc_list')">
                 <div class="top">
                     可用UC币
                 </div>
                 <div class="bottom">
                     {{data.user_money}}
                 </div>
             </div>
             <div class="item right" @click="pushurl('/uc_zhuan')">
                 <div class="top">
                     <span class="iconfont icon-icon-class-b"></span>
                 </div>
                 <div class="bottom">
                     UC币互转
                 </div>
             </div>
         </div>
         <div class="list-box">
             <lists :list="list" @cl="listFn" :data="data" />
         </div>

         <van-dialog @confirm="confirm()" v-model="name_show" title="设置我的昵称" show-cancel-button>
            <input type="text" v-model="nickname" class="name_ipt" placeholder="请输入您的昵称">
        </van-dialog>

         <van-uploader  :after-read="header_upload" ref="header_img" v-model="header_img" max-count="1"  />
        <tabbar/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            header_img:[],
            nickname:'',
            name_show:false,
            data:{},
            url:'',
            list:[
                {
                name:'我的买单',
                img:require('../assets/buy_order.png'),
                url:'/order_buy'
            },
            {
                name:'我的卖单',
                img:require('../assets/order.png'),
                url:'/order_sell'
            },
            {
                name:'抵用券',
                img:require('../assets/youhui2.png'),
                url:'/diyong'
            },
            {
                name:'提货订单',
                img:require('../assets/order2.png'),
                border:'none',
                url:'/order_shiwu'
            },
            {
                name:'云商订单',
                img:require('../assets/order2.png'),
                border:'none'
            },
            {
                name:'我的团队',
                img:require('../assets/team.png'),
                url:'/team'
            },
            {
                name:'邀请好友',
                img:require('../assets/yaoqin.png'),
                border:'none',
                url:'/haoyou'
            },
            {
                name:'新人体验',
                img:require('../assets/xiaolian.png'),
                url:'/xinren'
            },
            {
                name:'在线客服',
                img:require('../assets/kefu.png'),
                border:'none',
                url:'/kefu'
            },
            {
                name:'我的收款方式',
                img:require('../assets/shoukuan.png'),
                border:'none',
                url:'/shoukuan',
                shows:false
            },
            {
                name:'完善资料',
                img:require('../assets/card.png'),
                url:'/wanshan',
                shows:true
            },
            {
                name:'实名认证',
                img:require('../assets/card.png'),
                url:'/shiming',
                shows:false
            },
            {
                name:'我的收货地址',
                img:require('../assets/dizhi.png'),
                border:'none',
                url:'/addres_list'
            }
            ]
        }
    },
    created() {
        console.log(this.order_back)
        this.getdata()
        // this.name_show=true
    },
    methods: {
        header_upload(e){
            console.log(e)
            this.ajax({
                url:'index/my/edit',
                data:{
                    key:'avatar',
                    value:e.content
                }
            }).then(res=>{
                this.getdata()
            })
        },
        getdata(){
            let wanshan=null,
            shiming=null
            this.list.forEach(item=>{
                if(item.name=='完善资料'){
                    wanshan=item
                }
                if(item.name=='实名认证'){
                    shiming=item
                    shiming.shows=true
                }
            })
            this.ajax({
                url:'index/my/user_info'
            }).then(res=>{
                this.url=res.url
                this.data=res.user
                if(this.data.is_certification!=1){
                     this.list.forEach(item=>{
                if(item.name=='完善资料'){
                    item.shows=true
                }
                if(item.name=='实名认证'){
                    item.shows=false
                }
                if(item.name=='我的收款方式'){
                    item.shows=false
                }
            })
                     this.$dialog.confirm({
                    title: '提示',
                    message: '依《沪上云拍》相关要求，会员必须实名认证。',
                    })
                    .then(() => {
                        this.$router.push('/wanshan')
                    })
                    .catch(() => {
                        // on cancel
                    });
                }else{
                     this.list.forEach(item=>{
                if(item.name=='完善资料'){
                    item.shows=false
                    console.log(item)
                }
                if(item.name=='实名认证'){
                    item.shows=true
                }
                if(item.name=='我的收款方式'){
                    item.shows=true
                }
            })
                }
               
                // this.data.is_certification?
            })
        },
        choise_img(){
            this.header_img.shift()
            this.$nextTick(()=>{
                this.$refs.header_img.chooseFile()
            })
        },
        confirm(){
            console.log(this.nickname)
        },
        listFn(item){
            if(item.url=='/xinren'){
                if(this.data.level>1){
                    this.showtitle('你已是'+this.data.user_level+',无需申请体验资格')
                    return
                }
            }
            item.url && this.$router.push(item.url)
            
             console.log(item)
        }
    },
}
</script>

<style lang="scss" scoped>
.name_ipt{
    text-align: center;
    height: 60px;
    font-size: 16px;
    width: 100%;
}
.van-uploader{
    opacity: 0;
    height: 0;
    overflow: hidden;
}
.content-tabbar{
    background: rgb(239,243,245);
}
.uc-box{
    display: flex;
    background: white;
    text-align: center;
    height: 70px;
    .item{
        flex: 1;
        display: flex;
        flex-direction: column;
        div{
            flex: 1;
            align-items: center;
            display: flex;
            justify-content: center;
        }
        .bottom{
            font-size: 18px;
            color: #000;
            font-weight: bold;
        }
    }
    .top{
        font-size: 16px;
    }
    .right{
        .iconfont{
            color: red;
            font-size: 14px;
        }
    }
   .border{
       border-right: 1px solid #eee;
       .top{
           color: #999;
       }
       
   }
}
    .user-box{
        background: rgb(10,82,193);
        box-sizing: border-box;
        padding: 30px 20px 30px 15px;
        .user{
            display: flex;
            color: white;
            .left{
                width: 70px;
                height: 70px;
                border-radius: 50%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .container{
                margin: 0 0 0 10px;
                flex: 1;
                line-height: 30px;
                .top{
                    font-size: 16px;
                }
                .bottom{
                    font-size: 12px;
                    span{
                        display: inline-block;
                        padding: 0 5px;
                        line-height: 25px;
                        background: rgba(0,0,0,0.3);
                    }
                }
            }
            .right{
                display: flex;
                align-items: center;
                font-size: 25px;
            }
        }
    }
</style>