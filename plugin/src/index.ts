import { ConfigPlugin } from "expo/config-plugins";

const withIntentFilters: ConfigPlugin = (config) => {
  console.debug("withIntentFilters");
  return config;
};

export default withIntentFilters;
