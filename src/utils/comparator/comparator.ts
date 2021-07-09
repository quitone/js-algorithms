type compareFunResult = -1 | 0 | 1

export default class Comparator<Node> {
    compare: (a: Node, b: Node) => compareFunResult
    constructor(compareFunc: (a: Node, b: Node) => compareFunResult = Comparator.defaultCompareFunc) {
        this.compare = compareFunc
    }
    static defaultCompareFunc(a: any, b: any) {
        if (a === b) {
            return 0
        }
        return a > b ? 1 : -1
    }
    equal(a: Node, b: Node) {
        return this.compare(a, b) === 0
    }
    greaterThan(a: Node, b: Node) {
        return this.compare(a, b) > 0
    }
    lessThan(a: Node, b: Node) {
        return this.compare(a, b) < 0
    }
    equalOrGreaterThan(a: Node, b: Node) {
        return this.equal(a, b) || this.greaterThan(a, b)
    }
    equalOrLessThan(a: Node, b: Node) {
        return this.equal(a, b) || this.lessThan(a, b)
    }
    reverse() {
        const func = this.compare
        this.compare = (a, b) => func(b, a)
        return this
    }
}