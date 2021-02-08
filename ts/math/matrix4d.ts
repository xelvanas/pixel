export class matrix4d {
    private _values = new Float32Array(16);
    constructor();
    constructor(values: number[]);
    constructor(values?: number[]) {
        if (Array.isArray(values)) {
            this.fromArray(values);
        } else {
            this.fromArray([
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
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

    get m14(): number {
        return this._values[3];
    }

    set m14(value: number) {
        this._values[3] = value;
    }

    get m21(): number {
        return this._values[4];
    }

    set m21(value: number) {
        this._values[4] = value;
    }

    get m22(): number {
        return this._values[5];
    }

    set m22(value: number) {
        this._values[5] = value;
    }

    get m23(): number {
        return this._values[6];
    }

    set m23(value: number) {
        this._values[6] = value;
    }

    get m24(): number {
        return this._values[7];
    }

    set m24(value: number) {
        this._values[7] = value;
    }

    get m31(): number {
        return this._values[8];
    }

    set m31(value: number) {
        this._values[8] = value;
    }

    get m32(): number {
        return this._values[9];
    }

    set m32(value: number) {
        this._values[9] = value;
    }

    get m33(): number {
        return this._values[10];
    }

    set m33(value: number) {
        this._values[10] = value;
    }

    get m34(): number {
        return this._values[11];
    }

    set m34(value: number) {
        this._values[11] = value;
    }

    get m41(): number {
        return this._values[12];
    }

    set m41(value: number) {
        this._values[12] = value;
    }

    get m42(): number {
        return this._values[13];
    }

    set m42(value: number) {
        this._values[13] = value;
    }

    get m43(): number {
        return this._values[14];
    }

    set m43(value: number) {
        this._values[14] = value;
    }

    get m44(): number {
        return this._values[15];
    }

    set m44(value: number) {
        this._values[15] = value;
    }

    fromArray(array: number[]) {
        for (let i = 0; i < 16; i++) {
            this._values[i] = array[i];
        }
    }

    toArray(): number[] {
        return [
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.m41, this.m42, this.m43, this.m44
        ];
    }

    setRow(index: number, array: number[]) {
        if (index <= 0 || index >= 5) {
            throw new RangeError("row index out of range.")
        }
        index = (index - 1) * 4;
        this._values[index] = array[0];
        this._values[index + 1] = array[1];
        this._values[index + 2] = array[2];
        this._values[index + 3] = array[3];
    }

    getRow(index: number): number[] {
        if (index <= 0 || index >= 5) {
            throw new RangeError("row index out of range.")
        }
        index = (index - 1) * 4;
        return [
            this._values[index],
            this._values[index + 1],
            this._values[index + 2],
            this._values[index + 3]
        ];
    }

    setColumn(index: number, array: number[]) {
        if (index <= 0 || index >= 5) {
            throw new RangeError("column index out of range.")
        }
        index -= 1;
        this._values[index] = array[0];
        this._values[index + 4] = array[1];
        this._values[index + 8] = array[2];
        this._values[index + 12] = array[3];
    }

    getColumn(index: number) {
        if (index <= 0 || index >= 5) {
            throw new RangeError("column index out of range.")
        }
        index -= 1;
        return [
            this._values[index],
            this._values[index + 4],
            this._values[index + 8],
            this._values[index + 12]
        ];
    }

    copy(): matrix4d {
        return new matrix4d(this.toArray());
    }

    reset() {
        for (let i = 0; i < 16; ++i) {
            this._values[i] = 0;
        }
    }

    equals(matrix: matrix4d): boolean {
        for (let i = 0; i < 16; ++i) {
            if (this._values[i] - matrix._values[i] > Number.EPSILON) {
                return false;
            }
        }
        return true;
    }

    determinant(): number {
        /*return 
        this.m11*this.m22*this.m33*this.m44 + 
        this.m11*this.m32*this.m43*this.m24 +
        this.m11*this.m42*this.m23*this.m34 +
        this.m21*this.m12*this.m43*this.m34 +
        this.m21*this.m32*this.m13*this.m44 +
        this.m21*this.m42*this.m33*this.m14 +
        this.m31*this.m12*this.m23*this.m44 +
        this.m31*this.m22*this.m43*this.m14 +
        this.m31*this.m42*this.m13*this.m24 +
        this.m41*this.m12*this.m33*this.m24 +
        this.m41*this.m22*this.m13*this.m34 +
        this.m41*this.m32*this.m23*this.m14 -
        this.m11*this.m22*this.m43*this.m34 -
        this.m11*this.m32*this.m23*this.m44 -
        this.m11*this.m42*this.m33*this.m24 -
        this.m21*this.m12*this.m33*this.m44 -
        this.m21*this.m32*this.m43*this.m14 -
        this.m21*this.m42*this.m13*this.m34 -
        this.m31*this.m12*this.m43*this.m24 -
        this.m31*this.m22*this.m13*this.m44 -
        this.m31*this.m42*this.m23*this.m14 -
        this.m41*this.m12*this.m23*this.m34 -
        this.m41*this.m22*this.m33*this.m14 -
        this.m41*this.m32*this.m13*this.m24;*/
        let det01 = this.m11 * this.m22 - this.m12 * this.m21
        let det02 = this.m11 * this.m23 - this.m13 * this.m21
        let det03 = this.m11 * this.m24 - this.m14 * this.m21
        let det04 = this.m12 * this.m23 - this.m13 * this.m22
        let det05 = this.m12 * this.m24 - this.m14 * this.m22
        let det06 = this.m13 * this.m24 - this.m14 * this.m23
        let det07 = this.m31 * this.m42 - this.m32 * this.m41
        let det08 = this.m31 * this.m43 - this.m33 * this.m41
        let det09 = this.m31 * this.m44 - this.m34 * this.m41
        let det10 = this.m32 * this.m43 - this.m33 * this.m42
        let det11 = this.m32 * this.m44 - this.m34 * this.m42
        let det12 = this.m33 * this.m44 - this.m34 * this.m43
        return (det01 * det12 - det02 * det11 + det03 * det10 + det04 * det09 - det05 * det08 + det06 * det07)
    }

    transpose(): matrix4d {
        return new matrix4d([
            this.m11, this.m21, this.m31, this.m41,
            this.m12, this.m22, this.m32, this.m42,
            this.m13, this.m23, this.m33, this.m43,
            this.m14, this.m24, this.m34, this.m44
        ]);
    }
}