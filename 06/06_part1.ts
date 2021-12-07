// const input = '3,4,3,1,2'.split(',').map(Number);
const fs= require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split(',').map(Number);


let fishes: Array<number> = Array.from(input);
const simulateDays = 80;
for (let i = 0; i < simulateDays; i++) {
    const newFishes = [];
    for (let j = 0; j < fishes.length; j++) {
        if (--fishes[j] < 0) {
            newFishes.push(8);
            fishes[j] = 6;
        }
    }

    fishes = fishes.concat(newFishes);
}

console.log(fishes.length);



