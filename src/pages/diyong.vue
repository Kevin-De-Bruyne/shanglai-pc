<template>
    <div class="content">
        <headers title="抵用券" />
      
      <div class="tabbar-box">
            <div class="item" v-for="(item,index) in tabbar" :key="index"
            @click="tabbar_index=index" :class="{'choise-style':tabbar_index==index}"
            >
                {{item}}
            </div>
        </div>

        <div class="item-box">
            <div class="item" v-for="(item,index) in data" :key="index">
                <div class="top">
                    <div class="container">
                        <div class="text1">{{item.money}}元</div>
                        <div class="text2">{{item.times_begin}}至{{item.times_end}} </div>
                           <!-- {{item.times}} -->
                    </div>
                    <!-- <div class="left">
                        <div class="text1">
                            <span>{{item.money}}</span>
                            元
                        </div>
                        <div class="text2">
                            无使用门槛最多优惠12元
                        </div>

                    </div>
                    <div class="right">
                        <div class="text1">
                            满100减999元
                        </div>
                        <div class="text2">
                            2020.09.12-2020-09-30
                        </div>

                    </div> -->
                </div>
                <div class="bottom">
                    {{item.name}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
             tabbar:['未使用','已过期','已使用'],
            tabbar_index:0,
            data:[]
        }
    },
    created() {
        this.getdata()
    },
    computed: {
        srach_data(){
            let data=[]
            if(this.tabbar_index==0){
                data=this.data
            }else{
                this.data.forEach(item=>{
                    if(item.status==this.tabbar_index+1){
                        data.push(item)
                    }
                })
            }
            return data
        }
    },
    watch:{
        tabbar_index(news){
            this.getdata()
        }
    },
    methods: {
       getdata(){
           
           this.ajax({
               url:'index/my/my_offset_roll',
               data:{  
                   status:Number(this.tabbar_index)+1
               }
           }).then(res=>{
               this.data=res.info
               this.data.forEach(item=>{
                   let s=new Date()
                   s.setTime(String(item.use_start_time)+'000')
                   let s2=new Date()
                   s2.setTime(String(item.use_end_time)+'000')
                   this.$set(item,'times_begin',s.toLocaleDateString())
                   this.$set(item,'times_end',s2.toLocaleDateString())
               })
           })
       } 
    },
}
</script>

<style lang="scss" scoped>
.item-box{
    box-sizing: border-box;
    padding: 50px 10px 0 10px;
    .item{
        margin: 0 0 15px 0;
            background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 15px 0 0 0;
    .top{
        display: flex;
        box-sizing: border-box;
        padding: 0 15px 15px 15px;
        text-align: center;
        .container{
            margin: auto;
            .text1{
                color: red;
        font-size: 16px;
            }
            .text2{
                font-size: 16px;
            }
        }
        .left{
        color: red;
        font-size: 14px;
        width: 40%;
        margin:  0 15px 0 0;
        .text1{
            margin: 0 0 10px 0;
        }
        span{
            font-size: 20px;
        }
    }
    .right{
        width: 60%;
        box-sizing: border-box;
        padding: 15px 0 0 0;
        .text1{
            font-size: 16px;
            color: #000;
            font-weight: bold;
            margin: 0 0 15px 0;
        }
        .text2{
            color: #000;
            font-size: 14px;
        }
    }
    }
    .bottom{
        box-sizing: border-box;
        padding: 0 15px;
        border-top: 1px solid #eee;
        color: #000;
        height: 40px;
        line-height: 40px;
    }
    
    }
}
.choise-style{
     color: rgb(9,146,230) !important;
     border-bottom: 1px solid rgb(9,146,230) !important;
}
    .content{
        background: rgb(247,248,250);
        min-height: 100vh;
        .tabbar-box{
            border-bottom: 1px solid #eee;
            position: fixed;
            left: 0;
            width: 100%;
            background: white;
            color: #000;
            display: flex;
            box-sizing: border-box;
            padding: 0 80px;
            height: 35px;
            justify-content: space-between;
            .item{
                display: flex;
                align-items: center;
                height: 100%;
                border-bottom: 1px solid transparent;
            }
        }
    }
</style>