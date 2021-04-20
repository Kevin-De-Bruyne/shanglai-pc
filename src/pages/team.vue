<template>
    <div class="content">
        <headers title="我的团队"/>

        <div class="white-box">
            <div class="item">
                <div class="top">
                    {{data.team_all}}
                </div>
                <div class="bottom">
                    团队人数
                </div>
            </div>
            <div class="item">
                <div class="top">
                    {{data.today_order_all}}
                </div>
                <div class="bottom">
                    今日总单量
                </div>
            </div>
        </div>
        <div class="item-box">
            <div class="item" v-for="(item,index) in data.data" :key="index">
                <div class="top" @click="item.down=!item.down" :class="{'choise-bg':item.down}">
                    <div class="left">
                        {{item.nick_name}}({{item.children.length}})今日:{{item.today_order}}
                    </div>
                    <div class="right">
                        {{item.mobile}}
                        <span v-if="item.down" class="iconfont icon-shangla"></span>
                        <span v-else class="iconfont icon-xiala"></span>
                    </div>
                </div>
                <div class="bottom" v-for="(child,y) in item.children" :key="y" :class="{'heihgt_show':item.down}"
                @click="child.down=!child.down"
                >
                <div class="top">
                    <div class="bottom-pd">
                        <div class="div1">
                        <span v-if="child.down" class="iconfont icon-shangla"></span>
                        <span v-else class="iconfont icon-xiala"></span>
                    </div>
                    <div class="div2">
                        <div class="tops">
                            {{child.nick_name}}({{child.children.length}})今日:{{child.today_order}}
                        </div>
                        <div class="bottoms">
                             {{child.mobile}}
                        </div>
                    </div>
                    </div>
                </div>
                    
                    <div class="bottom">
                            <div class="bottom" v-for="(child2,y2) in child.children" :key="y2" :class="{'heihgt_show':child.down}"
                @click="child2.down=!child2.down"
                >
                    <div class="bottom-pd">
                        <div class="div1">
                        <span v-if="child2.down" class="iconfont icon-shangla"></span>
                        <span v-else class="iconfont icon-xiala"></span>
                    </div>
                    <div class="div2">
                        <div class="tops">
                            {{child2.nick_name}}今日:{{child2.today_order}}
                        </div>
                        <div class="bottoms">
                             {{child2.mobile}}
                        </div>
                    </div>
                    </div>
                    
                </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[
                // {
                //     nick_name:'艾莉亚.史塔克',
                //     down:false,
                //     today_order:99,
                //     children:[{
                //         nick_name:'珊莎.史塔克',
                //         today_order:99,
                //         down:false,
                //         children:[]
                //     }]
                // },
                // {
                //     name:'艾莉亚.史塔克',
                //     down:false,
                //     children:[{
                //         name:'珊莎.史塔克',
                //         down:false,
                //         children:[]
                //     }]
                // },
            ]
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        getdata(){
            this.ajax({
                url:'index/my/my_team'
            }).then(res=>{
                this.data=res.info
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.heihgt_show{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    max-height: 500px !important;
    
}
.choise-bg{
background: rgb(254,250,239) !important;
}
    .white-box{
        background: white;
        display: flex;
        box-sizing: border-box;
        padding: 20px 0;
        .item{
            flex: 1;
            text-align: center;
            line-height: 25px;
            font-size: 16px;
            color: #999;
        }
    }
    .item-box{
        .item{
            margin: 10px 0 0 0;
            background: white;
            .top{
                box-sizing: border-box;
                padding: 0 15px;
                height: 50px;
                align-items: center;
                font-size: 16px;
                color: rgb(109,109,108);
                display: flex;
                justify-content: space-between;
                .iconfont{
                    font-size: 12px;
                    margin: 0 0 0 15px;
                }
            }
            .bottom{
                overflow: hidden;
                max-height: 0;
                box-sizing: border-box;
                line-height: 25px;
                font-size: 16px;
                color: rgb(139,139,139);
                transition: all .2s ease;
               
                .bottom-pd{
                    display: flex;
                    box-sizing: border-box;
                    padding: 15px;
                }
                .div1{
                    display: flex;
                    align-items: center;
                    margin: 0 10px 0 0;
                    .iconfont{
                    font-size: 12px;

                    }
                }
            }
        }
    }
    .content{
        background: rgb(239,243,245);
    }
</style>