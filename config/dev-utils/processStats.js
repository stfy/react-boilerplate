const chalk = require('chalk');

function logWarnings(warnings) {
    if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
            '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
            'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
    } else {
        console.log(chalk.green('Compiled successfully.\n'));
    }
}


function ensureErrors(clientMessages) {
    if (clientMessages.errors.length) {
        console.log(chalk.red('Failed to compile.\n'));
        console.log((err.message || err) + '\n');
        process.exit(1);
    }
}


module.exports = {
    logWarnings,
    ensureErrors
}