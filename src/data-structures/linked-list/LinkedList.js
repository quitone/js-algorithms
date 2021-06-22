import Comparator from "../utils/comparator/comparator"
import LinkedListNode from "./LinkedListNode"


export default class LinkedList {
    /**
     * @var LinkedListNode
     * @memberof LinkedList
     */
    head = null
    /**
     * @var LinkedListNode
     * @memberof LinkedList
     */
    tail = null
    /** @param {Function} compareFunc */
    constructor(compareFunc) {
        this.comparator = new Comparator(compareFunc)
    }
    /**
     * @param {*} value 
     * @returns {LinkedList}
     */
    append(value) {
        const node = new LinkedListNode(value, null)
        if (!this.head) {
            this.head = node
        } else {
            this.tail.next = node
        }
        this.tail = node
        return this
    }
    /**
     * @param {*} value 
     * @returns {LinkedList}
     */
    prepend(value) {
        const node = new LinkedListNode(value, this.head)
        if (this.head) {
            this.head = node
        } else {
            this.head = node
            this.tail = node
        }
        return this
    }
    /**
     * @param {*} value 
     * @returns {LinkedListNode}
     */
    delete(value) {
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
        if (this.comparator.equal(this.tail.value, value)) {
            this.tail = currNode
        }
        return deletedNode
    }
    find({ value, callback }) {
        if (!this.head) {
            return null
        }

        let currNode = this.head

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
    deleteTail() {}
    /**
     * @param {*[]} array 
     * @returns {LinkedList}
     */
    fromArray(array) {
        array.forEach(item => this.append(item));
        return this
    }
    toArray() {
        const nodes = []
        let currNode = this.head
        while (currNode) {
            nodes.push(currNode)
            currNode = currNode.next
        }
        return nodes
    }
    toString(callback) {
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