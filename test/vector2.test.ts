import { Vector2D } from "../ts/math/vector2d"
import { describe } from 'mocha';
import { expect } from 'chai';

describe('default ctor set x, y = (0, 0)', ()=> {
    let v = new Vector2D()
    it('constructor gives zero', () => {
        expect(v.x).eq(0);
        expect(v.y).eq(0);
    });    
});

describe('getter setter of x, y', () => {
    let v = new Vector2D()
    v.x = 1.23456;
    v.y = -234;
    let epsilon = 0x000001;
    expect(v.x).approximately(1.23456, epsilon);
    expect(v.x).closeTo(1.23456, epsilon)
    expect(v.y).equal(-234);
});

describe('copy vector2', () => {
    let v1 = new Vector2D(1, 2);
    let v2 = v1.Copy();
    v1.x = 3;
    v1.y = 4;
    expect(v2.x).eq(1);
    expect(v2.y).eq(2);
});

describe('reset', () => {
    let v1 = new Vector2D(1, 2);
    v1.Reset()
    expect(v1.x).eq(0);
    expect(v1.y).eq(0);
});

describe('to array', () => {
    let v1 = new Vector2D(1, 2);
    let array = v1.ToArray();
    expect(array[0]).eq(1);
    expect(array[1]).eq(2);
});

describe('negate', () => {
    let v1 = new Vector2D(1, 2);
    let v2 = v1.Negate()
    expect(v1.x).eq(1);
    expect(v1.y).eq(2);
    expect(v2.x).eq(-1);
    expect(v2.y).eq(-2);
});

describe('equals', () => {
    let v1 = new Vector2D(0.123456789, -1.0000001);
    let v2 = new Vector2D(0.123456788, -1.0000001)
    expect(v2.Equals(v1)).true;
});

// test('add', () => {
//     let v1 = new Vector2D(1, 2);
//     let v2 = v1.negate();
//     let v3 = v1.add(v2);
//     expect(v3.x).toBeCloseTo(0);
//     expect(v3.y).toBeCloseTo(0);
// });

// test('subtract', () => {
//     let v1 = new Vector2D(3, 4);
//     let v2 = v1.copy();
//     let v3 = v1.subtract(v2);
//     expect(v3.x).toBeCloseTo(0);
//     expect(v3.y).toBeCloseTo(0);
// });

// test('scale', () => {
//     let v1 = new Vector2D(1, 2);
//     let v2 = v1.scale(0.5);
//     expect(v2.x).toBeCloseTo(0.5);
//     expect(v2.y).toBeCloseTo(1);
// });

// test('normalize', () => {
//     let v1 = new Vector2D(5, 3);
//     let v2 = v1.normalize();
//     expect(v2.length).toBeCloseTo(1);
// });

// test('length', () => {
//     let angle = Math.random()
//     let v1 = new Vector2D(Math.sin(angle), Math.cos(angle));
//     expect(v1.length).toBeCloseTo(1);
// });

// test('squaredLength', () => {
//     let v1 = new Vector2D(1, 2);
//     expect(v1.squaredLength).toBeCloseTo(5);
// });

// test('dotProduct', () => {
//     let v1 = new Vector2D(1, 2);
//     let v2 = new Vector2D(3, 4);
//     expect(v1.dot(v2)).toBeCloseTo(11);
// });

// test('crossProduct', () => {
//     let v1 = new Vector2D(1, 2);
//     let v2 = new Vector2D(3, 4);
//     expect(v1.cross(v2)).toBeCloseTo(-2);
// });

// test('distance', () => {
//     let v1 = new Vector2D(1, 2);
//     let v2 = new Vector2D(3, 4);
//     expect(v1.distance(v2)).toBeCloseTo(Math.sqrt(8));
// });

// test('squaredDistance', () => {
//     let v1 = new Vector2D(1, 2);
//     let v2 = new Vector2D(3, 4);
//     expect(v1.squaredDistance(v2)).toBeCloseTo(8);
// });
