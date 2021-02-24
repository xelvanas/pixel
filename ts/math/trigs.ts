
// suppose we have a triangle which:
// hypotenuse = r
// ajecent    = x
// opposite   = y
//  
// we have trig functions defined as below:
// sine       = x/r
// cosine     = y/r
// tangent    = x/y
// cotangent  = y/x
// secant     = r/y
// cosecant   = r/x
// 
// we use taylor polynomials to implement those trig functions and its
// inverse functions.
// the Maclaurin series is only a special case of the Taylor series which
// expands at x = 0.
// the general form of Taylor series is:
// f(x) ≈ f(a) + f'(a) * (x-a)^1/(!1) + f''(a) * (x-a)^2/(!2) ... so on
// Maclaurin series:
// f(x) ≈ f(0) + f'(0) * x^1/(!1) + f''(0) * x^2/(!2) ... so on
// 

// high degree derivatives of sine function
// 1st: sin'(a) =  cos(a)
// 2nd: cos'(a) = -sin(a)
// 3rd:-sin'(a) = -cos(a) (just take out -1, by constant factor rule)
// 4th:-cos'(a) =  sin(a)
// it's a simple loop
//
// plug those derivatives into taylor series:
// sin(x) = sin(a) + cos(a)(x-a) -sin(a)(x-a)^2/(!2) -cos(a)(x-a)^3/(!3)... 
// seems we're stuck here since we're implementing the sin function,
// but it is based on cos and itself.
// that's where Maclaurin series get in.
// since: sin(0) = 0, cos(0) = 1
// much of its terms would be elimilated, and the most important thing is
// no more trig functions in the series.
// if a = 0, the series would be:
// sin(x) = sin(a) + cos(a)(x-a) -sin(a)(x-a)^2/(!2) - cos(a)(x-a)^3/(!3)...
// sin(x) = 0 + x + 0 - x^3/!3 - 0 + x^5/!5 + 0 - x^7/!7
// sin(x) = x - x^3/!3 + x^5/!5 - x^7/!7 ... 


function factorial(n:number): number {
    let ret = 1;
    for(let i = 2; i <= n; ++i) {
        ret *= i;
    }
    return ret;
}

export function sin(x:number): number {
    let ret  = x;
    let xx   = x;   // x cumulated
    let sx   = x*x; // x squared
    let sign = 1;
    for(let i = 3; i <= 17; i+=2) {
        xx   *= sx;
        sign *= -1;
        ret  += xx/factorial(i) * sign;
    }
    return ret;
}

// similarly, when a = 0:
// cos(x) = cos(0) - sin(0)*x - cos(0)*x^2/!2 + sin(0)*x^3/!3 + ... 
// cos(x) = 1 - 0 - x^2/!2 + 0 + x^4/!4 - 0 - x^6/!6 + ...
export function cos(x:number): number {
    let ret  = 1;
    let xx   = 1;
    let sx   = x*x;
    let sign = 1;
    for(let i = 2; i<=18;i+=2) {
        xx   *= sx;
        sign *= -1;
        ret  += xx/factorial(i) * sign;
    }
    return ret;
}

// another way to implement cos is cos(a) = sin(pi/2 - a)
export function cos2(x:number): number {
    return sin(Math.PI/2 - x);
}

//
// since we have sine and cosine functions
// it's very easy to implement: tan, cot, sec, csc functions, because:
// tan = sin/cos
// cot = cos/sin
// sec =   1/cos
// csc =   1/sec


