import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "esm",
        sourcemap: true,
        name: "react-ts-lib"
      },
      {
        file: packageJson.module,
        format: "cjs",
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: "style.css",
        use: ["sass"],
        minimize: true // 是否压缩CSS
      }),
      terser(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**", // 排除node_modules目录下的文件
        presets: ["@babel/preset-react"] // 需要转译的文件扩展名
      })
    ],
    external: ["react", "@tarojs/taro", "@tarojs/components", "taro-hooks"]
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.scss$/],
    plugins: [dts()]
  }
];
