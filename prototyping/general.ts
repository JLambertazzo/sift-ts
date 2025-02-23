// Supported Sifter Operations
enum Op {
    Eq = '$eq',
    In = '$in',
    NotIn = '$nin',
    Exists = '$exists',
    All = '$all'
}

// Sifter Type Implementations
type EqualSifter<V> = {[Op.Eq]: V}
type InSifter<V> = {[Op.In]: Array<V>}
type AllSifter<V> = V extends Array<unknown> ? {[Op.All]: V} : never
type ExistsSifter = {[Op.Exists]: boolean}

type SifterObject<T, K extends keyof T> = Partial<{[op in Op]: T[K] | Array<T[K]> | boolean}>
type SifterObjectResult<T, K extends keyof T, S extends SifterObject<T,K>> = 
    S extends EqualSifter<T[K]> 
        ? S[Op.Eq] 
    : S extends InSifter<T[K]> 
        ? S[Op.In][number]
    : S extends ExistsSifter
        ? S[Op.Exists] extends true ? Exclude<T[K], null | undefined> : null | undefined
    : S extends AllSifter<T[K]>
        ? S[Op.All][number][]
    : null

type Sifter<T> = {[k in keyof Partial<T>]: T[k] | SifterObject<T, k>}
type KeyResult<T, S extends Sifter<T>, K extends (keyof T & keyof S)> = T & {[k in K]: S[k] extends SifterObject<T,k> ? SifterObjectResult<T, k, S[k]> : S[k]}

type Student = {name: string, grade: number, partner?: string, courses: string[]}

type TestResult = KeyResult<Student, {name: {$eq: 'abc'}, grade: 88}, 'name'>
type TestResult2 = KeyResult<Student, {grade: 88, name: {$eq: 'abc'}}, 'grade' | 'name'>
type TestResult3 = KeyResult<Student, {name: {'$in': ['abc', 'cba']}}, 'name'>
type TestResult3dot1 = KeyResult<Student, {courses: {'$all': ['abc', 'cba']}}, 'courses'>
type TestResult4 = KeyResult<Student, {partner: {$exists: true}}, 'partner'>

const dtest: TestResult = {} as any
const dtest2: TestResult2 = {} as any
//              ^?

const dtest3: TestResult3 = {} as any
//              ^?
dtest3.name
//      ^?

const dtest3dot1: TestResult3dot1 = {} as any
const x = dtest3dot1.courses[0]
//    ^?

const dtest4: TestResult4 = {} as any
dtest4.partner
//      ^?
