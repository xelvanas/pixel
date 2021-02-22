import { color } from "./color";
import { line2d } from "./math/line2d";
import { vector2d } from "./math/vector2d";
import { rectangle } from "./math/rectangle";

import { ISurface, Surface } from "./surface"
import { polygon2d } from "./polygon2d"


export class Game {
    private _front_canvas:HTMLCanvasElement;
    private _front_context:CanvasRenderingContext2D;
    
    private _back_canvas:HTMLCanvasElement;

    private _back_context:CanvasRenderingContext2D;
    private _surface:ISurface;
    private _initialized:boolean;
    private _color:color = new color();

    private _polygons:polygon2d[] = new Array();
    private _clipper:rectangle = new rectangle();

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

        this._clipper.x0 = 30;
        this._clipper.x1 = 800 - 30;
        this._clipper.y0 = 30;
        this._clipper.y1 = 600 - 30;
        
        //col.setRGBA(255,123,0, 255);
        for(let i = 0; i < 50; ++i) {
            let poly = new polygon2d();
            poly.addVertex(33, -3);
            poly.addVertex(9, -18);
            poly.addVertex(-12, -9);
            poly.addVertex(-21, -12);
            poly.addVertex(-9, 6);
            poly.addVertex(-15, 15);
            poly.addVertex(-3, 27);
            poly.addVertex(21, 21);
            poly.center = new vector2d(25,25);
            let col = new color();
            col.random();
            poly.color = col;

            poly.velocity.x = Math.floor(Math.random() * 10);
            poly.velocity.y = Math.floor(Math.random() * 10);

            poly.center.x = Math.floor(
                Math.random() * this._surface.width
            );

            poly.center.y = Math.floor(
                Math.random() * this._surface.height
            );
            this._polygons.push(poly);
        }
    }

    public run() {
        this.update();
        this.draw();
        window.requestAnimationFrame(() => this.run())
    }

    protected update(): void {
        // update game logic data
        for(let i = 0; i < this._polygons.length; ++i) {
            this._polygons[i].center.x += this._polygons[i].velocity.x;
            
            if(this._polygons[i].center.x >= this._clipper.x1) {
                this._polygons[i].center.x = this._clipper.x1 - 1;
                if(this._polygons[i].velocity.x > 0) {
                    this._polygons[i].velocity.x = 0 - this._polygons[i].velocity.x;
                }
            }

            if(this._polygons[i].center.x < this._clipper.x0) {
                this._polygons[i].center.x = this._clipper.x0;
                if(this._polygons[i].velocity.x < 0) {
                    this._polygons[i].velocity.x = 0 - this._polygons[i].velocity.x;
                }
            }

            this._polygons[i].center.y += this._polygons[i].velocity.y;

            if(this._polygons[i].center.y >= this._clipper.y1) {
                this._polygons[i].center.y = this._clipper.y1 - 1;
                if(this._polygons[i].velocity.y > 0) {
                    this._polygons[i].velocity.y = 0 - this._polygons[i].velocity.y;
                }
            }

            if(this._polygons[i].center.y < this._clipper.y0) {
                this._polygons[i].center.y = this._clipper.y0;
                if(this._polygons[i].velocity.y < 0) {
                    this._polygons[i].velocity.y = 0 - this._polygons[i].velocity.y;
                }
            }
            
        }

    }

    protected randomVector2(): vector2d {
        return new vector2d(
            Math.floor( Math.random() * this._surface.width ),
            Math.floor( Math.random() * this._surface.height )
        );
    }

    protected drawClipper(): void {
        let col = color.create(196, 255, 14, 255);
        this._surface.drawLine(
            new vector2d(this._clipper.x0, this._clipper.y0),
            new vector2d(this._clipper.x0, this._clipper.y1),
            col);

        this._surface.drawLine(
            new vector2d(this._clipper.x0, this._clipper.y0),
            new vector2d(this._clipper.x1, this._clipper.y0),
            col);

        this._surface.drawLine(
            new vector2d(this._clipper.x1, this._clipper.y1),
            new vector2d(this._clipper.x1, this._clipper.y0),
            col);

        this._surface.drawLine(
            new vector2d(this._clipper.x1, this._clipper.y1),
            new vector2d(this._clipper.x0, this._clipper.y1),
            col);
    }

    protected drawPolygons(): void {
        // let rect  = new rectangle();
        // rect.x0 = 12;
        // rect.y0 = 12;
        // rect.x1 = 110;
        // rect.y1 = 110;
        let line = new line2d();
        /*line.p0 = this._polygons[0].cvertex(0);
        line.p1 = this._polygons[0].cvertex(1);
        //line.p0 = new vector2d(0, 0);//this._polygons[0].cvertex(0);
        //line.p1 = new vector2d(800, 600);//this._polygons[0].cvertex(1);
        line.normalize();
        line = rect.clip(line);
        this._surface.drawLine(
            line.p0, 
            line.p1, 
            this._polygons[0].color
        );*/
        let col = color.create(196, 255, 14, 255);
        // this._surface.drawLine(
        //     new vector2d(rect.x0, rect.y0),
        //     new vector2d(rect.x0, rect.y1),
        //     col);

        // this._surface.drawLine(
        //     new vector2d(rect.x0, rect.y0),
        //     new vector2d(rect.x1, rect.y0),
        //     col);

        // this._surface.drawLine(
        //     new vector2d(rect.x1, rect.y1),
        //     new vector2d(rect.x1, rect.y0),
        //     col);

        // this._surface.drawLine(
        //     new vector2d(rect.x1, rect.y1),
        //     new vector2d(rect.x0, rect.y1),
        //     col);
        // this._surface.drawLine(
        //     new vector2d(rect.x1, rect.y0),
        //     new vector2d(rect.x1, rect.y0),
        //     col);
        //col.random();

        // for(let j = 0; j < this._polygons[0].size-1; ++j) {
        //     line.p0 = this._polygons[0].cvertex(j);
        //     line.p1 = this._polygons[0].cvertex(j+1);
        //     //line = rect.clip(line);
        //     //line.normalize();
        //     this._surface.drawLine(
        //         line.p0, 
        //         line.p1, 
        //         col
        //     );
        // }

        // if(this._polygons[0].size >= 2) {
        //     line.p0 = this._polygons[0].cvertex(5);
        //     line.p1 = this._polygons[0].cvertex(6);
        //     line = rect.clip(line);
        //     //line.normalize();
        //     this._surface.drawLine(
        //         line.p0, 
        //         line.p1, 
        //         col
        //     );
        // }

        for(let i = 0; i < this._polygons.length; ++i) {
            for(let j = 0; j < this._polygons[i].size-1; ++j) {
                line.p0 = this._polygons[i].cvertex(j);
                line.p1 = this._polygons[i].cvertex(j+1);
                line = this._clipper.clip(line);
                //line.normalize();
                this._surface.drawLine(
                    line.p0, 
                    line.p1, 
                    this._polygons[i].color
                );
            }
            if(this._polygons[i].size >= 2) {
                line.p0 = this._polygons[i].cvertex(this._polygons[i].size-1);
                line.p1 = this._polygons[i].cvertex(0);
                line = this._clipper.clip(line);
                //line.normalize();
                this._surface.drawLine(
                    line.p0, 
                    line.p1, 
                    this._polygons[i].color
                );
            }
        }
    }

    protected draw(): void {
        this._color.r = 0;
        this._color.g = 0;
        this._color.b = 0;
        this._color.a = 255;
        this._surface.fill(this._color);
        // let col = new color();
        // col.random();
        // let line0 = new line2d(0, 0, 300, 400);
        // let line1 = new line2d(83, 13, 200, 500);
        // let rect  = new rectangle();
        // rect.x0 = 10;
        // rect.y0 = 10;
        // rect.x1 = 200;
        // rect.y1 = 200;
        // line0 = rect.clip(line0);
        // line1 = rect.clip(line1);

        // col.setRGBA(255, 0, 0);
        // this._surface.drawLine(
        //     line0.p0,
        //     line0.p1,
        //     col);

        //color.Random();
        // col.setRGBA(255, 255, 0);
        // this._surface.drawLine(
        //     line1.p0,
        //     line1.p1,
        //     col);

        // let [met, pt] = line0.intersect(line1);

        //color.random();

        // col.setRGBA(0,255,0, 255);
        // if(met) {
        //     this._surface.setPixel(
        //         Math.floor(pt.x),
        //         Math.floor(pt.y),
        //         col
        //     );
        // }

        /*
        this._back_context.fillStyle = this._color.HtmlColor;
        this._back_context.fillRect(0,0,800,600);
        this._back_context.putImageData(this._surface.imageData,0,0);
        this._front_context.drawImage(this._back_canvas, 0, 0);
        */
        // this._surface.drawLine(
        //     this.randomVector2(),
        //     this.randomVector2(),
        //     col);
        this.drawClipper();
        this.drawPolygons();
        this._front_context.putImageData(this._surface.imageData,0,0);
    }
}