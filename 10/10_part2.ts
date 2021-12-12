import { getInput } from "../getInput";

const diagnosticsLogs = getInput();

const diagLines: string[] = diagnosticsLogs.split('\n');

enum ChunkType {
    Start = 0,
    End = 1,
}

const chunStartCharacters = ['(', '{', '[', '<'];
const chunkEndCharacters = [')', '}', ']', '>'];
const chunkCharacterValue= [1, 3, 2, 4];

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
    rest?: string[]
};

const corruptionSum = (character: string): number => chunkCharacterValue[chunkEndCharacters.indexOf(character)];

const isCorruptChunk = (line: string): isCorruptChunkResult => {
    const openChars: string[] = [];
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
                return { isCorrupt: true, corruptCharacter: character };
            }
        }
    }

    return { isCorrupt: false, rest: openChars };
};

const completeChunk = (chunk: isCorruptChunkResult): string => {
    return chunk.rest.reverse().map(c => getEndChunkcharacter(c)).join('');
}

const getChunkCompletionScore = (chunk: string[]): number => {
    let score = 0;
    let values = chunk.map(c => corruptionSum(c));
    return values.reduce((acc, val) => acc * 5 + val, 0);
}

const candidates = diagLines.map(line => isCorruptChunk(line)).filter(result => !result.isCorrupt);

const allScores = candidates.map(candidate => {
    const newChunk = completeChunk(candidate);
    return getChunkCompletionScore(newChunk.split(""));
});

// Sort allScores from smallest to largest
const sortedScores = allScores.sort((a, b) => a - b);

console.log("Result", sortedScores[Math.floor(sortedScores.length/2)]);


