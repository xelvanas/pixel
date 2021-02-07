import { Color } from "./color";
import { Vector2 } from "./math/vector2";
import { ISurface, Surface } from "./surface"

export class Game {
    private _front_canvas:HTMLCanvasElement;
    private _front_context:CanvasRenderingContext2D;
    
    private _back_canvas:HTMLCanvasElement;

    private _back_context:CanvasRenderingContext2D;
    private _surface:ISurface;
    private _initialized:boolean;
    private _color:Color = new Color();

    public get Initialized() {
        return this._initialized;
    }


    public constructor(canvasName:string) {
        
        var canvas = 
        <HTMLCanvasElement> document.getElementById(canvasName);

        if(canvas == null) {
            return;
        }

        let width  = canvas.clientWidth;
        let height = canvas.clientHeight;

        canvas.setAttribute("width", width.toString());
        canvas.setAttribute("height", height.toString());
        this._front_context = canvas.getContext("2d", { alpha: false });
        this._front_canvas  = canvas;


        // create back canvas
        canvas = document.createElement("canvas");
        this._back_canvas = canvas;
        this._back_context = canvas.getContext("2d", { alpha: false });

        canvas.width  = width;
        canvas.height = height;

        canvas.setAttribute("width", width.toString());
        canvas.setAttribute("height", height.toString());

        var imgData = this._back_context.createImageData(
            width,
            height
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

    protected randomVector2(): Vector2 {
        return new Vector2(
            Math.floor( Math.random() * this._surface.width ),
            Math.floor( Math.random() * this._surface.height )
        );
    }

    protected Draw(): void {
        this._color.R = 0xC4;
        this._color.G = 0xFF;
        this._color.B = 0x0E;
        this._color.A = 255;
        //this._surface.Fill(this._color);
        let color = new Color();
        color.Random();
        /*
        this._back_context.fillStyle = this._color.HtmlColor;
        this._back_context.fillRect(0,0,800,600);
        this._back_context.putImageData(this._surface.imageData,0,0);
        this._front_context.drawImage(this._back_canvas, 0, 0);
        */
        this._surface.DrawLine(
            this.randomVector2(),
            this.randomVector2(),
            color);
        this._front_context.putImageData(this._surface.imageData,0,0);
    }
}