function analyser(code) {
  var regexes = [
    /(?:assert\s*\.\s*isArray\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isBoolean\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isDefined\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isFunction\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotArray\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotBoolean\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotFunction\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotNull\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotNumber\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotObject\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotString\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNotUndefined\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNull\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isNumber\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isObject\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isString\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isTrue\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isUndefined\s*\(\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*match\s*\(\s*)(.*)(?:\s*\,\s*)(\/.*\/)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*notMatch\s*\(\s*)(.*)(?:\s*\,\s*)(\/.*\/)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*include\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*notInclude\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*property\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*notProperty\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*propertyVal\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*notPropertyVal\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*lengthOf\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*equal\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*notEqual\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*strictEqual\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*notStrictEqual\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*deepEqual\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*notDeepEqual\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isAbove\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isAtMost\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isBelow\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*isAtLeast\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g,
    /(?:assert\s*\.\s*approximately\s*\(\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*)(.*)(?:\s*\,\s*('|")(.*)('|")\s*\))/g
  ];

  var matches = [];
  for(let i = 0; i < regexes.length; i++){
    let match = regexes[i].exec(code);
    while (match != null) {
      matches.push(match);
      match = regexes[i].exec(code);
    }
  }
  
  return matches;
}

module.exports = analyser;