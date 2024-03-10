const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app: any) {
    app.use(
        createProxyMiddleware('/openapi', {
            target: 'http://211.237.50.150:7080',
            changeOrigin: true,
            pathRewrite: {
                '^/openapi': '',
            }
        })
    )

    console.log('proxy server initialized')
}

export { };