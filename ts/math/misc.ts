export function inBetween(v:number, l:number, r:number) {
    if(l > r) {
        let t = l;
        l = r;
        r = t;
    }
    return v >= l && v <= r;
}