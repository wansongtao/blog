module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:6060/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  }
};