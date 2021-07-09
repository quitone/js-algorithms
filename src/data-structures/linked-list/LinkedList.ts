import Comparator from "../../utils/comparator/comparator"
import LinkedListNode from "./LinkedListNode"


export default class LinkedList<V> {
    head : LinkedListNode<V> | null = null
    tail : LinkedListNode<V> | null = null
    comparator: Comparator<V>

    constructor(compareFunc?: (a: V, b: V) => -1|0|1) {
        this.comparator = new Comparator<V>(compareFunc)
    }

    append(value: V) {
        const node = new LinkedListNode(value)
        if (!this.head) {
            this.head = node
        } else {
            // @ts-ignore
            this.tail.next = node
        }
        this.tail = node
        return this
    }

    prepend(value: V): LinkedList<V> {
        const node = new LinkedListNode(value, this.head)
        if (this.head) {
            this.head = node
        } else {
            this.head = node
            this.tail = node
        }
        return this
    }

    delete(value: V): LinkedListNode<V>|null {
        if (!this.head) {
            return null
        }
        let deletedNode = null

        while (this.head && this.comparator.equal(this.head.value, value)) {
            deletedNode = this.head
            this.head = this.head.next
        }

        let currNode = this.head

        if (currNode) {
            while (currNode.next) {
                if (this.comparator.equal(currNode.next.value, value)) {
                    deletedNode = currNode.next
                    currNode.next = deletedNode.next
                } else {
                    currNode = currNode.next
                }
            }
        }
        // @ts-ignore
        if (this.comparator.equal(this.tail.value, value)) {
            this.tail = currNode
        }
        return deletedNode
    }

    find({ value, callback }: { value: V, callback ?: (arg0: V) => boolean }): LinkedListNode<V>|null {
        if (!this.head) {
            return null
        }

        let currNode: LinkedListNode<V> | null | undefined = this.head

        while (currNode) {
            if (callback && callback(currNode.value)) {
                return currNode
            }

            if (value && this.comparator.equal(currNode.value, value)) {
                return currNode
            }

            currNode = currNode.next
        }
        return null
    }
    deleteHead() {
        if (!this.head) {
            return null
        }
        const deletedHead = this.head

        if (this.head.next) {
            this.head = this.head.next
        } else {
            this.head = null
            this.tail = null
        }

        return deletedHead
    }
    deleteTail() {
        if (!this.tail) {
            return null
        }

        const deletedTail = this.tail
        let currNode = this.head as LinkedListNode<V>

        if (currNode === deletedTail) {
            this.head = null
            this.tail = null
        }

        while (currNode.next) {
            if (currNode.next === deletedTail) {
                currNode.next = null
                this.tail = currNode
                break
            }
            currNode = currNode.next
        }
        return deletedTail
    }
    fromArray(array: V[]) {
        array.forEach(item => this.append(item));
        return this
    }
    toArray(): LinkedListNode<V>[] {
        const nodes = []
        let currNode = this.head
        while (currNode) {
            nodes.push(currNode)
            currNode = currNode.next
        }
        return nodes
    }
    toString(callback?: (V: any) => string) {
        return this.toArray().map(node => node.toString(callback)).toString()
    }

    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;
    
        while (currNode) {
          // Store next node.
          nextNode = currNode.next;
    
          // Change next node of the current node so it would link to previous node.
          currNode.next = prevNode;
    
          // Move prevNode and currNode nodes one step forward.
          prevNode = currNode;
          currNode = nextNode;
        }
    
        // Reset head and tail.
        this.tail = this.head;
        this.head = prevNode;
    
        return this;
      }
}