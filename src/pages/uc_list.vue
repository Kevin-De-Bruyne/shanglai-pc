<template>
    <div class="content">
        <div class="headers norem">
            <span 
            @click="$router.go(-1)"
            class="iconfont icon-fanhui back" />
            <span class="title">
                我的钱包
            </span>
            <div class="pop-box-head">
                <van-popover v-model="showPopover" :overlay="true"
                @select="menu_select"
                 placement="bottom-end" trigger="click" :actions="actions">
                <template #reference>
                    <span class="iconfont icon-caidan more"></span>
                </template>
            </van-popover>
            </div>
            
        </div>

        <div class="white-box">
            <div class="item">
                <div class="top">
                    {{data.total_money}}
                </div>
                <div class="bottom">
                    可用资金
                </div>
            </div>
            <div class="item">
                <div class="top">
                    {{data.user_money}}
                </div>
                <div class="bottom">
                    可用余额
                </div>
            </div>
            <div class="item">
                <div class="top">
                    {{data.surplus_comm}}
                </div>
                <div class="bottom">
                    可用佣金
                </div>
            </div>
            <div class="item">
                <div class="top">
                    {{data.total_comm}}
                </div>
                <div class="bottom">
                    累计佣金
                </div>
            </div>
            <div class="butn-top">
                <van-button type="primary" block round @click="$router.push('/chongzhi?max='+data.top_up_money)">
                    余额充值
                </van-button>
            </div>

            <div class="beizhu-box">
                <div class="mytitle">
                    提示：
                </div>
                <div class="text">
                    1、可用资金包含可用余额与可用佣金。
                </div>
                <div class="text">
                    2、可用资金仅用于支付委拍手续费或作为拍卖保证金使用。
                </div>
                <div class="text">
                    3、可用资金不能用于支付商品货款。
                </div>
                <div class="text">
                    4、系统收取手续费或保证金时，将优先扣除可用佣金。
                </div>
            </div>
        </div>
        
        <!-- <div class="butn-box">
            <van-button type="primary" block round @click="$router.push('/tx?type=1')">
                余额提现
            </van-button>
            <van-button type="primary" block round @click="$router.push('/tx?type=2')"> 
                佣金提现
            </van-button>
        </div> -->
        

       
    </div>
</template>

<script>
export default {
    data(){
        return{
            showPopover:false,
            actions: [
        { text: '余额提现', icon: 'gold-coin-o' },
        { text: '佣金提现', icon: 'gold-coin-o' },
        { text: '明细', icon: 'underway-o' },
      ],
            data:{},
           
           
        }
    },
    watch: {
        tabbar_index2(news){
            this.getdata2()
        }
    },
   
    created() {
        this.getdata()
    },
    methods: {
        menu_select(e){
            console.log(e)
            if(e.text=='余额提现'){
                this.$router.push('/tx?type=1')
            }
            if(e.text=='佣金提现'){
                this.$router.push('/tx?type=2')
            }
            if(e.text=='明细'){
                this.$router.push('mingxi')
            }
        },
        getdata(){
            this.ajax({
                url:'index/my/account_detail_page'
            }).then(res=>{
                this.data=res.data
            })
        },
        
    },
}
</script>

<style lang="scss" scoped>
.beizhu-box{
    margin: 30px 0 0 0;
    padding: 0 0 0 20px ;
    .mytitle{
        margin: 0 0 10px 0;
    }
    .text{
        margin: 0 0 15px 0;
    }
}
.pop-box-head{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}
.headers{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        height: 50px;
        background: white;
        display: flex;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 14px;
        color: #000;
        .title{
            flex: 1;
        }
        .more{
            font-size: 20px;
        }
        .back{
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
.butn-top{
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
}
.butn-box{
    display: flex;
    box-sizing: border-box;
    padding: 0 10px;
    margin: 10px 0;
}
.content{
    background: rgb(236,243,243);
    min-height: 100vh;
}
.white-box{
        background: white;
        display: flex;
        box-sizing: border-box;
        padding: 20px 0;
        flex-wrap: wrap;
        .item{
            margin: 0 0 10px 0;
            width: 50%;
            text-align: center;
            line-height: 25px;
            font-size: 16px;
            color: #999;
        }
    }

   
</style>