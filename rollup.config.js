import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import getBabelOutputPlugin from '@rollup/plugin-babel';

const pkg = require('./package.json')
const banner = `/*! jsnview - v${pkg.version} | Copyright 2022 - Haikel Fazzani */\n`;

const output = [
  {
    name: 'jsnview',
    file: 'build/index.js',
    format: 'umd',
    sourcemap: false,
    banner
  }
];

export default {
  input: "src/index.js",
  output,
  plugins: [
    postcss({
      babelrc: false,
      modules: false,
      plugins: [],
      extract: true,
      minimize: true,
      sourceMap: false,
      babelHelpers: 'runtime'
    }),
    terser(),
    getBabelOutputPlugin({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          targets: '> 0.5%, ie >= 11, last 2 versions, Firefox ESR, not dead',
        }],
      ],
    }),
  ]
};
