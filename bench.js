const cube = require('./dist/bundle.js');

cube.initialize('kociemba');
cube.initialize('xcross');
cube.initialize('cross');
cube.initialize('fb');
cube.initialize('eoline');

const scrambles = [];

const n = 100;

console.log('Generating scrambles');

for (let i = 0; i < n; i++) {
    scrambles.push(cube.scramble());
    console.log('Generated scramble...');
}

console.log('Benchmarking EOLine')

console.time();

for (let i = 0; i < n; i++) {
    console.log(cube.solve(scrambles[i], 'eoline'));
}

console.timeEnd();

console.log('Benchmarking Cross')

console.time();

for (let i = 0; i < n; i++) {
    console.log(cube.solve(scrambles[i], 'cross'));
}

console.timeEnd();

console.log('Benchmarking XCross')

console.time();

for (let i = 0; i < n; i++) {
    console.log(cube.solve(scrambles[i], 'xcross'));
}

console.timeEnd();

console.log('Benchmarking fB')

console.time();

for (let i = 0; i < n; i++) {
    console.log(cube.solve(scrambles[i], 'fb'));
}

console.timeEnd();