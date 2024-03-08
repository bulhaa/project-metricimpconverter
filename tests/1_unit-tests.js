const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    
    test('read a whole number input.', function () {
        assert.strictEqual(4, convertHandler.getNum('4gal'));
      });
    
    test('read a decimal number input.', function () {
        assert.strictEqual(4.1, convertHandler.getNum('4.1gal'));
      });
    
    test('read a fractional input.', function () {
        assert.strictEqual(0.5, convertHandler.getNum('1/2gal'));
      });
    
    test('read a fractional input with a decimal.', function () {
        assert.strictEqual(0.6, convertHandler.getNum('1.2/2gal'));
      });
    
    test('return an error on a double-fraction (i.e. 3/2/3).', function () {
        assert.strictEqual(null, convertHandler.getNum('3/2/3gal'));
      });
    
    test('default to a numerical input of 1 when no numerical input is provided.', function () {
        assert.strictEqual(1, convertHandler.getNum('gal'));
      });
    
    test('read each valid input unit.', function () {
        const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
        units.forEach(unit => {
            assert.strictEqual(unit, convertHandler.getUnit(`4${unit}`));
        })
      });
    
    test('return an error for an invalid input unit.', function () {
        assert.strictEqual(null, convertHandler.getUnit(`4ds`));
      });
    
    test('convertHandler should return the correct return unit for each valid input unit.', function () {
        let units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
        let outputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        units.forEach(unit => {
            let index = units.indexOf(unit.toLowerCase());
            result = outputUnits[index % 2 ? index - 1 : index + 1];
            assert.strictEqual(result, convertHandler.getReturnUnit(`${unit}`));
        })
      });
    
    test('return the spelled-out string unit for each valid input unit.', function () {
        let units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        let unitsLong = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
        units.forEach(unit => {
            let index = units.indexOf(unit);
            result = unitsLong[index];
            assert.strictEqual(result, convertHandler.spellOutUnit(`${unit}`));
        })
      });
    
    test('convert gal to L.', function () {
        assert.strictEqual(15.14164, convertHandler.convert(4, 'gal'));
      });
    
    test('convert L to gal.', function () {
        assert.strictEqual(1.05669, convertHandler.convert(4, 'l'));
      });
    
    test('convert mi to km.', function () {
        assert.strictEqual(6.43736, convertHandler.convert(4, 'mi'));
      });
    
    test('convert km to mi.', function () {
        assert.strictEqual(2.48549, convertHandler.convert(4, 'km'));
      });
    
    test('convert lbs to kg.', function () {
        assert.strictEqual(1.81437, convertHandler.convert(4, 'lbs'));
      });
    
    test('convert kg to lbs.', function () {
        assert.strictEqual(8.8185, convertHandler.convert(4, 'kg'));
      });


});