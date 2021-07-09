import Comparator from "../../utils/comparator/comparator"

export default class Heap<Node> {

    data: Node[]
    compareFn: (a: Node, b: Node) => boolean
    isMiniHeap: boolean

    constructor(compareFn ?: (a: Node, b: Node) => -1|0|1, isMiniHeap = false) {
        this.data = []
        const compare = new Comparator<Node>(compareFn)
        this.isMiniHeap = isMiniHeap
        this.compareFn = isMiniHeap ? compare.lessThan.bind(compare) : compare.greaterThan.bind(compare)
    }

    add(value: Node) {
        this.data.push(value)
        this.swim(this.data.length - 1)
    }

    del(): Node {
        const tmp = this.data[0]
        this.data[0] = this.data[--this.data.length]
        this.sink(0)
        return tmp
    }

    sink(index: number) {
        const length = this.data.length
        while (index < length) {
            const leftChildIndex = this.getLeftChild(index)
            const rightChildIndex = this.getRightChild(index)
            if (leftChildIndex >= length) break
            if (rightChildIndex === length && this.compareFn(this.data[leftChildIndex], this.data[index])) {
                this.exchange(leftChildIndex, index)
                break
            }
            const targetChildIndex = this.compareFn(this.data[leftChildIndex], this.data[rightChildIndex]) ? leftChildIndex : rightChildIndex
            if (this.compareFn(this.data[targetChildIndex], this.data[index])) {
                this.exchange(targetChildIndex, index)
                index = targetChildIndex
                continue
            }
            break
        }
    }
    swim(index: number) {
        let parentIndex = this.getParentIndex(index)
        while (parentIndex !== index && parentIndex >= 0) {
            if (this.compareFn(this.data[index], this.data[parentIndex])) {
                this.exchange(index, parentIndex)
                index = parentIndex
                parentIndex = this.getParentIndex(index)
                continue
            }
            break
        }
    }

    getParentIndex(index: number) {
        return (index - 1) >> 1
    }

    getLeftChild(index: number) {
        return index * 2 + 1
    }

    getRightChild(index: number) {
        return index * 2 + 2
    }

    exchange(index1: number, index2: number) {
        [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]]
    }
}