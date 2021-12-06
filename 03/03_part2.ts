const fs = require('fs');
const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

const matchBit = (bit: boolean, arrayLength: number, limit: number) => bit ? arrayLength >= limit : arrayLength <= limit;

const getValue = (lines: string[], pos:number, findBit: boolean = true) => {    
    if (lines.length == 1) {
        return lines[0];
    }

    const bitMatches = lines.filter(line => line[pos] === (+findBit).toString());
    if (matchBit(findBit, bitMatches.length, lines.length/2)) {
        return getValue(bitMatches, ++pos, findBit);
    } else {
        return getValue(lines.filter(x => !bitMatches.includes(x)), ++pos, findBit);
    }
};

const oxygen = parseInt(getValue(lines, 0, true),2);
const co2 = parseInt(getValue(lines, 0, false),2);
console.log(oxygen*co2);