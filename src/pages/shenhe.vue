<template>
    <div class="content">
        <headers title="付款审核" />

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
            <div class="item-box m-t-10">
                <div class="title">
                    买家信息
                </div>
                <div class="item">
                    <div class="left">
                        买家昵称
                    </div>
                    <div class="right">
                        {{data.buy_nick_name}}
                    </div>
                </div>
                <div class="item">
                    <div class="left">
                        买家真实姓名
                    </div>
                    <div class="right">
                       {{data.buy_real_name}}
                    </div>
                </div>
                <div class="item">
                    <div class="left">
                        买家手机号
                    </div>
                    <div class="right">
                        {{data.buy_mobile}}
                        <span class="iconfont icon-copy" @click="copy(data.buy_mobile)"></span>
                    </div>
                </div>
                <div class="img-item">
                    <div class="left">
                        支付凭证
                    </div>
                    <div class="rihgt">
                        <img :src="data.pay_img" @click="pay_img_show=true" alt="">
                    </div>
                </div>
                <div class="item radio-item">
                    <div class="left">
                        是否通过
                    </div>
                    <div class="right radio-box">
                        <van-radio-group v-model="radio" direction="horizontal">
                              <van-radio name="1">不通过</van-radio>
                                <van-radio name="2">通过</van-radio>
                        </van-radio-group>
                    </div>
                </div>
                <div class="img-item" v-if="radio==2">
                    <div class="left">
                        备注
                    </div>
                    <div class="rihgt">
                        <textarea name="" placeholder="送给买家的备注" v-model="beizhu" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
            </div>
            

            <div class="butn" @click="submit()">
                {{submit_text}}
            </div>

            <van-image-preview v-model="pay_img_show"  :images="[data.pay_img]">
            
        </van-image-preview>

        <popup :shows="box_show">
            <div class="white-box">
                <div class="title">
                    确认放货提示
                </div>

                <div class="neirong">
                   诺核对是否已收到相关款项，点击
                    确认故货后，均视为已收到款，如
                未收到款，却点击了放货的，由.
                产生的损失由卖家自行承担!!
                </div>
                <div class="chechbox">
                    <van-checkbox v-model="checked">我已阅读并同意以上条款</van-checkbox>
                </div>
                <div class="butn-box">
                    <div class="butn1" @click="box_show=false">
                        取消
                    </div>
                    <div class="butn2" @click="submit2()">
                        确认放货
                    </div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
export default {
    created() {
        this.getdata()
    },
    data(){
        return{
            box_show:false,
            submit_text:'拒绝通过，提交审核',
            beizhu:'',
            id:this.$route.query.id,
            data:{},
            status:this.$route.query.status,
            radio:"1",
            pay_img_show:false,
            checked:true
        }
    },
    watch: {
        radio(news,old){
            if(news==1){
                this.submit_text='拒绝通过，提交审核'
            }else{
                this.submit_text='确认付款，完成拍卖'
            }
        }
    },
    methods: {
        submit(){  
            if(this.radio==2){
                this.box_show=true
            }else{
                this.submit2()
            }

           
        },
        submit2(){
             this.ajax({
                url:'index/auction_goods/audit_payment',
                data:{
                    id:this.id,
                    status:this.radio==1?-1:2,
                    remake:this.beizhu
                }
            }).then(res=>{
                this.showtitle('操作成功').then(res=>{
                    this.$router.go(-1)
                })
            })
        },
        getdata(){
            this.ajax({
                url:'index/auction_goods/audit_payment_page',
                data:{
                    id:this.id
                }
            }).then(res=>{
                this.data=res.info
                console.log(this.data.sell_bank.zhifubao)
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
.radio-box{
    height: 100%;
    /deep/.van-icon{    
        font-size: 30px;
    }
    /deep/.van-radio-group{
        height: 100%;
    }
    /deep/.van-radio__icon{
        height: auto;
    }
    /deep/.van-radio__label{
        font-size: 20px;
        vertical-align: middle;
    }
}
.radio-item{
    height: 100px !important;
    font-size: 20px;
    .left{
        display: flex;
        align-items: center;
    }
}
.white-box{
    background: white;
    border-radius: 10px;
    margin: auto 20px;
    box-sizing: border-box;
    padding: 60px 25px 20px 25px;
    .title{
        border: none;
        color: #000;
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        margin: 0 0 20px 0;
    }
    .neirong{
        color: #999;
        font-size: 12px;
        margin: 0 0 25px 0;
    }
    .checkbox{
        margin: 0 0 30px 0;
    }
    .butn-box{
        display: flex;
        justify-content: space-between;
        margin: 10px 0 0 0;
        div{
            flex: 1;
            color: white;
            border-radius: 20px;
            font-size: 14px;
            text-align: center;
            height: 40px;
            line-height: 40px;
        }
    }
    .butn1{
        margin: 0 10px 0 0;
        background: rgb(134,153,160);
    }
    .butn2{
        background: rgb(83,160,80);
    }
}
textarea{
  border: none;
  background: none;
  height: 100%;
}
.butn{
    margin: 40px;
    background: rgb(10,82,193);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
}
.radio-box{
    display: flex;
    align-items: center;
}
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