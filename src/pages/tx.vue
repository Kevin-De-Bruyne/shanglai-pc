<template>
	<div class="content">
		<!--头部-->
		<headers :title="type==1?'余额提现':'佣金提现'"  />
		<div class="card">
			<div class="cards">
				<div class="cara_top">
					<span class="card_j">{{type==1?'可提现余额':'可提现佣金'}}</span>
					<!-- <span class="card_e">当日额度：10000</span> -->
				</div>
				<div class="cara_cen">{{data.money}}</div>
			</div>
		</div>
		<div class="card_b">
			<div class="card_bs">
				<p class="jin">提现资产</p>
				<div class="moe">
					<span class="hei"></span>
					<input type="number" v-model="tx_num" />
				</div>
				<!-- <div class="tx"> -->
				<!-- <span>手续费：1%</span> -->
				<!-- <span class="htx">全部提现</span> -->
				<!-- </div> -->
			</div>
		</div>
        <!-- <van-radio-group v-model="tx_data.type">
  <van-cell-group>
    <van-cell title="微信" clickable @click="tx_data.type = '1'">
      <template #right-icon>
        <van-radio name="1" />
      </template>
    </van-cell>
    <van-cell title="支付宝" clickable @click="tx_data.type = '2'">
      <template #right-icon>
        <van-radio name="2" />
      </template>
    </van-cell>
    <van-cell title="银行卡" clickable @click="tx_data.type = '3'">
      <template #right-icon>
        <van-radio name="3" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group> -->

				<!-- <template v-if="tx_data.type!=3">
						<div class="title">
						请上传收款码
					</div>
					<van-uploader v-model="fileList"  :max-count="1" />
				</template> -->

				<!-- <template>
					<div class="title">
						请选择到账方式
					</div>
					<van-cell  title="银行卡" v-if="data.bank[0]" to="/card?tx=true" :value="data.bank[0]&&data.bank[0].bank_num" is-link />
					<van-cell v-else title="银行卡" to="/card?tx=true" :value="data.bank.bank_num" is-link />
				</template> -->

		<div class="xcarr">
			<!-- <router-link to="/mine/card">
				<div class="xcard">
					<span class="card_k">银行卡：</span>
					<input type="text" class="nm" placeholder="请选择银行卡" disabled="disabled" v-model="car" value="" name="cart" />
					<van-icon name="arrow" color="#ccc" size="18" class="r" />
				</div>
			</router-link> -->
			<button class="btntj" @click="submit()">提交申请</button>
			<div class="xxxx">
				<p class="withdraw-foot-p">温馨提示：</p>
				<p class="withdraw-foot-dl">
					<p>1.提现金额须大于 {{tx.min}}元，小于{{tx.max}} 元</p>
					<p>2.提现收取{{tx.fee}}%+{{tx.fixed_fee}}元的手续费</p>
					<p>3.提现收取{{tx.tax}}%的税费</p>
					<p>4.手续费/税费在到账金额中扣除</p>
					<p>5.提现审核时间为{{tx.day_num}}天。</p>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
        data(){
            return{
                tx_num:'',
                type:this.$route.query.type,
                user:{
					type:'1'
				},
				fileList:[],
				yingh:'',
				id:this.$route.query.id||'',
				data:{
					bank:[]
				},
				tx:{},
				bank_id:''
            }
		},
		created() {
			this.getdata()
			this.getdata2()
		},
        methods: {
			getdata2(){
				this.ajax({
					url:'index/my/addbank',
					methods:'get',
				}).then(res=>{
					this.bank_id=res.bank.bank_id
				})
			},
			getdata(){
				this.ajax({
					url:'index/my/tx',
					
					data:{
						type:this.type
					}
				}).then(res=>{
                    this.data=res
                    this.tx=res.config
				})
			},
            submit(){
				console.log(this.id,this.tx_data)
				this.ajax({
					url:'index/my/withdrawals',
					
					data:{
						type:this.type,
						bank_id:this.bank_id,
					money:this.tx_num
					}
				}).then(res=>{
					this.showtitle('申请提现成功').then(res=>{
						this.$router.go('-1')
					})
				})
            }
        },
    }
</script>
<style scoped>

.title{
    box-sizing: border-box;
    padding: 0 20px;
    line-height: 40px;
    height: 40px;   
}
	.card {
		background: #0552bd;
		color: #fff;
		padding-top: 50px;
	}
	
	.cards {
		width: 90%;
		margin-left: 5%;
	}
	
	.cara_top {
		padding: 15px 0;
	}
	
	.cara_cen {
		font-size: 25px;
		height: 52px;
		line-height: 52px;
	}
	
	.card_e {
		float: right;
	}
	
	.card_b {
		width: 100%;
		background: #fff;
	}
	
	.card_bs {
		width: 90%;
		margin-left: 5%;
	}
	
	.hei {
		font-size: 17px;
		font-weight: bold;
	}
	
	.jin {
		padding-top: 15px;
	}
	
	.moe {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #eee;
	}
	
	.moe input{
		border:0;
		height:44px;
		width: 100%;
	}
	
	.tx {
		height: 40px;
		line-height: 40px;
	}
	
	.htx {
		color: #ea3d2f;
		float: right;
	}
	
	.xcarr {
		width: 100%;
		background: #fff;
		padding: 15px 0;
	}
	
	.xcard {
		width: 90%;
		margin-left: 5%;
		color: #000;
	}
	
	.nm {
		background: #fff;
		width:70%;
		color: #000;
		border:0;
	}
	
	.r {
		float: right;
	}
	
	.btntj {
		width: 90%;
		height: 45px;
		color: #fff;
		border-radius: 5px;
		margin-left: 5%;
		background:#0552bd;
		margin-top: 50px;
		border:0;
	}
	
	.xxxx {
		width: 90%;
		margin-left: 5%;
		margin-top: 40px;
		color: #666;
	}
</style>