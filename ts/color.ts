export class Color {
    private _data = new Uint8Array(4);

    public constructor() {
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

    public get Decimal() {
        let v = new Uint32Array(this._data.buffer);
        return v[0];
    }

    public set Decimal(value: number) {
        let v = new Uint32Array(this._data.buffer);
        v[0] = value;
    }

    public get Hex() {
        return this.Decimal
        .toString(16)
        .toUpperCase()
        .padStart(8,'0');
    }

    public Random(): void {
        this.R = Math.floor(Math.random() * 255);
        this.G = Math.floor(Math.random() * 255);
        this.B = Math.floor(Math.random() * 255);
        this.A = 255;
    }

    public SetRGB(r: number, g: number, b: number) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = 0xFF;
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