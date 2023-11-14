import { ConfigPlugin } from "@expo/config-plugins";
export interface IntercomPluginPropsIOS {
    iosApiKey?: string;
}
export interface IntercomPluginPropsAndroid {
    androidApiKey?: string;
}
export interface IntercomPluginProps extends IntercomPluginPropsIOS, IntercomPluginPropsAndroid {
    appId: string;
}
declare const _default: ConfigPlugin<IntercomPluginProps>;
export default _default;
//# sourceMappingURL=index.d.ts.map