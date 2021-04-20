module.exports={
    lintOnSave:false,
    publicPath: './',
    css: {
        loaderOptions: {
          postcss: {
            plugins: [ 
              require('postcss-plugin-px2rem')({
                selectorBlackList: ['norem'],
                rootValue:37.5,      // 新版本的是这个值
                mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
                exclude: /(node_module)/, 
              }),
            ]
          }
        }
      },
      // 　devServer: {
      //   　　　　　　open: true,
      //   　　　　　　host: 'localhost',
      //   　　　　　　port: 8081,
      //   　　　　　　https: false,
      //   　　　　　　//以上的ip和端口是我们本机的;下面为需要跨域的
      //   　　　　　　proxy: {  //配置跨域
      //   　　　　　　　　'/': {
      //   　　　　　　　　　　target: 'http://newa.com/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
      //   　　　　　　　　　　ws: true,
      //   　　　　　　　　　　changOrigin: true,  //允许跨域
      //   　　　　　　　　　　pathRewrite: {
      //   　　　　　　　　　　　　'^/': ''  //请求的时候使用这个api就可以
      //   　　　　　　　　　　}
      //   　　　　　　}
      //   　　　　}
      //   　　}
}