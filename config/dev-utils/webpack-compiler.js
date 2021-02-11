const webpack = require("webpack")
const logger = require('./logger');
const clearConsole = require('./clearConsole')


const asyncCompile = (config) => {
    let compiler;

    logger.info('Initialize compiler...');

    return new Promise((resolve, reject) => {
        try {
            compiler = webpack(config)
        } catch (e) {
            logger.error(e);

            process.exit(1);
        }

        compiler.hooks.done.tap('done', async stats => {
            clearConsole()
        })

        compiler.run((err, stats) => {
            if (err) {
                logger.error('Compilation failed')
            }

            !err ? resolve(stats) : reject(err);
        });
    })
}


const compile = (config) => {
    let compiler;

    logger.info('Initialize compiler...');

    try {
        compiler = webpack(config)
    } catch (e) {
        logger.error(e);

        process.exit(1);
    }

    compiler.hooks.done.tap('done', async stats => {
        clearConsole()
    })

    return compiler;
}

module.exports = {
    compile,
    asyncCompile
};
