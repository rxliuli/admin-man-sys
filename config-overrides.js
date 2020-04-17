const WorkerPlugin = require('worker-plugin')

module.exports = {
  webpack: function(config, env) {
    //region web-worker

    config.plugins.push(new WorkerPlugin())

    //endregion

    return config
  },
}
