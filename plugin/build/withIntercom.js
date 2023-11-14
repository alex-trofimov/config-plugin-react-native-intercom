"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withIntercomAndroid_1 = require("./withIntercomAndroid");
const withIntercomIOS_1 = require("./withIntercomIOS");
const withIntercom = (config, props) => {
    config = (0, withIntercomIOS_1.withIntercomIOS)(config, props);
    config = (0, withIntercomAndroid_1.withIntercomAndroid)(config, props);
    return config;
};
const pkg = {
    name: "intercom-react-native",
    version: "UNVERSIONED",
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withIntercom, pkg.name, pkg.version);
