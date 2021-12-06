const fs = require('fs');
const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

const ones = new Array(lines[0].length).fill(0);

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === '1') {
      ones[j]++;
    }
  }
}

const gamma = ones.map((x) => +(x > lines.length / 2));
const epsilon = gamma.map((x) => x ^ 1);

const value = parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
console.log(value);