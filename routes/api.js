'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      let units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let outputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let index = units.indexOf(initUnit?.toLowerCase());
      initUnit = outputUnits[index]

      if(initUnit === undefined && initNum === null){
        res.send('invalid number and unit');
      }else if(initUnit === undefined){
        res.send('invalid unit');
      }else if(initNum === null){
        res.send('invalid number');
      } else {
        returnUnit = returnUnit == undefined ? 'invalid unit' : returnUnit;
  
        let obj ={
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string: toString
        }
  
        res.json({
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string: toString
        });

      }
    });
};
