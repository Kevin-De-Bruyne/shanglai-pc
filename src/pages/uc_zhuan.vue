<template>
    <div class="content">
        <headers title="账户UC币互转"/>
        <div class="ding-box">

        
        <div class="white-bg">

        
        

        <div class="title">
            目标手机号
        </div>

        <div class="myipt-box">
            <div class="left">
                 <input type="number" v-model="phone" placeholder="请输入目标账户手机号码">
            <input type="text" v-model="name" placeholder="请输入目标账户真实姓名">
            </div>
            <div class="testname" @click="yanzhen()">
                验证信息
            </div>
        </div>

        <template v-if="testname">
            <div class="title m-t-10">
                目标用户信息
            </div>
            <div class="yanz-box">
                核对信息:  <span class="m-r-5">真实姓名</span>
                <span class="m-r-5">{{user.real_name}}</span>
                <span class="m-r-5">手机</span>
                <span class="m-r-5">{{user.phone}}</span>
                
            </div>
        </template>

        

        <div class="title m-t-10">
            转出数量
        </div>

        <div class="title2">
            最少转出数量限制为99UC币
        </div>

        <div class="ipt-box3">
            <input type="number" v-model="money" placeholder="数量">
            <span class="UCbi">
                UC币
            </span>
        </div>

        <div class="title-box">
            <span class="icon">!</span>
            可转出
            <span class="text">{{data.user_money}}</span>
            UC币
        </div>
        <div class="title3">
            最低100起互转
        </div>

       </div>
       </div>

       <div class="butn" @click="submit()">
           确认转出
       </div>

       <van-dialog @confirm="confirm()" v-model="password_show" title="交易密码" show-cancel-button>
            <input type="password" v-model="password" class="name_ipt" placeholder="请输入交易密码">
       </van-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            password:'',
            password_show:false,
            user:{},
            phone:'',
            name:'',
            money:'',
            testname:false,
            data:{}
        }
    },
    created() {
        this.getdata()
    },
    methods: {
         getdata(){
            this.ajax({
                url:'index/my/user_info'
            }).then(res=>{
                this.data=res.user
                // this.data.is_certification?
            })
        },
        submit(){
            console.log(12312312)
            let {user}=this

            if(!this.phone){
                this.showtitle('请输入目标人手机号')
                return
            }
            if(!this.name){
                this.showtitle('请输入目标人真实姓名')
                return
            }
            if(!this.money){
                this.showtitle('请输入金额')
                return
            }
            this.password_show=true
        },
        confirm(){
            let test_json=''
            // let s=localStorage.getItem('uc_test')
            // console.log(s)
            // console.log(eval('(' + s + ')'))
            // console.log(JSON.parse(localStorage.getItem('uc_test')))
            try {
                // .replace(/\"/g,"'")
                console.log(localStorage.getItem('uc_test'))
                let s=localStorage.getItem('uc_test')
                 test_json=eval('(' + s + ')')
                
            } catch (error) {
                
            }
            console.log(test_json)
            if(!test_json){
                this.showtitle('请先验证目标信息')
                return 
            }
            if(test_json.name!=this.name||test_json.phone!=this.phone){
                this.showtitle('验证信息不通过,请先验证目标信息')
                // this.$dialog.confirm({
                //     title: '提示',
                //     message: '请先验证对方信息无误后，再进行转账!',
                //     })
                //     .then(() => {
                //         // on confirm
                //     })
                //     .catch(() => {
                //         // on cancel
                //     });
                return 
            }
           
            this.ajax({
                url:'index/my/transfer_accounts',
                data:{
                    mobile:this.phone,
	                password:this.password,
                    money:this.money,
                    real_name:this.name,
                    is_v:true
                }
            }).then(res=>{
                this.showtitle('申请成功').then(res=>{
                    this.$router.go(-1)
                })
            })
        },
        yanzhen(){
            this.ajax({
                url:'index/my/verification_mobile',
                data:{
                    mobile:this.phone,
                    real_name:this.name
                }
            }).then(res=>{
                this.user.real_name=res.real_name
                this.user.phone=res.mobile
                this.testname=true
                let json=JSON.stringify({
                    name:this.name,
                    phone:this.phone
                })
                console.log(json)
                localStorage.setItem('uc_test',json)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.name_ipt{
    text-align: center;
    height: 60px;
    font-size: 16px;
    width: 100%;
}
.yanz-box{
    border-bottom: 1px solid #eee;
    color: red;
    font-size: 16px;
    padding: 10px 0 20px 0;
}
.title3{
    color: #999;
    font-size: 16px;
    margin: 10px 0;
}
.content{
    background: rgb(239,243,245);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.ding-box{
    flex: 1;
}
.ipt-box3{
   display: flex;
   height: 120px;
   border-bottom: 1px solid #eee;
   input{
       flex: 1;
       height: 100%;
   }
   .UCbi{
       height: 100%;
       display: flex;
       align-items: center;
       font-size: 26px;
       font-weight: bold;
       color: #999;
   }
}
.butn{
    display: block;
    width: 80%;
    margin: 0 auto;
    background: rgb(10,82,193);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
    // position: fixed;
    // bottom: 30px;
    // left: 0;
    // right: 0;
}
.title-box{
    margin: 20px 0;
    font-size: 16px;
    .icon{
        display: inline-block;
        background: rgb(33,139,251);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        color: white;
        text-align: center;
        line-height: 15px;
        margin: 0 4px 0 0;
        font-size: 14px;
    }
    .text{
        color: rgb(254,160,50);
        margin: -10px 4px 0 0;
    }
}
.title2{
    color: #999;
    font-size: 20px;
}
    .white-bg{
        box-sizing: border-box;
        padding: 15px 15px;
        background: white;
    }
    .title{
        font-size: 20px;
        font-weight: bold;
        color: #000;
        height: 30px;
    }
    .ipt-box{
        display: flex;
        border-bottom: 1px solid #eee;
        height: 70px;
        box-sizing: border-box;
        padding: 20px 0;
        input{
            font-size: 14px;
           flex: 1;
           height: 100%;
        }
        .testname{
            display: flex;
            align-items: center;
            font-size: 20px;
            border-radius: 6px;
            color: rgb(10,82,193);
            border: 1px solid rgb(10,82,193);
            padding: 0 10px;
            height: 100%;
        }
    }
    .myipt-box{
        display: flex;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding: 20px 0;
        .left{
            input{
                width: 100%;
                height: 40px;
            }
        }
        input{
            font-size: 14px;
           flex: 1;
           height: 100%;
        }
        .testname{
            display: flex;
            align-items: center;
            font-size: 20px;
            border-radius: 6px;
            color: rgb(10,82,193);
            border: 1px solid rgb(10,82,193);
            padding: 0 10px;
        }
    }
</style>