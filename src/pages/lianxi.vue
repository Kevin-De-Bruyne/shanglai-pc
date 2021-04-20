<template>
    <div class="content">
        <headers title="在线客服" />
        <div class="neirong">
            <div class="title">
            {{data.title}}
        </div>
        <div class="mycontent" v-html="data.content">

        </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        data(){
            return{
                data:{}
            }
        },
        created() {
            this.getdata()
        },
        methods: {
            getdata(){
                this.ajax({
                    url:'index/article/customer_service'
                }).then(res=>{
                    this.data=res.info
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        text-align: center;
        box-sizing: border-box;
        padding: 50px 0 0 0;
        font-size: 14px;
    }
</style>