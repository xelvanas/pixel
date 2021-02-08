export class vector4 {
    private _values = new Float32Array(4);

    constructor();
    constructor( x: number, y: number, z: number, w: number);
    constructor( x?: number, y?: number, z?: number, w?: number) {
        this._values[0] = x || 0;
        this._values[1] = y || 0;
        this._values[2] = z || 0;
        this._values[3] = w || 0;
    }

    get x(): number {
        return this._values[0];
    }

    set x(value: number) {
        this._values[0] = value;
    }

    get y(): number {
        return this._values[1];
    }

    set y(value: number) {
        this._values[1] = value;
    }

    get z(): number {
        return this._values[2];
    }

    set z(value: number) {
        this._values[2] = value;
    }

    get w(): number {
        return this._values[3];
    }

    set w(value: number) {
        this._values[3] = value;
    }

    copy(): vector4 {
        return new vector4(this.x, this.y, this.z, this.w);
    }

    reset(): void {
        this._values[0] = 0;
        this._values[1] = 0;
        this._values[2] = 0;
        this._values[3] = 0;
    }

    negate(): vector4 {
        return new vector4(-this._values[0], -this._values[1], -this._values[2], -this._values[3])
    }

    toArray(): number[] {
        return [this._values[0], this._values[1], this._values[2], this._values[3]];
    }
    
    equals(vector: vector4): boolean {
        if (Math.abs(vector.x - this.x) > Number.EPSILON) {
            return false;
        }

        if (Math.abs(vector.y - this.y) > Number.EPSILON) {
            return false;
        }

        if (Math.abs(vector.z - this.z) > Number.EPSILON) {
            return false;
        }

        if (Math.abs(vector.w - this.w) > Number.EPSILON) {
            return false;
        }
        return true;
    }
    
    add(vector: vector4): vector4 {
        return new vector4(this.x + vector.x, this.y + vector.y, this.z + vector.z, this.w + vector.w);
    }

    subtract(vector: vector4): vector4 {
        return new vector4(this.x - vector.x, this.y - vector.y, this.z - vector.z, this.w - vector.w);
    }

    scale(value: number): vector4 {
        return new vector4(this.x * value, this.y * value, this.z * value, this.w * value);
    }

    get length(): number {
        return Math.sqrt(this.squaredLength);
    }

    get squaredLength(): number {
        return (this.dot(this))
    }

    normalize(): vector4 {
        let length = this.length;
        
        if (length === 1) {
            return this.copy();
        }

        if (length === 0) {
            return new vector4();
        }

        return new vector4(this.x / length, this.y / length, this.z / length, this.w / length);
    }

    dot(vector: vector4): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
    }

    distance(vector: vector4): number {
        return Math.sqrt(this.squaredDistance(vector));
    }

    squaredDistance(vector: vector4): number {
        let vec = this.add(vector.negate());
        return vec.squaredLength
    }
}