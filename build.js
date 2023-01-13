const { build } = require("esbuild");
const { dependencies } = require("./package.json");
const {nodeExternalsPlugin} = require("esbuild-node-externals");

const entryFile = "src/index.ts";
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
  logLevel: "info",
  minify: true,
  sourcemap: true,
      plugins: [nodeExternalsPlugin()],
};

build({
  ...shared,
  format: "cjs",
  outfile: "./dist/index.js",
  target: ["esnext", "node12.22.0"],
});
