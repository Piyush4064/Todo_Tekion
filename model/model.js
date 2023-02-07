const LOCAL_STORAGE_TODOS_KEY = 'LOCAL_STORAGE_TODOS_KEY';
const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)) || {};

const LOCAL_STORAGE_TODO_CATEGORIES_KEY = 'LOCAL_STORAGE_TODO_CATEGORIES_KEY';
const todoCategories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_CATEGORIES_KEY)) || [];

function saveTodos() {
    localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos));
}
function saveTodoCategories() {
    localStorage.setItem(LOCAL_STORAGE_TODO_CATEGORIES_KEY, JSON.stringify(todoCategories));
}

class createObject {
    #_id; #_todoCategory; #_value; #_isComplete; #_isPin;

    constructor(id, todoCategory, value, isComplete, isPin) {
        this.#_id = id;
        this.#_todoCategory = todoCategory;
        this.#_value = value;
        this.#_isComplete = isComplete;
        this.#_isPin = isPin;
    }

    get id() {
        return this.#_id;
    }
    get todoCategory() {
        return this.#_todoCategory;
    }
    get value() {
        return this.#_value;
    }
    get isComplete() {
        return this.#_isComplete;
    }
    get isPin() {
        return this.#_isPin;
    }
    set value(newValue) {
        this.#_value = newValue;
    }
    set isComplete(newIsComplete) {
        this.#_isComplete = newIsComplete;
    }
    set isPin(newIsPin) {
        this.#_isPin = newIsPin;
    }

    toJSON() {
        return {
          id: this.id,
          todoCategory:  this.todoCategory,
          value:   this.value,
          isComplete: this.isComplete,
          isPin: this.isPin
        };
    }
}

export {todos, todoCategories, createObject, saveTodos, saveTodoCategories};