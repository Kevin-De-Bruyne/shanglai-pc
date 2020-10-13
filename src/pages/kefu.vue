<template>
    <div class="content">
        <headers title="意见反馈" />

        <div class="ipt-box">
            <input type="text" v-model="user.phone" placeholder="请输入您的手机号码">
        </div>
        <div class="ipt-box">
            <input type="text" v-model="user.email" placeholder="请输入您的邮箱">
        </div>
        <div class="ipt-box">
            <input type="text" v-model="user.name" placeholder="请输入您的姓名">
        </div>
        <div class="title">
            上传图片(最多上传3张)
        </div>
        <div class="uoload-box">
          <van-uploader   multiple v-model="fileList" max-count="3" 
           />
      </div>
      <!-- <div class="title">
            上传文档(最多可上传3个)
        </div>
        <div class="uoload-box">
          <van-uploader  :ResultType="'text'" 
          :after-read="file_fn" v-model="wordfile"
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" max-count="3"  />
      </div> -->
        <div class="box">
            <textarea name="" v-model="user.content" placeholder="请输入反馈内容" id="" cols="30" rows="10"></textarea>
        </div>

        <div class="butn" @click="submit()">
            提交
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{},
            fileList:[], // 图片
            wordfile:[], //文档,
        }
    },
    methods: {
        file_fn(e){
            this.wordfile.push(e.file)
            console.log(this.wordfile)
            console.log(e)
        },
        submit(){
     let {user}=this
            this.ajax({
                url:'index/customer/opinionto',
                data:{
                    content:user.content,
                    user_name:user.name,
                    moblie:user.phone,
                    email:user.email,
                    path:this.fileList
                },
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res=>{

            })
     
            
        }
    },
}
</script>

<style lang="scss" scoped>
.title{
    color: #000;
    font-size: 18px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding: 0 0 0 10px;
}
.uoload-box{
    text-align: center;
}
    .butn{
    margin: 0 40px 0 40px;
    background: rgb(10,82,193);
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 60px;
    font-size: 18px;
}
.content{
    padding: 70px 15px 0 15px;
}
textarea{
    box-sizing: border-box;
    padding: 15px;
    flex: 1;
    height: 150px;
    border: none;
    outline: none;
}
.text{
    color: rgb(101,101,101) !important;
    font-size: 18px;
    margin: 0 20px 0 0;
    height: 100%;
    display: flex;
    align-items: center;
}
.title-box{
    background: rgb(255,250,226);
    color: rgb(180,128,91);
    font-size: 18px;
    box-sizing: border-box;
    padding: 15px 10px;
}
    .ipt-box{
        box-sizing: border-box;
        padding: 0 10px;
        border-bottom: 1px solid #eee;
        display: flex;
        height: 50px;
        input{
            height: 100%;
            flex: 1;
            color: #000;
            font-size: 14px;
        }
    }
    .getcode{
        color: rgb(10,82,193);
        margin: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>