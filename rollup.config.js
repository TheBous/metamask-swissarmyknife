import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import analyze from "rollup-plugin-analyzer";
import visualizer from "rollup-plugin-visualizer";
import typescript from "rollup-plugin-typescript2";

const NODE_ENV = process.env.NODE_ENV || "development";

export default {
  input: NODE_ENV === "development" ? "./src/metamask/functions/metamask.ts" : "./src/index.ts",
  output: [
    {
      file: "./build/bundle.umd.js",
      format: "umd",
      name: "metaswissknife.umd",
    },
    {
      file: "./build/bundle.cjs.js",
      format: "cjs",
    },
    {
      file: "./build/bundle.iife.js",
      format: "iife",
      name: "metaswissknife.iife",
    },
    {
      file: "./build/bundle.es.js",
      format: "es",
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      "preventAssignment": false,
    }),
    typescript({
      typescript: require("typescript"),
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    NODE_ENV !== "production" && serve({ contentBase: "build" }),
    NODE_ENV !== "production" && livereload(),
    NODE_ENV !== "production" && analyze(),
    NODE_ENV !== "production" && visualizer(),
    NODE_ENV === "production" && terser(),
  ],
};