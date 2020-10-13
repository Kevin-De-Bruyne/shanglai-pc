<template>
    <div class="content-tabbar">
        <headers title="云商订单" noback="true"/>

        <div class="tabbar-box">
            <div class="item"
            :class="{'choise-style':tabbar_index==0}"
            @click="tabbar_index=0"
            >
               综合排序
            </div>
            <div class="item"
            :class="{'choise-style':tabbar_index==1}"
            @click="tabbar_index=1"
            >
               价格
               <div>
                   <span class="iconfont icon-shangla"></span>
                   <span class="iconfont icon-xiala"></span>
               </div>
            </div>
        </div>
     
     <tabbar />
    </div>
</template>

<script>
export default {
    data(){
        return{
           tabbar_index:0
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    min-height: 100vh;
    padding: 100px 0 0 0 !important;
}
.choise-style{
     color: rgb(9,146,230) !important;
     border-bottom: 1px solid rgb(9,146,230) !important;
}
    .tabbar-box{
            border-bottom: 1px solid #eee;
            position: fixed;
            left: 0;
            width: 100%;
            background: white;
            color: #000;
            display: flex;
            box-sizing: border-box;
            padding: 0 70px;

            height: 35px;
            justify-content: space-between;
            .item{
                display: flex;
                align-items: center;
                height: 100%;
                border-bottom: 1px solid transparent;
                div{
                    span{
                        transform: scale(0.7,0.7);
                        font-size: 8px;
                        display: block;
                    }
                }
            }
        }
</style>