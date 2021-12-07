const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8");

const lines = data.split('\n\n');

class Board {
    private _board: number[][];
    private _lastNumberCalled: number;

    public constructor(board: number[][]) {
        this._board = board;
    }

    public static fromString(string: string): Board {
        const board = string.split('\n').map((row) =>
            row
                .trim()
                .split(/ +/)
                .map((cell) => parseInt(cell))
        );

        return new Board(board);
    }

    public markNumber(number: number): void {
        this._lastNumberCalled = number;
        for (let i = 0; i < this._board.length; i++) {
            for (let j = 0; j < this._board[i].length; j++) {
                if (this._board[i][j] === number) {
                    this._board[i][j] = 0;
                }
            }
        }
    }

    public printBoard(): void {
        console.group('Board');
        this._board.forEach((row) => console.log(row.join(' ')));
        console.groupEnd();
    }

    public get hasWinner(): boolean {
        return (
            this._board.some((row) => row.every((cell) => cell === 0)) ||
            this._board[0].some((_, i) =>
                this._board.every((row) => row[i] === 0)
            )
        );
    }

    public getWinnerValue(): number {
        return (
            this._board.reduce(
                (acc, row) => acc + row.reduce((acc, cell) => acc + cell, 0),
                0
            ) * this._lastNumberCalled
        );
    }
}

const anyWinner = (boards: Board[]): boolean | Board => {
    const winnerBoard = boards.find((board) => board.hasWinner);
    return winnerBoard ? winnerBoard : false;
};

const countWinnerBoards = (boards: Board[]): number => {
    return boards.filter((board) => board.hasWinner).length;
}

const allBoards: Array<Board> = [];
const playNumbers = lines
    .shift()
    .split(',')
    .map((number: string) => parseInt(number)); 

while (lines.length > 0) {
    allBoards.push(Board.fromString(lines.shift()));
}
console.log("Winner boards", countWinnerBoards(allBoards));

let lastWinnerBoard: Board;

for (const number of playNumbers) {
    console.log('Playing number: ', number);
    allBoards.forEach((board) => board.markNumber(number));
    
    if (countWinnerBoards(allBoards) === allBoards.length -1) {
        console.log("Setting last winner board");
        
        lastWinnerBoard = allBoards.filter((board) => !board.hasWinner)[0];
    }

    if (countWinnerBoards(allBoards) === allBoards.length) {
        console.log("Winner boards value", lastWinnerBoard.getWinnerValue());
        break;
    }
}

function printAllBoards() {
    allBoards.forEach((board) => board.printBoard());
}
