const WebpackDevServer = require("webpack-dev-server");

const {compile} = require('../config/dev-utils/webpack-compiler');
const configFactory = require('../config/webpack.config');
const config = require('../config/dev-utils/getConfig');
const logger = require('../config/dev-utils/logger');

(function main() {
    const webpackConfig = configFactory();
    const compiler = compile(webpackConfig)
    const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

    devServer.listen(config.port, config.host, (err) => {
        if (err) {
            logger.error(err);
        }
    });
})();
