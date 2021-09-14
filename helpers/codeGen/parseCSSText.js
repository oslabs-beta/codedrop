export const parseCSSText = (cssText) => {
  var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ');
  var style = {},
    [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt];
  var cssToJs = (s) => s.replace(/\W+\w/g, (match) => match.slice(-1).toUpperCase());
  var properties = rule.split(';').map((o) => o.split(':').map((x) => x && x.trim()));
  for (var [property, value] of properties) style[cssToJs(property)] = value;
  return JSON.stringify(style);
};
