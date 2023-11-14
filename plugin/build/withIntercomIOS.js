"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIntercomAppDelegate = exports.withIntercomIOS = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withIntercomIOS = (config, { appId, iosApiKey }) => {
    config = (0, exports.withIntercomAppDelegate)(config, {
        apiKey: iosApiKey,
        appId,
    });
    return config;
};
exports.withIntercomIOS = withIntercomIOS;
const withIntercomAppDelegate = (config, { apiKey, appId }) => {
    return (0, config_plugins_1.withAppDelegate)(config, async (cfg) => {
        const { modResults } = cfg;
        const { contents } = modResults;
        const lines = contents.split("\n");
        const importIndex = lines.findIndex((line) => /^#import "AppDelegate.h"/.test(line));
        const didLaunchIndex = lines.findIndex((line) => /self.moduleName = @"main";/.test(line));
        modResults.contents = [
            ...lines.slice(0, importIndex + 1),
            "#import <IntercomModule.h>",
            ...lines.slice(importIndex + 1, didLaunchIndex + 1),
            '  // @generated begin config-plugin-react-native-intercom-didFinishLaunchingWithOptions',
            `  [IntercomModule initialize:@"${apiKey}" withAppId:@"${appId}"];`,
            '  // @generated end config-plugin-react-native-intercom-didFinishLaunchingWithOptions',
            ...lines.slice(didLaunchIndex + 1),
        ].join("\n");
        return cfg;
    });
};
exports.withIntercomAppDelegate = withIntercomAppDelegate;
