export class vector2d {
    private _values = new Float32Array(2);

    constructor();
    constructor( x: number, y: number);
    constructor( x?: number, y?: number) {
        this._values[0] = x || 0;
        this._values[1] = y || 0;
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

    copy(): vector2d {
        return new vector2d(this.x, this.y);
    }

    reset(): void {
        this._values[0] = 0;
        this._values[1] = 0;
    }

    toArray(): number[] {
        return [this._values[0], this._values[1]];
    }

    negate(): vector2d {
        return new vector2d(-this._values[0], -this._values[1])
    }

    equals(vector: vector2d): boolean {
        if (Math.abs(this.x - vector.x) > Number.EPSILON) {
            return false
        }

        if (Math.abs(this.y - vector.y) > Number.EPSILON) {
            return false
        }
        return true
    }

    add(vector: vector2d): vector2d {
        return new vector2d(this.x + vector.x, this.y + vector.y);
    }

    sub(vector: vector2d): vector2d {
        return new vector2d(this.x - vector.x, this.y - vector.y);
    }

    scale(value: number): vector2d {
        return new vector2d(this.x * value, this.y * value);
    }

    normalize(): vector2d {
        let Length = this.Length;
        
        if (Length === 1) {
            return this.copy();
        }

        if (Length === 0) {
            return new vector2d();
        }

        return new vector2d(this.x / Length, this.y / Length);
    }

    get Length(): number {
        return Math.sqrt(this.SquaredLength);
    }

    get SquaredLength(): number {
        return this.dot(this);
    }

    dot(vector: vector2d): number {
        return this.x * vector.x + this.y * vector.y;
    }

    cross(vector: vector2d): number {
        return this.x * vector.y - vector.x * this.y;
    }

    distance(vector: vector2d): number {
        return Math.sqrt(this.squaredDistance(vector));
    }

    squaredDistance(vector: vector2d): number {
        let vec = this.sub(vector);
        return vec.SquaredLength
    }
}