import { withAppDelegate } from "@expo/config-plugins";
export const withIntercomIOS = (config, { appId, iosApiKey }) => {
    config = withIntercomAppDelegate(config, {
        apiKey: iosApiKey,
        appId,
    });
    return config;
};
export const withIntercomAppDelegate = (config, { apiKey, appId }) => {
    return withAppDelegate(config, async (cfg) => {
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
//# sourceMappingURL=withIntercomIOS.js.map