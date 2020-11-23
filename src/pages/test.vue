<template>
    <div class="content">
        <div class="tabbar-box">
            
            <div class="item" v-for="(item,index) in tabbar" :key="index"
            @click="changeindex(index)"
            >
                <span class="tababr_item">{{item}}</span>
            </div>
            <div class="border" ref="border"></div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                tabbar:['啤酒','可乐','咳嗽药水']
            }
        },
        created() {
            
            
        },
        mounted() {
            setTimeout(()=>{
                let border=this.$refs.border
            let item=document.getElementsByClassName('tababr_item')
            
            console.log(item)
            console.log(item,item[0].offsetWidth) 
            border.style.width=item[0].offsetWidth+'px'
            border.style.left=item[0].offsetLeft+'px'
            console.log(item[0].offsetLeft)
            },0)
            
        },
        methods: {
            changeindex(index){
                let item=document.getElementsByClassName('tababr_item')
                let border=this.$refs.border
                border.style.left=item[index].offsetLeft+'px'
                border.style.width=item[index].offsetWidth+'px'
            }
        },
    }
</script>

<style scoped lang="scss">
.border{
    position: absolute;
    width: 1px;
    height: 2px;
    background: red;
    left: 20px;
    bottom: -1px;
    transition: .5s ease;
}
   .content{
       min-height: 100vh;
       .tabbar-box{
           position: relative;
           background: black;
           color: white;
           display: flex;
           height: 40px;
           .item{
               height: 100%;
               line-height: 40px;
               text-align: center;
               flex: 1;
               span{
                   display: inline-block;
               }
           }
       }
   }
</style>