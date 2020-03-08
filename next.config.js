const path = require("path");

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: () => {
    return {
      "/": { page: "/" }
    };
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    config.resolve.alias["@components"] = path.join(__dirname, "components");
    config.resolve.alias["puppeteer"] = "puppeteer-serverless";

    return config;
  }
  //target: "serverless"
};
