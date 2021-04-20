<template>
    <div class="content">
        <headers title="余额充值" />

        <div class="title">
            请选择支付方式
        </div>
        <van-radio-group v-model="radio">
        <van-cell-group>
            <van-cell  clickable @click="radio = '1'">
            
            <template #title>
                <div>
                    <img class="img-wx" src="../assets/weixin.png" alt="">
                    微信
                </div>
            </template>
            <template #right-icon>
                <van-radio name="1" />
            </template>
            </van-cell>
            <van-cell  clickable @click="radio = '2'">
            <template #title>
                    <div>
                        <img class="img-zfb" src="../assets/chongzhi_zfb.png" alt="">
                        支付宝
                    </div>
            </template>
            <template #right-icon>
                <van-radio name="2" />
            </template>
            </van-cell>
        </van-cell-group>
        </van-radio-group>
        
        <van-cell-group>
            <van-field v-model="money" label="充值金额" placeholder="请输入充值金额" />
        </van-cell-group>


        <div class="butn">
            <van-button type="primary" class="m-t-20" block round @click="submit()">
                确定    
        </van-button>
        </div>

        <div class="beizhu-box">
                <div class="mytitle">
                    提示：
                </div>
                <div class="text">
                    1、余额仅用于支付委拍手续费或作为拍卖保证金使用。
                </div>
                <div class="text">
                    2、余额不能用于支付商品货款。
                </div>
                <div class="text">
                    3、在微信内浏览本页面时，请选择微信支付。
                </div>
            </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                radio:'1',
                money:'',
                max_money:this.$route.query.max
            }
        },
        methods: {
            callpay(params) {
				if(typeof WeixinJSBridge == "undefined") {
					if(document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(params), false);
					} else if(document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.jsApiCall(params));
						document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall(params));
					}
				} else {
					this.jsApiCall(params);
				}
			},
            jsApiCall(params) {
				var self = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						'appId': params.appId, // 公众号名称，由商户传入
						'timeStamp': params.timeStamp, // 时间戳，自1970年以来的秒数
						'nonceStr': params.nonceStr, // 随机串
						'package': params.package,
						'signType': params.signType, // 微信签名方式：
						'paySign': params.paySign, // 微信签名
					},
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request:ok") {
							self.showtitle('支付成功')
						} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
							Toast({
								message: '支付已取消',
								duration: 2000
                            });
                            self.showtitle('支付已取消')
						} else {
							// Toast({
							// 	message: res.err_desc,
							// 	duration: 2000
                            // });
                            self.showtitle(res.err_desc)
						}
					}
				);
            },
            is_weixnzzz(){  
            var ua = navigator.userAgent.toLowerCase();  
            if(ua.match(/MicroMessenger/i)=="micromessenger") {  
                return true;  //在微信中打开
            } else {  
                return false;  
            }  
        },
            submit(){
                this.ajax({
                    url:'index/my/recharge',
                    data:{
                        money:this.money
                    }
                }).then(res=>{
                    if(this.radio==1){
                        this.ajax({
                            url:'index/my/weixinpay',
                            data:{
                                order_id:res.order_id
                            }
                            }).then(ret=>{
                                if(this.is_weixnzzz()){
                                    this.callpay(ret.data)
                                }else{
                                    window.location.href=ret.data.mweb_url
                                }
                                
                            })
                    }else{
                        this.ajax({
                        url:'index/my/alipay',
                        data:{
                            order_id:res.order_id
                        }
                        }).then(ret=>{
                            let div=document.createElement('div')
                            div.innerHTML=ret.html
                            document.documentElement.appendChild(div)
                            let forms=document.forms[0]
                            forms.submit()
                            console.log(forms)
                            // window.location.href=ret.data.mweb_url
                        })
                    }
                    
                })
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.img-wx{
    width: 30px;
    height: 30px;
    vertical-align: middle;
}
.img-zfb{
    width: 30px;
    height: 30px;
    vertical-align: middle;
}
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
    .title{
        box-sizing: border-box;
        padding: 0 0 0 20px ;
        line-height: 40px;
        font-size: 14px;
    }
    .butn{
        box-sizing: border-box;
        padding: 0 10px;
    }
</style>