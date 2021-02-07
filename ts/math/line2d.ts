import { Vector2d } from "./vector2d"
import { InBetween } from "./misc"

export class Line2d {
    private _values = new Float32Array(4);

    public constructor();
    public constructor(v0:Vector2d, v1:Vector2d);
    public constructor(v0:number, v1:number, v2:number, v3:number);

    public constructor(
        v0?:number | Vector2d,
        v1?:number | Vector2d,
        v2?:number,
        v3?:number) {
        if(v0 instanceof Vector2d && v1 instanceof Vector2d) {
            this._values[0] = v0.x;
            this._values[1] = v0.y;

            this._values[2] = v1.x;
            this._values[3] = v1.y;
            return;
        }

        this._values[0] = v0 as number || 0;
        this._values[1] = v1 as number || 0;
        this._values[2] = v2 || 0;
        this._values[3] = v3 || 0;
    }

    public get x0() {
        return this._values[0];
    }

    public set x0(value: number) {
        this._values[0] = value;
    }

    public get y0() {
        return this._values[1];
    }

    public set y0(value: number) {
        this._values[1] = value;
    }

    public get x1() {
        return this._values[2];
    }

    public set x1(value: number) {
        this._values[2] = value;
    }

    public get y1() {
        return this._values[3];
    }

    public set y1(value: number) {
        this._values[3] = value;
    }

    public get p0() {
        return new Vector2d(this.x0, this.y0); 
    }

    public set p0(p: Vector2d) {
        this.x0 = p.x;
        this.y0 = p.y;
    }

    public get p1() {
        return new Vector2d(this.x1, this.y1); 
    }

    public set p1(p: Vector2d) {
        this.x1 = p.x;
        this.y1 = p.y;
    }

    // difference in x's
    public get dx() {
        return this.x1 - this.x0;
    }

    // difference in y's
    public get dy() {
        return this.y1 - this.y0;
    }

    // return 'NaN' if it's a veritical line
    // which means it has an infinite slope
    public get slop() {
        if(this.dx == 0) {
            return Number.NaN;
        }
        return this.dy/this.dx;
    }

    // test if two lines have an intersection point
    public Intersect(line: Line2d): [boolean, Vector2d] {
        return this.intersectV1(line);
    }

    // method 1
    protected intersectV1(line: Line2d): [boolean, Vector2d] {
        /*
         * use equation to solve this problem
         * suppose we have ln0, ln1.
         * let:
         *     m0 = ln0.slope
         *     m1 = ln1.slope
         * 
         *     x0 = ln0.x0
         *     y0 = ln0.y0
         * 
         *     x1 = ln1.x0
         *     y1 = ln1.y0
         * 
         * the point-slope form should be:
         * 
         * 
         * ln0: (y - y0) = m0(x - x0)
         * ln1: (y - y1) = m1(x - x1)
         * 
         * those equation could be rewrite as:
         * y = m0(x - x0) + y0
         * y = m1(x - x1) + y1
         * 
         * if they met at a point (x, y), those two equations could be
         * combined as:
         *                       m0(x - x0) + y0 = m1(x - x1) + y1
         *                   m0*x - m0*x0 - m1*x = -m1*x1 + y1 - y0
         *                   x(m0 - m1)  - m0*x0 = -m1*x1 + y1 - y0
         *                          x(m0 - m1)   = m0*x0 - m1*x1 + y1 - y0
         * finally, we have:
         * x = (m0*x0 - m1*x1 + y1 - y0)/(m0-m1)
         * 
         * plug the 'x' in the point-slope equations to get 'y'
         * 
         * warning: two lines might have same slope, that causes us a 
         * 'divide zero' problem.
         * 
         */

         // x = (m0*x0 - m1*x1 + y1 - y0)/(m0-m1)
         
         // special cases where there's at least one vertical line
        if(this.slop == Number.NaN || line.slop == Number.NaN) {
            if(this.slop != Number.NaN) {
                 return Line2d.intersectNV(this, line);
            }

            if(line.slop != Number.NaN) {
               return Line2d.intersectNV(line, this);
            }

            // two vertical lines
            if(InBetween(this.y0, line.y0, line.y1) ||
                InBetween(this.y1, line.y0, line.y1)) {

               let vct = new Vector2d();
               vct.x = Number.NaN;
               vct.y = Number.NaN;
               // infinite intersection point
               return [true, vct];
            }
            // no intersection point at all
            return [false, null];
        }
        //  x = (m0*x0 - m1*x1 + y1 - y0)/(m0-m1)
        let x = (this.slop * this.x0 - 
                 line.slop*line.x0    -
                 this.y0 + line.y0) / (this.slop - line.slop);
        //  y = m0(x - x0) + y0
        let y = this.slop * (x - this.x0) + this.y0;

        if( InBetween(x, this.x0, this.x1) ) {
            return [true, new Vector2d(x, y)];
        } else {
            // they how intersection point, but not here.
            return [false, new Vector2d(x, y)];
        }
    }

    // one is normal line, other is vertical line
    protected static intersectNV(lnn:Line2d, lnv:Line2d): [boolean, Vector2d] {
        let xmin = Math.min(lnn.x0, lnn.x1);
        let xmax = Math.max(lnn.x0, lnn.x1);

        if(InBetween(lnv.x0, lnn.x0, lnn.x1) ) {
            let y0 = lnv.x0 * lnn.slop;
            if(InBetween(y0, lnn.y0, lnn.y1)) {
                return [true, new Vector2d(lnv.x0, y0)];
            }
        }
        // no intersection
        return [false, null];
    }
}