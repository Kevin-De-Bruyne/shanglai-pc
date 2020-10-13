<template>
  <div id="app">
    <div id="download" v-if="download">
		<van-circle
		v-model="currentRate"
		:rate="0"
		:text="text"/>
    </div>
     <transition :name="transitionName">
            <router-view v-if="!download" class="router-view"/>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      download:false,
       transitionName: 'slide-left',
       scroll:true,
       currentRate:0
    }
  },
  computed: {
      text() {
	    return this.currentRate + '%';
	  }
  },
  created() {
      
  },
  mounted() {
    document.addEventListener('plusready', ()=> { //等待puls准备好
      // 等puls准备好获取系统版本号
      plus.runtime.getProperty( plus.runtime.appid,  ( wgtinfo ) =>{ 
        var wgtStr = String(wgtinfo.version);
        //获取系统版本号
             ajaxs.post(baseUrl+'index/my/version',{
                version:wgtStr
             }).then(res=>{
                 
              console.log(res.status)
                if(res.data.status==0){
                  this.download=true
                  this.downloadsr() 
                  // 如果当前系统版本号跟远程数据库上的版本号不一致，则下载更新包
                    
                }
             }).catch(err=>{
                 console.log(err,'请求版本号错误')
             })
          })
	},false); 
  },  
  methods: {
    downloadsr(){
		var that = this;
	    	downwgt().then((res)=>{
          console.log(res)
	    		if(!res){
	    			downToak.addEventListener("statechanged",(task, status) =>{
                  let i = parseInt(Number(task.downloadedSize) / Number(task.totalSize) * 100);
                  console.log(i)
			            if(i>99){
			                this.download = false;
			            }else{
			                this.currentRate = i;
			            }
			        });
	    		}
	    	}) 
	}
     
  },
   watch: {
            $route(to, from) {
              this.scroll=false
               
               console.log(document.body.scrollTop,document.documentElement.scrollTop)
                 document.documentElement.scrollTop = 0; 
                if (to.meta.index > from.meta.index) {  //外---》内
                    this.transitionName = 'slide-left'
                } else if (to.meta.index < from.meta.index) {   //内---》外
                    this.transitionName = 'slide-right'
                } else {
                    this.transitionName = 'slide-content'   //同级 无过渡效果
                }
            }
   }
}
</script>

<style lang="scss">
#app{
/deep/.van-count-down{
  color: red !important;
}
}
img{
  max-width: 100%;
  max-height: 100%;
}
.bottom{
  position: static !important;
  z-index: 0 !important;
}
.van-toast{
  position: fixed !important;
}
.van-dialog{
  position: fixed !important;
}
@import url('./assets/css/default.css');
.test{
  color: red;
  width: 20px;
  height: 20px;
}
* {
  margin: 0;
  padding: 0;
}
.content{
  box-sizing: border-box;
  padding: 50px 0 10px 0;
   min-height: 100vh;
}
.content-tabbar{
  box-sizing: border-box;
  padding: 70px 0 65px 0;
  min-height: 100vh;
}
#app {
        width: 100%;
        min-height: 100%;
        margin: 0 auto;
        background: #fff;
        -webkit-overflow-scrolling: touch;
        // position: absolute;
        left:0;
        top:0;
    }
    /*切换样式出错处理*/
    .router-view{
        width: 100%;
        margin: 0 auto;
        -webkit-overflow-scrolling: touch;
    }
    /*切换动画*/
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-content-leave-active,
    .slide-content-enter-active,
    .slide-left-leave-active{
        min-height: 100vh;
        height: 100%;
        will-change: transform;
        transition: all 400ms;
        position: absolute;
        backface-visibility: hidden;
    }
    .slide-right-enter{
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .slide-right-leave-active{
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .slide-content-enter{
        opacity: 0;
        // transform: translate3d(-100%, 0, 0);
    }
    .slide-content-leave-active{
        opacity: 0;
        // transform: translate3d(100%, 0, 0);
    }

    .slide-left-enter{
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-leave-active{
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    input{
        border: none;
        outline: none;
        background: none;
        font-size: 14px;
    }
    html{
      font-family:PingFang-SC-Medium,PingFang-SC;
    }
    ::-webkit-input-placeholder{/*Webkit browsers*/
    color:#999;

}
:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
   color:#999;
   
}
::moz-placeholder{/*Mozilla Firefox 19+*/
   color:#999;

}
:-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;

}
#download{
	display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000045;
    z-index: 1111111111111111111177;
}
</style>
