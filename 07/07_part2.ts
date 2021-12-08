// const input = '16,1,2,0,4,2,7,1,2,14'.split(',').map(Number);
const fs= require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split(',').map(Number);

const avg = Math.floor(input.reduce((a, b) => a + b) / input.length);
// Use avg as starting point for searching
console.log('AVG', avg);
let lowest = 100000000;

const calculateFuelConsumption = (movment: number[]): number[] => {
    return movment.map(x => (1+x)/2*x);
}

const calculateMovmentCost = (movment: number[], target: number): number[] => {
    return movment.map(x => Math.abs(x - target));
}


for (let i = 0; i < 1000; i++) {
    let add = calculateMovmentCost(input, avg + i);
    let sum = calculateFuelConsumption(add).reduce((a, b) => a + b);
    if (sum < lowest) {
        lowest = sum;
    }

    if (avg - i > 0) {
        let sub = calculateMovmentCost(input, avg - i);
        let value = calculateFuelConsumption(sub).reduce((a, b) => a + b);
        if (value < lowest) {
            lowest = value;
        }
    }
}

console.log('LOWEST', lowest);
