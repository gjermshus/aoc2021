const fs= require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

type Coordinate = [number, number];

class VentLine {
    constructor(public from: Coordinate, public to: Coordinate) {}
    public static fromString(s: string) {
        const [from, to] = s.split(' -> ').map((s) => s.split(',').map(Number));
        return new VentLine(<Coordinate>from, <Coordinate>to);
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
                    value++
                }
            }
        }

        return value;
    }
    public addVentLine(line: VentLine): void {
        console.log(line);

        const [fromX, fromY] = line.from;
        const [toX, toY] = line.to;

        if (fromX === toX || fromY === toY) {
            for (let x = Math.min(fromX, toX); x <= Math.max(toX, fromX); x++) {
                for (
                    let y = Math.min(fromY, toY);
                    y <= Math.max(toY, fromY);
                    y++
                ) {
                    this.map[y][x] += 1;
                }
            }
        }
    }
}

const map = new VentMap(1000, 1000);
input.forEach((line) => map.addVentLine(VentLine.fromString(line)));
console.log("Max value", map.GetMostOverlappedField());
