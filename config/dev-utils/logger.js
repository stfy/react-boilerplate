const chalk = require('chalk');

const config = {
    info: {
        bg: 'bgCyan',
        msg: ' INFO ',
        text: 'cyan',
    },

    error: {
        bg: 'bgRed',
        msg: ' ERROR ',
        text: 'red',
    },

    success: {
        bg: 'bgGreen',
        msg: ' SUCCESS ',
        text: 'whiteBright',
    }
}

function createLogger(type) {
    const loggerConfig = config[type]

    const messageType = chalk[loggerConfig.bg].black(loggerConfig.msg)
    const content = chalk[loggerConfig.text]

    return (text) => {
        console.log(messageType + ' ' + content.bold(text));
    }
}

module.exports = {
    info: createLogger('info'),
    error: createLogger('error'),
    success: createLogger('success')
}
