function ConvertHandler() {
  
  // Extrae el número de la entrada (ej: "10L" -> 10)
  this.getNum = function(input) {
    let result;
    
    // Buscar el patrón de número (entero, decimal o fracción)
    const numberMatch = input.match(/^[0-9./]+/);
    
    // Si no hay número, retornar 1 por defecto
    if (!numberMatch) {
      return 1;
    }
    
    const numString = numberMatch[0];
    
    // Verificar si hay más de una barra (fracción doble) - ERROR
    const slashCount = (numString.match(/\//g) || []).length;
    if (slashCount > 1) {
      return 'invalid number';
    }
    
    // Si hay una fracción
    if (slashCount === 1) {
      const [numerator, denominator] = numString.split('/');
      
      if (!numerator || !denominator || denominator === '0') {
        return 'invalid number';
      }
      
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      // Número simple (entero o decimal)
      result = parseFloat(numString);
    }
    
    // Verificar que el resultado sea un número válido
    if (isNaN(result)) {
      return 'invalid number';
    }
    
    return result;
  };
  
  // Extrae la unidad de la entrada (ej: "10L" -> "L")
  this.getUnit = function(input) {
    let result;
    
    // Buscar las letras al final del string
    const unitMatch = input.match(/[a-zA-Z]+$/);
    
    if (!unitMatch) {
      return 'invalid unit';
    }
    
    const unit = unitMatch[0].toLowerCase();
    
    // Unidades válidas
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }
    
    // Retornar 'L' en mayúscula, el resto en minúscula
    result = unit === 'l' ? 'L' : unit;
    
    return result;
  };
  
  // Obtiene la unidad de retorno (conversión)
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return unitMap[initUnit];
  };

  // Obtiene el nombre completo de la unidad
  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitNames[unit];
  };
  
  // Realiza la conversión
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }
    
    // Redondear a 5 decimales
    return Math.round(result * 100000) / 100000;
  };
  
  // Genera el string de respuesta completo
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;