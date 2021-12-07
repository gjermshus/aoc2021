const fs= require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
// const input = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`.split('\n');

type Coordinate = [number, number];

class VentLine {
    constructor(public from: Coordinate, public to: Coordinate) {}
    public static fromString(s: string) {
        const [from, to] = s.split(' -> ').map((s) => s.split(',').map(Number));
        return new VentLine(<Coordinate>from, <Coordinate>to);
    }

    public GetPointsBetween(): Coordinate[] {
        const [fromX, fromY] = this.from;
        const [toX, toY] = this.to;

        let currentPos: Coordinate = [fromX, fromY];
        const points: Coordinate[] = [];
        points.push([fromX, fromY]);
        const xDirection = Math.sign(toX - fromX);
        const yDirction = Math.sign(toY - fromY);

        while (currentPos[0] !== toX || currentPos[1] !== toY) {
            if (currentPos[0] !== toX) {
                currentPos[0] += xDirection;
            }

            if (currentPos[1] !== toY) {
                currentPos[1] += yDirction;
            }

            points.push([currentPos[0], currentPos[1]]);
        }

        return points;
    }
}

class VentMap {
    private map: number[][];
    constructor(width: number, height: number) {
        this.map = new Array(width)
            .fill(0)
            .map(() => new Array(height).fill(0));
    }

    public printMap(): string {
        return this.map.reduce((acc, row) => {
            return acc + row.join(' ').replace(/0/g, '.') + '\n';
        }, '');
    }

    public GetMostOverlappedField() {
        let value = 0;
        for (let x = 0; x < this.map.length; x++) {
            for (let y = 0; y < this.map[x].length; y++) {
                if (this.map[x][y] > 1) {
                    value++;
                }
            }
        }

        return value;
    }

    public addVentLine(line: VentLine): void {
        const points = line.GetPointsBetween();
        console.log(points);

        line.GetPointsBetween().forEach((point) => {
            const [x, y] = point;
            this.map[y][x] += 1;
        });
    }
}

const map = new VentMap(1000, 1000);
input.forEach((line) => map.addVentLine(VentLine.fromString(line)));
console.log('Max value', map.GetMostOverlappedField());
// console.log(map.printMap());
