export const parseCSSText = (cssText) => {
  const cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ');
  const style = {},
    [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt];
  const cssToJs = (s) => s.replace(/\W+\w/g, (match) => match.slice(-1).toUpperCase());
  const properties = rule.split(';').map((o) => o.split(':').map((x) => x && x.trim()));
  for (const [property, value] of properties) style[cssToJs(property)] = value;
  return JSON.stringify(style);
};
