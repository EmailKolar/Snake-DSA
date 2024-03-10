export default class Queue{

    constructor(head, tail) {
		this.head = null;
        this.tail = null;
	}

    enqueue(row, col){
        const nodeToAdd = {//NEW NODE
            prev: null,
            next: null,
            row: row,
            col : col,
        }
        if(this.head === null){//IF THE LIST IS EMPTY
            this.head = nodeToAdd;
            this.tail = nodeToAdd;
        } else {
            nodeToAdd.prev = this.tail;//SET PREV TO TAIL OF LIST
            this.tail.next = nodeToAdd;//SET TAILS NEXT TO NEW NODE
            this.tail = nodeToAdd;//UPDTATE TAIL TO NEW NODE
        }
    }

    dequeue(){
        if (this.head === null) {//IF THE LIST IS EMPTY
            //do nothing
            console.log('A');
        } else if (this.head.next === null) {//IF THE LIST IS ONE NODE
            this.head = null;
            console.log('B');
        } else {
            this.head = this.head.next;// SET HEAD TO SECOND NODE
            this.head.prev = null; //SET PREV OF NEW HEAD TO NULL
            
        }
    }

    peek(){
        return this.head;
    }



}