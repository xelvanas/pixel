export class matrix3d {
    private _values = new Float32Array(9);
    constructor();
    constructor(values: number[]);
    constructor(values?: number[]) {
        if (Array.isArray(values)) {
            this.fromArray(values);
        } else {
            this.fromArray([
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ]);
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

    get m13(): number {
        return this._values[2];
    }

    set m13(value: number) {
        this._values[2] = value;
    }

    get m21(): number {
        return this._values[3];
    }

    set m21(value: number) {
        this._values[3] = value;
    }

    get m22(): number {
        return this._values[4];
    }

    set m22(value: number) {
        this._values[4] = value;
    }

    get m23(): number {
        return this._values[5];
    }

    set m23(value: number) {
        this._values[5] = value;
    }

    get m31(): number {
        return this._values[6];
    }

    set m31(value: number) {
        this._values[6] = value;
    }

    get m32(): number {
        return this._values[7];
    }

    set m32(value: number) {
        this._values[7] = value;
    }

    get m33(): number {
        return this._values[8];
    }

    set m33(value: number) {
        this._values[8] = value;
    }

    fromArray(array: number[]) {
        for (let i = 0; i < 9; i++) {
            this._values[i] = array[i];
        }
    }

    toArray(): number[] {
        return [
            this.m11, this.m12, this.m13,
            this.m21, this.m22, this.m23,
            this.m31, this.m32, this.m33
        ];
    }

    setRow(index: number, array: number[]) {
        if (index <= 0 || index >= 4) {
            throw new RangeError("row index out of range.")
        }
        index = (index - 1) * 3;
        this._values[index] = array[0];
        this._values[index + 1] = array[1];
        this._values[index + 2] = array[2];
    }

    getRow(index: number): number[] {
        if (index <= 0 || index >= 4) {
            throw new RangeError("row index out of range.")
        }
        index = (index - 1) * 3;
        return [
            this._values[index],
            this._values[index + 1],
            this._values[index + 2]
        ];
    }

    setColumn(index: number, array: number[]) {
        if (index <= 0 || index >= 4) {
            throw new RangeError("column index out of range.")
        }
        index -= 1;
        this._values[index] = array[0];
        this._values[index + 3] = array[1];
        this._values[index + 6] = array[2];
    }

    getColumn(index: number) {
        if (index <= 0 || index >= 4) {
            throw new RangeError("column index out of range.")
        }
        index -= 1;
        return [
            this._values[index],
            this._values[index + 3],
            this._values[index + 6]];
    }

    copy(): matrix3d {
        return new matrix3d(this.toArray());
    }

    reset() {
        for (let i = 0; i < 9; ++i) {
            this._values[i] = 0;
        }
    }

    equals(matrix: matrix3d): boolean {
        for (let i = 0; i < 9; ++i) {
            if (this._values[i] - matrix._values[i] > Number.EPSILON) {
                return false;
            }
        }
        return true;
    }

    determinant(): number {
        let minor11 = this.m22 * this.m33 - this.m23 * this.m32;
        let minor12 = this.m21 * this.m33 - this.m23 * this.m31;
        let minor13 = this.m21 * this.m32 - this.m22 * this.m31;
        return this.m11 * minor11 - this.m12 * minor12 + this.m13 * minor13;
    }

    transpose(): matrix3d {
        return new matrix3d([
            this.m11, this.m21, this.m31,
            this.m12, this.m22, this.m32,
            this.m13, this.m23, this.m33]);
    }
}