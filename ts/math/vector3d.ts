export class vector3 {
    private _values = new Float32Array(3);

    constructor();
    constructor(x: number, y: number, z: number);
    constructor(x?: number, y?: number, z?: number) {
        this._values[0] = x;
        this._values[1] = y;
        this._values[2] = z;
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

    copy(): vector3 {
        return new vector3(this.x, this.y, this.z);
    }

    reset(): void {
        this._values[0] = 0;
        this._values[1] = 0;
        this._values[2] = 0;
    }

    toArray(): number[] {
        return [this._values[0], this._values[1], this._values[2]];
    }

    negate(): vector3 {
        return new vector3(-this._values[0], -this._values[1], -this._values[2])
    }

    equals(vector: vector3): boolean {
        if (Math.abs(vector.x - this.x) > Number.EPSILON) {
            return false;
        }

        if (Math.abs(vector.y - this.y) > Number.EPSILON) {
            return false;
        }

        if (Math.abs(vector.z - this.z) > Number.EPSILON) {
            return false;
        }
        return true;
    }

    add(vector: vector3): vector3 {
        return new vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    subtract(vector: vector3): vector3 {
        return new vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    scale(value: number): vector3 {
        return new vector3(this.x * value, this.y * value, this.z * value);
    }

    normalize(): vector3 {
        let length = this.length;
        
        if (length === 1) {
            return this.copy();
        }

        if (length === 0) {
            return new vector3();
        }

        return new vector3(this.x / length, this.y / length, this.z / length);
    }

    get length(): number {
        return Math.sqrt(this.squaredLength);
    }

    get squaredLength(): number {
        return this.dot(this);
    }

    dot(vector: vector3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector: vector3): vector3 {
        return new vector3(
            this.y*vector.z - this.z*vector.y,
            this.x*vector.z - this.z*vector.x,
            this.x*vector.y - this.y*vector.x
        );
    }

    distance(vector: vector3): number {
        return Math.sqrt(this.squaredDistance(vector));
    }

    squaredDistance(vector: vector3): number {
        let vec = this.add(vector.negate());
        return vec.squaredLength
    }
}