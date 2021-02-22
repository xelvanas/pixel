import { color } from "./color";
import { vector2d } from "./math/vector2d"



export class polygon2d {
    private _state:number = 0;
    private _velocity:vector2d = new vector2d();
    private _center:vector2d = new vector2d();
    private _vertices:vector2d[] = new Array();
    private _color:color = new color();

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

}