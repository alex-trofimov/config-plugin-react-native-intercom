"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIntercomMainApplication = exports.withIntercomAndroid = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withIntercomAndroid = (config, { androidApiKey, appId }) => {
    config = (0, exports.withIntercomMainApplication)(config, {
        appId,
        apiKey: androidApiKey,
    });
    return config;
};
exports.withIntercomAndroid = withIntercomAndroid;
const withIntercomMainApplication = (config, { apiKey, appId }) => {
    return (0, config_plugins_1.withMainApplication)(config, async (cfg) => {
        const { modResults } = cfg;
        const { contents } = modResults;
        const lines = contents.split("\n");
        const importIndex = lines.findIndex((line) => /^import java.util.List;/.test(line));
        const onCreateIndex = lines.findIndex((line) => /ReactNativeFlipper.initializeFlipper/.test(line));
        modResults.contents = [
            ...lines.slice(0, importIndex + 1),
            "import com.intercom.reactnative.IntercomModule;",
            ...lines.slice(importIndex + 1, onCreateIndex + 1),
            '  // @generated begin config-plugin-react-native-intercom-didFinishLaunchingWithOptions',
            `    IntercomModule.initialize(this, ${apiKey}, ${appId});`,
            ...lines.slice(onCreateIndex + 1),
        ].join("\n");
        return cfg;
    });
};
exports.withIntercomMainApplication = withIntercomMainApplication;
