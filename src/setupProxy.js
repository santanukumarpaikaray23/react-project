const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  
  app.use(
    ':8080/',
    createProxyMiddleware({
      target: 'http://ec2-13-127-71-22.ap-south-1.compute.amazonaws.com',
      changeOrigin: true,
    })
  );
 
};
