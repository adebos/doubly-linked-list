const Node = require('./node');

class LinkedList {

	//начальная установка
	constructor() {
		this.length = 0;
		this._head = null;
		this._tail = null;
	}

	//добавляет узел в список;
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

		return node;
	}

    //назначает узел в качестве головного элемента списка;
    head() {return this._head.data;}

    // назначает узел в качестве конечного элемента списка;
    tail() {return this._tail.data;}

    //ищет узел на n-ной позиции в списке;
    at(index) {
    	var currentAt = this._head,
        maxIndex = this.length - 1,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'};

	    // 1-ый случай: неверная позиция
	    if (maxIndex === -1 || index < 0 || index > maxIndex) {
	        throw new Error(message.failure);
	    }

	    // 2-ой случай: верная позиция
	    while (count < index) {
	        currentAt = currentAt.next;
	        count++;
	    }

	    return currentAt.data;
	}

    insertAt(index, data) {
    	var node = new Node(data),
        currentAt = this._head,
        maxIndex = this.length - 1,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'};

	    // 1-ый случай: неверная позиция
	    if (index < 0 || index > (this.length+1)) {
	        throw new Error(message.failure);
	    }

	    // 2-ой случай: первый узел добавлен
	    if (index === 0) {
	    	this._head = node;
	        this._head.next = currentAt;
	        currentAt.prev = node;
	    // 3-ий случай: последний узел добавлен
	    } else if (index === (this.length)) {
	       this.append(data);
	    // 4-ый случай: средний узел добавлен
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
	    }

	    this.length++;

	    //return message.success;

    }

    isEmpty() {
    	if (this.length == 0) {
			return true;
		}
		else {
			return false;
		}
    }

    clear() {
    	this.length = 0;
		this._head.data = null;
		this._tail.data = null;
    }

    // удаляет узел из списка.
    deleteAt(index) {
    	var currentAt = this._head,
        maxIndex = this.length - 1,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        afterNodeToDelete = null,
        deletedNode = null;

	    // 1-ый случай: неверная позиция
	    if (maxIndex === -1 || index < 0 || index > maxIndex) {
	        throw new Error(message.failure);
	    }

	    // 2-ой случай: первый узел удален
	    if (index === 0) {
	        this._head = currentAt.next;

	        // 2-ой случай: существует второй узел
	        if (!this._head) {
	            this._head.prev = null;
	        // 2-ой случай: второго узла не существует
	        } else {
	            this._tail = null;
	        }

	    // 3-ий случай: последний узел удален
	    } else if (index === (this.length - 1)) {
	        this._tail = this._tail.prev;
	        this._tail.next = null;
	    // 4-ый случай: средний узел удален
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
	    }

	    this.length--;
    }

    reverse() {
    	var newList = new LinkedList(),
        count = 0;

        while (count < this.length) {
        	newList.append(this._tail.date);

        	if ((this.length-count) !== 1){
        		this._tail = this._tail.prev;
        		this._tail.next = null;
        	}
        	count++;
        }
		//this = newList;
		//return newList;
    }

    indexOf(data) {
    	var currentAt = this._head,
        maxIndex = this.length - 1,
        currentIndex = 0,
        rezult = -1;

	    // поиск совпадения
	    while (currentIndex <= maxIndex) {

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
