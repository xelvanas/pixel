import { line2d } from "./line2d";
import { vector2d } from "./vector2d"

const region_c  = 0x00;
const region_n  = 0x01;
const region_s  = 0x02;
const region_e  = 0x04;
const region_w  = 0x08;
const region_ne = region_n | region_e;
const region_se = region_s | region_e;
const region_nw = region_n | region_w;
const region_sw = region_s | region_w;
export class rectangle {
    private _values = new Float32Array(4);

    get x0(): number {
        return this._values[0];
    }

    set x0(value: number) {
        this._values[0] = value;
    }

    get y0(): number {
        return this._values[1];
    }

    set y0(value: number) {
        this._values[1] = value;
    }

    get x1(): number {
        return this._values[2];
    }

    set x1(value: number) {
        this._values[2] = value;
    }

    get y1(): number {
        return this._values[3];
    }

    set y1(value: number) {
        this._values[3] = value;
    }

    get width(): number {
        return this.x1 - this.x0;
    }

    get height(): number {
        return this.y1 = this.y0;
    }

    // make its width and height positive
    // left less than right and top less than bottom
    normalize(): void {
        if(this.x0 > this.x1) {
            [this.x0, this.x1] = [this.x1, this.x0];
        }

        if(this.y0 > this.y1) {
            [this.y0, this.y1] = [this.y1, this.y0];
        }
    }

    ptInRect(x:number, y:number): boolean {
        return x >= this.x0 &&
               x <  this.x1 &&
               y >= this.y0 &&
               y <  this.y1;
    }

    // --------------------------------------------------------------------
    // cohen-sutherland algorithm
    // 
    // since we have four borders: left, top, right, bottom
    // and nine regions:
    // center, north, south, east, west
    // north-east, north-west
    // south-east, south-west
    // endpoints must be in of those regions
    // and a line touches at most two border lines
    // 
    // given a region, we have only one unknown (x) to figure out
    // for example:
    // if endpoint is in north region
    // y - y0 = m(x - x0)
    // y = top-border
    // mx - mx0 =  y - y0
    //       mx =  y - y0 + mx0
    //        x = (y - y0 + mx0)/m
    // or:    x = 1/m * (y - y0) + x0
    //
    // if border is vertical line which means: given x to figure (y)
    // for example:
    // x = left-boder
    // y = m(x - x0) + y0
    //
    // the major purpose is demonstrating algorithm rather than 'speed up'
    // so we tore apart 'clip function' into pieces to make the logic more
    // readable than the monolithic style.
    clip(line:line2d): line2d {
        line.p0 = this.clipPoint(line.p0, line.slope);
        if(line.p0.x == Number.NaN) {
            line.p1.x = Number.NaN;
            line.p1.y = Number.NaN;
        } else {
            line.p1 = this.clipPoint(line.p1, line.slope);
        }
        return line;
    }

    protected calcRegion(pt:vector2d): number {
        let rgn = region_c;
        if(pt.x < this.x0) {
            rgn |= region_w;
        } else if (pt.x > this.x1) {
            rgn |= region_e;
        }

        if(pt.y < this.y0) {
            rgn |= region_n;
        } else if(pt.y > this.y1) {
            rgn |= region_s;
        }
        return rgn;
    }

    protected calcX(pt:vector2d, border:number, slope:number): number {
        return (1/slope) * (border - pt.y) + pt.x;
    }

    protected calcY(pt:vector2d, border:number, slope:number): number {
        return slope * (border - pt.x) + pt.y;
    }

    protected clipPoint(pt:vector2d, slope:number): vector2d{
        let rgn = this.calcRegion(pt);
        if(rgn == region_c) {
            return pt;
        }

        if((rgn & region_n) != 0 ||
           (rgn & region_s) != 0) {
            let hborder = (rgn & region_n) != 0 ?
            this.y0:
            this.y1 - 1;
            let nx = Math.floor(this.calcX(pt, hborder, slope) + 0.5);
            if(this.ptInRect(nx, hborder)) {
                return new vector2d(nx, hborder);
            }
        }
        if((rgn & region_e) != 0 ||
           (rgn & region_w) != 0) {
            let vborder = (rgn & region_w) != 0 ?
            this.x0:
            this.x1 - 1;
            let ny = Math.floor(this.calcY(pt, vborder, slope) + 0.5);
            if(this.ptInRect(vborder, ny)) {
                return new vector2d(vborder, ny);
            }
        }
        return new vector2d(Number.NaN, Number.NaN);
    }
    // end of cohen-sutherland algorithm
    // --------------------------------------------------------------------
}