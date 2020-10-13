<template>
    <div class="content">
        <headers title="公告详情"/>

        <div class="html" v-html="data.content">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:JSON.parse(this.$route.query.detail)
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        getdata(){
            
        }
    },
}
</script>

<style lang="scss" scoped>
    .html{
        box-sizing: border-box;
        padding: 0 10px;
        /deep/img{
            max-width: 100%;
        }
    }
    
</style>