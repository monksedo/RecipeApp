// Global app controller
import test from './test';
// import num from './test';

console.log(`I imported ${test.num()} from index.js module!`);
console.log('-----------------------------------------------');

test.hellowebpack();
console.log(`More num to print ${test.num()}, ${test.num1()}`);

