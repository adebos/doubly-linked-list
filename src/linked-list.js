const Node = require('./node');

class LinkedList {

	//initial setting
	constructor() {
		this.length = 0;
		this._head = null;
		this._tail = null;
	}

	//adds a node to the list
	append(data) {
		var node = new Node(data);

		if (this.length == 0) {
			this._head = node;
			this._tail = node;
		} else {
			this._tail.next = node;
			node.prev = this._tail;
			this._tail = node;
		}

		this.length++;

		return this;
	}

    // assigns node as the head element of the list
    head() {
    	return this._head.data;
    }

    // assigns node as the final element of the list
    tail() {
    	return this._tail.data;
    }

    //search node of index
    at(index) {
    	var currentAt = this._head,
        count = 0,
        message = {failure: 'Error: invalid value'};

	    // 1: bad position
	    if (this.length == 0 || index < 0 || index > this.length-1) {
	        throw new Error(message.failure);
	    }

	    while (count < index) {
	        currentAt = currentAt.next;
	        count++;
	    }

	    return currentAt.data;
	}

	//insert node
    insertAt(index, data) {
    	var node = new Node(data),
        currentAt = this._head,
        count = 0,
        message = {failure: 'Error: invalid value'};

	    // 1: bad position
	    if (index < 0 || index > (this.length+1)) {
	        throw new Error(message.failure);
	    }

	    // 2: first node insert
	    if (index == 0) {
	    	this._head = node;

	    	if (this.length == 0){
	    		this._tail = node;
	    	}
	    	else{
		        this._head.next = currentAt;
		        currentAt.prev = node;
	    	}

	        this.length++;

		// 3: last node insert
	    } else if (index == this.length) {
	       this.append(data);
	    // 4: middle node insert
	    } else {
	    	while (count < (index-1)) {
	            currentAt = currentAt.next;
	            count++;
	        }
	        node.next = currentAt.next;
	        currentAt.next = node;
	        node.prev = currentAt;
	        currentAt = node.next;
	        currentAt.prev = node;
	        this.length++;
	    }

	    return this;
    }

    //empty list
    isEmpty() {
    	if (this.length == 0) {return true;}
		else {return false;}
    }

    //clear list
    clear() {
    	this.length = 0;
		this._head.data = null;
		this._tail.data = null;

		return this;
    }

    // deleted node of index
    deleteAt(index) {
    	var currentAt = this._head,
        count = 0,
        message = {failure: 'Error: invalid value'},

        beforeNodeToDelete = null,
        nodeToDelete = null,
        afterNodeToDelete = null,
        deletedNode = null;

	    // 1: bad position
	    if (this.length === 0 || index < 0 || index > (this.length - 1)) {
	        throw new Error(message.failure);
	    }

	    // 2: first node deleted
	    if (index === 0) {
	        // 2.1: second node found
	        if (this._head != this._tail) {

	        	this._head = currentAt.next;
	            this._head.prev = null;
	            this.length--;
	        // 2.2: second node not found
	        } else {
	        	this.clear();
	        }

	    // 3: last node deleted
	    } else if (index === (this.length - 1)) {

	    	currentAt = this._tail.prev;
	        this._tail = this._tail.prev;
	        this._tail.prev = currentAt.prev;
	        this._tail.next = null;

	        this.length--;
	    // 4: middle node deleted
	    } else {
	        while (count < index) {
	            currentAt = currentAt.next;
	            count++;
	        }

	        beforeNodeToDelete = currentAt.prev;
	        nodeToDelete = currentAt;
	        afterNodeToDelete = currentAt.next;

	        beforeNodeToDelete.next = afterNodeToDelete;
	        afterNodeToDelete.prev = beforeNodeToDelete;
	        deletedNode = nodeToDelete;
	        nodeToDelete = null;

	        this.length--;
	    }

	    return this;
    }

    //reverse list
    reverse() {
    	var currentAt = this._head,
    	temp = null,
    	count = 0;

        while (count < this.length) {
        	//reverse .next and .prev
        	temp = currentAt.next;
	        currentAt.next = currentAt.prev;
	        currentAt.prev = temp;

	        currentAt = temp;
	        count++;
        }

        //reverse _head and _tail
        temp = this._head;
    	this._head = this._tail;
    	this._tail = temp;

    	return this;
    }

    //search index of data
    indexOf(data) {
    	var currentAt = this._head,
        currentIndex = 0,
        rezult = -1;

	    // search matches
	    while (currentIndex < this.length) {

	    	if (data === currentAt.data) {
	    		rezult = currentIndex;
	    		break;
		    }
	        currentAt = currentAt.next;
	        currentIndex++;
	    }
	    return rezult;
    }
}

module.exports = LinkedList;
