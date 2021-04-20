<template>
    <div class="content">
        <headers title="我的好友"/>

        <div class="white-box">
            <div class="item">
                <div class="top">
                    {{data.user_num}}
                </div>
                <div class="bottom">
                    好友人数
                </div>
            </div>
            <div class="item">
                <div class="top">
                    {{data.order_num}}
                </div>
                <div class="bottom">
                    今日总单量
                </div>
            </div>
        </div>

        <div class="tabbar-box">
            <div class="item" v-for="item in tabbar_arr" :key="item">
                {{item}}
            </div>
        </div>
        <div class="item-box">
            <div class="item" v-for="(item,index) in data.list" :key="index">
               <div class="text1">
                   {{item.register_time}}
               </div>
               <div class="text2">
                   {{item.mobile}}
               </div>
               <div class="text3">
                   {{item.money}}
               </div>
               <div class="text4">
                   {{item.num}}
               </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tabbar_arr:['注册时间','手机号码','今日交易金额','今日交易单量'],
            data:[
                {
                    nick_name:'艾莉亚.史塔克',
                    down:false,
                    today_order:99,
                    children:[{
                        nick_name:'珊莎.史塔克',
                        today_order:99,
                        down:false,
                        children:[]
                    }]
                },
                {
                    name:'艾莉亚.史塔克',
                    down:false,
                    children:[{
                        name:'珊莎.史塔克',
                        down:false,
                        children:[]
                    }]
                },
            ]
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/my/my_friend'
            }).then(res=>{
                this.data=res
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.tabbar-box{
    background: rgb(241,241,241);
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    .item{
        height: 100%;
        flex: 1;
        color: #000;
        font-size: 12px;
    }
}
.heihgt_show{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    max-height: 500px !important;
    
}
.choise-bg{
background: rgb(254,250,239) !important;
}
    .white-box{
        background: white;
        display: flex;
        box-sizing: border-box;
        padding: 20px 0;
        .item{
            flex: 1;
            text-align: center;
            line-height: 25px;
            font-size: 16px;
            color: #999;
        }
    }
    .item-box{
        .item{
            margin: 10px 0 0 0;
            background: white;
            display: flex;
            text-align: left;
            box-sizing: border-box;
            padding:  10px;
            text-align: center;
            div{
                font-size: 12px;
                flex: 1;
            }
           
        }
    }
    .content{
        background: rgb(239,243,245);
    }
</style>