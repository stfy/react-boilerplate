function getConfig() {
    return {
        port: process.env.PORT || 3000,
        host: process.env.APP_HOST || '0.0.0.0'
    }
}


module.exports = getConfig();
