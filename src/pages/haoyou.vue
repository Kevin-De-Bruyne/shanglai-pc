<template>
    <div class="content">
        <headers title="邀请好友"/>

        <img :src="data.qrcode" alt="">

        <div class="butn" @click="copy(data.url)">
            立即邀请
        </div>
    </div>  
</template>

<script>
export default {
    data(){
        return{
            data:{}
        }
    },
    created() {
        this.getdata()
    },
    methods: {
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
            this.$dialog.alert({
  title: '提示',
  message: '邀请链接复制成功!',
}).then(() => {
  // on close
});
        },
        getdata(){
            this.ajax({
                url:'index/my/qr_code',
                
            }).then(res=>{
                this.data=res
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.butn{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(0,6,172);
    font-size: 14px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    color: white;
}
    .content{
        background: rgb(239,243,245);
        /deep/ img{
            max-width: 100%;
        }
    }
</style>