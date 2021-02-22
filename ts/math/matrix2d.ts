import { inBetween, inRange } from "./misc"

export class matrix2d {
    private _values = new Float32Array(4);

    constructor();
    constructor(values: number[]);
    constructor(values?: number[]) {
        if (Array.isArray(values)) {
            this.fromArray(values);
        } else {
            this.fromArray([0, 0, 0, 0]);
        }
    }

    get m11(): number {
        return this._values[0];
    }

    set m11(value: number) {
        this._values[0] = value;
    }

    get m12(): number {
        return this._values[1];
    }

    set m12(value: number) {
        this._values[1] = value;
    }

    get m21(): number {
        return this._values[2];
    }

    set m21(value: number) {
        this._values[2] = value;
    }

    get m22(): number {
        return this._values[3];
    }

    set m22(value: number) {
        this._values[3] = value;
    }

    cofactor(row: number, col:number): number {
        return this.minor(row, col) * (row + col) % 2 == 1 ? -1 : 1;
    }

    // row & column range: 1-3
    minor(row: number, col:number): number {
        if(!inRange(row, 1, 3) || !inRange(col, 1, 3)) {
            throw new Error("error: row/column range.");
        }
        // calc 0-base index
        // for example:
        // row:1, col:1 -> 1 * 3 + 1 = 4
        // the corresponding index of array '_values' is 0
        // row,col to index: col * 3 + row - 4;
        // index to cofactor index: abs(index - 3)
        return this._values[Math.abs(col * 3 + row - 7)];
    }

    fromArray(array: number[]) {
        for (let i = 0; i < 4; i++) {
            this._values[i] = array[i];
        }
    }

    toArray(): number[] {
        return [this._values[0], this._values[1], this._values[2], this._values[3]];
    }

    /*
        those row and col are mathematical concepts
        in order to keep them consisting with math
        the index begin with 1, NOT 0
    */
    setRow(index: number, array: number[]) {
        if (index <= 0 || index >= 3) {
            throw new RangeError("row index out of range.")
        }

        let i = (index - 1) * 2;
        this._values[i] = array[0];
        this._values[i + 1] = array[1];
    }

    getRow(index: number): number[] {
        if (index <= 0 || index >= 3) {
            throw new RangeError("row index out of range.")
        }

        let i = (index - 1) * 2;
        return [this._values[i], this._values[i + 1]];
    }

    setColumn(index: number, array: number[]) {
        if (index <= 0 || index >= 3) {
            throw new RangeError("column index out of range.")
        }

        this._values[index - 1] = array[0];
        this._values[index + 2 - 1] = array[1];
    }

    getColumn(index: number) {
        if (index <= 0 || index >= 3) {
            throw new RangeError("column index out of range.")
        }
        return [this._values[index - 1], this._values[index - 1 + 2]];
    }

    copy(): matrix2d {
        return new matrix2d(this.toArray());
    }

    reset() {
        for (let i = 0; i < 4; ++i) {
            this._values[i] = 0;
        }
    }

    equals(matrix: matrix2d): boolean {
        for (let i = 0; i < 4; ++i) {
            if (this._values[i] - matrix._values[i] > Number.EPSILON) {
                return false;
            }
        }
        return true;
    }

    determinant(): number {
        return this.m11 * this.m22 - this.m12 * this.m21;
    }

    transpose(): matrix2d {
        return new matrix2d([this.m11, this.m21, this.m12, this.m22]);
    }

    inverse(): matrix2d {
        // reciprocal of determinant
        let rdet = 1 / this.determinant();


        return new matrix2d([this.m11, this.m21, this.m12, this.m22]);
    }
}