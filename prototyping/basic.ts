export type Siftable = {[key: string | number | symbol]: any}
export type Sifter<T extends Siftable> = Partial<T>

/**
 * Creates a predicate that validates whether a given item matches the provided sifter
 * @example 
 * // useful to use as the filter on an array.filter call
 * // sifted properties are strongly typed
 * // returns true
 * [{a: 1}, {a: 2}]
 *   .filter(sift({a: 1}))
 *   .every(({a}) => a === 1)
 * @param sifter A partial item object to compare the item to
 * @returns true if item matches the sifter, false otherwise
 */
const sift = <T extends Siftable, Sifter extends Partial<T>>(sifter: Sifter) => (item: Readonly<T>): item is T & Sifter => 
    Object.keys(item).every((key) => !sifter[key] || sifter[key] === item[key])

export default sift

