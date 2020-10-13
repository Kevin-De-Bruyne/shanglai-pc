<template>
    <div class="content">
        <headers title="我的公告"/>

        <nodata v-if="data.length==0" />

        <div class="list-box" v-else>
        <div class="item" v-for="(item,index) in data" :key="index"
        :class="{'bordernone':item.border}" @click="listFn(item)"
        >
                 <!-- <div class="left">
                     <img :src="item.img||'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='" alt="">
                 </div> -->
                 <div class="container">
                     {{item.title}}
                 </div>
                 <div class="right">
                     <span class="iconfont icon-iconfontjiantou3"></span>
                 </div>
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
        listFn(item){
            let s=JSON.stringify(item)
            this.$router.push('/gongao_detail?detail='+s)
        },
        getdata(){
            this.ajax({
                url:'index/my/article_list'
            }).then(res=>{
                this.data=res.data
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .content{
        background: rgb(239,243,245);
    }
    .list-box{
        .item{
            border-bottom: 1px solid #eee;
            display: flex;
            box-sizing: border-box;
            padding: 15px;
            background: white;
           .left{
               background: rgb(10,82,193);
               border-radius: 50%;
               display: flex;
               width: 30px;
               height: 30px;
               img{
                   margin: auto;
                   width: 20px;
                   height: 20px;
               }
           }
           .container{
               margin: 0 0 0 6px;
               flex: 1;
               font-size: 16px;
               color: #999;
               display: flex;
               align-items: center;
           }
           .right{
               font-size: 16px;
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