import { Color } from "./color";
import { ISurface, Surface } from "./surface"

export class Game {
    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;
    private _surface:ISurface;
    private _initialized:boolean;

    public get Initialized() {
        return this._initialized;
    }


    public constructor(canvasName:string) {
        
        var canvas = 
        <HTMLCanvasElement> document.getElementById(canvasName);

        if(canvas == null) {
            return;
        }

        canvas.setAttribute("height", canvas.clientHeight.toString());
        canvas.setAttribute("width", canvas.clientWidth.toString());

        this._canvas = canvas;      
        this._context = canvas.getContext("2d", { alpha: false });
        var imgData = this._context.createImageData(
            canvas.clientWidth,
            canvas.clientHeight
        );
        this._surface = new Surface(imgData);
        this._initialized = this._surface?.imageData != null;
    }

    public Run() {
        this.Update();
        this.Draw();
        window.requestAnimationFrame(() => this.Run())
    }

    protected Update(): void {

    }

    protected Draw(): void {
        let color = new Color();
        for(var x=0;x<this._surface.width;x++){
            for (var y = 0; y < this._surface.height; y++) {
                color.Random();
                this._surface.SetPixel(x, y, color);
             }
        }
        this._context.putImageData(this._surface.imageData,0,0);
    }
}