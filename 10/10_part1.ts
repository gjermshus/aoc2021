import { getInput } from "../getInput";

const diagnosticsLogs = getInput();

const diagLines: string[] = diagnosticsLogs.split('\n');

enum ChunkType {
    Start = 0,
    End = 1,
}

const chunStartCharacters = ['(', '{', '[', '<'];
const chunkEndCharacters = [')', '}', ']', '>'];
const chunkCharacterValue= [3, 1197, 57, 25137];

const isChunkCharacter = (type: ChunkType, character: string): boolean => {
    if (type === ChunkType.Start) {
        return chunStartCharacters.includes(character);
    }
    return chunkEndCharacters.includes(character);
};

const getEndChunkcharacter = (character: string): string => {
    const index = chunStartCharacters.indexOf(character);
    return chunkEndCharacters[index];
};

type isCorruptChunkResult = {
    isCorrupt: boolean;
    corruptCharacter?: string;
};

const corruptionSum = (character: string): number => chunkCharacterValue[chunkEndCharacters.indexOf(character)];

const isCorruptChunk = (line: string): isCorruptChunkResult => {
    const openChars = [];
    // iterate over the characters
    for (let character of line.trim()) {
        // if the character is a chunk start character
        if (isChunkCharacter(ChunkType.Start, character)) {
            openChars.push(character);
        } else if (isChunkCharacter(ChunkType.End, character)) {
            // if the character is a chunk end character
            const expectedEndCharacter = getEndChunkcharacter(
                openChars[openChars.length - 1]
            );
            if (character == expectedEndCharacter) {
                openChars.pop();
            } else {
                console.log(
                    `Expected ${expectedEndCharacter}, but found ${character} instead`
                );
                return { isCorrupt: true, corruptCharacter: character };
            }
        }
    }

    return { isCorrupt: false };
};

const result = diagLines.reduce((acc, line) => {
    const result = isCorruptChunk(line);
    if (result.isCorrupt) {
        return acc += corruptionSum(result.corruptCharacter);
    }
    return acc;
}, 0);

console.log(result);
