<template>
    <div class="content">
        <headers title="订单详情" />

        <div class="item-box m-b-20">
            <div class="img-item">
                <div class="left">
                    商品名字
                </div>
                <div class="right">
                    {{data.goods_name}}
                </div>
            </div>
            <div class="img-item">
                <div class="left">
                    商品图片
                </div>
                <div class="rihgt">
                    <img :src="data.main_graph_img" alt="">
                </div>
            </div>
            <div class="item">
                <div class="left">
                    订单号
                </div>
                <div class="right">
                    {{data.order_sn}}
                </div>
            </div>
            <div class="item">
                <div class="left">
                    订单状态
                </div>
                <div class="right">
                    {{status}}
                </div>
            </div>
            <div class="item">
                <div class="left">
                    下单时间
                </div>
                <div class="right">
                    {{data.create_time}}
                </div>
            </div>
             <div class="item">
                <div class="left">
                    确认支付时间
                </div>
                <div class="right">
                    {{data.pay_time||''}}
                </div>
            </div>
             <div class="item">
                <div class="left">
                    确认收款时间
                </div>
                <div class="right">
                    {{data.examine_time||''}}
                </div>
            </div>
            <div class="item">
                    <div class="left">
                        支付方式
                    </div>
                    <div class="right">
                        <span class="red">{{check_type}}</span>
                    </div>
            </div>
        </div>

        <div class="yellow-div">
                警告△:恶意点击已付款，却不付款，将做封号处理!如若误点已付款，可选择继续给卖家打款，卖家收到款项后，会给你确认放货
            </div>
            <div class="item-box">
                <div class="title">
                    卖家信息
                </div>
                <div class="item">
                    <div class="left">
                        卖家昵称
                    </div>
                    <div class="right">
                        {{data.sell_nick_name}}
                    </div>
                </div>
                <div class="item">
                    <div class="left">
                        卖家真实姓名
                    </div>
                    <div class="right">
                       {{data.sell_real_name}}
                        <span class="iconfont icon-copy" @click="copy(data.sell_real_name)"></span>
                    </div>
                </div>
                <div class="item">
                    <div class="left">
                        卖家手机号
                    </div>
                    <div class="right">
                        {{data.sell_mobile}}
                        <span class="iconfont icon-copy" @click="copy(data.sell_mobile)"></span>
                    </div>
                </div>
                <div class="item">
                    <div class="left">
                        需支付金额(￥)
                    </div>
                    <div class="right">
                        <span class="red">{{data.total_money}}</span>
                        <span class="iconfont icon-copy" @click="copy(data.total_money)"></span>
                    </div>
                </div>
                
                <div class="item">
                    <div class="left">
                        卖家收款方式
                    </div>
                    <div class="right">
                        <span class="red">{{check_type}}</span>
                    </div>
                </div>

                <template v-if="check_type=='银行卡'">
                    <div class="item">
                        <div class="left">
                            银行卡卡号
                        </div>
                        <div class="rihgt">
                            <span class="red">{{data.sell_bank.bank_num}}</span>
                            <span class="iconfont icon-copy" @click="copy(data.sell_bank.bank_num)"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">
                            银行卡持卡人
                        </div>
                        <div class="rihgt">
                            {{data.sell_bank.bank_username}}
                            <span class="iconfont icon-copy" @click="copy(data.sell_bank.bank_username)"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">
                            开户行
                        </div>
                        <div class="rihgt">
                            {{data.sell_bank.bank_name}}
                            <span class="iconfont icon-copy" @click="copy(data.sell_bank.bank_name)"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">
                            开户支行
                        </div>
                        <div class="rihgt">
                            {{data.sell_bank.bank_branch}}
                            <span class="iconfont icon-copy" @click="copy(data.sell_bank.bank_branch)"></span>
                        </div>
                    </div>
                </template>
                <template   v-if="check_type=='微信'">
                    <div class="img-item">
                        <div class="left">
                            微信收款码
                        </div>
                        <div class="rihgt">
                            <img :src="data.sell_bank.wechat" alt="">
                        </div>
                    </div>
                </template>

                <template   v-if="check_type=='支付宝'">
                    <div class="img-item">
                        <div class="left">
                            支付宝收款码
                        </div>
                        <div class="rihgt">
                            <img :src="data.sell_bank.zhifubao" alt="">
                        </div>
                    </div>
                </template>

            </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getdata()
    },
    data(){
        return{
            id:this.$route.query.id,
            data:{},
            status:this.$route.query.status
        }
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/auction_goods/audit_payment_page',
                data:{
                    id:this.id
                }
            }).then(res=>{
                this.data=res.info
            })
        },
        copy (text) {
    let textarea=document.createElement('textarea')
    textarea.innerHTML=text
    document.body.append(textarea)
    textarea.select();
    var show = document.execCommand("Copy");
    textarea.remove();
    // const copyInput = document.querySelector('#copy_text');
    // copyInput.value = content;
    // copyInput.select();
    // var show = document.execCommand('Copy');
    this.showtitle('复制成功')
        }
    },
    computed: {
        check_type(){
            let pay_type=this.data.pay_type
            let s=''
            if(pay_type==1){
                s='支付宝'
            }
            if(pay_type==2){
                s='微信'
            }
            if(pay_type==3){
                s='银行卡'
            }
            return s
        }
    },
}
</script>

<style lang="scss" scoped>
.img-item{
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    box-sizing: border-box;
    padding:  10px;
    .left{
        color: #000;
    }
    .rihgt{
        height: 100%;
    }
}
.upload-box{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 15px;
     color: #999;
     font-size: 16px;
     align-items: center;
}
.title{
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #000;
    height: 40px;
    line-height: 40px;
}
     .yellow-div{
        background: rgb(252,250,223);
        color: rgb(136,109,80);
        box-sizing: border-box;
        padding: 10px;
    }
    .content{
        background: rgb(239,243,246);
    }
    .red{
        color: red !important;
    }
    .item-box{
        background: white;
        .item{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            padding: 0 10px;
            font-size: 14px;
            .left{
                color: rgb(137,137,137);
            }
            .right{
                color: rgb(69,69,69);
            }
        }
    }
</style>