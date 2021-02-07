import { Color } from "./color";
import { Vector2d } from "./math/vector2d"

export interface ISurface {
    width:number;
    height:number;
    imageData:ImageData;
    SetPixel(x:number, y:number, color:Color): void;
    GetPixel(x: number, y: number): Color;
    Fill(color: Color): void;
    DrawLine(p0:Vector2d, p1:Vector2d, color:Color): void;
}


/*
 * no range check inside those functions like 'SetPixel', 'GetPixel', etc.
 * checking outside can be better and more flexible.
 */
export class Surface implements ISurface {
    private _imgData:ImageData;

    public constructor(imgData:ImageData) {
        this._imgData = imgData;
    }

    public get width() {
        return this._imgData.width;
    }

    public get height() {
        return this._imgData.width;
    }

    public get imageData() {
        return this._imgData;
    }

    SetPixel(x: number, y: number, color: Color): void {
        var i = (x + y * this.width) * 4;
        this._imgData.data[i+0] = color.r;
        this._imgData.data[i+1] = color.g;
        this._imgData.data[i+2] = color.b;
        this._imgData.data[i+3] = color.a;
    }

    GetPixel(x: number, y: number): Color {
        var i = (x + y * this.width) * 4;
        return Color.Create(
            this._imgData.data[i+0],
            this._imgData.data[i+0],
            this._imgData.data[i+0],
            this._imgData.data[i+0]
        );
    }

    Fill(color: Color): void {
        let buffer = new Uint32Array(this._imgData.data.buffer);
        let size = this.width * this.height;
        let val  = color.value;
        for(let i = 0; i < size; ++ i) {
            buffer[i] = val;
        }
    }

    DrawLine(p0:Vector2d, p1:Vector2d, color:Color): void {
        let diff  = p1.Subtract(p0);
        let xinc  = diff.x >= 0 ? 1 : -1;
        let yinc  = diff.y >= 0 ? 1 : -1;;
        let error = 0;
        let index = 0;
        diff.x = Math.abs(diff.x);
        diff.y = Math.abs(diff.y);


        if(diff.x >= diff.y) {
            // x-dominate case
            error = Math.floor(diff.y * (diff.x/diff.y) / 2);
            for(let i = p0.x; i < diff.x; ++i) {
                if(error > diff.x) {
                    error -= diff.x;
                    p0.y += yinc;
                }
                this.SetPixel(p0.x, p0.y, color);
                p0.x += xinc;
                error += diff.y;
            }
        } else {
            // y-dominate case
            error = Math.floor(diff.x * (diff.y/diff.x) / 2);
            for(let i = p0.y; i < diff.y; ++i) {
                if(error > diff.y) {
                    error -= diff.y;
                    p0.x += xinc;
                }

                this.SetPixel(p0.x, p0.y, color);
                p0.y += yinc;
                error += diff.x;
            }
        }        
    }

}