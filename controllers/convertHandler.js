function ConvertHandler() {
  
  this.getNum = function(input) {
    let result
    let onlyLetters = input.match(/^[A-Za-z]+$/)
    if(onlyLetters)
      return 1

    let regexResult = input.match(/^((\d+(?:[.]\d+)?)(?:[/](\d+(?:[.]\d+)?))?)[A-Za-z]+$/)
    if(regexResult){
      result = regexResult[2] / (regexResult[3] || 1);
    }else{
      result = null
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.match(/[a-zA-Z]+/g)
    if(!result){
      return null
    }

    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    result = units.filter(unit => unit === (result[0] ? result[0]?.toLowerCase() : ''))
    return result.length ? result[0] : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    let units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let outputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let index = units.indexOf(initUnit ? initUnit?.toLowerCase() : '');
    result = outputUnits[index % 2 ? index - 1 : index + 1];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    let units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let unitsLong = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    let index = units.indexOf(unit);
    result = unitsLong[index];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let multiplier;
    switch(initUnit){
      case 'gal':
        multiplier = galToL
        break;
      case 'l':
        multiplier = 1 / galToL
        break;
      case 'lbs':
        multiplier = lbsToKg;
        break;
      case 'kg':
        multiplier = 1 / lbsToKg;
        break;
      case 'mi':
        multiplier = miToKm;
        break;
      case 'km':
        multiplier = 1 / miToKm;
        break;
      default:
        multiplier = 1;
    }

    result = initNum * multiplier
    result = Number(result.toFixed(5)) ;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
