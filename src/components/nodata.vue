<template>
    <div class="nodata">
        <img src="../assets/none.png" alt="">
        <div>
            没有更多数据了
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .nodata{
        text-align: center;
        margin: 40px 0 0 0;
        img{
            width: 100px;
            height: 100px;
            display: inline-block;
        }
        div{
            font-size: 16px;
            color: #999;
        }
    }
</style>