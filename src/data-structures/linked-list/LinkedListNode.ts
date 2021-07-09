export default class LinkedListNode<V> {
    value: V
    next: LinkedListNode<V> | null
    constructor(value: V, next: LinkedListNode<V> | null = null) {
        this.value = value
        this.next = next
    }

    toString(callback?: (arg0: V) => string) {
        return callback ? callback(this.value) : `${this.value}`
    }
}