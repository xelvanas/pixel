import { Color } from "./color";

export interface ISurface {
    width:number;
    height:number;
    imageData:ImageData;
    SetPixel(x:number, y:number, color:Color): void;
}

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

}