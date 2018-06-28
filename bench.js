const cube = require('./lib/bundle');

const NUM = 3000;

let len = 0;

console.time('solve');
for (let i = 0; i < NUM; i += 1) {
  const scramble = cube.getRandomScramble();
  console.log(`${i}: ${scramble}`);
  len += scramble.split(' ').length;
}
console.timeEnd('solve');
console.log('Average length:', len / NUM);
