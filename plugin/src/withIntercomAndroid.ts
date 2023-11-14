import { ConfigPlugin, withMainApplication } from "@expo/config-plugins";

import type { IntercomPluginProps } from "./withIntercom";

export const withIntercomAndroid: ConfigPlugin<IntercomPluginProps> = (
  config,
  { androidApiKey, appId }
) => {
  config = withIntercomMainApplication(config, {
    appId,
    apiKey: androidApiKey as string,
  });

  return config;
};

export const withIntercomMainApplication: ConfigPlugin<{
  apiKey: string;
  appId: string;
}> = (config, { apiKey, appId }) => {
  return withMainApplication(config, async (cfg) => {
    const { modResults } = cfg;
    const { contents } = modResults;

    const lines = contents.split("\n");

    const importIndex = lines.findIndex((line) =>
      /^import java.util.List;/.test(line)
    );
    const onCreateIndex = lines.findIndex((line) =>
      /ReactNativeFlipper.initializeFlipper/.test(line)
    );

    modResults.contents = [
      ...lines.slice(0, importIndex + 1),
      "import com.intercom.reactnative.IntercomModule;",
      ...lines.slice(importIndex + 1, onCreateIndex + 1),
      '    // @generated begin config-plugin-react-native-intercom-onCreate',
      `    IntercomModule.initialize(this, ${apiKey}, ${appId});`,
      '    // @generated end config-plugin-react-native-intercom-onCreate',
      ...lines.slice(onCreateIndex + 1),
    ].join("\n");

    return cfg;
  });
};
