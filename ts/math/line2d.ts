import { inBetween } from "./misc"
import { vector2d } from "./vector2d"
import { matrix2d } from "./matrix2d";

export class line2d {
    private _values = new Float32Array(4);

    public constructor();
    public constructor(v0:vector2d, v1:vector2d);
    public constructor(v0:number, v1:number, v2:number, v3:number);

    public constructor(
        v0?:number | vector2d,
        v1?:number | vector2d,
        v2?:number,
        v3?:number) {
        if(v0 instanceof vector2d && v1 instanceof vector2d) {
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
        return new vector2d(this.x0, this.y0); 
    }

    public set p0(p: vector2d) {
        this.x0 = p.x;
        this.y0 = p.y;
    }

    public get p1() {
        return new vector2d(this.x1, this.y1); 
    }

    public set p1(p: vector2d) {
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
    public get slope() {
        if(this.dx == 0) {
            return Number.NaN;
        }
        return this.dy/this.dx;
    }

    public normalize(): void {
        if(this.x0 > this.x1) {
            [this.x0, this.x1] = [this.x1, this.x0];
        }

        if(this.y0 > this.y1) {
            [this.y0, this.y1] = [this.y1, this.y0];
        }
    }

    // test if two lines have an intersection point
    public intersect(line: line2d): [boolean, vector2d] {
        return this.intersectV2(line);
    }

    // method 1
    // use point-slope form to solve equations
    protected intersectV1(line: line2d): [boolean, vector2d] {
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
         let vct   = new vector2d();
             vct.x = Number.NaN;
             vct.y = Number.NaN;
        if(this.slope == Number.NaN || line.slope == Number.NaN) {
            if(this.slope != Number.NaN) {
               return line2d.intersectNV(this, line);
            }

            if(line.slope != Number.NaN) {
               return line2d.intersectNV(line, this);
            }

            // two vertical lines
            if(inBetween(this.y0, line.y0, line.y1) ||
               inBetween(this.y1, line.y0, line.y1)) {
               // infinite intersection point
               return [true, vct];
            }
            // no intersection point at all
            return [false, null];
        }

        if(Math.abs(this.slope - line.slope) < 0x0001) {
            // might be parallel lines
            // how do I know if two parallel lines are the same
            // we can use y-intercept form to detect if they have same
            // intercept.
            // 
            // from y = m0(x - x0) + y0 to y = m*x + b
            // m*x - m*x0 + y0 = m*x + b
            // b = y0 - m*x0
            let b0 = this.y0 - this.slope*this.x0;
            let b1 = line.y0 - line.slope*line.x0;

            // they have infinite intersection points 
            // only if b0 == b1 && they have shared 'x' parts
            return [b0 == b1 && inBetween(line.x0, this.x0, this.x1), vct];
        }

        //  x = (m0*x0 - m1*x1 + y1 - y0)/(m0-m1)
        let x = (this.slope * this.x0 - 
                 line.slope * line.x0 -
                 this.y0 + line.y0) / (this.slope - line.slope);

        //  y = m0(x - x0) + y0
        let y = this.slope * (x - this.x0) + this.y0;

        if( inBetween(x, this.x0, this.x1) ) {
            return [true, new vector2d(x, y)];
        } else {
            // they how intersection point, but not here.
            return [false, new vector2d(x, y)];
        }
    }

    // one is normal line, other is vertical line
    protected static intersectNV(lnn:line2d, lnv:line2d): [boolean, vector2d] { 

        if(inBetween(lnv.x0, lnn.x0, lnn.x1) ) {
            let y0 = lnv.x0 * lnn.slope;
            if(inBetween(y0, lnn.y0, lnn.y1)) {
                return [true, new vector2d(lnv.x0, y0)];
            }
        }
        // no intersection
        return [false, null];
    }

    protected intersectV2(line: line2d): [boolean, vector2d] {
        // line1: this.x0, this.y0, this.x1, this.y1
        // line2: line.x0, line.y0, line.x1, line.y1

        // from 'point-slope form' to 'general form':
        // y-y0=m(x-x0)
        // y-y0=mx-mx0
        // mx-y=mx0-y0
        // a = m, b = -1, c = mx0-y0

        // Ax = c
        // matrix A:
        // | m1 -1 |
        // | m2 -1 |

        // vector c:
        // | c1 |
        // | c2 |

        // matrix B1
        // | c1 -1 |
        // | c2 -1 |
        
        // matrix B2
        // | m1 c1 |
        // | m2 c2 |

        // by cramer's rule
        // x = det(B1)/detA
        // y = det(B2)/detA
        let mA  = new matrix2d([this.slope, -1, line.slope, -1]);
        let vct = new vector2d();
        vct.x = Number.NaN;
        vct.y = Number.NaN;
        let detA = mA.determinant();
        if(detA == 0) {
            return [false, vct];
        }
        let mB1 = mA.copy();
        let mB2 = mA.copy();

        let vC  = [this.slope * this.x0 - this.y0,
                   line.slope * line.x0 - line.y0];

        mB1.setColumn(1, vC);
        mB2.setColumn(2, vC);
        
        let detB1 = mB1.determinant();
        let detB2 = mB2.determinant();
        vct.x = Math.floor(detB1/detA + 0.5);
        vct.y = Math.floor(detB2/detA + 0.5);
        return [true, vct];
    }
}