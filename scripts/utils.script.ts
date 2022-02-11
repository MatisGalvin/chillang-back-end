export function clearAndUpper(text: string): string {
  return text.replace(/-/, "").toUpperCase();
}
export function toPascalCase(text: string): string {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function toCamelCase(text: string): string {
  const result = text.replace(/[-_\s.]+(.)?/g, (_, c) =>
    c ? c.toUpperCase() : ""
  );
  return result.substr(0, 1).toLowerCase() + text.substr(1);
}

export function camelCaseToSentence(text: string): string {
  var result = text.replace(/([A-Z])/g, " $1");
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}
