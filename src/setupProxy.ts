import proxy from 'http-proxy-middleware'
const fs = require('fs-extra')
const path = require('path')

/**
 * 开发环境代理
 * @param app
 * @return {string|*}
 */
module.exports = function(app: any) {
  const proxyConfig: proxy.Config = {
    target: 'https://localhost:8000',
    changeOrigin: true,
    secure: false,
    ws: true,
    pathRewrite(api: string) {
      const mockApiList = fs.readJSONSync(
        path.resolve(__dirname, './config/mockApiList.json'),
      )
      return (
        api +
        (mockApiList.some((mockApi: string) => api.includes(mockApi))
          ? '?mock=default&errCode=200'
          : '')
      )
    },
  }

  app.use(proxy('/api', proxyConfig))
}
