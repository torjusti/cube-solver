import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',

  output: {
    file: 'dist/bundle.js',
    name: 'cubeSolver',
    format: 'umd',
  },

  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),

    typescript(),

    terser({
      maxWorkers: 4
    })
  ],
};
