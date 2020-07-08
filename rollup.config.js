//import path from "path";

import pkg from "./package.json";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel"; //es6转换es5
import resolve from "rollup-plugin-node-resolve"; //识别node_modules中的包
import commonjs from "rollup-plugin-commonjs"; //将commonjs模块转换为es6
import typescript2 from "rollup-plugin-typescript2"; //typescript
import replace from "rollup-plugin-replace"; // 替换待打包文件里的一些变量
import { terser } from "rollup-plugin-terser"; //支持es6压缩
import serve from "rollup-plugin-serve"; //在线服务
import livereload from "rollup-plugin-livereload"; //热部署
const banner = `/*!
* foxEarth.js v${pkg.version}
* (c) 2018-${new Date().getFullYear()} Russell
* https://github.com/lifei1991/foxEarth
* Released under the MIT License.
*/`;

export default {
  input: "./src/main.ts",
  output: [
    {
      format: "es",
      file: "build/foxEarth.es.js",
      banner,
      sourcemap: false,
      name: "es",
    },
    {
      format: "cjs",
      file: "build/foxEarth.cjs.js",
      banner,
      sourcemap: false,
      name: "cjs",
    },
    {
      format: "umd",
      file: "build/foxEarth.umd.js",
      banner,
      sourcemap: false,
      name: "umd",
    },
  ],
  external: [], //排除第三方打包文件
  plugins: [
    json(),
    resolve(),
    commonjs(),
    typescript2(),
    babel({
      exclude: "node_moudles/**", //只编译源码中的文件
    }),
    replace({
      exclude: "node_modules/**",
      ENV: JSON.stringify(process.env.NODE_ENV || "development"),
      __VERSION__: pkg.version,
    }),
    terser(),
    livereload(),
    serve({
      open: true, // 是否打开浏览器
      contentBase: "./", // 入口html的文件位置
      historyApiFallback: false, // Set to true to return index.html instead of 404
      host: "localhost",
      port: 4322,
    }),
  ],
};
