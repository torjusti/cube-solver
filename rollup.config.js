import { babel } from '@rollup/plugin-babel';

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
  ],
};
