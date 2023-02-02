module.exports = {
  reactStrictMode: true,
};

const path = require("path");

module.exports = {
  distDir: "build",
  sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
  },
};