// controllers/convertHandler.js
function ConvertHandler() {
  // Unidades válidas
  const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

  const unitMap = {
    gal: 'L',
    L: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  };

  const spellOutMap = {
    gal: 'gallons',
    L: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms'
  };

  // Extrae y valida el número
  this.getNum = function(input) {
    if (!input) return 1;
    const match = input.match(/^[\d.\/]+/); // parte numérica inicial
    if (!match) return 1; // default 1 si no hay número

    const numStr = match[0];

    // Rechaza doble fracción
    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return 'invalid number';

    // Fracción simple
    if (slashCount === 1) {
      const [a, b] = numStr.split('/');
      if (a === '' || b === '' || isNaN(a) || isNaN(b)) return 'invalid number';
      const val = parseFloat(a) / parseFloat(b);
      return isFinite(val) ? val : 'invalid number';
    }

    // Número decimal/entero
    if (numStr.split('.').length - 1 > 1) return 'invalid number'; // múltiples puntos
    const val = parseFloat(numStr);
    if (isNaN(val)) return 'invalid number';
    return val;
  };

  // Extrae y valida la unidad
  this.getUnit = function(input) {
    if (!input) return 'invalid unit';
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return 'invalid unit';

    let unit = match[0].toLowerCase();

    if (!validUnits.includes(unit)) return 'invalid unit';

    // Devuelve 'L' en mayúscula si corresponde
    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return spellOutMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };
    const factor = rates[initUnit];
    const val = initNum * factor;
    // redondeo a 5 decimales
    return Math.round(val * 1e5) / 1e5;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;
