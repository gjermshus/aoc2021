import { readFileSync } from 'fs';

export const getInput = (): string => {
    const currentDir = process.cwd();
    return readFileSync(`${currentDir}/input.txt`, 'utf8');
};
