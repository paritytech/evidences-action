const { getConfiguration } = require("@eng-automation/js-style/src/eslint/configuration");

const conf = getConfiguration({ typescript: { rootDir: __dirname } });

module.exports = conf;
