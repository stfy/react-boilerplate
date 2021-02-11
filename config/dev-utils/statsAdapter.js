/**
 * Webpack5 stats adapter
 * @param json
 * @returns {*&{warnings: *[], errors}}
 */
function statsAdapter(json) {
    return {
        ...json,
        warnings: json.warnings.map(({message}) => message),
        errors: json.errors.map(({message}) => message)
    };
}


module.exports = statsAdapter;