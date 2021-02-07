export class Vector2 {
    private _values = new Float32Array(2);

    constructor();
    constructor( x: number, y: number);
    constructor( x?: number, y?: number) {
        this._values[0] = x || 0;
        this._values[1] = y || 0;
    }
    
    get X(): number {
        return this._values[0];
    }

    set X(value: number) {
        this._values[0] = value;
    }

    get Y(): number {
        return this._values[1];
    }

    set Y(value: number) {
        this._values[1] = value;
    }

    Copy(): Vector2 {
        return new Vector2(this.X, this.Y);
    }

    Reset(): void {
        this._values[0] = 0;
        this._values[1] = 0;
    }

    ToArray(): number[] {
        return [this._values[0], this._values[1]];
    }

    Negate(): Vector2 {
        return new Vector2(-this._values[0], -this._values[1])
    }

    Equals(vector: Vector2): boolean {
        if (Math.abs(this.X - vector.X) > Number.EPSILON) {
            return false
        }

        if (Math.abs(this.Y - vector.Y) > Number.EPSILON) {
            return false
        }
        return true
    }

    Add(vector: Vector2): Vector2 {
        return new Vector2(this.X + vector.X, this.Y + vector.Y);
    }

    Subtract(vector: Vector2): Vector2 {
        return new Vector2(this.X - vector.X, this.Y - vector.Y);
    }

    Scale(value: number): Vector2 {
        return new Vector2(this.X * value, this.Y * value);
    }

    Normalize(): Vector2 {
        let Length = this.Length;
        
        if (Length === 1) {
            return this.Copy();
        }

        if (Length === 0) {
            return new Vector2();
        }

        return new Vector2(this.X / Length, this.Y / Length);
    }

    get Length(): number {
        return Math.sqrt(this.SquaredLength);
    }

    get SquaredLength(): number {
        return this.Dot(this);
    }

    Dot(vector: Vector2): number {
        return this.X * vector.X + this.Y * vector.Y;
    }

    Cross(vector: Vector2): number {
        return this.X * vector.Y - vector.X * this.Y;
    }

    Distance(vector: Vector2): number {
        return Math.sqrt(this.SquaredDistance(vector));
    }

    SquaredDistance(vector: Vector2): number {
        let vec = this.Subtract(vector);
        return vec.SquaredLength
    }
}