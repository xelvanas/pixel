import { Color } from "./color";
import { Vector2 } from "./math/vector2"

export interface ISurface {
    width:number;
    height:number;
    imageData:ImageData;
    SetPixel(x:number, y:number, color:Color): void;
    GetPixel(x: number, y: number): Color;
    Fill(color: Color): void;
    DrawLine(p0:Vector2, p1:Vector2, color:Color): void;
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
        this._imgData.data[i+0] = color.R;
        this._imgData.data[i+1] = color.G;
        this._imgData.data[i+2] = color.B;
        this._imgData.data[i+3] = color.A;
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
        let val  = color.Value;
        for(let i = 0; i < size; ++ i) {
            buffer[i] = val;
        }
    }

    DrawLine(p0:Vector2, p1:Vector2, color:Color): void {
        let diff  = p1.Subtract(p0);
        let xinc  = diff.X >= 0 ? 1 : -1;
        let yinc  = diff.Y >= 0 ? 1 : -1;;
        let error = 0;
        let index = 0;
        diff.X = Math.abs(diff.X);
        diff.Y = Math.abs(diff.Y);


        if(diff.X >= diff.Y) {
            // x-dominate case
            error = Math.floor(diff.Y * (diff.X/diff.Y) / 2);
            for(let i = p0.X; i < diff.X; ++i) {
                if(error > diff.X) {
                    error -= diff.X;
                    p0.Y += yinc;
                }
                this.SetPixel(p0.X, p0.Y, color);
                p0.X += xinc;
                error += diff.Y;
            }
        } else {
            // y-dominate case
            error = Math.floor(diff.X * (diff.Y/diff.X) / 2);
            for(let i = p0.Y; i < diff.Y; ++i) {
                if(error > diff.Y) {
                    error -= diff.Y;
                    p0.X += xinc;
                }

                this.SetPixel(p0.X, p0.Y, color);
                p0.Y += yinc;
                error += diff.X;
            }
        }        
    }

}