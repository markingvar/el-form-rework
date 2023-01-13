module.exports = {
  plugins: [
    require("autoprefixer"),
    process.env.NODE_ENV === "production" ? require("cssnano") : false,
    process.env.NODE_ENV === "production"
      ? require("node-css-mqpacker")
      : false,
  ].filter(Boolean),
};
