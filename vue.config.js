module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.wansongtao.com:6060',
        ws: true,
        changeOrigin: true
      }
    }
  }
};