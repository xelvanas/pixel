import { describe } from 'mocha';
import { expect } from 'chai';
import { Color } from "../ts/color";


describe("basic 'Color' feature tests", () => {
    it('constructor gives zero', () => {
            let color = new Color();
            expect(color.Value).equal(0);
    });
    it('constructor gives zero', () => {
        let color = new Color();
        expect(color.Value).equal(0);
    });

    it('incorrect red value is acceptable', () => {
        let color = new Color();
        expect(color.R).equal(0);
        color.R = 100;
        expect(color.R).equal(100);
    });

    it('assign uint32 to color', () => {
        let color = new Color();
        color.Value = 0xFF123456;
        expect(color.Hex).equal("FF123456");
    });

    // it('constructor give zero', () => {
    //     let color = new Color();
    //     expect(color.Value).equal(0);
    // });
    // it('constructor give zero', () => {
    //     let color = new Color();
    //     expect(color.Value).equal(0);
    // });
    // it('constructor give zero', () => {
    //     let color = new Color();
    //     expect(color.Value).equal(0);
    // });
    // it('constructor give zero', () => {
    //     let color = new Color();
    //     expect(color.Value).equal(0);
    // });
    // it('constructor give zero', () => {
    //     let color = new Color();
    //     expect(color.Value).equal(0);
    // });
    // it('constructor give zero', () => {
    //     let color = new Color();
    //     expect(color.Value).equal(0);
    // });

});