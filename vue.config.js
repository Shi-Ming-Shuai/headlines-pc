module.exports = {
  // 生产环境关闭 sourceMap 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错
  // productionSourceMap: false,
  devServer: {
    // 内网穿透时 不报错
    disableHostCheck: true,
    // 开发环境 代理
    proxy: {
      '/app': {
        // target: 'https://toutiao.m.lipengzhou.com'
        target: 'http://ttapi.research.itcast.cn'
        // changeOrigin: true, // 不写默认为 true 更改 host 为 target(跨ip)
        // pathRewrite: { // 路径重写
        //   '^/app': ''
        // }
      }
      // '/module': {
      //   target: 'https://sm.ms/api/v2',
      //   changeOrigin: true,
      //   secure: false, //如果是https接口，需要配置这个参数
      //   pathRewrite: { //把 /module开头的替换成/module
      //     '^/module': '/'
      //   }
      // }
    }
  }
}
