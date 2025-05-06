class ListNode<T> {
    constructor(public value: T, public next: ListNode<T> | null = null) {}
}

export class LinkedList<T> {
    private head: ListNode<T> | null = null 

    getHead(): ListNode<T> | null {
        return this.head;
    }

    append(value: T): void {
        const newNode = new ListNode(value) 

        if (!this.head) {
            this.head = newNode 
            return 
        }

        let current = this.head 

        while (current.next) {
            current = current.next 
        }

        current.next = newNode 
    }
}


export function reverseLinkedList<T>(list: LinkedList<T>): LinkedList<T> {
    const result = new LinkedList<T>();
    let current = list.getHead();
    let prev: ListNode<T> | null = null;

    while (current !== null) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    // Create a new LinkedList with the reversed nodes
    let node = prev;
    while (node !== null) {
        result.append(node.value);
        node = node.next;
    }

    return result;
}