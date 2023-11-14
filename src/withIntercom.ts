import { ConfigPlugin, createRunOncePlugin } from "@expo/config-plugins";

import { withIntercomAndroid } from "./withIntercomAndroid";
import { withIntercomIOS } from "./withIntercomIOS";

export interface IntercomPluginPropsIOS {
  iosApiKey?: string;
}

export interface IntercomPluginPropsAndroid {
  androidApiKey?: string;
}

export interface IntercomPluginProps
  extends IntercomPluginPropsIOS,
    IntercomPluginPropsAndroid {
  appId: string;
}

const withIntercom: ConfigPlugin<IntercomPluginProps> = (config, props) => {
  config = withIntercomIOS(config, props);

  config = withIntercomAndroid(config, props);

  return config;
};

const pkg = {
  name: "intercom-react-native",
  version: "UNVERSIONED",
};

export default createRunOncePlugin(withIntercom, pkg.name, pkg.version);
