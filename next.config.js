const path = require("path");

module.exports = {
    images: {
        domains: ["localhost"],
        unoptimized: true,
    },
    distDir: "build",
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias["components"] = path.join(__dirname, "components");
        config.resolve.alias["styles"] = path.join(__dirname, "styles");
        return config;
    }
}