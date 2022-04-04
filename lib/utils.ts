/**
 * Support function to check if the property is an object or array of objects.
 *
 * @param property
 * @returns an array of object(s) or an empty array if undefined.
 */
export function propertyToArray<T>(property?: T): T[] {
  if (property === undefined) {
    return [];
  }
  return property && Array.isArray(property) ? property : [property];
}
