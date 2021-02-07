export class Vector2d {
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

    Copy(): Vector2d {
        return new Vector2d(this.x, this.y);
    }

    Reset(): void {
        this._values[0] = 0;
        this._values[1] = 0;
    }

    ToArray(): number[] {
        return [this._values[0], this._values[1]];
    }

    Negate(): Vector2d {
        return new Vector2d(-this._values[0], -this._values[1])
    }

    Equals(vector: Vector2d): boolean {
        if (Math.abs(this.x - vector.x) > Number.EPSILON) {
            return false
        }

        if (Math.abs(this.y - vector.y) > Number.EPSILON) {
            return false
        }
        return true
    }

    Add(vector: Vector2d): Vector2d {
        return new Vector2d(this.x + vector.x, this.y + vector.y);
    }

    Subtract(vector: Vector2d): Vector2d {
        return new Vector2d(this.x - vector.x, this.y - vector.y);
    }

    Scale(value: number): Vector2d {
        return new Vector2d(this.x * value, this.y * value);
    }

    Normalize(): Vector2d {
        let Length = this.Length;
        
        if (Length === 1) {
            return this.Copy();
        }

        if (Length === 0) {
            return new Vector2d();
        }

        return new Vector2d(this.x / Length, this.y / Length);
    }

    get Length(): number {
        return Math.sqrt(this.SquaredLength);
    }

    get SquaredLength(): number {
        return this.Dot(this);
    }

    Dot(vector: Vector2d): number {
        return this.x * vector.x + this.y * vector.y;
    }

    Cross(vector: Vector2d): number {
        return this.x * vector.y - vector.x * this.y;
    }

    Distance(vector: Vector2d): number {
        return Math.sqrt(this.SquaredDistance(vector));
    }

    SquaredDistance(vector: Vector2d): number {
        let vec = this.Subtract(vector);
        return vec.SquaredLength
    }
}