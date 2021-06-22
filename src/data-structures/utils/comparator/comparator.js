export default class Comparator {
    constructor(compareFunc) {
        this.compare = compareFunc ? compareFunc : Comparator.defaultCompareFunc
    }
    defaultCompareFunc(a, b) {
        if (a === b) {
            return 0
        }
        return a > b ? 1 : -1
    }
    equal(a, b) {
        return this.compare(a, b) === 0
    }
    greaterThan(a, b) {
        return this.compare(a, b) > 0
    }
    lessThan(a, b) {
        return this.compare(a, b) < 0
    }
    equalOrGreaterThan(a, b) {
        return this.equal(a, b) || this.greaterThan(a, b)
    }
    equalOrLessThan(a, b) {
        return this.equal(a, b) || this.lessThan(a, b)
    }
    reverse() {
        const func = this.compare
        this.compare = (a, b) => func(b, a)
        return this
    }
}