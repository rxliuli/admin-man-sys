module.exports = {
  webpack: function(config, env) {
    //region web-worker

    config.output.globalObject = 'this'

    //endregion

    return config
  },
}
