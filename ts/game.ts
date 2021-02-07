import { Color } from "./color";
import { Line2d } from "./math/line2d";
import { Vector2d } from "./math/vector2d";
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

    protected randomVector2(): Vector2d {
        return new Vector2d(
            Math.floor( Math.random() * this._surface.width ),
            Math.floor( Math.random() * this._surface.height )
        );
    }

    protected Draw(): void {
        this._color.r = 0;
        this._color.g = 0;
        this._color.b = 0;
        this._color.a = 255;
        this._surface.Fill(this._color);
        let color = new Color();
        color.Random();
        let line0 = new Line2d(0, 0, 300, 400);
        let line1 = new Line2d(83, 13, 200, 500);

        color.SetRGBA(255, 0, 0);
        this._surface.DrawLine(
            line0.p0,
            line0.p1,
            color);

        //color.Random();
        color.SetRGBA(255, 255, 0);
        this._surface.DrawLine(
            line1.p0,
            line1.p1,
            color);

        let [met, pt] = line0.Intersect(line1);

        color.Random();
        if(met) {
            this._surface.SetPixel(
                Math.floor(pt.x),
                Math.floor(pt.y),
                color
            );
        }

        /*
        this._back_context.fillStyle = this._color.HtmlColor;
        this._back_context.fillRect(0,0,800,600);
        this._back_context.putImageData(this._surface.imageData,0,0);
        this._front_context.drawImage(this._back_canvas, 0, 0);
        */
        // this._surface.DrawLine(
        //     this.randomVector2(),
        //     this.randomVector2(),
        //     color);
        this._front_context.putImageData(this._surface.imageData,0,0);
    }
}