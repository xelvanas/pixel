import { color } from "./color";
import { vector2d } from "./math/vector2d"
import { matrix2d } from "./math/matrix2d"


export class polygon2d {
    private _state:number = 0;
    private _velocity:vector2d = new vector2d();
    private _center:vector2d = new vector2d();
    private _vertices:vector2d[] = new Array();
    private _color:color = new color();
    private _degree:number = 0;
    private _theta:number = 0;

    get center(): vector2d {
        return this._center;
    }

    set center(value:vector2d) {
        this._center = value;
    }

    get velocity(): vector2d {
        return this._velocity;
    }

    set velocity(value:vector2d) {
        this._velocity = value;
    }

    get color(): color {
        return this._color;
    }

    set color(c:color) {
        this._color = c;
    }

    get degree(): number {
        return this._degree;
    }

    set degree(value: number) {
        this._degree = value;
    }

    get radian(): number {
        return this.degree / 180 * Math.PI;
    }

    get theta(): number {
        return this._theta;
    }

    set theta(value: number) {
        this._theta = value;
    }

    get size(): number {
        return this._vertices.length;
    }

    addVertex(x:number, y:number): void {
        this._vertices.push(new vector2d(x, y));
    }

    vertex(idx:number): vector2d {
        // if(!Number.isInteger(idx) || idx >= this._vertices.length) {
        //     throw new Error("index out of range");
        // }
        return this._vertices[idx];
    }

    cvertex(idx:number): vector2d {
        // if(!Number.isInteger(idx) || idx >= this._vertices.length) {
        //     throw new Error("index out of range");
        // }
        return new vector2d(
            this._vertices[idx].x + this._center.x,
            this._vertices[idx].y + this._center.y);
    }

    rvertex(idx:number): vector2d {
        let rad = this.radian;
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);
        let m   = new matrix2d([
            cos, -sin,
            sin, cos
        ]);

        let vec = m.timesVector(new vector2d(
            this._vertices[idx].x,
            this._vertices[idx].y
        ))

        vec.x += this._center.x;
        vec.y += this._center.y;

        
        return vec;
    }

    rotate(): void {
        this._degree += this._theta;
        this._degree %= 360;
    }
}