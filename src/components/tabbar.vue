<template>
    <div class="tabbar-bottom">
        <div class="tabbar-item" v-for="(item,index) in tabbar" :key="index"
        @click="gourl(item)"
        >
            <div class="top">
                <img :src="item.img_chose" v-if="$route.path==item.url" alt="">
                <img :src="item.img" v-else alt="">
            </div>
            <div class="bottom" :class="{'chose-style':$route.path==item.url}">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tabbar:[
                {
                name:'首页',
                url:'/',
                img:require('../assets/home2.png'),
                img_chose:require('../assets/home.png'),
            },
            // {
            //     name:'云商商城',
            //     url:'/shops',
            //     img:require('../assets/shop2.png'),
            //     img_chose:require('../assets/shop.png'),
            //     nologin:true
            // },
            {
                name:'我的',
                url:'/mine',
                img:require('../assets/mine2.png'),
                img_chose:require('../assets/mine.png'),
            }
            ]
        }
    },
    created() {
        console.log(this.$attrs)
    },
    methods: {
        gourl(item){
            if(item.nologin){
                this.showtitle('暂未开放')
                return 
            }
            if(this.$route.path==item.url){
                return
            }
            this.$router.push(item.url)
        }
    },
}
</script>

<style lang="scss" scoped>
    .tabbar-bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background: white;
        display: flex;
        box-sizing: border-box;
        padding: 3px 0 3px 0;
        justify-content: space-around;
        z-index: 99;
        .tabbar-item{
            height: 100%;
            width: 70px;
                text-align: center;
            img{
                width: 25px;
                height: 25px;
            }
            .bottom{
                margin: 0 0 0 0;
            }
        }
    }
    .chose-style{
        color: rgb(26,94,196) !important;
    }
</style>