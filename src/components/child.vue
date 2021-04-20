<template>
    <div>
        <child v-bind="$attrs"  />

        <div class="test1" >
            test1
        </div>
    </div>
</template>

<script>
import child from '@/components/child2'
    export default{
        created() {
            console.log(this.name)
        },
        inject:['name'],
        components:{
            child
        }
    }
</script>

<style lang="scss" scoped>
    
</style>