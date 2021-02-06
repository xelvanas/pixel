import { Game } from "./game"

export function Run()
{
    let game = new Game("xcanvas");
    game.Run();
    
    //let canvas : any = document.getElementById("xcanvas");

    //canvas.setAttribute("height", canvas.clientHeight);
    //canvas.setAttribute("width", canvas.clientWidth);
    //var xcontext = canvas.getContext("2d");
    //let surface:ISurface = new Surface();
    //surface.Initialize("xcanvas");
    //surface.loop()
    //setInterval(() => surface.Draw(), 1)
}


// class Color
// {
//     public R:number;
//     public G:number;
//     public B:number;
//     public A:number;
// }

// class Surface
// {
//     private _canvas : HTMLCanvasElement;
//     private _context : CanvasRenderingContext2D;
//     private _buffer : ImageData;
//     private _width: number;
//     private _height: number;
//     private _lastRender: number

//     public get Width() : number
//     {
//         return this._width;
//     }

//     public get Height() : number
//     {
//         return this._height;
//     }

//     public get Valid() : boolean
//     {
//         return this._context != null;
//     }

//     public Initialize(canvasName:string) : boolean
//     {
//         if(this._canvas != null)
//         {
//             throw( new Error("Surface already initialized"));
//         }

//         this._canvas = <HTMLCanvasElement> document.getElementById(canvasName);
//         this._context = <CanvasRenderingContext2D> this._canvas.getContext("2d");
//         this._width = this._canvas.width;
//         this._height = this._canvas.height;
//         this._buffer = <ImageData> this._context.createImageData(this._width, this._height);
//         return false;
//     }

//     public SetPixel(x:number, y:number, color:Color): void
//     {
//         var i = (x + y * this.Width) * 4;
//         this._buffer.data[i] = color.R;
//         this._buffer.data[i+1] = color.G;
//         this._buffer.data[i+2] = color.B;
//         this._buffer.data[i+3] = color.A;
//     }

//     public Draw()
//     {
//         for(var x=0;x<this.Width;x++){
//             for (var y = 0; y < this.Height; y++) {
//              this.SetPixel(x, y, {
//                              R: Math.floor(Math.random()*256),
//                              G: Math.floor(Math.random()*256),
//                              B: Math.floor(Math.random()*256),
//                              A: 255});
//              }
//         }
//         this._context.putImageData(this._buffer,0,0);
//     }

//     public draw() :void {
//         // Draw the state of the world
//     }

//     public loop() {
//         this.Draw()
//         window.requestAnimationFrame( () => this.loop())
//     }
// }

// export {
//     initialize,
//     Surface,
//     Color
// }
