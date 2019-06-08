import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import builtins from 'rollup-plugin-node-builtins';

export default {
  input: 'src/index.js',

  output: {
    file: 'dist/bundle.js',
    name: 'cubeSolver',
    format: 'umd',
  },

  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),

    uglify(),
    builtins(),
  ],
};
