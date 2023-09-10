import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',

  output: {
    file: 'dist/bundle.js',
    name: 'cubeSolver',
    format: 'umd',
  },

  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),

    terser({
      maxWorkers: 4
    })
  ],
};
