// const input = '3,4,3,1,2'.split(',').map(Number);
const fs= require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split(',').map(Number);

let days = Array(9).fill(0);

for (let i = 0; i < days.length; i++) {
    days[i] = input.filter(x => x === i).length;
}

// console.log("Start", days);


const simulateDays = 256;
for (let i = 0; i < simulateDays; i++) {
    const newFishs = days.shift();
    days = days.map(value => value--);
    days[6] += newFishs;
    days.push(newFishs);
    // console.log("Day", i+1, days);
}

console.log("Total number of fishes", days.reduce((a, b) => a + b));



