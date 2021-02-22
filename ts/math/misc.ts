export function inBetween(v:number, l:number, r:number) {
    if(l > r) {
        let t = l;
        l = r;
        r = t;
    }
    return v >= l && v <= r;
}

// use to test a index (integer type)
export function inRange(v:number, l:number, r:number) {
    return Number.isInteger(v) && v >= l && v <= r;

}