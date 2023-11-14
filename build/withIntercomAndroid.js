import { withMainApplication } from "@expo/config-plugins";
export const withIntercomAndroid = (config, { androidApiKey, appId }) => {
    config = withIntercomMainApplication(config, {
        appId,
        apiKey: androidApiKey,
    });
    return config;
};
export const withIntercomMainApplication = (config, { apiKey, appId }) => {
    return withMainApplication(config, async (cfg) => {
        const { modResults } = cfg;
        const { contents } = modResults;
        const lines = contents.split("\n");
        const importIndex = lines.findIndex((line) => /^import java.util.List;/.test(line));
        const onCreateIndex = lines.findIndex((line) => /ReactNativeFlipper.initializeFlipper/.test(line));
        modResults.contents = [
            ...lines.slice(0, importIndex + 1),
            "import com.intercom.reactnative.IntercomModule;",
            ...lines.slice(importIndex + 1, onCreateIndex + 1),
            `    IntercomModule.initialize(this, ${apiKey}, ${appId});`,
            ...lines.slice(onCreateIndex + 1),
        ].join("\n");
        return cfg;
    });
};
//# sourceMappingURL=withIntercomAndroid.js.map