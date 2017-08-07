import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'cubeSolver',
  dest: 'lib/bundle.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
