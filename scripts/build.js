const fs = require('fs-extra')

const {asyncCompile} = require('../config/dev-utils/webpack-compiler');
const {logWarnings, ensureErrors} = require('../config/dev-utils/processStats');
const configFactory = require('../config/webpack.config');
const logger = require('../config/dev-utils/logger');
const statsAdapter = require('../config/dev-utils/statsAdapter');
const paths = require('../config/paths');

const FileSizeReporter = require('razzle-dev-utils/FileSizeReporter');
const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const webpackConfig = configFactory();

logger.info('Creating an optimized production build...');

measureFileSizesBeforeBuild(paths.appBuild)
    .then(previousFileSizes => {
        fs.emptyDirSync(paths.appBuild);

        return asyncCompile(webpackConfig)
            .then((stats) => {
                const clientMessages = formatWebpackMessages(
                    statsAdapter(stats.toJson({}, true))
                );

                ensureErrors(clientMessages);
                logWarnings(clientMessages.warnings)

                logger.success('App built successfully');

                printFileSizesAfterBuild(stats, previousFileSizes, paths.appBuild)
            })
    });


