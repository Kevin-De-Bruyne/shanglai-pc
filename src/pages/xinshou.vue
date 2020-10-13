<template>
    <div class="content">
        <headers title="新手指南"/>

        <div class="html" v-html="data.content">

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
        getdata(){
            this.ajax({
                url:'index/index/beginner_guide_list',
                data:{
                    type:1
                }
            }).then(res=>{
                this.data=res.info
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .html{
        box-sizing: border-box;
        padding: 0 10px;
        /deep/ img{
            max-width: 100%;
        }
    }
    
</style>