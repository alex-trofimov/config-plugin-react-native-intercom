import { ConfigPlugin } from "@expo/config-plugins";
import type { IntercomPluginProps } from "./withIntercom";
export declare const withIntercomIOS: ConfigPlugin<IntercomPluginProps>;
export declare const withIntercomAppDelegate: ConfigPlugin<{
    apiKey: string;
    appId: string;
}>;
