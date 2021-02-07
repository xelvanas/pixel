export class Color {
    private _data = new Uint8Array(4);

    /*
     * converting string to number is not the job of a 'color'.,
     * provide a converter to support parameters like "#FFF", '0xABC', etc
     */
    public constructor(color:number = 0) {
        this.Value = color;
    }

    public get R() {
        return this._data[0];
    }

    public set R(value: number) {
        this._data[0] = value;
    }

    public get G() {
        return this._data[1];
    }

    public set G(value: number) {
        this._data[1] = value;
    }

    public get B() {
        return this._data[2];
    }

    public set B(value: number) {
        this._data[2] = value;
    }

    public get A() {
        return this._data[3];
    }

    public set A(value: number) {
        this._data[3] = value;
    }

    public get Value() {
        let v = new Uint32Array(this._data.buffer);
        return v[0];
    }

    public set Value(value: number) {
        let v = new Uint32Array(this._data.buffer);
        v[0] = value;
    }

    public get Hex() {
        return this.Value
        .toString(16)
        .toUpperCase()
        .padStart(8,'0');
    }

    public get HtmlColor() {
        return "#" + 
        this.R.toString(16).padStart(2, '0') +
        this.G.toString(16).padStart(2, '0') +
        this.B.toString(16).padStart(2, '0');
    }

    public Random(): void {
        this.R = Math.floor(Math.random() * 255);
        this.G = Math.floor(Math.random() * 255);
        this.B = Math.floor(Math.random() * 255);
        this.A = 255;
    }

    public SetRGBA(r: number, g: number, b: number, a:number = 255) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
    }

    public static Create(
        r: number,
        g: number,
        b: number,
        a:number = 255): Color {
            let color = new Color();
            color.SetRGBA(r, g, b, a);
            return color;
        }

    // private checkValue(val: number): number {
    //     if (val == undefined ||
    //         val == null ||
    //         val <= 0 ||
    //         Number.isNaN(val)) {
    //         return 0;
    //     }
    //     return val >= 255 ? 255 : val;
    //     return val;
    // }
}