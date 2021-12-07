// const input = '16,1,2,0,4,2,7,1,2,14'.split(',').map(Number);
const fs= require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split(',').map(Number);

const avg = Math.floor(input.reduce((a, b) => a + b) / input.length);
// Use avg as starting point for searching
console.log('AVG', avg);
let lowest = 100000000;

for (let i = 0; i < 10000; i++) {
    let add = input.map((x) => Math.abs(x - (avg + i)));
    let value = add.reduce((a, b) => a + b);
    if (value < lowest) {
        lowest = value;
    }

    if (avg - i > 0) {
        let sub = input.map((x) => Math.abs(x - (avg - i)));
        let value = sub.reduce((a, b) => a + b);
        if (value < lowest) {
            lowest = value;
        }
    }
}

console.log('LOWEST', lowest);

