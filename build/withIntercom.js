import { createRunOncePlugin } from "@expo/config-plugins";
import { withIntercomAndroid } from "./withIntercomAndroid";
import { withIntercomIOS } from "./withIntercomIOS";
const withIntercom = (config, props) => {
    config = withIntercomIOS(config, props);
    config = withIntercomAndroid(config, props);
    return config;
};
const pkg = {
    name: "intercom-react-native",
    version: "UNVERSIONED",
};
export default createRunOncePlugin(withIntercom, pkg.name, pkg.version);
//# sourceMappingURL=withIntercom.js.map