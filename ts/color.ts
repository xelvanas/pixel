export class Color {
    private _data = new Uint8Array(4);

    /*
     * converting string to number is not the job of a 'color'.,
     * provide a converter to support parameters like "#FFF", '0xABC', etc
     */
    public constructor(color:number = 0) {
        this.value = color;
    }

    public get r() {
        return this._data[0];
    }

    public set r(value: number) {
        this._data[0] = value;
    }

    public get g() {
        return this._data[1];
    }

    public set g(value: number) {
        this._data[1] = value;
    }

    public get b() {
        return this._data[2];
    }

    public set b(value: number) {
        this._data[2] = value;
    }

    public get a() {
        return this._data[3];
    }

    public set a(value: number) {
        this._data[3] = value;
    }

    public get value() {
        let v = new Uint32Array(this._data.buffer);
        return v[0];
    }

    public set value(value: number) {
        let v = new Uint32Array(this._data.buffer);
        v[0] = value;
    }

    public get Hex() {
        return this.value
        .toString(16)
        .toUpperCase()
        .padStart(8,'0');
    }

    public get HtmlColor() {
        return "#" + 
        this.r.toString(16).padStart(2, '0') +
        this.g.toString(16).padStart(2, '0') +
        this.b.toString(16).padStart(2, '0');
    }

    public random(): void {
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
        this.a = 255;
    }

    public setRGBA(r: number, g: number, b: number, a:number = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public static Create(
        r: number,
        g: number,
        b: number,
        a:number = 255): Color {
            let color = new Color();
            color.setRGBA(r, g, b, a);
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