<template>
    <div class="content">
        <headers title="钱包明细" />
         <div class="choise-box">
                <div class="item" v-for="(item,index) in tabbar_arr2" :key="index"
                :class="{'choise-style':tabbar_index2==index}" @click="tabbar_index2=index"
                >
                    {{item}}
        </div>
        </div>
        
        <div class="choise-box">
                <div class="item" v-for="(item,index) in tabbar_arr" :key="index"
                :class="{'choise-style':tabbar_index==index}" @click="tabbar_index=index"
                >
                    {{item}}
        </div>
        </div>

        <div class="item-box">
            <div class="item" v-for="(item) in seachdata" :key="item.log_id">
                    <div class="top">
                        <div class="left">
                            {{item.desc}}
                        </div>  
                        <div class="right">
                            {{item.user_money}}
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            
                        </div>
                        <div class="right">
                            {{item.change_time}}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                 tabbar_arr:['全部','消费','赚取'],
                  tabbar_arr2:['余额明细','佣金明细'],
                   tabbar_index:0,
            tabbar_index2:0,
             data2:[],
            }
        },
        created() {
            this.getdata2()
        },
        computed: {
        seachdata(){
             let data=[]
            switch(this.tabbar_index){
                case 0:
                data=this.data2
                break
                case 1:
                this.data2.forEach(item=>{
                    if(item.user_money<0){
                        data.push(item)
                    }
                })
                break
                case 2:
                     this.data2.forEach(item=>{
                    if(item.user_money>0){
                        data.push(item)
                    }
                })
                break
            }
            console.log(data)
            return data
            
        }
    },
    watch:{
        tabbar_index2(news,old){
            this.getdata2()
        }
    },
    methods: {
        getdata2(){
            this.ajax({
                url:'index/my/account_detail',
                data:{
                    type:this.tabbar_index2+1
                }
            }).then(res=>{
                this.data2=res.data
            })
        }
    },
    }
</script>

<style lang="scss" scoped>
    .choise-box{
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    background: rgb(236,243,240);
    .choise-style{
        color: white !important;
        background: rgb(5,82,189) !important;
    }
    .item:first-child{
        border-radius: 6px 0 0 6px;
    }
    .item{
        height: 40px;
        line-height: 40px;
        border-right: 1px solid rgb(5,82,189);
        flex: 1;
        text-align: center;
        background: rgb(236,243,243);
        color: rgb(5,82,189);
    }
    .item:last-child{
        border-right: none !important;
        border-radius: 0 6px 6px 0;
    }
}
.item-box{
    box-sizing: border-box;
    padding: 0 10px;
    .item{
        background: white;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 10px;
        margin: 0 0 10px 0;
        .top{
            display: flex;
            justify-content: space-between;
            .left{
                font-size: 16px;
                color: #000;
            }
            .right{
                color: rgb(255, 138, 0);
                font-size: 14px;
            }
        }
        .bottom{
            display: flex;
            margin: 10px 0 0 0;
            justify-content: space-between;
            .right{
                color: #999;
                font-size: 12px;
            }
        }
    }
}
</style>